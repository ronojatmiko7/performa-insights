import { prediagnosisUrl } from "../../lib/catalog";

// Closing call to action for every article: sends readers to the free Pra-Diagnosis on performa.co.id.
// Rendered by the article template, so new articles get it without any change to their markdown.
export default function PrediagnosisCta({ slug }: { slug: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-12" aria-labelledby="prediagnosis-heading">
      <div className="rounded-2xl px-6 py-8 md:px-10" style={{ backgroundColor: "#005073" }}>
        <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#BFD8E5" }}>
          Pra-Diagnosis Kinerja Organisasi
        </p>
        <h2 id="prediagnosis-heading" className="mt-2 text-2xl font-bold text-white">
          Di titik mana kinerja organisasi Anda tertahan?
        </h2>
        <p className="mt-2 max-w-2xl text-white/90">
          Jawab 13 pertanyaan dalam sekitar 8 menit. Anda menerima laporan satu halaman untuk direksi dan
          pimpinan HR: indeks kematangan, temuan utama, akar masalah, dan langkah berikutnya. Tanpa biaya.
        </p>
        <a
          href={prediagnosisUrl(slug)}
          className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold"
          style={{ color: "#005073" }}
        >
          Mulai Pra-Diagnosis
        </a>
      </div>
    </section>
  );
}
