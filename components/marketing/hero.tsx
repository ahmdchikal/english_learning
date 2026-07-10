import { ArrowRight, BookOpen, Flame, Star, Trophy } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export function Hero() {
  return (
    <section className="dark:via-background dark:to-background relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white dark:from-indigo-950/30">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:py-28">
        <div className="space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
            Untuk pelajar Indonesia · Pre-A1 sampai C1
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Belajar Bahasa Inggris dari Nol,
            <span className="text-indigo-600 dark:text-indigo-400"> Satu Langkah Setiap Hari.</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-lg text-lg lg:mx-0">
            Pelajaran interaktif, kuis, dan latihan berbicara yang dirancang khusus untuk penutur
            Bahasa Indonesia — lengkap dengan pelacakan progres, XP, dan streak harian.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <LinkButton href="/register" size="lg" className="h-12 px-6 text-base">
              Mulai Belajar Gratis
              <ArrowRight className="size-4" />
            </LinkButton>
            <LinkButton href="/levels" size="lg" variant="outline" className="h-12 px-6 text-base">
              Jelajahi Pelajaran
            </LinkButton>
          </div>
          <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-4 pt-2 text-sm lg:justify-start">
            <span className="flex items-center gap-1.5">
              <Trophy className="size-4 text-amber-500" /> Sistem XP & Lencana
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="size-4 text-orange-500" /> Streak Harian
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="size-4 text-indigo-500" /> Gratis Sepenuhnya
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="bg-card rounded-3xl border p-5 shadow-xl shadow-indigo-200/40 dark:shadow-none">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  A
                </span>
                <div>
                  <p className="text-sm font-semibold">Halo, Andi!</p>
                  <p className="text-muted-foreground text-xs">Level A1 · Pemula</p>
                </div>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                <Flame className="size-3.5" /> 5 hari
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-4">
              <div className="rounded-2xl bg-indigo-50 p-3 dark:bg-indigo-500/10">
                <p className="text-muted-foreground text-xs">Total XP</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1.240</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
                <p className="text-muted-foreground text-xs">Progres Level</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">64%</p>
              </div>
            </div>

            <div className="bg-muted/40 space-y-2 rounded-2xl border p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="size-4 text-indigo-600" />
                Lanjutkan: Simple Present Tense
              </div>
              <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                <div className="h-full w-3/5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-muted-foreground text-xs">3 dari 5 pelajaran selesai</p>
            </div>
            <p className="text-muted-foreground mt-3 text-center text-xs">
              *Pratinjau dashboard — data contoh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
