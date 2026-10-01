/* Lead attribution: remembers where a visitor came from so the contact form can
   report it. First-party only, stored in this browser, and sent nowhere until the
   visitor submits the form. First touch is kept; last touch updates whenever a new
   tagged link (utm_*) is opened. */

const KEY = "brl_attribution_v1";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Touch = Partial<Record<(typeof PARAMS)[number], string>> & {
  referrer?: string;
  landing_path?: string;
  seen_at?: string;
};

export type Attribution = { first?: Touch; last?: Touch };

function read(): Attribution {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

function write(value: Attribution) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage blocked: the form still works, it just reports no attribution */
  }
}

function referrerHost(): string | undefined {
  try {
    if (!document.referrer) return undefined;
    const host = new URL(document.referrer).hostname;
    return host === window.location.hostname ? undefined : host.slice(0, 120);
  } catch {
    return undefined;
  }
}

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const touch: Touch = {};
  for (const p of PARAMS) {
    const v = params.get(p);
    if (v) touch[p] = v.slice(0, 100);
  }
  const hasUtm = Object.keys(touch).length > 0;
  const referrer = referrerHost();
  const stored = read();

  if (!hasUtm && stored.first) return;
  if (!hasUtm && !referrer) {
    write({ first: { landing_path: window.location.pathname, seen_at: new Date().toISOString() } });
    return;
  }

  if (referrer) touch.referrer = referrer;
  touch.landing_path = window.location.pathname;
  touch.seen_at = new Date().toISOString();
  write({ first: stored.first ?? touch, last: hasUtm ? touch : stored.last });
}

export function getAttribution(): Attribution {
  return read();
}

/* Pre-selects the "How did you find me?" answer from a tagged link. */
export function guessSource(a: Attribution): string {
  const src = (a.last?.utm_source ?? a.first?.utm_source ?? "").toLowerCase();
  if (src.includes("linkedin")) return "linkedin";
  if (["upwork", "contra", "catalant", "toptal", "btg"].some((m) => src.includes(m))) return "marketplace";
  if (src.includes("podcast")) return "podcast";
  if (src.includes("referral") || src.includes("friend")) return "referral";
  return "";
}
