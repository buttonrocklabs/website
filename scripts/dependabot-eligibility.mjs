#!/usr/bin/env node
/**
 * LAB-366 — is this Dependabot PR safe to merge without a human reading it?
 *
 * WHY THIS EXISTS: this repo auto-deploys to production on every push to main,
 * and GitHub's own auto-merge is not available here (branch protection and
 * `allow_auto_merge` both need Pro on a private repo). That combination is the
 * trap: `gh pr merge --auto` on a repo with no REQUIRED checks does not wait
 * for CI at all, it merges immediately. So the wait-for-green has to be done by
 * hand in the workflow, and the "is this the kind of change we auto-merge"
 * decision has to be made here.
 *
 * THE POLICY (chosen 2026-09-09): a PR is eligible when EVERY package whose
 * version moved is one of
 *
 *   - dev-side: the lockfile marks it `"dev": true`, i.e. a devDependency or
 *     something only reachable from one. It cannot ship to a user.
 *   - a patch bump: same major AND same minor. Everything else on the runtime
 *     side waits for review.
 *
 * WHY THE LOCKFILE AND NOT `dependabot/fetch-metadata`: fetch-metadata reports
 * ONE update-type for the PR. Grouped PRs ("Bump the patches group with 2
 * updates") move several packages at once, and security updates for transitive
 * dependencies move packages that never appear in package.json at all. The
 * lockfile is the only place that sees all of them, and npm's own `dev` flag
 * already answers the dev/runtime question correctly for transitive deps.
 *
 * WHY `overrides` IS A HARD STOP: an override is a deliberate pin around an
 * upstream bug (see LAB-362 sharp, LAB-365 @esbuild-kit). Dependabot cannot
 * reason about them, so if one moves in a Dependabot PR, something surprising
 * has happened and a person should look.
 *
 * Fails CLOSED: any parse failure, missing file or unreadable version means not
 * eligible. The cost of a false "no" is that Greg clicks merge himself.
 *
 * Usage: node scripts/dependabot-eligibility.mjs <base-dir> <head-dir>
 *   where each dir holds that side's package.json + package-lock.json.
 */
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const [baseDir, headDir] = process.argv.slice(2);

function readJson(dir, file) {
  const path = join(dir ?? ".", file);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

/**
 * Every versioned entry in the lockfile, keyed by its PATH rather than its
 * name. Two copies of esbuild at different depths are genuinely two different
 * installs and have to be compared separately.
 */
function entriesFromLock(lock) {
  const map = new Map();
  for (const [key, val] of Object.entries(lock?.packages ?? {})) {
    if (!key.startsWith("node_modules/") || !val?.version) continue;
    map.set(key, { version: val.version, dev: isDevSide(val) });
  }
  return map;
}

/**
 * npm writes exactly one reachability flag per lockfile entry, and the naming
 * invites a wrong reading:
 *
 *   dev: true          reachable only from devDependencies.
 *   optional: true     reachable only through an OPTIONAL production dep. It
 *                      may be absent, but if it installs it runs in prod.
 *   devOptional: true  reachable from a devDependency AND from an optional
 *                      production path. Not in the required production tree.
 *
 * `devOptional` is treated as dev-side here, and the reason is not that it
 * cannot reach production -- the optional half of its reachability means it
 * can. The reason is coverage: because it is also a devDependency, it is
 * installed on every CI run, so the build, the typecheck and the audit all
 * exercised the exact version this PR proposes. A plain `optional: true`
 * package gets no such guarantee (it may not install on the runner's platform
 * at all), which is why that flag stays on the runtime side.
 *
 * Checking `dev === true` alone was the original bug: in vision-board,
 * @cloudflare/workers-types is a root devDependency that a runtime dep also
 * reaches optionally, so npm writes `devOptional` and a types-only package was
 * classified as a runtime minor bump and refused. Every devOptional entry in
 * both repos today is a types package (@types/react, csstype,
 * @cloudflare/workers-types), none of which emits anything at runtime.
 */
function isDevSide(entry) {
  return entry.dev === true || entry.devOptional === true;
}

function displayName(lockPath) {
  const marker = "node_modules/";
  return lockPath.slice(lockPath.lastIndexOf(marker) + marker.length);
}

/**
 * Plain semver classification. Deliberately NOT npm's caret semantics: for
 * classifying what moved, 0.35.2 -> 0.35.4 is a patch and 0.35.2 -> 0.36.0 is
 * a minor, even though npm treats the latter as breaking for a 0.x range.
 * Returns "patch" | "minor" | "major" | "unknown".
 */
function bumpType(from, to) {
  const parse = (v) => {
    const m = /^(\d+)\.(\d+)\.(\d+)/.exec(String(v));
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  };
  const a = parse(from);
  const b = parse(to);
  if (!a || !b) return "unknown";
  if (a[0] !== b[0]) return "major";
  if (a[1] !== b[1]) return "minor";
  if (a[2] !== b[2]) return "patch";
  // Same numeric core: a prerelease tag moved (5.2026.0-alpha -> -beta).
  return String(from) === String(to) ? "patch" : "unknown";
}

const reasons = [];
let eligible = true;

function block(reason) {
  eligible = false;
  reasons.push(reason);
}

const basePkg = readJson(baseDir, "package.json");
const headPkg = readJson(headDir, "package.json");
const baseLock = readJson(baseDir, "package-lock.json");
const headLock = readJson(headDir, "package-lock.json");

if (!baseLock || !headLock) {
  block("could not read both package-lock.json files");
} else if (!basePkg || !headPkg) {
  block("could not read both package.json files");
} else {
  // An override moving means a pin we placed by hand has shifted. Always human.
  const baseOverrides = JSON.stringify(basePkg.overrides ?? null);
  const headOverrides = JSON.stringify(headPkg.overrides ?? null);
  if (baseOverrides !== headOverrides) {
    block("package.json `overrides` changed; a hand-placed pin needs a human");
  }

  const before = entriesFromLock(baseLock);
  const after = entriesFromLock(headLock);

  const moved = [];
  for (const [path, head] of after) {
    const prev = before.get(path);
    if (!prev) {
      moved.push({ path, from: null, to: head.version, dev: head.dev });
      continue;
    }
    if (prev.version !== head.version) {
      moved.push({ path, from: prev.version, to: head.version, dev: head.dev });
    }
  }

  const summary = [];
  for (const change of moved) {
    const name = displayName(change.path);
    // Dev-side cannot reach a user, so semver does not gate it.
    if (change.dev) {
      summary.push(`${name} ${change.from ?? "(new)"} -> ${change.to} (dev)`);
      continue;
    }
    if (change.from === null) {
      block(`${name} is a NEW runtime dependency (${change.to})`);
      continue;
    }
    const type = bumpType(change.from, change.to);
    if (type === "patch") {
      summary.push(`${name} ${change.from} -> ${change.to} (runtime patch)`);
    } else {
      block(`${name} ${change.from} -> ${change.to} is a runtime ${type} bump`);
    }
  }

  // A PR that moves nothing is not something to merge on a rule.
  if (moved.length === 0) block("no package versions changed");

  if (eligible) {
    console.log(`Eligible. ${moved.length} package${moved.length === 1 ? "" : "s"} moved:`);
    for (const line of summary) console.log(`  - ${line}`);
  }
}

if (!eligible) {
  console.log("Not eligible for auto-merge:");
  for (const r of reasons) console.log(`  - ${r}`);
}

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `eligible=${eligible ? "true" : "false"}\n`);
}

process.exit(0);
