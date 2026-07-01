import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export const metadata = {
  title: "Insights | Performa International Indonesia",
  description:
    "Leadership, KPI, dan transformasi organisasi — insight dari konsultan Performa International Indonesia.",
};

export default function InsightsIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Insights</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/insights/${post.slug}`} className="block group">
            {post.coverImage && (
              <img src={post.coverImage} alt="" className="w-full h-48 object-cover rounded-lg mb-3" />
            )}
            <h2 className="text-xl font-semibold group-hover:underline">{post.title}</h2>
            <p className="text-gray-600 mt-1 line-clamp-3">{post.excerpt}</p>
            <p className="text-sm text-gray-400 mt-2">
              {post.author} · {new Date(post.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
