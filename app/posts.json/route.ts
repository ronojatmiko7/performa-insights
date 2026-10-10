import { getAllPosts, pageImage } from "../../lib/posts";
import { absoluteUrl, postUrl } from "../../lib/site";

// Public feed of published articles. The main site (www.performa.co.id)
// reads this to show the newest articles on its home page, so a new
// markdown file in content/ appears there with no manual edit.
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts()
    .slice(0, 12)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      tag: p.tags?.[0] ?? null,
      url: postUrl(p.slug),
      // Absolute URL, or null when the article has no image yet.
      image: pageImage(p) ? absoluteUrl(pageImage(p)!) : null,
    }));

  return Response.json(posts, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
