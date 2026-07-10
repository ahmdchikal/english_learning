import { UserPlus, ClipboardCheck, BookOpenText, TrendingUp } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Daftar Gratis",
    description: "Buat akun dalam beberapa detik menggunakan email Anda.",
  },
  {
    icon: ClipboardCheck,
    title: "Tes Penempatan (Opsional)",
    description: "Kerjakan tes singkat untuk mendapatkan rekomendasi level awal.",
  },
  {
    icon: BookOpenText,
    title: "Belajar Bertahap",
    description: "Ikuti pelajaran, kosakata, dan kuis sesuai urutan level.",
  },
  {
    icon: TrendingUp,
    title: "Pantau Perkembangan",
    description: "Lihat XP, streak, dan statistik belajar Anda setiap hari.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Cara Kerja EnglishPath</h2>
        <p className="text-muted-foreground mt-3">Empat langkah sederhana untuk mulai belajar.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <div key={step.title} className="relative text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <step.icon className="size-6" />
            </div>
            <span className="mt-3 block text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Langkah {index + 1}
            </span>
            <h3 className="mt-1 font-semibold">{step.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
