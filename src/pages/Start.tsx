import { useEffect } from "react";
import LeadForm from "@/components/LeadForm";
import { BlogNav, BlogFooter } from "@/pages/BlogIndex";

/* /start: the landing page for campaign links (LinkedIn, marketplaces, podcasts).
   Tag links with utm_* parameters (see docs/lead-capture.md) and point them here. */

const STEPS = [
  { title: "You tell me the story", body: "Your idea, or your workflow as it really runs. A conversation, not a questionnaire." },
  { title: "I do the homework", body: "The market, the rivals, the name, and where the time and money leak out." },
  { title: "You get it on paper", body: "A hand-built brief and the questions that matter most, so you know whether to keep climbing." },
];

export default function Start() {
  useEffect(() => {
    document.title = "Start at the Trailhead | Button Rock Labs";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <BlogNav />
      <main className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">The Trailhead</p>
        <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-extrabold mb-5" style={{ fontFamily: "var(--font-display)" }}>
          Know if it is worth building before you build it.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          I am Greg Falconer, a former CEO with three decades across telecom, healthcare technology, and fintech.
          Every engagement starts here: a conversation, then the whole thing on paper.
        </p>

        <ol className="grid grid-cols-1 gap-4 mb-12">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4 p-5 rounded-2xl bg-card border border-border/60">
              <span className="w-8 h-8 shrink-0 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                {i + 1}
              </span>
              <div>
                <p className="font-bold" style={{ fontFamily: "var(--font-display)" }}>{s.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <LeadForm idPrefix="start" />
      </main>
      <BlogFooter />
    </div>
  );
}
