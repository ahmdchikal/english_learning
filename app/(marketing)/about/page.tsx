import type { Metadata } from "next";
import { Target, Users, Heart } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Kenali misi dan visi ${siteConfig.name} dalam membantu pelajar Indonesia menguasai Bahasa Inggris.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Tentang {siteConfig.name}</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {siteConfig.name} dibangun dengan satu tujuan sederhana: membantu siapa pun di Indonesia
        untuk belajar Bahasa Inggris secara terstruktur, mudah dipahami, dan menyenangkan — mulai
        dari nol hingga mahir.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <Target className="size-8 text-indigo-600 dark:text-indigo-400" />
          <h2 className="mt-4 font-semibold">Misi Kami</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Membuat pembelajaran Bahasa Inggris berkualitas dapat diakses oleh siapa saja, tanpa
            biaya.
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <Users className="size-8 text-indigo-600 dark:text-indigo-400" />
          <h2 className="mt-4 font-semibold">Untuk Siapa</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pelajar, mahasiswa, pekerja, dan siapa pun yang ingin meningkatkan kemampuan Bahasa
            Inggris mereka.
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <Heart className="size-8 text-indigo-600 dark:text-indigo-400" />
          <h2 className="mt-4 font-semibold">Pendekatan Kami</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Penjelasan dalam Bahasa Indonesia, contoh nyata, dan latihan yang interaktif serta
            konsisten.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-4 text-muted-foreground">
        <p>
          Materi pembelajaran kami disusun berdasarkan kerangka CEFR (Common European Framework of
          Reference for Languages) yang terdiri dari enam level: Pre-A1, A1, A2, B1, B2, dan C1.
          Setiap level dirancang agar Anda dapat maju secara bertahap dengan fondasi yang kuat di
          setiap tahap.
        </p>
        <p>
          Kami percaya bahwa konsistensi kecil setiap hari lebih efektif dibanding belajar secara
          intensif namun tidak teratur. Karena itu, kami menghadirkan sistem XP, streak harian, dan
          lencana pencapaian untuk membantu Anda membangun kebiasaan belajar yang berkelanjutan.
        </p>
      </div>
    </div>
  );
}
