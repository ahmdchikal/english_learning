/**
 * Static marketing copy describing the six CEFR levels. Used only for
 * presentational purposes on public pages (landing page level overview).
 * The authoritative, editable version of this data lives in the `levels`
 * table and is what actually powers `/learn` and `/levels`.
 */
export const LEVEL_CATALOG = [
  {
    slug: "pre-a1",
    cefr: "Pre-A1",
    name: "Pemula Absolut",
    description: "Alfabet, angka, salam dasar, dan cara memperkenalkan diri.",
    color: "bg-slate-500",
  },
  {
    slug: "a1",
    cefr: "A1",
    name: "Pemula",
    description: "Kata ganti, kata kerja to be, dan simple present tense.",
    color: "bg-sky-500",
  },
  {
    slug: "a2",
    cefr: "A2",
    name: "Dasar",
    description: "Simple past tense, rencana masa depan, dan percakapan sehari-hari.",
    color: "bg-emerald-500",
  },
  {
    slug: "b1",
    cefr: "B1",
    name: "Menengah",
    description: "Present perfect, opini, dan Bahasa Inggris di tempat kerja.",
    color: "bg-amber-500",
  },
  {
    slug: "b2",
    cefr: "B2",
    name: "Menengah Atas",
    description: "Conditionals, kalimat pasif, dan wawancara kerja.",
    color: "bg-orange-500",
  },
  {
    slug: "c1",
    cefr: "C1",
    name: "Mahir",
    description: "Kosakata lanjut, penulisan akademik, dan debat.",
    color: "bg-rose-500",
  },
] as const;
