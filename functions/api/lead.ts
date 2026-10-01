/* Cloudflare Pages Function: POST /api/lead
   Validates the lead form and emails it to Greg through Brevo's transactional API.
   Configure in Cloudflare Pages > Settings > Variables and Secrets (see
   docs/lead-capture.md): BREVO_API_KEY (secret, required), LEAD_TO_EMAIL and
   LEAD_FROM_EMAIL (optional, default greg@buttonrocklabs.com). Without the key the
   endpoint answers 503 and the form shows its email fallback. */

interface Env {
  BREVO_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
}

const INTENTS: Record<string, string> = {
  idea: "App or business idea",
  workflow: "Messy workflow",
  partner: "Collaboration or partnership",
  press: "Press, podcast, or speaking",
  support: "Support request",
  other: "Something else",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type Touch = Record<string, string | undefined>;

function touchRows(label: string, t: Touch | undefined): string {
  if (!t) return "";
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer", "landing_path", "seen_at"];
  const rows = keys
    .filter((k) => typeof t[k] === "string" && t[k])
    .map((k) => `<tr><td style="padding:2px 12px 2px 0;color:#666">${label} ${k}</td><td>${esc(clean(t[k], 200))}</td></tr>`);
  return rows.join("");
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const origin = request.headers.get("Origin");
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) return json({ error: "forbidden" }, 403);
    } catch {
      return json({ error: "forbidden" }, 403);
    }
  }

  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 20000) return json({ error: "too_large" }, 413);
    body = JSON.parse(text);
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  // Honeypot: pretend success so bots learn nothing.
  if (clean(body.website, 200)) return json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 4000);
  const company = clean(body.company, 160);
  const source = clean(body.source, 40);
  const page = clean(body.page, 200);
  const intent = clean(body.intent, 20);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !INTENTS[intent]) {
    return json({ error: "invalid" }, 400);
  }

  if (!env.BREVO_API_KEY) return json({ error: "not_configured" }, 503);

  const attribution = (body.attribution && typeof body.attribution === "object" ? body.attribution : {}) as {
    first?: Touch;
    last?: Touch;
  };
  const to = env.LEAD_TO_EMAIL || "greg@buttonrocklabs.com";
  const from = env.LEAD_FROM_EMAIL || "greg@buttonrocklabs.com";
  const utm = attribution.last?.utm_source || attribution.first?.utm_source || source || "direct";

  const html = `
    <p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;${company ? ` &middot; ${esc(company)}` : ""}</p>
    <p><em>${esc(INTENTS[intent])}</em></p>
    <p style="white-space:pre-wrap">${esc(message)}</p>
    <hr>
    <table style="font-size:13px">
      <tr><td style="padding:2px 12px 2px 0;color:#666">Says they found me via</td><td>${esc(source || "not answered")}</td></tr>
      <tr><td style="padding:2px 12px 2px 0;color:#666">Submitted on</td><td>${esc(page)}</td></tr>
      ${touchRows("First touch", attribution.first)}
      ${touchRows("Last touch", attribution.last)}
    </table>`;

  let res: Response;
  try {
    res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "BRL website", email: from },
        to: [{ email: to }],
        replyTo: { email, name },
        subject: `[BRL lead: ${utm}] ${INTENTS[intent]}: ${name}`,
        htmlContent: html,
      }),
    });
  } catch {
    return json({ error: "send_failed", brevo: "unreachable" }, 502);
  }

  if (res.ok) return json({ ok: true });

  // Brevo's error code and status are safe to surface (they never contain the key)
  // and are the fastest way to see why a send failed, e.g. 401 unauthorized for an
  // unrecognised IP, or 400 invalid_parameter for an unvalidated sender.
  let code = "";
  try {
    code = clean(((await res.json()) as { code?: unknown }).code, 60);
  } catch {
    /* non-JSON error body */
  }
  console.error("brevo send failed", res.status, code);
  return json({ error: "send_failed", brevo: `${res.status}${code ? " " + code : ""}` }, 502);
};
