import { motion } from "framer-motion";

/* Real Trailheads from the Lab, with every name removed. The point is the
   problem and the call, not the client. Some became builds; some ended in a
   clear "do not build", which is the Trailhead doing its job. Before adding a
   new one, make sure the client is comfortable with the anonymized write-up. */

type Outcome = "forward" | "assessed" | "stop";

const EXAMPLES: { who: string; problem: string; did: string; outcome: Outcome; landed: string }[] = [
  {
    who: "A food-service operator",
    problem: "Decades of hard-won method lived in people, and every new account repeated the learning by hand.",
    did: "Tested whether that method could become a purchasing platform, used first on the company's own accounts and then offered to others.",
    outcome: "assessed",
    landed: "A concept brief, and the decisions that matter laid out for the owner.",
  },
  {
    who: "A residential recovery program",
    problem: "An extraordinary program that lived in the houses. The structure stayed behind the moment a client stepped off the property.",
    did: "Mapped the whole journey, from the first call to alumni, into one continuous program in every client's pocket.",
    outcome: "forward",
    landed: "On to a working prototype.",
  },
  {
    who: "A lending analytics company",
    problem: "A working product with real customers, and no system for selling it.",
    did: "Reframed the work from consulting tools to a go-to-market for the product: every number tied to an action, every action tied to dollars.",
    outcome: "forward",
    landed: "Became a build, now in motion.",
  },
  {
    who: "A marketplace for overwhelmed parents",
    problem: "One front door to ask for help in plain words, and have a vetted person found, booked, and paid.",
    did: "Mapped a crowded field and the earlier concierge attempts that never penciled out, then asked the hard one: is the wedge big enough to make people switch?",
    outcome: "stop",
    landed: "We could not find a distinctive, winning play, and said so before anyone wrote code.",
  },
  {
    who: "A free peer-support platform for recovery",
    problem: "A warmer front door, free to the person and paid for by the treatment centers who want patients to stay connected.",
    did: "Pressure-tested the buyer. Established competitors were already moving toward the same centers, and the other lane belonged to far better-funded players.",
    outcome: "stop",
    landed: "No winning play to pursue, so it never became a project.",
  },
];

const BADGE: Record<Outcome, { label: string; cls: string }> = {
  forward: { label: "Moved forward", cls: "bg-primary/15 text-primary" },
  assessed: { label: "Assessed", cls: "border border-primary/40 text-foreground" },
  stop: { label: "Chose not to build", cls: "bg-muted text-foreground" },
};

export default function TrailheadExamples() {
  return (
    <div className="mt-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">A Trailhead in practice</p>
        <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Real briefs, names removed
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Some of these became projects. Some did not, and that matters just as much. I ask the tough questions, and a clear no before anyone builds is worth having.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXAMPLES.map((e, i) => (
          <motion.div
            key={e.who}
            data-testid={`card-trailhead-example-${i}`}
            className="p-7 rounded-2xl bg-card border border-border/60 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <p className="text-[11px] font-semibold text-primary uppercase tracking-widest">{e.who}</p>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${BADGE[e.outcome].cls}`}>
                {BADGE[e.outcome].label}
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">The problem</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">{e.problem}</p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">What the Trailhead did</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{e.did}</p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Where it landed</p>
            <p className="text-sm text-foreground leading-relaxed">{e.landed}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
