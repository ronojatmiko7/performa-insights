import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  /** Optional. Set when an article is materially revised; feeds dateModified and the sitemap. */
  updated?: string;
  author: string;
  excerpt: string;
  /** Optional. Image drawn on the page (and index card). Keep it text-free, the headline is already printed next to it. */
  coverImage?: string;
  /** Optional. Image for link previews (og:image) and the Article JSON-LD, also reusable as the Instagram post.
   *  Not drawn on the page, so it may carry the headline. Path under /public (e.g. /covers/<slug>.jpg) or a full URL.
   *  Use JPEG or PNG: some crawlers, LinkedIn included, are unreliable with WebP. */
  shareImage?: string;
  tags?: string[];
}

/** Image drawn on the article page, the index card and in the posts.json feed (home page).
 *  The text-free coverImage wins when an article has one, otherwise the share image is used. */
export function pageImage(meta: Pick<PostMeta, "coverImage" | "shareImage">): string | undefined {
  return meta.coverImage ?? meta.shareImage;
}

// YAML turns an unquoted date (date: 2026-06-09) into a Date object.
// Normalise to "YYYY-MM-DD" so a draft never breaks sorting or the sitemap.
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function toMeta(data: Record<string, unknown>, file: string): PostMeta {
  const meta = data as unknown as PostMeta;
  return {
    ...meta,
    slug: (data.slug as string) || file.replace(/\.md$/, ""),
    date: normalizeDate(data.date),
    updated: data.updated ? normalizeDate(data.updated) : undefined,
  };
}

function markdownFiles(): string[] {
  return fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
}

export function getAllPosts(): PostMeta[] {
  return markdownFiles()
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(raw);
      return toMeta(data, file);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export async function getPostBySlug(slug: string) {
  for (const file of markdownFiles()) {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data, content } = matter(raw);
    const meta = toMeta(data, file);
    if (meta.slug === slug) {
      const processed = await remark().use(remarkGfm).use(html).process(content);
      return { meta, contentHtml: processed.toString() };
    }
  }
  return null;
}

/**
 * Internal links between articles. Ranks other posts by how many tags they
 * share with this one; falls back to the newest posts so the list is never empty.
 */
export function getRelatedPosts(slug: string, tags: string[] = [], limit = 3): PostMeta[] {
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const wanted = new Set(tags.map((t) => t.toLowerCase()));
  const scored = others
    .map((p) => ({
      post: p,
      score: (p.tags ?? []).filter((t) => wanted.has(t.toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1));
  return scored.slice(0, limit).map((s) => s.post);
}
