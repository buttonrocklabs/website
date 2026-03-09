import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mountain, Code2, Users, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroBg from "@/assets/images/hero-bg.png";
import projectSober from "@/assets/images/project-sober.png";
import projectSendIt from "@/assets/images/project-sendit.png";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground">
              <Mountain size={18} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              Button Rock <span className="text-primary">Labs</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Philosophy</a>
            <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Our Work</a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
          <Button className="hidden md:flex gap-2 rounded-full" size="sm">
            Let's Talk <ChevronRight size={16} />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none">
          <img 
            src={heroBg} 
            alt="Colorado foothills abstract" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold mb-6 border border-primary/10">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Based in Lyons, CO
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] tracking-tight mb-8 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Software built from a <br/>
              <span className="text-primary relative inline-block">
                human approach.
                <svg className="absolute -bottom-2 w-full left-0 text-primary opacity-30" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6C65 -1 135 -1 198 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We design, develop, and launch original B2B SaaS solutions. 
              Inspired by the resilience of the Colorado foothills, we craft digital 
              experiences that people actually enjoy using.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button size="lg" className="rounded-full px-8 text-base h-14" asChild>
                <a href="#projects">Explore Our Work</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-14" asChild>
                <a href="#about">Our Philosophy</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy / About Section */}
      <section id="about" className="py-24 bg-card border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The "Button Rock" Ethos</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Named after the beautiful state park near our Lyons, CO headquarters, 
                our name carries a double entendre. It nods to the "button" on a keyboard 
                or in a lab, while the "rock" grounds us in our rugged, outdoorsy location.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Most enterprise software is built for corporations, not the humans who 
                work for them. We're changing that. We build original IP with a relentless 
                focus on intuitive design, human psychology, and reliable engineering.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Code2, title: "Original IP", desc: "Developing unique SaaS products from the ground up." },
                { icon: Users, title: "Human First", desc: "Interfaces designed for real people, not just spec sheets." },
                { icon: Mountain, title: "Built to Last", desc: "Reliable, tested, and robust engineering architecture." },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  className={`p-6 rounded-2xl bg-background border border-border/50 shadow-sm ${i === 2 ? 'sm:col-span-2' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">
              Software we've designed, built, and launched. Available for acquisition or partnership.
            </p>
          </div>

          <div className="space-y-24">
            {/* Project 1: Sober Motivation */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 group bg-card aspect-[4/3] flex items-center justify-center">
                <img 
                  src={projectSober} 
                  alt="Sober Motivation App" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-4 dark:bg-blue-900/30 dark:text-blue-300">
                  Published
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Sober Motivation</h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  A comprehensive companion for the sobriety journey. This app connects people with an online 
                  audience for group meetings or individual coaching. Users can log sober days, journal their 
                  thoughts, and visualize their real progress over time.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Community group meetings', '1-on-1 coaching platform', 'Sobriety streak tracking', 'Daily journaling'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <ChevronRight size={12} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="rounded-full">View Case Study</Button>
              </div>
            </motion.div>

            {/* Project 2: Send It */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-4 dark:bg-orange-900/30 dark:text-orange-300">
                  In Beta Development
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Send It</h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  The social network built specifically for climbers. "Send It" celebrates the adventure side of climbing, 
                  combining route discovery with deep activity tracking—similar to Strava but tailored for the crag.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Approach & descent hike stats', 'GPS/Topo map integration', 'Mountain Project integration', 'Climber social feed & DMs'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <ChevronRight size={12} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="rounded-full">Join Beta Waitlist</Button>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 group bg-card aspect-[4/3] flex items-center justify-center">
                <img 
                  src={projectSendIt} 
                  alt="Send It App" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer id="contact" className="bg-foreground text-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <img 
            src={heroBg} 
            alt="Texture" 
            className="w-full h-full object-cover filter grayscale mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to build something human?</h2>
            <p className="text-background/80 text-lg mb-10">
              Whether you're looking to acquire our existing IP or partner on a custom software solution, 
              we'd love to chat. Based in the foothills of Colorado, building for the world.
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 border-0">
              Get in Touch <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
          
          <div className="mt-20 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Mountain size={20} className="text-primary" />
              <span className="font-display font-bold tracking-tight">
                Button Rock <span className="text-primary">Labs</span>
              </span>
            </div>
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} Button Rock Labs. Lyons, Colorado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
