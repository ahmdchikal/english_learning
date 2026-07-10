export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "EnglishPath",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "EnglishPath adalah platform belajar Bahasa Inggris untuk pengguna Indonesia, dari level pemula absolut (Pre-A1) hingga mahir (C1). Belajar lewat pelajaran interaktif, kuis, dan latihan berbicara.",
  locale: "id_ID",
  twitterHandle: "@englishpath",
} as const;

export const CONTACT_EMAIL = "halo@englishpath.app";
