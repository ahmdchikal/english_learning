import type { Metadata } from "next";
import Link from "next/link";
import { Lock, CheckCircle2, ChevronRight } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Progress } from "@/components/ui/progress";
import { getLevelsOverview } from "@/lib/data/learn";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Belajar",
};

export default async function LearnPage() {
  const levels = await getLevelsOverview();

  return (
    <PageContainer>
      <PageHeader
        title="Belajar"
        description="Pilih level untuk melihat unit dan pelajaran yang tersedia."
      />

      {levels.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Belum ada materi belajar"
          description="Konten belum ditambahkan oleh administrator. Silakan kembali lagi nanti."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {levels.map((level) => {
            const content = (
              <div
                className={cn(
                  "bg-card flex h-full flex-col gap-3 rounded-2xl border p-5 shadow-sm transition-shadow",
                  level.unlocked ? "hover:shadow-md" : "opacity-70"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                      {level.cefr_code}
                    </span>
                    <div>
                      <h2 className="font-semibold">{level.title}</h2>
                      <p className="text-muted-foreground text-xs">
                        {level.totalLessons} pelajaran
                      </p>
                    </div>
                  </div>
                  {level.unlocked ? (
                    level.progressPercent === 100 ? (
                      <CheckCircle2 className="size-5 text-emerald-500" />
                    ) : (
                      <ChevronRight className="text-muted-foreground size-5" />
                    )
                  ) : (
                    <Lock className="text-muted-foreground size-5" />
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{level.description}</p>
                {level.unlocked && level.totalLessons > 0 && (
                  <div>
                    <Progress value={level.progressPercent} indicatorClassName="bg-emerald-500" />
                    <p className="text-muted-foreground mt-1 text-xs">
                      {level.completedLessons}/{level.totalLessons} pelajaran selesai
                    </p>
                  </div>
                )}
                {!level.unlocked && (
                  <p className="text-muted-foreground text-xs font-medium">
                    Selesaikan 80% level sebelumnya dengan skor rata-rata 70 untuk membuka level
                    ini.
                  </p>
                )}
              </div>
            );

            return level.unlocked ? (
              <Link key={level.id} href={`/learn/${level.slug}`}>
                {content}
              </Link>
            ) : (
              <div key={level.id} aria-disabled className="cursor-not-allowed">
                {content}
              </div>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
