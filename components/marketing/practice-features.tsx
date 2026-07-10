import { Mic, Headphones, BookMarked, PenLine } from "lucide-react";

const FEATURES = [
  {
    icon: BookMarked,
    title: "Kosakata",
    description: "Latih kata dan frasa baru dengan flashcard dan audio pengucapan.",
  },
  {
    icon: Headphones,
    title: "Mendengarkan",
    description: "Dengarkan kalimat dan pilih jawaban yang paling sesuai.",
  },
  {
    icon: Mic,
    title: "Berbicara",
    description: "Ucapkan kalimat target dan dapatkan skor kemiripan pengucapan secara instan.",
  },
  {
    icon: PenLine,
    title: "Menulis & Menerjemahkan",
    description: "Latih menyusun kalimat dan menerjemahkan dari Bahasa Indonesia.",
  },
];

export function PracticeFeatures() {
  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latihan yang Beragam</h2>
          <p className="mt-3 text-muted-foreground">
            Kuasai empat keterampilan bahasa: membaca, mendengarkan, menulis, dan berbicara.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                <feature.icon className="size-6" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
