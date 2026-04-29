import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { getPost, formatDate } from "@/lib/posts";
import { BlogNav, BlogFooter } from "@/pages/BlogIndex";

export default function BlogPost() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <BlogNav />
        <section className="pt-40 pb-32">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">404</p>
            <h1
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Post not found.
            </h1>
            <p className="text-muted-foreground mb-8">
              That post doesn't exist — or it might have moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              See all posts
            </Link>
          </div>
        </section>
        <BlogFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogNav />

      <article className="pt-28 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div
            className="rounded-2xl bg-card border border-border/60 px-6 sm:px-10 md:px-16 py-10 md:py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground hover:text-primary uppercase tracking-widest mb-8 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              All Posts
            </Link>
            <div className="flex items-center gap-3 mb-5 text-[12px] uppercase tracking-widest text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.readingTime && (
                <>
                  <span className="opacity-50">·</span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>
            <h1
              className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-bold mb-6"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-2">
              {post.excerpt}
            </p>
            <p className="text-[13px] uppercase tracking-widest text-primary mt-6">
              By {post.author}
            </p>

            <div className="my-10 border-t border-border/50" />

            <div
              className="prose-brl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </motion.div>
        </div>

        <section className="border-t border-border/40 mt-16 pt-20 pb-4">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-[12px] font-semibold text-primary uppercase tracking-widest mb-4">
              Working on something?
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-5"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Let's build something human.
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If you have an idea worth pushing through, we'd love to hear it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:greg@buttonrocklabs.com"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Get in touch
              </a>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted transition-colors"
              >
                More posts
              </Link>
            </div>
          </div>
        </section>
      </article>

      <BlogFooter />
    </div>
  );
}
