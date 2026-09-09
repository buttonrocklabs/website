#!/usr/bin/env node
/**
 * LAB-366 — have any of our hand-placed `overrides` stopped being necessary?
 *
 * WHY THIS EXISTS: Dependabot cannot see an override. Its npm updater reads
 * dependencies / devDependencies / peerDependencies and nothing else, so an
 * `overrides` entry is invisible to it: it will never bump one, and more to the
 * point it will never REMOVE one once upstream fixes itself. Every override in
 * this repo is a workaround for someone else's pin:
 *
 *   - LAB-362  sharp ^0.35.4          -- miniflare pins sharp to an exact
 *                                        0.35.2, which is inside the libheif
 *                                        advisory range.
 *   - LAB-365  @esbuild-kit/core-utils.esbuild ^0.25.4
 *                                     -- drizzle-kit declares a deprecated
 *                                        @esbuild-kit dep it never loads,
 *                                        dragging esbuild 0.18.20 in with it.
 *
 * Left alone, those pins quietly become permanent, and a pin nobody revisits is
 * how a tree drifts a year behind while every check stays green.
 *
 * THE TEST: for each override, resolve the tree WITHOUT it and audit that. If
 * the tree is clean without the override, upstream has caught up and the
 * override is now dead weight. No advisory-range parsing, no version
 * arithmetic -- npm audit already resolves ranges against what actually
 * installs, so removing the pin and asking "still clean?" is the whole check.
 *
 * Read-only: it works on a COPY in a temp dir and never touches the real
 * package.json or package-lock.json.
 *
 * Usage: node scripts/check-redundant-overrides.mjs
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync } from "node:fs";
import { appendFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const overrides = pkg.overrides ?? {};
const keys = Object.keys(overrides);

if (keys.length === 0) {
  console.log("No `overrides` in package.json. Nothing to check.");
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, "has_redundant=false\n");
  }
  process.exit(0);
}

/**
 * Resolve a lockfile for `variant` in a scratch dir and return its audit
 * summary. --package-lock-only keeps this to a registry resolve; nothing is
 * downloaded or built.
 */
function auditWithout(key) {
  const dir = mkdtempSync(join(tmpdir(), "override-check-"));
  try {
    const variant = structuredClone(pkg);
    delete variant.overrides[key];
    if (Object.keys(variant.overrides).length === 0) delete variant.overrides;
    writeFileSync(join(dir, "package.json"), JSON.stringify(variant, null, 2));
    if (existsSync("package-lock.json")) {
      writeFileSync(join(dir, "package-lock.json"), readFileSync("package-lock.json"));
    }

    execFileSync("npm", ["install", "--package-lock-only", "--no-audit", "--no-fund"], {
      cwd: dir,
      stdio: "pipe",
    });

    let raw;
    try {
      raw = execFileSync("npm", ["audit", "--json"], {
        cwd: dir,
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
      });
    } catch (e) {
      // npm audit exits non-zero whenever it finds anything. Normal path.
      raw = e.stdout || "";
    }
    const parsed = JSON.parse(raw);
    const vulns = parsed.metadata?.vulnerabilities ?? {};
    const total = Object.entries(vulns)
      .filter(([sev]) => sev !== "total")
      .reduce((n, [, count]) => n + count, 0);
    return { ok: true, total, breakdown: vulns };
  } catch (e) {
    // Fail SAFE: an unresolvable tree means "still needed", never "drop it".
    return { ok: false, error: String(e.message ?? e).split("\n")[0] };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const redundant = [];
const stillNeeded = [];

for (const key of keys) {
  process.stderr.write(`checking ${key}...\n`);
  const result = auditWithout(key);
  if (!result.ok) {
    stillNeeded.push({ key, note: `could not resolve without it (${result.error})` });
  } else if (result.total === 0) {
    redundant.push({ key, pin: JSON.stringify(overrides[key]) });
  } else {
    const parts = Object.entries(result.breakdown)
      .filter(([sev, n]) => sev !== "total" && n > 0)
      .map(([sev, n]) => `${n} ${sev}`)
      .join(", ");
    stillNeeded.push({ key, note: `still holding back ${parts}` });
  }
}

const lines = [];
if (redundant.length > 0) {
  lines.push("These `overrides` are no longer doing anything. Upstream has caught up, so they can be removed:");
  lines.push("");
  for (const r of redundant) {
    lines.push(`- \`${r.key}\` (pinned \`${r.pin}\`) - removing it leaves \`npm audit\` clean.`);
  }
  lines.push("");
  lines.push("Removing a pin is a deliberate change, so this is a heads-up rather than a PR: drop the entry, run `npm install`, and confirm `npm audit` still reports zero at every level.");
}
if (stillNeeded.length > 0) {
  lines.push("");
  lines.push("<details><summary>Still earning their place</summary>");
  lines.push("");
  for (const s of stillNeeded) lines.push(`- \`${s.key}\` - ${s.note}`);
  lines.push("");
  lines.push("</details>");
}

const body = lines.join("\n").trim();
console.log(body || "All overrides still needed.");

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `has_redundant=${redundant.length > 0 ? "true" : "false"}\n`);
}
