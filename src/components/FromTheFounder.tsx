import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { posts, formatDate } from "@/lib/posts";

/* From the founder: a compact strip surfacing the latest blog essays on the
   home page (BRL-56 move 3). The blog is where Greg's first-person voice
   lives; this makes it proof-of-voice on the front door instead of a bare
   nav link. Pulls the three most recent posts from the markdown loader. */

export default function FromTheFounder() {
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section id="writing" className="py-28 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">From the Founder</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Thinking in public
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Essays on what building looks like now: written by me, learned the
            hard way, published as we go.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                data-testid={`card-founder-post-${i}`}
                className="flex flex-col h-full p-7 rounded-2xl bg-card border border-border/60 hover:border-primary/30 transition-colors group"
              >
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  {formatDate(post.date)} &middot; {post.readingTime}
                </p>
                <h3
                  className="font-bold text-lg leading-snug mb-3 group-hover:text-primary transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {post.excerpt.length > 150 ? post.excerpt.slice(0, 147).trimEnd() + "..." : post.excerpt}
                </p>
                <span className="text-primary text-sm font-medium mt-4 inline-flex items-center gap-1.5">
                  Read the essay
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-10">
          <Link
            to="/blog"
            data-testid="link-all-essays"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
          >
            All essays
          </Link>
        </p>
      </div>
    </section>
  );
}
