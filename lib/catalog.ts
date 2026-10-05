// Training catalog, taken from Performa_Training_Proposal_2026 (3 Oct 2026).
// One source of truth: the index, the track pages and the sitemap all read from here.
// Public copy only: no prices, no client names, no client results.

export type Level = "Staf/Supervisor" | "Manajer" | "Senior Leader";

export interface Program {
  number: number;
  name: string;
  levels: Level[];
  /** The symptom this program answers, in the buyer's own words. */
  problem: string;
}

export interface Track {
  slug: string;
  number: number;
  name: string;
  /** One line under the track name. */
  tagline: string;
  /** Meta description and card text. */
  summary: string;
  /** Article slugs under /insights that explain the problem behind this track. */
  related: string[];
  programs: Program[];
}

export const TRACKS: Track[] = [
  {
    slug: "leadership-people-management",
    number: 1,
    name: "Leadership & People Management",
    tagline: "Atasan yang mengubah perilaku anak buah, bukan sekadar memberi perintah.",
    summary:
      "Empat program untuk manajer dan senior leader: tim berkinerja tinggi, coaching dan feedback, gaya memimpin sesuai kondisi orang, dan pengaruh lintas unit.",
    related: [
      "training-need-analysis-tna-cara-melakukan-dan-kenapa-survei-saja-tidak-cukup",
      "diagnosis-kinerja-organisasi",
    ],
    programs: [
      {
        number: 1,
        name: "Leading High-Performance Teams",
        levels: ["Manajer"],
        problem: "Tim sibuk sepanjang hari, tetapi output tidak naik.",
      },
      {
        number: 2,
        name: "Coaching & Feedback untuk Leader",
        levels: ["Staf/Supervisor", "Manajer"],
        problem: "Arahan atasan tidak mengubah perilaku anak buah.",
      },
      {
        number: 3,
        name: "People Management: Skill × Will",
        levels: ["Manajer"],
        problem: "Satu gaya memimpin dipakai untuk semua orang.",
      },
      {
        number: 4,
        name: "Executive Leadership & Influence",
        levels: ["Senior Leader"],
        problem: "Memimpin lewat orang lain dan lintas unit.",
      },
    ],
  },
  {
    slug: "strategy-execution",
    number: 2,
    name: "Strategy & Execution",
    tagline: "Strategi yang turun ke unit, KPI yang mengarahkan kerja harian.",
    summary:
      "Empat program dari strategi sampai keputusan di lapangan: arah strategis, eksekusi, KPI dan manajemen kinerja, serta pengambilan keputusan dan risiko.",
    related: [
      "kpi-adalah-pengertian-contoh-kpi-dan-cara-menyusunnya",
      "kenapa-kpi-gagal-dan-ini-bukan-salah-karyawan-anda",
    ],
    programs: [
      {
        number: 5,
        name: "Strategic Thinking & Direction",
        levels: ["Senior Leader"],
        problem: "Strategi sudah ada, tetapi tidak turun ke unit.",
      },
      {
        number: 6,
        name: "Driving Execution",
        levels: ["Manajer"],
        problem: "Rencana bagus, eksekusi tersendat.",
      },
      {
        number: 7,
        name: "KPI & Performance Management",
        levels: ["Staf/Supervisor", "Manajer"],
        problem: "KPI ada di dokumen, tidak di kerja harian.",
      },
      {
        number: 8,
        name: "Risk Taking & Decision Making",
        levels: ["Manajer"],
        problem: "Semua keputusan naik ke atas.",
      },
    ],
  },
  {
    slug: "change-innovation-culture",
    number: 3,
    name: "Change, Innovation & Culture",
    tagline: "Perubahan yang diserap, inovasi yang jalan, budaya yang terlihat di perilaku.",
    summary:
      "Tiga program untuk mengelola perubahan, mendorong inovasi, dan membentuk budaya kerja yang terlihat di perilaku sehari-hari.",
    related: ["diagnosis-kinerja-organisasi"],
    programs: [
      {
        number: 9,
        name: "Change Leadership & Change Agent",
        levels: ["Manajer", "Senior Leader"],
        problem: "Perubahan datang bertubi-tubi, resistensi menumpuk.",
      },
      {
        number: 10,
        name: "Driving Innovation",
        levels: ["Manajer"],
        problem: "Inovasi berhenti di slogan.",
      },
      {
        number: 11,
        name: "Building High-Performance Culture",
        levels: ["Senior Leader"],
        problem: "Nilai perusahaan tidak terlihat di perilaku sehari-hari.",
      },
    ],
  },
  {
    slug: "business-process-excellence",
    number: 4,
    name: "Business & Process Excellence",
    tagline: "Masalah selesai di akarnya, proses tidak lagi saling menunggu.",
    summary:
      "Tiga program untuk membongkar akar masalah, merapikan proses lintas unit, dan mendiagnosis kinerja dari input sampai output.",
    related: [
      "sop-adalah-pengertian-cara-membuat-dan-kenapa-tidak-dijalankan",
      "diagnosis-kinerja-organisasi",
    ],
    programs: [
      {
        number: 12,
        name: "Problem Solving & Decision Making",
        levels: ["Staf/Supervisor", "Manajer"],
        problem: "Masalah yang sama berulang karena akar masalahnya tidak ketemu.",
      },
      {
        number: 13,
        name: "Business Process Improvement",
        levels: ["Staf/Supervisor", "Manajer"],
        problem: "Proses berbelit dan antarunit saling menunggu.",
      },
      {
        number: 14,
        name: "Performance Diagnostic: dari Input ke Output",
        levels: ["Manajer", "Senior Leader"],
        problem: "Output turun, tetapi sumber masalahnya belum jelas.",
      },
    ],
  },
  {
    slug: "communication-collaboration",
    number: 5,
    name: "Communication & Collaboration",
    tagline: "Gagasan sampai ke pendengar, kolaborasi tidak berhenti di batas unit.",
    summary:
      "Empat program untuk presentasi, kemitraan, layanan pelanggan, dan kolaborasi lintas unit.",
    related: ["diagnosis-kinerja-organisasi"],
    programs: [
      {
        number: 15,
        name: "Public Speaking & Presentation Skills",
        levels: ["Staf/Supervisor", "Manajer"],
        problem: "Gagasan bagus, tetapi tidak sampai ke pendengar.",
      },
      {
        number: 16,
        name: "Strategic Partnership & Networking",
        levels: ["Senior Leader"],
        problem: "Kemitraan berhenti di tanda tangan MoU.",
      },
      {
        number: 17,
        name: "Customer Focus for Business Growth",
        levels: ["Staf/Supervisor", "Manajer"],
        problem: "Layanan sesuai SOP, tetapi pelanggan tidak merasa dilayani.",
      },
      {
        number: 18,
        name: "Cross-Functional Collaboration",
        levels: ["Staf/Supervisor", "Manajer"],
        problem: "Ego sektoral membuat antarunit saling menunggu.",
      },
    ],
  },
  {
    slug: "digital-ai-readiness",
    number: 6,
    name: "Digital & AI Readiness",
    tagline: "Teknologi yang dipakai, bukan sekadar dibeli.",
    summary:
      "Tiga program untuk memimpin transformasi digital, memakai AI dalam pekerjaan, dan memutuskan dengan data.",
    related: ["diagnosis-kinerja-organisasi"],
    programs: [
      {
        number: 19,
        name: "Digital Leadership",
        levels: ["Manajer", "Senior Leader"],
        problem: "Teknologi sudah dibeli, tetapi cara memimpin belum berubah.",
      },
      {
        number: 20,
        name: "AI for Work: Prompting & Produktivitas",
        levels: ["Staf/Supervisor", "Manajer"],
        problem: "AI dipakai sebatas coba-coba.",
      },
      {
        number: 21,
        name: "Data-Driven Decision Making",
        levels: ["Manajer"],
        problem: "Keputusan masih bertumpu pada intuisi dan kebiasaan.",
      },
    ],
  },
];

export const PROGRAM_COUNT = TRACKS.reduce((n, t) => n + t.programs.length, 0);

export function getTrack(slug: string): Track | undefined {
  return TRACKS.find((t) => t.slug === slug);
}

/** The three ways a program is delivered. LIP can be bought directly; BIL and BIC always start from a diagnosis. */
export const PROGRAM_TYPES = [
  {
    code: "LIP",
    name: "Learning Impact Program",
    level: "Level 1-2",
    promise: "Peserta paham dan mampu.",
    measured: "Reaksi (Level 1) dan pembelajaran lewat pre-test dan post-test (Level 2).",
    format: "In-class, 1-2 hari.",
    fit: "Penyegaran kompetensi, peserta banyak, anggaran terbatas.",
  },
  {
    code: "BIL",
    name: "Business Impact Learning",
    level: "Level 1-4",
    promise: "Perilaku berubah, KPI bergerak.",
    measured: "Level 1-2, ditambah perilaku (Level 3) dan pergerakan KPI (Level 4).",
    format: "Diagnosis, learning, improvement project, coaching, post-assessment.",
    fit: "Gap kompetensi kritis, peserta terpilih, klien membuka data KPI.",
  },
  {
    code: "BIC",
    name: "Business Impact Consulting",
    level: "Non-kompetensi",
    promise: "Sistem diperbaiki, KPI bergerak.",
    measured: "KPI dibanding baseline, ditambah 1-2 indikator proses (misalnya waktu proses).",
    format: "Diagnosis, perbaikan sistem (SOP, proses, struktur), pendampingan, ukur ulang.",
    fit: "Akar masalah ada di proses, struktur, atau reward, bukan di orang.",
  },
] as const;

export const CATALOG_PATH = "/pelatihan";
/** Bump when catalog content changes; feeds the sitemap lastmod. */
export const CATALOG_UPDATED = "2026-10-05";
export const WHATSAPP_URL = "https://wa.me/6287770781950";
export const DIAGNOSTIC_URL = "https://calendly.com/performaconsulting/diagnostic";
