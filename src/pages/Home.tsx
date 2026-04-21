import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

/** Hero headlines — one is randomly selected on each page load */
const HERO_HEADLINES = [
  "Where community meets code.",
  "We build apps that bring people together.",
  "Community platforms for what matters.",
  "Your people. Your platform.",
];

import heroBg from "@/assets/images/hero-bg.png";
import projectSober from "@/assets/images/project-sober.png";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-testid="nav-header"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/50 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2.5 group" data-testid="link-home">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
            </svg>
          </div>
          <span className="text-lg tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            <span className="font-bold">Button Rock</span>{" "}
            <span className="font-semibold text-primary">Labs</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "About", href: "#about" },
            { label: "What We Do", href: "#services" },
            { label: "Portfolio", href: "#portfolio" },
            { label: "Support", href: "#support" },
            { label: "Contact", href: "#contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`link-${link.label.toLowerCase()}`}
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          data-testid="button-mobile-menu"
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8"/>
                <line x1="4" y1="16" x2="20" y2="16"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
        >
          <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {[
              { label: "About", href: "#about" },
              { label: "What We Do", href: "#services" },
              { label: "Portfolio", href: "#portfolio" },
              { label: "Support", href: "#support" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest py-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Pick a random headline once on mount
  const [headline] = useState(
    () => HERO_HEADLINES[Math.floor(Math.random() * HERO_HEADLINES.length)]
  );

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="w-full h-[120%] object-cover opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </motion.div>

      <motion.div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-primary/10 text-[12px] font-semibold text-secondary-foreground mb-8 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Colorado Front Range
          </div>
        </motion.div>

        <motion.h1
          className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] max-w-3xl mb-8"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {headline}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          We design and ship native mobile platforms that turn shared interests
          into real connection. Built on the Front Range, deployed everywhere.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a
            href="#portfolio"
            data-testid="button-explore-work"
            className="inline-flex items-center justify-center h-13 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            See our work
          </a>
          <a
            href="#contact"
            data-testid="button-contact-hero"
            className="inline-flex items-center justify-center h-13 px-8 rounded-full border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Original IP",
    desc: "We build unique apps from scratch — not white-label clones.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Human First",
    desc: "Interfaces designed for real people, not spec sheets.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
      </svg>
    ),
    title: "Built to Last",
    desc: "Reliable, tested architecture that scales with your needs.",
  },
];

function Philosophy() {
  return (
    <section id="about" className="py-28 bg-card border-y border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">About</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Built by a founder who ships
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Greg is the founder of Button Rock Labs. He's spent three decades shipping products across telecom, healthcare tech, and fintech — most recently seven years as CEO of iVitaFi, a patient financing platform reaching 400+ healthcare locations nationwide. He builds for real people, not spec sheets, and his best teams have always moved with a bias toward action.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                data-testid={`card-feature-${i}`}
                className="p-6 rounded-2xl bg-background border border-border/60 hover:border-primary/20 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/15 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-1.5" style={{ fontFamily: "var(--font-display)" }}>{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-28">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">Our Approach</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>
            What We Do
          </h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Button Rock Labs is a product studio. We build and ship our own apps in healthcare, wellness, behavioral health, and lifestyle — categories where real user behavior is the only thing that matters.
            </p>
            <p>
              Every product starts from a real community and gets tailored to that audience. We move with a bias toward action, test against actual users early, and build for the person on the other end of the screen — not the spec sheet.
            </p>
            <p>
              Our team has spent three decades shipping products in regulated markets, including telecom, healthcare technology, and fintech. That background shapes how we approach trust, privacy, and the long arc of what it takes to get a product into someone's daily life.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="portfolio" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            What we've built
          </h2>
          <p className="text-muted-foreground text-lg">
            Real platforms, live users, shipped to the App Store. Every product starts from our community engine and gets tailored to its audience.
          </p>
        </div>

        <div>
          {/* Sober Motivation */}
          <motion.div
            data-testid="card-project-sober"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden border border-border/50 group aspect-[4/3]">
              <img
                src={projectSober}
                alt="Sober Motivation App"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wider mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Published
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Sober Motivation
              </h3>
              <p className="text-primary text-sm font-medium mb-4">
                The modern platform for growth beyond sobriety.
              </p>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                A full-stack native community platform built for people in alcohol recovery. Not a tracker. Not a crisis tool. A daily-use app where people connect, grow, and build lives they don't need to escape from. Live on the App Store with an active user base and 250K+ podcast audience driving growth.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                {["Sober Vitals dashboard", "Live community meetings", "AI-powered journaling", "Curated community channels", "Voice messaging & DMs", "Challenge & coin system", "Personalized home screen", "Push notification engine"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                React · TypeScript · Node.js · PostgreSQL · Capacitor iOS · RevenueCat
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Support() {
  return (
    <section id="support" className="py-28 bg-card border-y border-border/40">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">Support</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Need help with your app or design?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Already working with us, or running into trouble with a BRL-built app or design engagement? Reach out and we'll get back to you quickly.
          </p>
          <a
            href="mailto:greg@buttonrocklabs.com?subject=Support%20Request"
            data-testid="button-support"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-foreground text-background py-24">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ready to build something human?
          </h2>
          <p className="text-background/70 text-lg mb-10 leading-relaxed">
            Reach out directly — we'd love to hear what you're working on.
          </p>
          <a
            href="mailto:greg@buttonrocklabs.com"
            data-testid="button-contact"
            className="inline-flex items-center gap-2 h-14 px-10 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get in Touch
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>

          <div className="mt-12 text-background/80 text-sm leading-relaxed">
            <p className="font-semibold text-background mb-1 flex items-center justify-center gap-2">
              <span>Greg Falconer, Founder</span>
              <a
                href="https://www.linkedin.com/in/gregfalconer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Greg Falconer on LinkedIn"
                data-testid="link-linkedin-greg"
                className="inline-flex items-center justify-center w-6 h-6 rounded text-background/70 hover:text-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </p>
            <p>
              <a href="mailto:greg@buttonrocklabs.com" className="text-primary hover:opacity-80 transition-opacity">
                greg@buttonrocklabs.com
              </a>
            </p>
            <p>
              <a
                href="tel:+12148088630"
                aria-label="Call Button Rock Labs"
                className="text-primary hover:opacity-80 transition-opacity"
              >
                (214) 808-8630
              </a>
            </p>
            <p className="text-background/60">240 Leon's Pl., Lyons, CO 80540</p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-background/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 2 15H2L8 3z"/>
            </svg>
            <span className="text-sm" style={{ fontFamily: "var(--font-display)" }}>
              <span className="font-bold">Button Rock</span>{" "}
              <span className="font-semibold" style={{ color: "hsl(var(--primary))" }}>Labs</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-background/50">
            <Link to="/privacy" className="hover:text-background/80 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-background/80 transition-colors">Terms of Use</Link>
            <span>&copy; {new Date().getFullYear()} Button Rock Labs, LLC. A Colorado limited liability company.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <Hero />
      <Philosophy />
      <Services />
      <Products />
      <Support />
      <ContactCTA />
    </div>
  );
}