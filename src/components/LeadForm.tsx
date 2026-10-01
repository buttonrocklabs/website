import { useEffect, useState } from "react";
import { captureAttribution, getAttribution, guessSource } from "@/lib/attribution";

/* The one lead form for the whole site (Home contact section and /start).
   Modeled on the Sober Motivation Wix forms: an intent dropdown that routes the
   note, few required fields, and a "how did you find me?" question. Posts to the
   Pages Function at /api/lead, which emails Greg. */

export const INTENTS = [
  { value: "idea", label: "I have an app or business idea" },
  { value: "workflow", label: "My business runs on a messy workflow" },
  { value: "partner", label: "Collaboration or partnership" },
  { value: "press", label: "Press, podcast, or speaking" },
  { value: "other", label: "Something else" },
];

const SOURCES = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "marketplace", label: "Upwork or another marketplace" },
  { value: "podcast", label: "A podcast" },
  { value: "referral", label: "A friend or colleague" },
  { value: "search", label: "Search" },
  { value: "other", label: "Somewhere else" },
];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";
const label = "block text-[12px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 text-left";

export default function LeadForm({ idPrefix = "lead" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [intent, setIntent] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wanted = params.get("intent");
    if (wanted && INTENTS.some((i) => i.value === wanted)) setIntent(wanted);
    // Child effects run before App's, so capture here too (it is idempotent).
    captureAttribution();
    setSource(guessSource(getAttribution()));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          source,
          website: data.get("website"),
          attribution: getAttribution(),
          page: window.location.pathname,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div data-testid="lead-form-sent" className="rounded-2xl border border-primary/30 bg-card p-8 text-center text-foreground">
        <p className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Thanks, I have your note.
        </p>
        <p className="text-muted-foreground">I read every one myself and will be in touch soon.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-testid="lead-form"
      className="rounded-2xl border border-border/60 bg-background p-6 md:p-8 text-left text-foreground"
    >
      <div className="grid grid-cols-1 gap-5">
        <div>
          <label htmlFor={`${idPrefix}-intent`} className={label}>What is this about?</label>
          <select
            id={`${idPrefix}-intent`}
            required
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            className={field}
          >
            <option value="" disabled>Select an option</option>
            {INTENTS.map((i) => (
              <option key={i.value} value={i.value}>{i.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor={`${idPrefix}-name`} className={label}>Your name</label>
            <input id={`${idPrefix}-name`} name="name" required maxLength={120} autoComplete="name" className={field} />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-email`} className={label}>Email</label>
            <input id={`${idPrefix}-email`} name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" className={field} />
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-company`} className={label}>Company or project (optional)</label>
          <input id={`${idPrefix}-company`} name="company" maxLength={160} autoComplete="organization" className={field} />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-message`} className={label}>What are you working on?</label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            required
            rows={5}
            maxLength={4000}
            placeholder="A few sentences is plenty. Don't overthink it."
            className={field}
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-source`} className={label}>How did you find me?</label>
          <select id={`${idPrefix}-source`} value={source} onChange={(e) => setSource(e.target.value)} className={field}>
            <option value="">Select an option</option>
            {SOURCES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Honeypot: real visitors never see or fill this. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          data-testid="button-lead-submit"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Start at the Trailhead"}
        </button>

        {status === "error" && (
          <p role="alert" className="text-sm text-muted-foreground">
            That did not go through. You can email me directly at{" "}
            <a href="mailto:greg@buttonrocklabs.com" className="text-primary">greg@buttonrocklabs.com</a>.
          </p>
        )}
      </div>
    </form>
  );
}
