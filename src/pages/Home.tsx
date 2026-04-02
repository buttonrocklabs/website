import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Hero headlines — one is randomly selected on each page load */
const HERO_HEADLINES = [
  "Where community meets code.",
  "We build apps that bring people together.",
  "Community platforms for what matters.",
  "Your people. Your platform.",
];

import heroBg from "@/assets/images/hero-bg.png";
import projectSober from "@/assets/images/project-sober.png";
import projectSendIt from "@/assets/images/project-sendit.png";

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
            { label: "Services", href: "#services" },
            { label: "Portfolio", href: "#portfolio" },
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
              { label: "Services", href: "#services" },
              { label: "Portfolio", href: "#portfolio" },
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
            <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">Our Ethos</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              The "Button Rock" Philosophy
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Named after the beautiful state park near our Lyons, CO headquarters,
              our name carries a double meaning. The "button" nods to keys on a keyboard
              or controls in a lab, while the "rock" grounds us in our rugged, outdoorsy Colorado roots.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Most enterprise software is built for corporations, not the humans who
              use it every day. We're changing that. We build original IP with a relentless
              focus on intuitive design, human psychology, and solid engineering.
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
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Services
          </h2>
        </div>
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

        <div className="space-y-32">
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

          {/* Send It */}
          <motion.div
            data-testid="card-project-sendit"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[11px] font-semibold uppercase tracking-wider mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                In Development
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Send It
              </h3>
              <p className="text-primary text-sm font-medium mb-4">
                A social network built for climbers.
              </p>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                Route discovery, topo maps, GPS tracking, and a social feed designed around the climbing community. Built on the same community engine as Sober Motivation — proving the platform scales across verticals.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                {["Route discovery & topos", "GPS trail tracking", "Social feed & DMs", "Climbing community channels"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Coming 2026 · Colorado Front Range beta
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-border/50 group aspect-[4/3]">
              <img
                src={projectSendIt}
                alt="Send It Climbing App"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>
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
            Whether you're looking to acquire existing IP or partner on a custom solution,
            we'd love to connect. Based in the foothills of Colorado, building for the world.
          </p>
          <a
            href="mailto:info@buttonrocklabs.com"
            data-testid="button-contact"
            className="inline-flex items-center gap-2 h-14 px-10 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get in Touch
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
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
          <p className="text-xs text-background/50">
            &copy; {new Date().getFullYear()} Button Rock Labs, LLC. Lyons, Colorado.
          </p>
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
      <ContactCTA />
    </div>
  );
}