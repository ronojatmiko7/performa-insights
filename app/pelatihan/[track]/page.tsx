import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CatalogCta from "../../components/CatalogCta";
import { CATALOG_PATH, TRACKS, getTrack } from "../../../lib/catalog";
import { getAllPosts } from "../../../lib/posts";
import { POSTS_PATH, SITE_NAME, SITE_URL } from "../../../lib/site";

// Only the six tracks exist; anything else is a 404, not a runtime render.
export const dynamicParams = false;

export function generateStaticParams() {
  return TRACKS.map((t) => ({ track: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }): Promise<Metadata> {
  const { track: slug } = await params;
  const track = getTrack(slug);
  if (!track) return {};
  const title = `${track.name}: ${track.programs.length} Program Pelatihan untuk Korporasi dan BUMN`;
  return {
    title: { absolute: title },
    description: track.summary,
    alternates: { canonical: `${CATALOG_PATH}/${track.slug}` },
    openGraph: {
      title,
      description: track.summary,
      type: "website",
      url: `${SITE_URL}${CATALOG_PATH}/${track.slug}`,
    },
  };
}

export default async function TrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const track = getTrack(slug);
  if (!track) notFound();

  const posts = getAllPosts();
  const related = track.related
    .map((s) => posts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const url = `${SITE_URL}${CATALOG_PATH}/${track.slug}`;

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: track.name,
    description: track.summary,
    inLanguage: "id-ID",
    url,
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: track.programs.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        description: p.problem,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Pelatihan", item: `${SITE_URL}${CATALOG_PATH}` },
      { "@type": "ListItem", position: 2, name: track.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="mx-auto max-w-5xl px-4 py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <Link href={CATALOG_PATH} className="hover:underline">
            Pelatihan
          </Link>
          <span className="mx-2">/</span>
          <span>{track.name}</span>
        </nav>

        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#005073" }}>
            Track {track.number} dari {TRACKS.length}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{track.name}</h1>
          <p className="mt-4 text-lg text-gray-700">{track.tagline}</p>
        </header>

        <section className="mt-10" aria-labelledby="program-heading">
          <h2 id="program-heading" className="text-2xl font-bold">
            {track.programs.length} program di track ini
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {track.programs.map((program) => (
              <article key={program.number} className="rounded-xl border border-gray-200 p-6">
                <div className="text-sm font-semibold text-gray-400">Program {program.number}</div>
                <h3 className="mt-1 text-xl font-semibold">{program.name}</h3>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Masalah yang diselesaikan
                </p>
                <p className="mt-1 text-gray-700">{program.problem}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">Untuk</p>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {program.levels.map((level) => (
                    <li key={level} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      {level}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-gray-700">
            Tersedia sebagai Learning Impact Program (Level 1-2) dan Business Impact Learning (Level 1-4). Bila
            hasil diagnosis menunjukkan akar masalahnya bukan kompetensi, kami menyarankan tidak membeli pelatihan
            dan menawarkan Business Impact Consulting.{" "}
            <Link href={`${CATALOG_PATH}/metode`} className="font-medium underline" style={{ color: "#005073" }}>
              Lihat tiga jalur setelah diagnosis
            </Link>
            .
          </p>
        </section>

        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="bacaan-heading">
            <h2 id="bacaan-heading" className="text-xl font-semibold">
              Bacaan untuk memahami masalahnya
            </h2>
            <ul className="mt-4 space-y-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`${POSTS_PATH}/${p.slug}`} className="font-medium hover:underline">
                    {p.title}
                  </Link>
                  <p className="line-clamp-2 text-sm text-gray-600">{p.excerpt}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12" aria-labelledby="lain-heading">
          <h2 id="lain-heading" className="text-xl font-semibold">
            Track lain
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {TRACKS.filter((t) => t.slug !== track.slug).map((t) => (
              <li key={t.slug}>
                <Link
                  href={`${CATALOG_PATH}/${t.slug}`}
                  className="inline-block rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <CatalogCta />
    </>
  );
}
