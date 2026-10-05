import Link from "next/link";
import type { Metadata } from "next";
import CatalogCta from "../../components/CatalogCta";
import { CATALOG_PATH, PROGRAM_TYPES, TRACKS } from "../../../lib/catalog";
import { SITE_NAME, SITE_URL } from "../../../lib/site";

const TITLE = "Business Impact Diagnosis: Cara Kami Memutuskan Perlu Pelatihan atau Tidak";
const DESCRIPTION =
  "Mulai dari satu KPI, catat baseline, pisahkan penyebab kompetensi dari non-kompetensi, lalu pilih jalur: learning, learning plus consulting, atau consulting saja. Termasuk apa yang didukung riset dan apa yang tidak.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${CATALOG_PATH}/metode` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: `${SITE_URL}${CATALOG_PATH}/metode`,
  },
};

const PHASE_1 = [
  { title: "KPI yang ingin diperbaiki", text: "Klien menunjuk satu KPI yang bermasalah. Kami catat baseline-nya." },
  { title: "Analisis penyebab", text: "Kami pecah penyebabnya: faktor kompetensi dan faktor non-kompetensi." },
  { title: "Rekomendasi", text: "Perbaiki kompetensi saja, atau kompetensi dan sistem sekaligus." },
];

const PHASE_2 = [
  { title: "Learning", text: "In-class 1-2 hari. Pre-test dan post-test mengukur pembelajaran." },
  { title: "Improvement project", text: "Peserta memperbaiki KPI yang sudah dipilih lewat project nyata." },
  { title: "Coaching", text: "Pendampingan individual agar perilaku baru bertahan." },
  { title: "Post-assessment", text: "Ukur ulang KPI dan perilaku, 60-90 hari setelah coaching berakhir." },
];

const PATHS = [
  {
    code: "A",
    title: "Masalah ada di kompetensi",
    program: "Business Impact Learning: learning, improvement project, coaching, dan post-assessment.",
  },
  {
    code: "B",
    title: "Kompetensi dan sistem sama-sama bermasalah",
    program:
      "Business Impact Learning dan Business Impact Consulting berjalan paralel. Orang dan sistem diperbaiki bersamaan.",
  },
  {
    code: "C",
    title: "Masalahnya bukan kompetensi",
    program:
      "Kami sarankan tidak membeli pelatihan. Business Impact Consulting memperbaiki proses, struktur, atau reward, lalu mengukur ulang KPI.",
  },
];

const LEVELS = [
  { level: "Level 1: Reaksi", text: "Survei peserta setelah sesi.", who: "LIP dan BIL" },
  { level: "Level 2: Pembelajaran", text: "Pre-test dan post-test pada fase learning.", who: "LIP dan BIL" },
  {
    level: "Level 3: Perilaku",
    text: "Penilaian multi-rater sebelum dan sesudah: atasan, rekan, bawahan.",
    who: "BIL",
  },
  {
    level: "Level 4: Hasil bisnis",
    text: "Pergerakan satu KPI dibanding baseline. Atasan memvalidasi kaitannya dengan program.",
    who: "BIL",
  },
];

const PIPA = [
  { problem: "Masalah Performance Management", image: "Pompa tidak memompa", fix: "Kepemimpinan yang mengarahkan kinerja", via: "Learning" },
  { problem: "Masalah Follow-Through", image: "Pipa bocor", fix: "SOP dengan SLA yang jelas", via: "Consulting" },
  { problem: "Masalah Bottleneck", image: "Pipa tersumbat", fix: "Urai dan lepas titik tersumbat di alur kerja", via: "Consulting" },
  { problem: "Masalah Desain Organisasi", image: "Pipa terputus", fix: "Desain proses bisnis dan organisasi", via: "Consulting" },
  { problem: "Masalah Eksekusi", image: "Keran rusak", fix: "Kompetensi dan komitmen orang", via: "Learning" },
];

export default function MethodPage() {
  const url = `${SITE_URL}${CATALOG_PATH}/metode`;

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "id-ID",
    url,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Pelatihan", item: `${SITE_URL}${CATALOG_PATH}` },
      { "@type": "ListItem", position: 2, name: "Metode", item: url },
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
          <span>Metode</span>
        </nav>

        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            Business Impact Diagnosis: cara kami memutuskan perlu pelatihan atau tidak
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Kami mulai dari satu KPI yang bermasalah, bukan dari topik pelatihan. Kami catat baseline-nya, pisahkan
            penyebabnya menjadi kompetensi dan non-kompetensi, lalu menawarkan jalur yang sesuai. Kami tidak menjual
            pelatihan bila pelatihan bukan jawabannya.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="tujuh-heading">
          <h2 id="tujuh-heading" className="text-2xl font-bold">
            Tujuh langkah dalam dua fase
          </h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            Fase 2 untuk masalah kompetensi. Masalah sistem punya program sendiri.
          </p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide" style={{ color: "#005073" }}>
            Fase 1: Business Impact Diagnosis (mulai di sini)
          </h3>
          <ol className="mt-3 grid gap-4 md:grid-cols-3">
            {PHASE_1.map((s, i) => (
              <li key={s.title} className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-gray-400">{i + 1}</div>
                <h4 className="mt-1 font-semibold">{s.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{s.text}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide" style={{ color: "#005073" }}>
            Fase 2: Business Impact Learning
          </h3>
          <ol className="mt-3 grid gap-4 md:grid-cols-4">
            {PHASE_2.map((s, i) => (
              <li key={s.title} className="rounded-xl bg-gray-50 p-5">
                <div className="text-sm font-semibold text-gray-400">{i + 4}</div>
                <h4 className="mt-1 font-semibold">{s.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-gray-700">Hasil akhirnya laporan before-after KPI yang bisa Anda pertanggungjawabkan.</p>
        </section>

        <section className="mt-14" aria-labelledby="jalur-heading">
          <h2 id="jalur-heading" className="text-2xl font-bold">
            Tiga jalur setelah diagnosis
          </h2>
          <p className="mt-2 max-w-3xl text-gray-600">Hasil analisis menentukan jalurnya.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PATHS.map((p) => (
              <div key={p.code} className="rounded-xl border border-gray-200 p-5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: "#005073" }}
                >
                  {p.code}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-gray-600">{p.program}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-gray-700">
            Jalur C adalah cara kami menjaga agar hasil Anda yang menjadi ukurannya, bukan penjualan pelatihan.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="program-heading">
          <h2 id="program-heading" className="text-2xl font-bold">
            Tiga program, tiga tingkat bukti
          </h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            Learning Impact Program bisa dibeli langsung. Business Impact Learning dan Business Impact Consulting
            selalu dimulai dari Business Impact Diagnosis.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PROGRAM_TYPES.map((p) => (
              <div key={p.code} className="rounded-xl border border-gray-200 p-5">
                <div className="text-sm font-semibold" style={{ color: "#005073" }}>
                  {p.level}
                </div>
                <h3 className="mt-1 text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-gray-700">{p.promise}</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-gray-500">Yang diukur</dt>
                    <dd className="text-gray-700">{p.measured}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-500">Format</dt>
                    <dd className="text-gray-700">{p.format}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-500">Cocok untuk</dt>
                    <dd className="text-gray-700">{p.fit}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="ukur-heading">
          <h2 id="ukur-heading" className="text-2xl font-bold">
            Cara kami membuktikan hasilnya
          </h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            Empat level pengukuran untuk program learning, mengikuti model Kirkpatrick. Program consulting mengukur
            KPI dan indikator proses.
          </p>
          <ul className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200">
            {LEVELS.map((l) => (
              <li key={l.level} className="flex flex-col gap-1 p-5 md:flex-row md:items-baseline md:gap-6">
                <div className="font-semibold md:w-56">{l.level}</div>
                <div className="flex-1 text-gray-700">{l.text}</div>
                <div className="text-sm text-gray-500">{l.who}</div>
              </li>
            ))}
          </ul>
          <dl className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-5">
              <dt className="font-semibold">Baseline dulu</dt>
              <dd className="mt-1 text-sm text-gray-600">
                Perilaku dan KPI diukur sebelum program mulai. Tanpa baseline, tidak ada before-after.
              </dd>
            </div>
            <div className="rounded-xl bg-gray-50 p-5">
              <dt className="font-semibold">Waktu ukur ulang</dt>
              <dd className="mt-1 text-sm text-gray-600">
                60-90 hari setelah coaching berakhir, saat perilaku baru sudah diuji di pekerjaan nyata.
              </dd>
            </div>
            <div className="rounded-xl bg-gray-50 p-5">
              <dt className="font-semibold">Prasyarat dari klien</dt>
              <dd className="mt-1 text-sm text-gray-600">
                Klien membuka data KPI yang relevan. Tanpa data ini, pergerakan KPI tidak bisa diukur.
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-14" aria-labelledby="pipa-heading">
          <h2 id="pipa-heading" className="text-2xl font-bold">
            Lima titik macet dalam kinerja
          </h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            Sebagian bisa dijawab pelatihan, sisanya butuh perbaikan sistem. PIPA (Performance Input and Process
            Audit) mendasari diagnosis kami. Untuk pembacaan lapisan demi lapisan, lihat{" "}
            <Link
              href="/insights/diagnosis-kinerja-organisasi"
              className="font-medium underline"
              style={{ color: "#005073" }}
            >
              diagnosis kinerja organisasi
            </Link>
            .
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                  <th className="py-2 pr-4 font-semibold">Titik macet</th>
                  <th className="py-2 pr-4 font-semibold">Gambaran</th>
                  <th className="py-2 pr-4 font-semibold">Solusi</th>
                  <th className="py-2 font-semibold">Lewat</th>
                </tr>
              </thead>
              <tbody>
                {PIPA.map((row) => (
                  <tr key={row.problem} className="border-b border-gray-200 align-top">
                    <td className="py-3 pr-4 font-medium">{row.problem}</td>
                    <td className="py-3 pr-4 text-gray-700">{row.image}</td>
                    <td className="py-3 pr-4 text-gray-700">{row.fix}</td>
                    <td className="py-3 text-gray-700">{row.via}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 max-w-3xl" aria-labelledby="riset-heading">
          <h2 id="riset-heading" className="text-2xl font-bold">
            Apa yang didukung riset, dan apa yang tidak
          </h2>
          <p className="mt-3 text-gray-700">
            Metode ini punya dasar, tetapi bukan terbukti secara eksperimen. Berikut batasnya, supaya Anda bisa menilai
            sendiri.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-gray-700">
            <li>
              Meta-analisis Arthur, Bennett, Edens, dan Bell (<i>Journal of Applied Psychology</i>, 2003) menemukan
              bahwa pelatihan rata-rata memang bekerja, dengan efek sekitar d = 0,6 pada reaksi, pembelajaran,
              perilaku, dan hasil. Pelatihan bukan pemborosan secara umum.
            </li>
            <li>
              Dalam meta-analisis yang sama, hanya 22 dari 397 titik data yang melaporkan adanya needs assessment,
              tanpa pola yang jelas. Jadi tidak ada bukti eksperimen bahwa analisis kebutuhan yang lebih lengkap
              membuat pelatihan lebih efektif.
            </li>
            <li>
              Beer, Finnström, dan Schrader (<i>Harvard Business Review</i>, 2016) menyimpulkan dari karya mereka
              bahwa pelatihan kepemimpinan gagal terutama karena konteks organisasi, antara lain arah strategi yang
              tidak jelas dan desain organisasi yang lemah. Ini temuan kualitatif, bukan eksperimen.
            </li>
            <li>
              Mager dan Pipe (<i>Analyzing Performance Problems</i>) menyusun alur pertanyaan untuk memeriksa hambatan
              lingkungan, insentif, umpan balik, dan kejelasan harapan sebelum menyimpulkan bahwa masalahnya
              keterampilan. Ini model dari praktisi, bukan hasil eksperimen.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            Urutan tujuh langkah di atas, termasuk waktu ukur ulang 60-90 hari, adalah aturan kerja Performa, bukan
            temuan riset. Karena itu kami meminta baseline dan data KPI di awal: supaya klaim apa pun tentang hasil
            bisa Anda periksa sendiri.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="track-heading">
          <h2 id="track-heading" className="text-xl font-semibold">
            Enam track program
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {TRACKS.map((t) => (
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
