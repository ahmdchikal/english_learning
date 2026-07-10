import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LEVEL_CATALOG } from "@/lib/constants/level-catalog";
import type { Level } from "@/types/database";

export const metadata: Metadata = {
  title: "Level Belajar",
  description: "Jelajahi enam level belajar Bahasa Inggris berbasis CEFR, dari Pre-A1 hingga C1.",
  alternates: { canonical: "/levels" },
};

export const dynamic = "force-dynamic";

async function getPublishedLevels(): Promise<Level[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("levels")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });
    return (data as Level[]) ?? [];
  } catch {
    return [];
  }
}

interface DisplayLevel {
  slug: string;
  cefr: string;
  title: string;
  description: string;
}

function toDisplayLevels(levels: Level[]): DisplayLevel[] {
  return levels.map((level) => ({
    slug: level.slug,
    cefr: level.cefr_code,
    title: level.title,
    description: level.description,
  }));
}

const FALLBACK_LEVELS: DisplayLevel[] = LEVEL_CATALOG.map((level) => ({
  slug: level.slug,
  cefr: level.cefr,
  title: level.name,
  description: level.description,
}));

export default async function LevelsPage() {
  const levels = await getPublishedLevels();
  const hasData = levels.length > 0;
  const displayLevels = hasData ? toDisplayLevels(levels) : FALLBACK_LEVELS;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Level Belajar EnglishPath</h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
          Enam level berbasis CEFR yang membawa Anda dari pemula absolut hingga mahir. Daftar untuk
          mulai belajar dan melacak progres Anda di setiap level.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {displayLevels.map(({ slug, cefr, title, description }, index) => {
          const locked = index > 0;

          return (
            <div
              key={slug}
              className="bg-card flex flex-col gap-4 rounded-2xl border p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                  {cefr}
                </span>
                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="text-muted-foreground mt-1 max-w-xl text-sm">{description}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                {locked && (
                  <span className="bg-muted text-muted-foreground flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
                    <Lock className="size-3" /> Perlu daftar
                  </span>
                )}
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Mulai
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {!hasData && (
        <p className="text-muted-foreground mt-8 text-center text-sm">
          Menampilkan gambaran umum level. Daftar untuk melihat unit dan pelajaran lengkap.
        </p>
      )}
    </div>
  );
}
