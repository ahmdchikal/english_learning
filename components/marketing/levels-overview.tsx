import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LEVEL_CATALOG } from "@/lib/constants/level-catalog";

export function LevelsOverview() {
  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">6 Level Berbasis CEFR</h2>
          <p className="mt-3 text-muted-foreground">
            Mulai dari nol atau lanjutkan dari level yang sesuai dengan kemampuan Anda.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEVEL_CATALOG.map((level) => (
            <div
              key={level.slug}
              className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-sm"
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${level.color}`}
              >
                {level.cefr}
              </span>
              <div>
                <h3 className="font-semibold">{level.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{level.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/levels"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Lihat detail semua level
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
