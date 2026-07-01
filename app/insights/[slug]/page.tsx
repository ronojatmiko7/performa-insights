// app/insights/[slug]/page.tsx
//
// This route replaces insights.performa.co.id/[slug] with
// www.performa.co.id/insights/[slug] — same content, pulled live
// from WordPress, but rendered using YOUR homepage's design system
// instead of the WordPress theme. Statically generated at build time
// (or on first request + cached, if using ISR), so the HTML that
// ships to the browser/crawler is already fully formed — no client-side
// JS required to see the content. That's the part that matters for
// both Google and AI crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.)
// since most of them don't execute JavaScript at all.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

const WP_BASE = process.env.WP_API_URL || "https://insights.performa.co.id/wp-json/wp/v2";

interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
  };
}

async function getPost(slug: string): Promise<WPPost | null> {
  const res = await fetch(
    `${WP_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`,
    // ISR: re-fetch from WordPress at most once per hour.
    // Bump this down to e.g. 60 if you want near-instant updates
    // after publishing, or use on-demand revalidation via a
    // WordPress publish webhook later.
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;
  const posts: WPPost[] = await res.json();
  return posts[0] ?? null;
}

export const dynamic = 'force-dynamic';

// SEO: per-post meta tags, generated server-side so they're present
// in the initial HTML response (not injected after JS loads).
// NOTE: params is a Promise in Next.js 15+ / Next.js 16.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const plainExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, "").trim();
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: post.title.rendered,
    description: plainExcerpt,
    alternates: {
      canonical: `https://www.performa.co.id/insights/${post.slug}`,
    },
    openGraph: {
      title: post.title.rendered,
      description: plainExcerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: image ? [{ url: image }] : undefined,
      url: `https://www.performa.co.id/insights/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const authorName = post._embedded?.author?.[0]?.name ?? "Performa International Indonesia";
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // JSON-LD Article schema — this is what AI Overviews, ChatGPT
  // search, Perplexity, etc. lean on to understand and cite the
  // page accurately, separate from the visible HTML content itself.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.rendered.replace(/<[^>]+>/g, ""),
    datePublished: post.date,
    dateModified: post.modified,
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: "Performa International Indonesia",
      logo: {
        "@type": "ImageObject",
        url: "https://www.performa.co.id/logo.png",
      },
    },
    image: image ? [image] : undefined,
    mainEntityOfPage: `https://www.performa.co.id/insights/${post.slug}`,
  };

  return (
    <>
      {/* Structured data for search + AI crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        IMPORTANT: swap this wrapper for your actual homepage
        layout components (Header, Footer, container widths,
        typography classes) so the post visually matches the
        rest of www.performa.co.id exactly. This is the whole
        point of the migration — one design system, not two.
      */}
      <article className="prose prose-lg mx-auto max-w-3xl px-4 py-12">
        <h1
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <p className="text-sm text-gray-500 mb-8">
          {authorName} ·{" "}
          {new Date(post.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        {image && (
          // Next.js <Image> recommended over raw <img> in production
          // for automatic optimization — using <img> here just to
          // keep this sketch dependency-free.
          <img
            src={image}
            alt={post.title.rendered}
            className="w-full rounded-lg mb-8"
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </>
  );
}
