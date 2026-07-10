import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rina W.",
    role: "Mahasiswa",
    quote:
      "Materinya runtut dan penjelasannya pakai Bahasa Indonesia, jadi lebih mudah dipahami dibanding aplikasi lain yang saya coba.",
  },
  {
    name: "Budi S.",
    role: "Karyawan Kantor",
    quote:
      "Latihan berbicaranya membantu saya lebih percaya diri sebelum meeting dengan klien asing.",
  },
  {
    name: "Sari A.",
    role: "Pelajar SMA",
    quote: "Sistem XP dan streak bikin saya jadi rutin belajar tiap hari tanpa merasa terbebani.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Apa Kata Pengguna</h2>
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          *Contoh testimoni demo untuk ilustrasi — bukan pengguna sungguhan.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.name} className="rounded-2xl border bg-card p-6 shadow-sm">
            <Quote className="size-6 text-indigo-400" />
            <p className="mt-4 text-sm text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="mt-4 flex items-center gap-3 border-t pt-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                {testimonial.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
