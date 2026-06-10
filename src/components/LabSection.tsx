import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* The Lab: the tool grid rendered inside TheJourney section on Home.tsx,
   grouped by journey stage (Trailhead / Switchbacks / Treeline / Ridgeline)
   plus The Pack (cross-cutting gear). Tool list mirrors the Lab's canonical
   registry (brl-client-tool-starter client/src/lib/labTools.ts) plus the two
   planned stage tools, Belay and Gauge. Self-contained block: sub-heading +
   grouped grids + closing line. No outer <section> wrapper so it inherits
   container width from its parent. */

type StageId = "trailhead" | "switchbacks" | "treeline" | "ridgeline" | "pack";

type Tool = {
  name: string;
  kind: string;
  stage: StageId;
  tagline: string;
  icon: ReactNode;
};

const STAGE_GROUPS: { id: StageId; name: string; blurb: string }[] = [
  { id: "trailhead", name: "Trailhead", blurb: "Where the journey starts: the conversation becomes a brief." },
  { id: "switchbacks", name: "Switchbacks", blurb: "Iterating up the steep part: identity, spec, prototype." },
  { id: "treeline", name: "Treeline", blurb: "The build, in the open: quality gates and honest economics." },
  { id: "ridgeline", name: "Ridgeline", blurb: "Operating at altitude: health, signal, and the flow, measured." },
  { id: "pack", name: "The Pack", blurb: "Carried the whole way: the gear every climb depends on." },
];

const TOOLS: Tool[] = [
  {
    name: "Trailhead",
    kind: "Intake",
    stage: "trailhead",
    tagline: "Where projects start. Idea, brand, and audience flow into a hand-built concept brief.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="22" x2="4" y2="2" />
        <path d="M4 3h13l-3 4 3 4H4" />
      </svg>
    ),
  },
  {
    name: "Quarry",
    kind: "Extract",
    stage: "trailhead",
    tagline: "Turn call recordings, transcripts, and PDFs into intake material for the brief.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l5-9 4 6 3-4 6 7" />
        <path d="M3 21h18" />
      </svg>
    ),
  },
  {
    name: "Tenor",
    kind: "Voice",
    stage: "switchbacks",
    tagline: "Distill brand voice from docs and transcripts. Lint new copy against it.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="13" rx="3" />
        <path d="M5 11v1a7 7 0 0 0 14 0v-1" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    name: "Campfire",
    kind: "Design",
    stage: "switchbacks",
    tagline: "Community spec: channels, rituals, rewards, moderation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17a3 3 0 0 0 3-3c0-1.66-.5-3-2.5-5.5C8 4.92 6 9.5 6 11.5a6 6 0 0 0 12 0c0-2.5-2.5-5-5-7-1 -.83-1.5-2.5-1-4.5" />
      </svg>
    ),
  },
  {
    name: "Forge",
    kind: "Build",
    stage: "treeline",
    tagline: "Projects in flight: backlogs, sessions, benchmarks. Every prompt tracked.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
        <path d="M17.64 15 22 10.64" />
        <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
      </svg>
    ),
  },
  {
    name: "Chisel",
    kind: "Audit",
    stage: "treeline",
    tagline: "Apple Human Interface Guidelines, applied automatically. Shapes UX to spec.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="9" width="20" height="6" rx="1" />
        <line x1="6" y1="9" x2="6" y2="13" />
        <line x1="10" y1="9" x2="10" y2="13" />
        <line x1="14" y1="9" x2="14" y2="13" />
        <line x1="18" y1="9" x2="18" y2="13" />
      </svg>
    ),
  },
  {
    name: "Scout",
    kind: "Quality",
    stage: "treeline",
    tagline: "Automated iPhone testing that walks every flow like a real user and brings back receipts.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="15" r="4" />
        <circle cx="17" cy="15" r="4" />
        <path d="M9 6l-2 5" />
        <path d="M15 6l2 5" />
        <path d="M9 6h6" />
      </svg>
    ),
  },
  {
    name: "Bedrock",
    kind: "Defense",
    stage: "treeline",
    tagline: "Solid foundations: vulnerable deps, leaked secrets, exposed PII.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    name: "Belay",
    kind: "Deal",
    stage: "treeline",
    tagline: "How we tie in together: engagement shape and economics, agreed in the open.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    name: "Sentinel",
    kind: "Health",
    stage: "ridgeline",
    tagline: "Deploy health across every shipped project: uptime, SSL, bundle drift.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: "Pulse",
    kind: "Metrics",
    stage: "ridgeline",
    tagline: "Community vitals: DAU, retention, streaks, events. Across every app.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    name: "Echo",
    kind: "Listen",
    stage: "ridgeline",
    tagline: "Unified feedback inbox: App Store, email, in-app, and chat in one stream.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    name: "Compass",
    kind: "Experience",
    stage: "ridgeline",
    tagline: "Compare our experience to the competition's, find where they out-execute us, and fix it.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    name: "Gauge",
    kind: "Flow",
    stage: "ridgeline",
    tagline: "The stream gauge for the business: time saved, money saved, hassle gone, revenue earned.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </svg>
    ),
  },
  {
    name: "Capstone",
    kind: "Showcase",
    stage: "ridgeline",
    tagline: "Case studies from the ridgeline: the stories that start the next climb.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.89" />
      </svg>
    ),
  },
  {
    name: "Vault",
    kind: "Secrets",
    stage: "pack",
    tagline: "Encrypted secrets, never in a config file, never in a chat.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    name: "Stoke",
    kind: "Energy",
    stage: "pack",
    tagline: "AI usage at a glance: session and weekly capacity. Know when to push or rest.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    name: "Codex",
    kind: "Memory",
    stage: "pack",
    tagline: "Searchable memory across every project, spec, and decision we've made.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    name: "Projects",
    kind: "Map",
    stage: "pack",
    tagline: "The trail map: every artifact from every tool, per project, ready to share.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
        <line x1="9" y1="3" x2="9" y2="19" />
        <line x1="15" y1="5" x2="15" y2="21" />
      </svg>
    ),
  },
];

export default function LabSection() {
  let toolNumber = 0;
  return (
    <div className="mt-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">
          Inside the Lab
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          Nineteen tools. Four stages. One climb.
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Every BRL app passes through here. We built each tool because we hit a
          bottleneck on the way and refused to slow down.
        </p>
      </div>

      <div className="space-y-12">
        {STAGE_GROUPS.map((group) => {
          const tools = TOOLS.filter((t) => t.stage === group.id);
          return (
            <div key={group.id} data-testid={`group-stage-${group.id}`}>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-5">
                <h4 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  {group.name}
                </h4>
                <p className="text-muted-foreground text-sm">{group.blurb}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool, i) => {
                  toolNumber += 1;
                  return (
                    <motion.div
                      key={tool.name}
                      data-testid={`card-tool-${tool.name.toLowerCase()}`}
                      className="p-6 rounded-2xl bg-background border border-border/60 hover:border-primary/30 transition-colors group"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-11 h-11 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors">
                          {tool.icon}
                        </div>
                        <div className="min-w-0">
                          <h5
                            className="font-bold text-base leading-tight"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {tool.name}
                          </h5>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                            {String(toolNumber).padStart(2, "0")} &middot; {tool.kind}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {tool.tagline}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-12 max-w-xl mx-auto leading-relaxed">
        The methodology is the product as much as the apps are.
      </p>
    </div>
  );
}
