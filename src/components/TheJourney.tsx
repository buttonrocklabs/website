import { useState } from "react";
import { motion } from "framer-motion";
import LabSection from "@/components/LabSection";

/* The Journey: the four-stage guided climb that organizes everything BRL does.
   Trailhead -> Switchbacks -> Treeline -> Ridgeline, with the summit left
   deliberately unclaimed (it belongs to the partner). Two personas drive the
   copy: an app idea, or a business workflow. Scope of the journey: concept to
   cash flow. The Lab grid (LabSection) renders below, grouped by these same
   stages. */

type Persona = "idea" | "flow";

type Stage = {
  name: string;
  line: string;
  body: Record<Persona, string>;
  artifact: Record<Persona, string>;
  gate: Record<Persona, string>;
  pace: string;
  tools: string[];
  pills?: Record<Persona, string[] | null>;
};

const STAGES: Stage[] = [
  {
    name: "Trailhead",
    line: "Every journey starts with a conversation.",
    body: {
      idea: "You tell the story of your idea. We research the market, the rivals, and the name, then hand you the whole thing on paper.",
      flow: "You walk us through the workflow as it really runs. We map where the time, the money, and the hassle leak out.",
    },
    artifact: {
      idea: "A hand-built concept brief and ten essential questions",
      flow: "A hand-built brief on what your process could become",
    },
    gate: {
      idea: "Come back with the questions answered",
      flow: "Come back with the questions answered",
    },
    pace: "Days",
    tools: ["Trailhead", "Quarry"],
  },
  {
    name: "Switchbacks",
    line: "You can't climb the steep part in a straight line.",
    body: {
      idea: "We iterate. Real screens, a working prototype, a name and a voice that fit the people it serves.",
      flow: "We prototype around the way your business actually works, not around a template.",
    },
    artifact: {
      idea: "A clickable prototype you can put in someone's hands",
      flow: "A working tool your team can try on real work",
    },
    gate: {
      idea: "Your time and energy. The climb tests commitment.",
      flow: "Your team's hands on it, and honest feedback",
    },
    pace: "A few weeks",
    tools: ["Prototypes", "Tenor", "Campfire"],
  },
  {
    name: "Treeline",
    line: "Above the trees, there's nowhere to hide.",
    body: {
      idea: "We build the real thing, tested and ready to launch. The economics go on the table in the open: the value the work creates is what sets the price, not a timesheet.",
      flow: "The tool takes over the painful parts, built and tested against your real work. We shape the engagement around the value it creates, out in the open.",
    },
    artifact: {
      idea: "A shipping app, built for launch",
      flow: "Software that fits your business, not the other way around",
    },
    gate: {
      idea: "Economics we agree on together",
      flow: "Economics we agree on together",
    },
    pace: "Weeks, not quarters",
    tools: ["Forge", "Chisel", "Scout", "Bedrock", "Belay"],
  },
  {
    name: "Ridgeline",
    line: "The high route. Cash flow on one side, the summit on the other.",
    body: {
      idea: "Your app is live and earning. We walk the ridge with you: health, metrics, feedback, and the next feature, with the summit in view the whole way.",
      flow: "The chaos is gone, and it shows up in the numbers. Custom software working where the spreadsheets and the off-the-shelf tools used to fight you.",
    },
    artifact: {
      idea: "Cash flow, and a partner for the next climb",
      flow: "A system your team can't imagine working without",
    },
    gate: {
      idea: "There is no gate up here. The summit ahead is yours.",
      flow: "There is no gate up here. The summit ahead is yours.",
    },
    pace: "Ongoing",
    tools: ["Sentinel", "Pulse", "Echo", "Compass", "Gauge", "Capstone"],
    pills: {
      idea: null,
      flow: ["Time saved", "Money saved", "Hassle gone"],
    },
  },
];

const WAYPOINTS = [
  { x: 60, y: 224, lx: 60, ly: 248 },
  { x: 240, y: 170, lx: 240, ly: 196 },
  { x: 450, y: 106, lx: 450, ly: 132 },
  { x: 580, y: 72, lx: 568, ly: 98 },
];

export default function TheJourney() {
  const [persona, setPersona] = useState<Persona>("idea");
  const [stage, setStage] = useState(0);
  const s = STAGES[stage];
  const pills = s.pills?.[persona] ?? null;

  return (
    <section id="journey" className="py-28 bg-card border-y border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">The Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
            From concept to cash flow.{" "}
            <span
              className="text-primary block md:inline"
              style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: "1.25em" }}
            >
              The summit is yours.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Four stages. Each one ends with something real in your hands, and a
            gate that tells us both whether to keep climbing.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mt-10">
          <div className="flex justify-center gap-2 mb-6" role="tablist" aria-label="Choose your starting point">
            {(
              [
                { id: "idea" as Persona, label: "I have an app idea" },
                { id: "flow" as Persona, label: "My business runs on a messy workflow" },
              ]
            ).map((p) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={persona === p.id}
                data-testid={`button-persona-${p.id}`}
                onClick={() => setPersona(p.id)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors border ${
                  persona === p.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <svg viewBox="0 0 680 260" className="w-full hidden md:block" aria-label="The trail from Trailhead to Ridgeline, with your summit beyond it">
            <path
              d="M0,260 L0,232 L120,214 L240,168 L330,178 L470,100 L580,70 L620,52 L680,78 L680,260 Z"
              fill="hsl(var(--muted-foreground))"
              fillOpacity="0.07"
            />
            <path
              d="M622,56 L650,18 L676,52"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <text x="650" y="10" textAnchor="middle" fontSize="11" fontStyle="italic" fill="hsl(var(--muted-foreground))">
              Your summit
            </text>
            <motion.polyline
              points="60,224 140,206 172,193 194,200 216,182 240,170 330,146 450,106 520,88 580,72"
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeDasharray="5 6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            {WAYPOINTS.map((w, i) => {
              const reached = i <= stage;
              const current = i === stage;
              return (
                <g
                  key={STAGES[i].name}
                  onClick={() => setStage(i)}
                  data-testid={`waypoint-${STAGES[i].name.toLowerCase()}`}
                  style={{ cursor: "pointer" }}
                  role="button"
                  aria-label={`Stage ${i + 1}: ${STAGES[i].name}`}
                >
                  <circle cx={w.x} cy={w.y} r="14" fill="transparent" />
                  <circle
                    cx={w.x}
                    cy={w.y}
                    r="10"
                    fill={reached ? "hsl(var(--primary))" : "hsl(var(--card))"}
                    stroke={reached ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={w.x}
                    cy={w.y}
                    r="3.5"
                    fill={reached ? "hsl(var(--card))" : "hsl(var(--muted-foreground))"}
                  />
                  <text
                    x={w.lx}
                    y={w.ly}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight={current ? 600 : 400}
                    fill={current ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
                  >
                    {STAGES[i].name}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="flex md:hidden flex-wrap justify-center gap-2 mb-2">
            {STAGES.map((st, i) => (
              <button
                key={st.name}
                onClick={() => setStage(i)}
                data-testid={`button-stage-${st.name.toLowerCase()}`}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
                  i === stage
                    ? "bg-primary text-primary-foreground border-primary"
                    : i < stage
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-transparent text-muted-foreground border-border"
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>

          <motion.div
            key={`${stage}-${persona}`}
            data-testid={`card-stage-${s.name.toLowerCase()}`}
            className="mt-4 p-7 rounded-2xl bg-background border border-border/60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
              <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-2">
                Stage {stage + 1} of 4 &middot; {s.name}
              </p>
              <p className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {s.line}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">{s.body[persona]}</p>
              {pills && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {pills.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[12px] font-semibold"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-sm mb-5">
                <span className="text-muted-foreground">You walk away with</span>
                <span className="text-foreground">{s.artifact[persona]}</span>
                <span className="text-muted-foreground">The gate</span>
                <span className="text-foreground">{s.gate[persona]}</span>
                <span className="text-muted-foreground">The pace</span>
                <span className="text-foreground">{s.pace}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">On the bench</span>
                {s.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full border border-border text-[12px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <p className="text-sm text-muted-foreground italic">
              The map is public. The mountain still requires a guide.
            </p>
            <a
              href="#contact"
              data-testid="button-start-trailhead"
              className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shrink-0"
            >
              Start at the Trailhead
            </a>
          </div>
        </div>

        <LabSection />
      </div>
    </section>
  );
}
