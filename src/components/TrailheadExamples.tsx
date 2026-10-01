import { motion } from "framer-motion";

/* Three illustrative Trailhead briefs, written at a high level. These are
   examples of what the first stage produces, NOT client engagements, and the
   copy says so. Swap in real engagements (with written permission) as they
   happen. */

const EXAMPLES = [
  {
    who: "A founder with a concept",
    ask: "Wanted to know whether a members-only app for a hobby community was worth building.",
    brief:
      "The market and four rivals mapped, a name that was free to use, the ten questions to answer first, and a plain recommendation: build a small version before anything big.",
  },
  {
    who: "An operator with a messy workflow",
    ask: "Tracked patient payment plans across spreadsheets and email in a multi-location practice.",
    brief:
      "Where the time and money leaked out, what to build and what to buy, and the smallest tool that would fix the worst leak first.",
  },
  {
    who: "A B2B team with a hard-to-explain product",
    ask: "Had powerful software that nobody could grasp from a slide.",
    brief:
      "The three moments a buyer has to feel, and a clickable walkthrough concept to put in front of real prospects.",
  },
];

export default function TrailheadExamples() {
  return (
    <div className="mt-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">A Trailhead in practice</p>
        <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
          What the first stage hands you
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Three illustrative briefs, written the way I would hand them to you. These are examples of the work, not client engagements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {EXAMPLES.map((e, i) => (
          <motion.div
            key={e.who}
            data-testid={`card-trailhead-example-${i}`}
            className="p-7 rounded-2xl bg-card border border-border/60 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">{e.who}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{e.ask}</p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">The brief</p>
            <p className="text-sm text-foreground leading-relaxed">{e.brief}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
