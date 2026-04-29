import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import { posts, formatDate } from "@/lib/posts";

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-background">
      <BlogNav />

      <section className="pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">
              Field Notes
            </p>
            <h1
              className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-bold mb-6"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Writing from the Lab.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Notes from building real products in an AI-native era. Methodology, mistakes,
              and the bottlenecks we hit on the way to shipping.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="border-t border-border/50">
            {posts.length === 0 && (
              <p className="py-16 text-muted-foreground text-center">
                No posts yet. Check back soon.
              </p>
            )}
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  data-testid={`link-post-${post.slug}`}
                  className="block py-10 border-b border-border/50 group"
                >
                  <div className="flex items-center gap-3 mb-3 text-[12px] uppercase tracking-widest text-muted-foreground">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.readingTime && (
                      <>
                        <span className="opacity-50">·</span>
                        <span>{post.readingTime}</span>
                      </>
                    )}
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary uppercase tracking-widest">
                    Read
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BlogFooter />
    </div>
  );
}

/* Minimal nav for blog pages — logo + back-to-home, no section anchors. */
export function BlogNav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/85 backdrop-blur-xl border-b border-border/50 py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5 group" data-testid="link-home">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105 text-white">
            <BrandMark size={22} variant="bezel" />
          </div>
          <span className="text-lg tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            <span className="font-bold">Button Rock</span>{" "}
            <span className="font-semibold text-primary">Labs</span>
          </span>
        </Link>

        <Link
          to="/"
          className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
          data-testid="link-back-home"
        >
          ← Home
        </Link>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2.5">
          <BrandMark size={22} variant="knockout" className="text-primary" />
          <span className="text-sm" style={{ fontFamily: "var(--font-display)" }}>
            <span className="font-bold">Button Rock</span>{" "}
            <span className="font-semibold text-primary">Labs</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Button Rock Labs, LLC. Lyons, Colorado.
        </p>
      </div>
    </footer>
  );
}
