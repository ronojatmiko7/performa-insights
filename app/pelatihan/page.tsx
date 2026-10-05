import Link from "next/link";
import type { Metadata } from "next";
import CatalogCta from "../components/CatalogCta";
import { CATALOG_PATH, PROGRAM_COUNT, TRACKS } from "../../lib/catalog";
import { SITE_NAME, SITE_URL } from "../../lib/site";

const TITLE = "Pelatihan untuk Korporasi dan BUMN: Mulai dari KPI, Bukan dari Topik";
const DESCRIPTION = `Katalog pelatihan Performa: ${TRACKS.length} track, ${PROGRAM_COUNT} program untuk korporasi dan BUMN. Setiap program dimulai dari satu KPI yang bermasalah dan diukur sampai ke KPI yang sama.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CATALOG_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}${CATALOG_PATH}`,
  },
};

const AFTER_TRAINING = [
  {
    title: "Semangat sesaat",
    text: "Peserta pulang bersemangat. Tiga bulan kemudian, cara kerja tim sama seperti sebelumnya.",
  },
  {
    title: "Skor tanpa dampak",
    text: "Laporan pelatihan penuh skor kepuasan, tetapi KPI yang bermasalah tidak bergerak.",
  },
  {
    title: "Anggaran tanpa jawaban",
    text: "Anggaran terserap. Saat ditanya hasilnya, tidak ada yang bisa menjawab dengan angka.",
  },
];

const STEPS = [
  { title: "Sebutkan KPI", text: "Ceritakan satu KPI yang bermasalah dan target yang ingin dicapai." },
  {
    title: "Business Impact Diagnosis",
    text: "Kami catat baseline, memisahkan penyebab kompetensi dari non-kompetensi, lalu memberi rekomendasi tertulis.",
  },
  { title: "Pilih program", text: "Learning, Learning plus Consulting, atau Consulting saja." },
  { title: "Jalankan dan ukur", text: "Program memakai data dan situasi kerja peserta, lalu KPI yang sama diukur ulang." },
];

export default function CatalogIndexPage() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "id-ID",
    url: `${SITE_URL}${CATALOG_PATH}`,
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: TRACKS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
        url: `${SITE_URL}${CATALOG_PATH}/${t.slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />

      <div className="mx-auto max-w-5xl px-4 py-12">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#005073" }}>
            Training Catalog 2026
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
            Pelatihan yang dimulai dari KPI, bukan dari topik
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Program pengembangan untuk korporasi dan BUMN, dengan hasil yang bisa diukur sampai ke KPI. Ada{" "}
            {TRACKS.length} track dan {PROGRAM_COUNT} program. Bila pelatihan bukan jawaban dari masalah Anda, kami
            akan mengatakannya.
          </p>
        </header>

        <section className="mt-14" aria-labelledby="masalah-heading">
          <h2 id="masalah-heading" className="text-2xl font-bold">
            Tiga kejadian yang sering muncul setelah pelatihan selesai
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {AFTER_TRAINING.map((item, i) => (
              <div key={item.title} className="rounded-xl border border-gray-200 p-5">
                <div className="text-sm font-semibold text-gray-400">{i + 1}</div>
                <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-gray-700">
            Pola ini lazim, dan jarang berasal dari pesertanya. Pelatihan yang dirancang dari daftar topik tidak
            punya KPI untuk dituju, jadi tidak ada angka yang bisa dibandingkan sesudahnya. Dasar riset dan batasnya
            ada di{" "}
            <Link href={`${CATALOG_PATH}/metode`} className="font-medium underline" style={{ color: "#005073" }}>
              halaman metode kami
            </Link>
            .
          </p>
        </section>

        <section className="mt-14" aria-labelledby="track-heading">
          <h2 id="track-heading" className="text-2xl font-bold">
            Enam track, {PROGRAM_COUNT} program
          </h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            Satu track menjawab satu kelompok masalah. Kompetensi dipetakan ke competency framework perusahaan Anda.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {TRACKS.map((track) => (
              <Link
                key={track.slug}
                href={`${CATALOG_PATH}/${track.slug}`}
                className="group block rounded-xl border border-gray-200 p-6 transition-shadow hover:shadow-md"
              >
                <div className="text-sm font-semibold" style={{ color: "#005073" }}>
                  Track {track.number} · {track.programs.length} program
                </div>
                <h3 className="mt-1 text-xl font-semibold group-hover:underline">{track.name}</h3>
                <p className="mt-2 text-gray-600">{track.tagline}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="mulai-heading">
          <h2 id="mulai-heading" className="text-2xl font-bold">
            Dari satu KPI ke hasil terukur
          </h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            Katalog adalah titik awal. Program disesuaikan dengan konteks dan data perusahaan Anda.
          </p>
          <ol className="mt-6 grid gap-4 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold" style={{ color: "#005073" }}>
                  {i + 1}
                </div>
                <h3 className="mt-1 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link href={`${CATALOG_PATH}/metode`} className="font-medium underline" style={{ color: "#005073" }}>
              Lihat tiga jalur setelah diagnosis dan cara kami mengukur hasilnya
            </Link>
          </p>
        </section>
      </div>

      <CatalogCta />
    </>
  );
}
