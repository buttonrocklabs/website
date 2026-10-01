import echoIcon from "@/assets/images/echo-icon.svg";

/* An illustration of Echo's live recording window (not a screenshot): dual
   waveforms for the mic and the call audio, a live transcript with speakers,
   and the summary and action items that come out the other side. The people
   and the call are invented. Swap this for a real screenshot when one is ready. */

const BARS = Array.from({ length: 34 }, (_, i) => ({
  h: 22 + Math.round(Math.abs(Math.sin(i * 1.7) * 0.6 + Math.cos(i * 0.9) * 0.4) * 78),
  d: 1.1 + ((i * 37) % 10) / 10,
  delay: -((i * 53) % 16) / 10,
}));

function Wave({ label, tone }: { label: string; tone: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="flex-1 flex items-center gap-[3px] h-7" aria-hidden="true">
        {BARS.map((b, i) => (
          <span
            key={i}
            className={`echo-bar w-[3px] rounded-full ${tone}`}
            style={{ height: `${b.h}%`, animationDuration: `${b.d}s`, animationDelay: `${b.delay}s` }}
          />
        ))}
      </div>
    </div>
  );
}

const LINES = [
  { who: "Sam", t: "23:48", chip: "bg-secondary text-secondary-foreground", text: "We track every renewal in a spreadsheet, and half of them slip." },
  { who: "You", t: "23:55", chip: "bg-primary/15 text-primary", text: "How many accounts, roughly, and who owns the follow-up?" },
  { who: "Priya", t: "24:03", chip: "bg-muted text-muted-foreground", text: "About two hundred. Right now it depends on who remembers." },
];

export default function EchoShowcase() {
  return (
    <div
      role="img"
      aria-label="Illustration of Echo's live recording window: two waveforms, a live transcript with named speakers, and a summary with action items"
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 md:p-8"
    >
      {/* Echo rings and a ridge line behind the window */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[60, 110, 165, 225, 290, 360].map((r, i) => (
          <circle key={r} cx="470" cy="70" r={r} fill="none" stroke="hsl(var(--primary))" strokeOpacity={0.2 - i * 0.03} strokeWidth="1.5" />
        ))}
        <path d="M0 460 L0 372 L90 330 L170 362 L270 296 L350 340 L430 300 L520 350 L600 318 L600 460 Z" fill="hsl(var(--muted-foreground))" fillOpacity="0.08" />
        <path d="M0 460 L0 410 L120 384 L230 410 L340 372 L460 404 L600 380 L600 460 Z" fill="hsl(var(--muted-foreground))" fillOpacity="0.06" />
      </svg>

      <div className="relative rounded-xl border border-border/70 bg-background shadow-2xl">
        {/* title bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          </div>
          <span className="text-xs text-muted-foreground">Intro call</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Recording 24:08
          </span>
        </div>

        <div className="p-4 md:p-5 space-y-5">
          <div className="space-y-2">
            <Wave label="Mic" tone="bg-primary" />
            <Wave label="Call audio" tone="bg-muted-foreground/60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.45fr_1fr] gap-4">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Live transcript</p>
              {LINES.map((l) => (
                <div key={l.t} className="text-[13px] leading-snug">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${l.chip}`}>{l.who}</span>
                    <span className="text-[10px] text-muted-foreground">{l.t}</span>
                  </div>
                  <p className="text-foreground/90">{l.text}</p>
                </div>
              ))}
              <div className="text-[13px] leading-snug">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-primary/15 text-primary">You</span>
                  <span className="text-[10px] text-muted-foreground">24:08</span>
                </div>
                <p className="text-foreground/90">
                  Let's map where the time leaks first<span className="echo-caret text-primary">|</span>
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border/60 bg-card p-3.5 space-y-3 self-start">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Summary</p>
                <ul className="space-y-1 text-[12px] text-foreground/90 leading-snug">
                  <li>Renewals tracked by hand across about 200 accounts</li>
                  <li>Follow-up depends on who remembers</li>
                  <li>Goal: find the first leak to fix</li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Action items</p>
                <ul className="space-y-1.5 text-[12px] text-foreground/90 leading-snug">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-3 h-3 rounded-[3px] border border-primary/60 shrink-0" />
                    <span>Map the renewal flow <span className="text-muted-foreground">· Priya</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-3 h-3 rounded-[3px] border border-primary/60 shrink-0" />
                    <span>Send the Trailhead questions <span className="text-muted-foreground">· You</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-3">
        <img src={echoIcon} alt="Echo app icon" className="w-12 h-12 rounded-[14px] shadow-lg" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Illustration of the live window</span>
      </div>
    </div>
  );
}
