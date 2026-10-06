import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BlogNav, BlogFooter } from "@/pages/BlogIndex";

export const ECHO_SUPPORT_EMAIL = "support@buttonrocklabs.com";

/* Sets document.title, the description meta and the og/twitter title, description and image
   for the life of the page (client side only, same pattern as Terms.tsx). Scrapers that do not
   run JavaScript still read the site-wide tags in index.html. */
export function useEchoMeta(title: string, description: string, ogImage?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const targets: Array<[string, string]> = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
    ];
    if (ogImage) {
      targets.push(
        ['meta[property="og:image"]', ogImage],
        ['meta[property="og:image:secure_url"]', ogImage],
        ['meta[name="twitter:image"]', ogImage],
      );
    }

    const restores: Array<() => void> = [];
    for (const [selector, value] of targets) {
      const el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) continue;
      const prev = el.content;
      el.content = value;
      restores.push(() => {
        el.content = prev;
      });
    }

    return () => {
      document.title = prevTitle;
      restores.forEach((r) => r());
    };
  }, [title, description, ogImage]);
}

export function EchoFooterLinks() {
  return (
    <nav
      aria-label="Echo"
      className="border-t border-border/40 py-6"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <Link to="/echo/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
          Echo Privacy
        </Link>
        <Link to="/echo/support" className="text-muted-foreground hover:text-foreground transition-colors">
          Echo Support
        </Link>
      </div>
    </nav>
  );
}

export function EchoSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
        {heading}
      </h2>
      <div className="text-muted-foreground text-base leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

export const echoLinkClass = "text-primary hover:opacity-80 transition-opacity break-words";

export function EchoDocPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BlogNav />
      <motion.main
        className="flex-1 pt-32 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">{eyebrow}</p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            {title}
          </h1>
          <p className="text-muted-foreground text-lg mb-16 leading-relaxed">{intro}</p>
          {children}
        </div>
      </motion.main>
      <EchoFooterLinks />
      <BlogFooter />
    </div>
  );
}
