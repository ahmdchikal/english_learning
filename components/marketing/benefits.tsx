import { BookOpenCheck, Mic, LineChart, Trophy } from "lucide-react";

const BENEFITS = [
  {
    icon: BookOpenCheck,
    title: "Materi Terstruktur",
    description:
      "Pelajaran disusun bertahap dari Pre-A1 hingga C1, lengkap dengan penjelasan Bahasa Indonesia dan contoh nyata.",
  },
  {
    icon: Mic,
    title: "Latihan Berbicara",
    description:
      "Latih pengucapan Anda langsung dari peramban menggunakan mikrofon, dengan skor dan masukan instan.",
  },
  {
    icon: Trophy,
    title: "Gamifikasi Seru",
    description: "Kumpulkan XP, jaga streak harian, dan raih lencana untuk menjaga motivasi belajar.",
  },
  {
    icon: LineChart,
    title: "Pantau Progres",
    description: "Lihat statistik lengkap: skor kuis, waktu belajar, dan area yang perlu ditingkatkan.",
  },
];

export function Benefits() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Semua yang Anda butuhkan untuk belajar
        </h2>
        <p className="mt-3 text-muted-foreground">
          Satu platform lengkap untuk perjalanan belajar Bahasa Inggris Anda.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
              <benefit.icon className="size-6" />
            </div>
            <h3 className="mt-4 font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
