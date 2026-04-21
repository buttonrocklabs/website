import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function TermsNav() {
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

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
        {heading}
      </h2>
      <div className="text-muted-foreground text-base leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

export default function Terms() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Terms of Use | Button Rock Labs";
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const prevDesc = meta?.content;
    let created = false;
    let el = meta;
    if (!el) {
      el = document.createElement("meta");
      el.name = "description";
      document.head.appendChild(el);
      created = true;
    }
    el.content = "Terms of Use for buttonrocklabs.com, operated by Button Rock Labs, LLC.";
    return () => {
      document.title = prevTitle;
      if (created) el?.remove();
      else if (el && prevDesc !== undefined) el.content = prevDesc;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TermsNav />

      <motion.main
        className="flex-1 pt-32 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">Terms of Use</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
            Terms of Use
          </h1>
          <p className="text-muted-foreground text-lg mb-16 leading-relaxed">
            Effective Date: April 21, 2026
          </p>

          <Section heading="1. Acceptance of Terms">
            <p>
              By accessing or using buttonrocklabs.com (the "Site"), you agree to these Terms of Use. If you do not agree, do not use the Site.
            </p>
          </Section>

          <Section heading="2. About Us">
            <p>
              The Site is operated by Button Rock Labs, LLC, a Colorado limited liability company ("Button Rock Labs," "we," "us," or "our").
            </p>
          </Section>

          <Section heading="3. Use of the Site">
            <p>
              You may use the Site for lawful, personal, non-commercial purposes. You agree not to: (a) use the Site in any way that violates applicable law; (b) attempt to gain unauthorized access to any portion of the Site; (c) interfere with or disrupt the Site; or (d) scrape, harvest, or otherwise extract data from the Site by automated means without our written permission.
            </p>
          </Section>

          <Section heading="4. Intellectual Property">
            <p>
              All content on the Site — including text, graphics, logos, and software — is owned by Button Rock Labs or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our prior written consent.
            </p>
          </Section>

          <Section heading="5. Our Apps">
            <p>
              Products developed by Button Rock Labs (including mobile apps distributed through the Apple App Store or Google Play) are governed by their own end-user license agreements and the store's terms. These Terms of Use apply only to the Site.
            </p>
          </Section>

          <Section heading="6. Disclaimers">
            <p>
              The Site is provided "as is" and "as available." We make no warranties, express or implied, regarding the Site, including any warranty of merchantability, fitness for a particular purpose, or non-infringement. Your use of the Site is at your sole risk.
            </p>
          </Section>

          <Section heading="7. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Button Rock Labs will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site.
            </p>
          </Section>

          <Section heading="8. Third-Party Links">
            <p>
              The Site may contain links to third-party websites. We are not responsible for the content, policies, or practices of any third party.
            </p>
          </Section>

          <Section heading="9. Changes to These Terms">
            <p>
              We may update these Terms of Use from time to time. Changes take effect when posted on this page. Continued use of the Site after changes are posted constitutes acceptance of the revised terms.
            </p>
          </Section>

          <Section heading="10. Governing Law">
            <p>
              These Terms of Use are governed by the laws of the State of Colorado, without regard to its conflict of laws principles. Any dispute arising from these terms or the Site will be resolved in the state or federal courts located in Boulder County, Colorado.
            </p>
          </Section>

          <Section heading="11. Contact Us">
            <p>Questions about these Terms of Use can be directed to:</p>
            <p className="not-italic">
              <strong className="text-foreground">Button Rock Labs, LLC</strong><br />
              240 Leon's Pl., Lyons, CO 80540<br />
              <a href="mailto:greg@buttonrocklabs.com" className="text-primary hover:opacity-80 transition-opacity">greg@buttonrocklabs.com</a><br />
              <a href="tel:+12148088630" aria-label="Call Button Rock Labs" className="text-primary hover:opacity-80 transition-opacity">(214) 808-8630</a>
            </p>
          </Section>
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
            <Link to="/privacy" className="hover:text-background/80 transition-colors">Privacy Policy</Link>
            <span>Terms of Use</span>
            <span>&copy; {new Date().getFullYear()} Button Rock Labs, LLC. A Colorado limited liability company.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
