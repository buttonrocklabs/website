import { useEffect } from "react";
import ClipPlayer from "@/components/ClipPlayer";
import { BlogNav, BlogFooter } from "@/pages/BlogIndex";

/* /signal-fire: unlisted partner showcase. No nav link, no sitemap entry,
   noindex meta here plus an X-Robots-Tag header in public/_headers.
   Clips live in public/signal-fire/ (720x1280, H.264, AAC). */

type Clip = {
  id: string;
  file: string; // basename without extension in /signal-fire/
  title: string;
  length: string;
  who?: string; // host label as shown in the clip
  hook: string;
  takeaway: string;
  dramatization?: boolean;
};

type Stage = {
  n: number;
  date: string;
  title: string;
  tried: string;
  learned: string;
  clips: Clip[];
  note?: string;
};

const STAGES: Stage[] = [
  {
    n: 1,
    date: "Sep 30, 2026",
    title: "Proof of concept",
    tried:
      "Could we make usable clips from what the app and the podcast already have? No paid tools, no actors, no invented testimonials. Real words and real screens only.",
    learned:
      "Yes. The first clip in each template took from 25 minutes to about 2.5 hours. The next one in the same template is a copy change and a re-render, about 5 to 15 minutes. The music is composed in code, so nothing needs a license.",
    clips: [
      {
        id: "s1-app-store-review",
        file: "s1-app-store-review",
        title: "App Store review",
        length: "18 s",
        hook: "“I have been on several different sobriety apps...”",
        takeaway:
          "A word-for-word 5-star review with the name withheld, over app artwork. Tests whether a review that names features gets taps.",
      },
      {
        id: "s1-app-in-20-seconds",
        file: "s1-app-in-20-seconds",
        title: "The app in 20 seconds",
        length: "25 s",
        hook: "“Every sober day, counted.”",
        takeaway:
          "The real app on a demo account: day count, money saved, a daily prompt, meetings, community. Tests whether showing the product beats a story or a review.",
      },
    ],
    note: "A podcast moment clip from this round is not shown here. Podcast guests are not hosts, and each guest needs to say yes first.",
  },
  {
    n: 2,
    date: "Oct 4, 2026",
    title: "Round 2, different hooks",
    tried:
      "Same formats, new openings. We changed the first line of each clip to see which hooks are worth testing first.",
    learned:
      "A new hook is a copy change, so a round fits in a day. We now have two openings for each format to compare once we post.",
    clips: [
      {
        id: "s2-review-daily-motivation",
        file: "s2-review-daily-motivation",
        title: "App Store review",
        length: "19 s",
        hook: "“This app is exactly what I was looking for.”",
        takeaway:
          "Another word-for-word 5-star review, name withheld. This one leads with a single line about daily motivation.",
      },
      {
        id: "s2-app-money-journal",
        file: "s2-app-money-journal",
        title: "Money and a journal line",
        length: "24 s",
        hook: "“What would you do with the money you keep?”",
        takeaway:
          "The app on a demo account. Opens with a question about money saved, then one journal line about today.",
      },
    ],
    note: "The podcast moment clip from this round is also left off this page for the same reason.",
  },
  {
    n: 3,
    date: "Oct 4, 2026",
    title: "Testing an ad structure",
    tried:
      "A text-thread skit built on a proven ad structure: a short exchange between two friends that ends on the app.",
    learned:
      "Scripted clips need a clear label. This one says Dramatization on screen during the conversation, and the app appears only at the end.",
    clips: [
      {
        id: "s3-text-thread-skit",
        file: "s3-text-thread-skit",
        title: "Text-thread skit",
        length: "23 s",
        hook: "“you ok? last night got rough”",
        takeaway:
          "A scripted text conversation with fictional names. Tests whether this structure holds attention for the same app message.",
        dramatization: true,
      },
    ],
  },
  {
    n: 4,
    date: "Oct 4, 2026",
    title: "Real hosts, real words",
    tried:
      "Five clips cut from real host video already in the app. Each person's own voice carries the clip, with a quiet original music bed under it. The words are verbatim, and nothing is cloned or added.",
    learned:
      "The words and voices already exist in the app, so nothing has to be invented. We checked the captions against the transcripts. A person still needs to listen to every clip with sound before anything is posted.",
    clips: [
      {
        id: "s4-shelby",
        file: "s4-shelby",
        title: "Shelby",
        who: "Shelby, SM host",
        length: "25 s",
        hook: "“You stop saying, I’m not drinking, and you start saying, I don’t drink.”",
        takeaway: "Angle: the wording you use about drinking. Two cuts from one video.",
      },
      {
        id: "s4-todd",
        file: "s4-todd",
        title: "Todd",
        who: "Todd, SM member story",
        length: "27 s",
        hook: "“If you would have told me two weeks before I quit...”",
        takeaway:
          "Angle: a member looking back. One uncut passage from a speaker-meeting story. The source video is low resolution.",
      },
      {
        id: "s4-gabe",
        file: "s4-gabe",
        title: "Gabe",
        who: "Gabe, SM host",
        length: "28 s",
        hook: "“Life does not stop when alcohol leaves the picture.”",
        takeaway: "Angle: ask what you have gained, and be specific. Two cuts from one video.",
      },
      {
        id: "s4-jb",
        file: "s4-jb",
        title: "JB",
        who: "JB, SM host",
        length: "29 s",
        hook: "“Somebody’s going to ask you why you’re not drinking.”",
        takeaway: "Angle: answering social pressure with a short, complete sentence. Two cuts from one video.",
      },
      {
        id: "s4-brandi",
        file: "s4-brandi",
        title: "Brandi",
        who: "Brandi, SM host",
        length: "25 s",
        hook: "“Your calendar used to have people in it.”",
        takeaway: "Angle: loneliness. The source video is dim and grainy, the weakest picture of the five.",
      },
    ],
  },
];

function ClipCard({ clip }: { clip: Clip }) {
  return (
    <article className="flex flex-col gap-3 p-4 rounded-2xl bg-card border border-border/60 min-w-0">
      <ClipPlayer
        src={`/signal-fire/${clip.file}.mp4`}
        poster={`/signal-fire/${clip.file}.jpg`}
        label={`${clip.title}, ${clip.length}`}
      />
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] uppercase tracking-widest text-muted-foreground">
        <span>{clip.length}</span>
        {clip.who && (
          <>
            <span className="opacity-50">&middot;</span>
            <span>{clip.who}</span>
          </>
        )}
        {clip.dramatization && (
          <span className="ml-1 px-2 py-0.5 rounded-full border border-border text-accent-foreground normal-case tracking-normal">
            Dramatization
          </span>
        )}
      </div>
      <h4 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
        {clip.title}
      </h4>
      <p className="text-sm text-foreground leading-relaxed">
        <span className="text-[12px] font-semibold text-primary uppercase tracking-widest block mb-1">
          Hook line
        </span>
        {clip.hook}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">{clip.takeaway}</p>
    </article>
  );
}

export default function SignalFire() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Signal Fire | Button Rock Labs";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      meta.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <BlogNav />
      <main className="max-w-5xl mx-auto px-6 pt-36 pb-24">
        <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">
          Signal Fire &middot; Button Rock Labs
        </p>
        <h1
          className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] font-extrabold mb-5 max-w-3xl"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          Four rounds of clips, from first test to real hosts.
        </h1>
        <div className="max-w-3xl flex flex-col gap-4 mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Signal Fire is the content engine inside the Button Rock Labs Lab. It turns real
            recordings and real app screens into short vertical clips with original music. A round
            of clips takes about a day to build. The pilot is Sober Motivation.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every clip below is a draft for an organic test. Nothing has been posted yet, so there
            are no results to show. This page shows how the clips changed from round to round, and
            you can play every one.
          </p>
        </div>

        <ol className="flex flex-col gap-14">
          {STAGES.map((stage) => (
            <li
              key={stage.n}
              className="relative pl-6 sm:pl-8 border-l border-border"
              data-testid={`stage-${stage.n}`}
            >
              <span
                className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[12px] font-bold flex items-center justify-center"
                aria-hidden="true"
              >
                {stage.n}
              </span>
              <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-2">
                Stage {stage.n} &middot; {stage.date}
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold mb-5"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                {stage.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-3xl">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    What we tried
                  </p>
                  <p className="text-sm leading-relaxed">{stage.tried}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    What we learned
                  </p>
                  <p className="text-sm leading-relaxed">{stage.learned}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {stage.clips.map((clip) => (
                  <ClipCard key={clip.id} clip={clip} />
                ))}
              </div>
              {stage.note && (
                <p className="text-sm text-muted-foreground leading-relaxed mt-4 max-w-3xl">
                  {stage.note}
                </p>
              )}
            </li>
          ))}

          <li className="relative pl-6 sm:pl-8 border-l border-dashed border-border" data-testid="stage-5">
            <span
              className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-card border border-border text-muted-foreground text-[12px] font-bold flex items-center justify-center"
              aria-hidden="true"
            >
              5
            </span>
            <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-2">
              Stage 5 &middot; In progress
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Next: animated photo for audio-only hosts
            </h2>
            <div className="p-5 rounded-2xl bg-card border border-border/60 max-w-3xl">
              <p className="text-sm leading-relaxed">
                Some hosts only have audio in the app. We are running a test of a labeled,
                AI-animated talking photo for them. It is in progress and there is no clip to show
                yet.
              </p>
            </div>
          </li>
        </ol>

        <p className="text-sm text-muted-foreground leading-relaxed mt-16 pt-6 border-t border-border/50 max-w-3xl">
          Clips with a scripted conversation are labeled as dramatizations. Every host who appears
          in these clips has agreed to appear.
        </p>
      </main>
      <BlogFooter />
    </div>
  );
}
