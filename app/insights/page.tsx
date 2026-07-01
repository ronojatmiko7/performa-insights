// app/insights/page.tsx
//
// The /insights listing page — replaces insights.performa.co.id's
// homepage. Same fetch-from-WordPress pattern, statically generated.

import Link from "next/link";

const WP_BASE = "https://insights.performa.co.id/wp-json/wp/v2";

interface WPPostSummary {
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string }[];
  };
}

async function getPosts(): Promise<WPPostSummary[]> {
  const res = await fetch(`${WP_BASE}/posts?per_page=20&_embed`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export const metadata = {
  title: "Insights | Performa International Indonesia",
  description:
    "Leadership, KPI, dan transformasi organisasi — insight dari konsultan Performa International Indonesia.",
};

export default async function InsightsIndexPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Insights</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => {
          const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const plainExcerpt = post.excerpt.rendered
            .replace(/<[^>]+>/g, "")
            .trim();

          return (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="block group"
            >
              {image && (
                <img
                  src={image}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}
              <h2
                className="text-xl font-semibold group-hover:underline"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p className="text-gray-600 mt-1 line-clamp-3">
                {plainExcerpt}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
