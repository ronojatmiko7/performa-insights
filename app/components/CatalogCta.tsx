import { DIAGNOSTIC_URL, WHATSAPP_URL } from "../../lib/catalog";

export default function CatalogCta() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-4" aria-labelledby="cta-heading">
      <div className="rounded-2xl px-6 py-10 md:px-10" style={{ backgroundColor: "#005073" }}>
        <h2 id="cta-heading" className="text-2xl font-bold text-white">
          Mulai dari satu KPI.
        </h2>
        <p className="mt-2 max-w-2xl text-white/90">
          Sebutkan KPI yang paling bermasalah di organisasi Anda. Kami diagnosis penyebabnya, lalu kami ukur
          hasilnya. Tidak perlu memilih semua program sekarang.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={DIAGNOSTIC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold"
            style={{ color: "#005073" }}
          >
            Jadwalkan Diagnostik Organisasi
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-white px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Tanya lewat WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
