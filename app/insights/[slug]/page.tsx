import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPostSlugs, getRelatedPosts, pageImage } from "../../../lib/posts";
import { POSTS_PATH, SITE_NAME, SITE_URL, absoluteUrl, postUrl } from "../../../lib/site";

// Share image (link previews, Article JSON-LD). Falls back to the on-page cover.
function shareImageUrl(meta: { shareImage?: string; coverImage?: string }): string | undefined {
  const image = meta.shareImage ?? meta.coverImage;
  return image ? absoluteUrl(image) : undefined;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const { meta } = post;
  return {
    // absolute: keep the full headline in the search result, no site-name suffix eating the character budget.
    title: { absolute: meta.title },
    description: meta.excerpt,
    keywords: meta.tags,
    authors: [{ name: meta.author }],
    alternates: { canonical: postUrl(meta.slug) },
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: "article",
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      authors: [meta.author],
      tags: meta.tags,
      images: shareImageUrl(meta) ? [{ url: shareImageUrl(meta)!, alt: meta.title }] : undefined,
      url: postUrl(meta.slug),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { meta } = post;
  const related = getRelatedPosts(meta.slug, meta.tags);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    inLanguage: "id-ID",
    keywords: meta.tags?.join(", "),
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    author: { "@type": "Person", name: meta.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: "https://i.ibb.co.com/qMHcWzjh/Logo-Only-performa.png" },
    },
    image: shareImageUrl(meta) ? [shareImageUrl(meta)!] : undefined,
    mainEntityOfPage: postUrl(meta.slug),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Insights", item: `${SITE_URL}${POSTS_PATH}` },
      { "@type": "ListItem", position: 2, name: meta.title, item: postUrl(meta.slug) },
    ],
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <article className="prose prose-lg mx-auto max-w-3xl px-4 py-12">
        <nav aria-label="Breadcrumb" className="not-prose mb-6 text-sm text-gray-500">
          <Link href={POSTS_PATH} className="hover:underline">
            Insights
          </Link>
        </nav>
        <h1 className="mb-2">{meta.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {meta.author} · {formatDate(meta.date)}
          {meta.updated && meta.updated !== meta.date ? ` · Diperbarui ${formatDate(meta.updated)}` : ""}
        </p>
        {pageImage(meta) && (
          // Decorative (alt=""): the headline is the H1 right above. Capped at max-w-md so a square
          // image does not push the first paragraph below the fold. aspect-square reserves the space
          // (no layout shift) and assumes square images; revisit when a wide cover is added.
          <img
            src={pageImage(meta)!}
            alt=""
            className="mx-auto mt-0 mb-8 aspect-square w-full max-w-md rounded-lg object-cover"
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      {related.length > 0 && (
        <aside className="mx-auto max-w-3xl px-4 pb-16" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-semibold mb-4">
            Baca juga
          </h2>
          <ul className="space-y-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`${POSTS_PATH}/${p.slug}`} className="font-medium hover:underline">
                  {p.title}
                </Link>
                <p className="text-sm text-gray-600 line-clamp-2">{p.excerpt}</p>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
}
