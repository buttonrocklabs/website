import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function PrivacyNav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/85 backdrop-blur-xl border-b border-border/50 py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 2 15H2L8 3z" />
            </svg>
          </div>
          <span className="text-lg tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            <span className="font-bold">Button Rock</span>{" "}
            <span className="font-semibold text-primary">Labs</span>
          </span>
        </Link>
        <Link
          to="/"
          className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
        >
          Back to site
        </Link>
      </div>
    </header>
  );
}

function Section({ eyebrow, heading, children }: { eyebrow?: string; heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      {eyebrow && (
        <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-3">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
        {heading}
      </h2>
      <div className="text-muted-foreground text-base leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PrivacyNav />

      <motion.main
        className="flex-1 pt-32 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">Privacy Policy</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
            How we handle your information and your ideas
          </h1>
          <p className="text-muted-foreground text-lg mb-16 leading-relaxed">
            Button Rock Labs, LLC, a Colorado limited liability company ("Button Rock Labs," "we," "us," or "our"), is a custom app development studio based in Lyons, Colorado. This policy describes what we do with information you share with us and how we treat client work.
          </p>

          <Section heading="Our commitment">
            <p>
              We are a custom app development studio. Any ideas, concepts, designs, business plans, or technical details you share with us — whether in an initial inquiry, a discovery call, or an active engagement — are held in confidence.
            </p>
            <p>
              We do not discuss, share, or reference client ideas or concepts outside of Button Rock Labs without your explicit permission and instruction. This applies before, during, and after any engagement.
            </p>
          </Section>

          <Section heading="Information we collect on this site">
            <p>
              This is a marketing website. We collect only what you voluntarily send us — typically an email to <a href="mailto:greg@buttonrocklabs.com" className="text-primary hover:opacity-80 transition-opacity">greg@buttonrocklabs.com</a> or <a href="mailto:info@buttonrocklabs.com" className="text-primary hover:opacity-80 transition-opacity">info@buttonrocklabs.com</a>.
            </p>
            <p>
              Standard server logs may record your IP address and basic request information for operational and security purposes. We do not use analytics, tracking pixels, or advertising cookies on this site.
            </p>
          </Section>

          <Section heading="What we don't do">
            <p>
              We don't sell, rent, or share your personal information with third parties. We don't use tracking beyond what's needed to serve the site. We don't publish client work as portfolio examples without written permission.
            </p>
          </Section>

          <Section heading="Client work confidentiality">
            <p>
              When we work together, everything you share — ideas, designs, code, roadmaps, business discussions — stays confidential. We don't repurpose your work for other clients, and we don't showcase it publicly unless you've asked us to.
            </p>
            <p>
              If you'd like us to feature a project in our portfolio, it happens only by written agreement and at the level of detail you approve.
            </p>
          </Section>

          <Section heading="App privacy policies">
            <p>
              Button Rock Labs ships mobile apps to the App Store, including Sober Motivation. Each published app has its own privacy policy covering the data that app collects and processes. App-specific privacy policies are linked from each app's App Store listing.
            </p>
          </Section>

          <Section eyebrow="BRL Lab + tools" heading="Information we process when you use BRL apps">
            <p>
              In addition to the marketing site above, Button Rock Labs operates a small ecosystem of web tools for clients and partners — the Lab (<a href="https://lab.buttonrocklabs.com" className="text-primary hover:opacity-80 transition-opacity">lab.buttonrocklabs.com</a>) and per-app subdomains such as Vision Board (<a href="https://visionboard.buttonrocklabs.com" className="text-primary hover:opacity-80 transition-opacity">visionboard.buttonrocklabs.com</a>). When you sign in to one of these tools, we process the following:
            </p>
            <p>
              <strong className="text-foreground">Identity.</strong> Your email, name, and (if you sign in via Google) your Google profile information, supplied through our authentication provider Clerk. We do not store passwords ourselves.
            </p>
            <p>
              <strong className="text-foreground">Application data.</strong> The minimum needed to run the tool you're using — for Vision Board this means Google Sheet IDs, sheet metadata, and image references. We never read or store the contents of your Sheet beyond what's required to render it back to you.
            </p>
            <p>
              <strong className="text-foreground">Uploaded files.</strong> Images you upload through Vision Board (or similar tools) are stored on Cloudflare R2 under a per-user prefix and served back to you through Cloudflare's CDN. Existing Vision Board images that were originally uploaded to your Google Drive remain in your Drive — we don't move them on your behalf.
            </p>
            <p>
              <strong className="text-foreground">Operational logs.</strong> Standard request and error logs are kept for short-term debugging and security purposes. We don't run analytics, tracking pixels, or advertising tooling on these tools.
            </p>
          </Section>

          <Section heading="Sub-processors">
            <p>
              For the Lab and connected app tools we rely on a small number of trusted infrastructure providers:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Clerk</strong> — authentication, session management, and user records.</li>
              <li><strong className="text-foreground">Cloudflare</strong> — application hosting (Pages + Workers), the D1 database, and R2 object storage for images.</li>
              <li><strong className="text-foreground">Google</strong> — only when you explicitly authorize Google Sheets access for a tool like Vision Board. We request the narrowest scope needed (read/write to Sheets you authorize); we no longer request Drive scopes.</li>
            </ul>
          </Section>

          <Section heading="Retention &amp; your data rights">
            <p>
              Identity and application records (in our database) persist until you ask us to delete your account. Images stored in R2 persist until the corresponding sheet entry is removed.
            </p>
            <p>
              You can request export or deletion of your data at any time by emailing <a href="mailto:greg@buttonrocklabs.com" className="text-primary hover:opacity-80 transition-opacity">greg@buttonrocklabs.com</a>. We'll confirm and complete the request within a reasonable window.
            </p>
          </Section>

          <Section heading="Contact us">
            <p>
              Privacy questions or requests related to this site or our engagements:
            </p>
            <p className="not-italic">
              <strong className="text-foreground">Greg Falconer, Founder</strong><br />
              Button Rock Labs, LLC<br />
              240 Leon's Pl., Lyons, CO 80540<br />
              <a href="mailto:greg@buttonrocklabs.com" className="text-primary hover:opacity-80 transition-opacity">greg@buttonrocklabs.com</a><br />
              <a href="tel:+12148088630" aria-label="Call Button Rock Labs" className="text-primary hover:opacity-80 transition-opacity">(214) 808-8630</a>
            </p>
          </Section>

          <div className="pt-8 border-t border-border/40 text-xs text-muted-foreground">
            Last updated: April 2026
          </div>
        </div>
      </motion.main>

      <footer className="bg-foreground text-background py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 2 15H2L8 3z" />
            </svg>
            <span className="text-sm" style={{ fontFamily: "var(--font-display)" }}>
              <span className="font-bold">Button Rock</span>{" "}
              <span className="font-semibold" style={{ color: "hsl(var(--primary))" }}>Labs</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-background/50">
            <span>Privacy Policy</span>
            <Link to="/terms" className="hover:text-background/80 transition-colors">Terms of Use</Link>
            <span>&copy; {new Date().getFullYear()} Button Rock Labs, LLC. A Colorado limited liability company.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
