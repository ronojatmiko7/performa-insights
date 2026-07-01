import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPostSlugs } from "../../../lib/posts";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: { canonical: `https://insights.performa.co.id/insights/${post.meta.slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
      images: post.meta.coverImage ? [{ url: post.meta.coverImage }] : undefined,
      url: `https://insights.performa.co.id/insights/${post.meta.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    author: { "@type": "Person", name: post.meta.author },
    publisher: {
      "@type": "Organization",
      name: "Performa International Indonesia",
      logo: { "@type": "ImageObject", url: "https://i.ibb.co.com/qMHcWzjh/Logo-Only-performa.png" },
    },
    image: post.meta.coverImage ? [post.meta.coverImage] : undefined,
    mainEntityOfPage: `https://insights.performa.co.id/insights/${post.meta.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="prose prose-lg mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-2">{post.meta.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {post.meta.author} · {new Date(post.meta.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        {post.meta.coverImage && (
          <img src={post.meta.coverImage} alt={post.meta.title} className="w-full rounded-lg mb-8" />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </>
  );
}
