import { marked } from "marked";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  readingTime: string;
};

export type Post = PostMeta & { html: string };

const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    meta[key] = val;
  }
  return { meta, body: match[2] };
}

function slugFromPath(path: string): string {
  const file = path.split("/").pop() || "";
  return file.replace(/\.md$/, "");
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const slug = meta.slug || slugFromPath(path);
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || "",
      excerpt: meta.excerpt || "",
      author: meta.author || "Greg Falconer",
      readingTime: meta.readingTime || "",
      html: marked.parse(body, { async: false }) as string,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
