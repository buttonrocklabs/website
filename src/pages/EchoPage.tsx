import { motion } from "framer-motion";
import { BlogNav, BlogFooter } from "@/pages/BlogIndex";
import { EchoFooterLinks, useEchoMeta } from "@/components/EchoDoc";
import echoIcon from "@/assets/images/echo-icon.svg";

/* The single switch for the call to action.
   null  = the page shows a "Coming soon to the Mac App Store" pill.
   a URL = the page shows Apple's unmodified Download on the Mac App Store badge linking to it.
   PLACEHOLDER: the real Mac App Store listing URL does not exist yet. Greg supplies it when the
   app is live; the badge file (public/echo/download-on-the-mac-app-store.svg, from Apple's
   marketing resources, black, US English) is added in the same follow-up change. */
export const MAC_APP_STORE_URL = null as string | null;

const BADGE_SRC = "/echo/download-on-the-mac-app-store.svg";

/* Real screenshots come from MR-178. Until src is set, a clearly marked placeholder frame shows. */
const SCREENSHOTS: Array<{ src: string | null; alt: string; caption: string }> = [
  { src: null, alt: "Echo recording a meeting with a live transcript", caption: "Record a meeting and watch the transcript fill in." },
  { src: null, alt: "Echo showing a meeting summary and action items", caption: "Get a summary and action items when it ends." },
  { src: null, alt: "Echo's library of past meetings", caption: "Find any past meeting in your library." },
];

const FEATURES = [
  { title: "Records both sides", body: "Your microphone and the audio from the call, captured together." },
  { title: "Live transcript", body: "Words appear as people speak, so you can follow along and stay in the conversation." },
  { title: "Remembers who is talking", body: "Name a speaker once and Echo labels their voice in later meetings." },
  { title: "Summary and action items", body: "A short summary and the follow-ups, written when the meeting ends." },
  { title: "Names and jargon", body: "Add a vocabulary list so people, products and acronyms come out spelled right." },
  { title: "Yours to keep", body: "Every meeting is saved on your Mac as Markdown plus audio. Export a transcript or summary anywhere." },
];

function StoreCta() {
  if (MAC_APP_STORE_URL) {
    return (
      <a
        href={MAC_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Echo on the Mac App Store"
        className="inline-block"
        data-testid="link-mac-app-store"
      >
        <img src={BADGE_SRC} alt="Download on the Mac App Store" className="h-12 w-auto" />
      </a>
    );
  }
  return (
    <span
      className="inline-flex items-center h-12 px-6 rounded-full border border-border bg-card text-foreground font-semibold text-sm"
      data-testid="pill-coming-soon"
    >
      Coming soon to the Mac App Store
    </span>
  );
}

function ScreenshotFrame({ src, alt, caption }: { src: string | null; alt: string; caption: string }) {
  return (
    <figure>
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden aspect-[16/10] flex items-center justify-center">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center px-4" role="img" aria-label={`Placeholder for a screenshot: ${alt}`}>
            <p className="text-[12px] font-semibold text-primary uppercase tracking-widest">Placeholder screenshot</p>
          </div>
        )}
      </div>
      <figcaption className="text-sm text-muted-foreground mt-3 leading-snug">{caption}</figcaption>
    </figure>
  );
}

export default function EchoPage() {
  useEchoMeta(
    "Echo, a meeting recorder for Mac | Button Rock Labs",
    "Echo records your meetings, writes the transcript and a summary, and keeps everything on your Mac. $19.99 one time, from the Mac App Store.",
    "https://buttonrocklabs.com/echo-og.png",
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BlogNav />

      <main className="flex-1">
        <motion.section
          className="pt-32 pb-16 md:pb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <img src={echoIcon} alt="Echo app icon" className="w-24 h-24 mx-auto mb-8" />
            <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">Echo for Mac</p>
            <h1
              className="text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] font-bold mb-6"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Record the meeting. Keep the notes.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Echo records both sides of a call, writes the transcript as people speak, and gives you a summary when it ends. Transcription, speaker memory and summaries all happen on your Mac.
            </p>
            <div className="flex justify-center mb-4">
              <StoreCta />
            </div>
            <p className="text-sm text-muted-foreground">$19.99 one time. Updates included.</p>
          </div>
        </motion.section>

        <section className="pb-16 md:pb-24" aria-label="Screenshots">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCREENSHOTS.map((s) => (
              <ScreenshotFrame key={s.caption} {...s} />
            ))}
          </div>
        </section>

        <section className="pb-16 md:pb-24" aria-labelledby="echo-features">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">What it does</p>
              <h2
                id="echo-features"
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Everything you need from a meeting
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-xl bg-card border border-border/60 p-6">
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28" aria-labelledby="echo-price">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-card border border-border/60 p-8">
              <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">Price</p>
              <h2 id="echo-price" className="text-4xl font-extrabold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                $19.99
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                One time, with updates included. Buy it on the Mac App Store.
              </p>
            </div>
            <div className="rounded-2xl bg-card border border-border/60 p-8">
              <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">Requirements</p>
              <ul className="space-y-2 text-foreground">
                <li>macOS 26 on a Mac with Apple silicon</li>
                <li>Internet the first time you open it, to download the speech models once</li>
                <li>A Mac that supports Apple Intelligence, for summaries</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <StoreCta />
          </div>
        </section>
      </main>

      <EchoFooterLinks />
      <BlogFooter />
    </div>
  );
}
