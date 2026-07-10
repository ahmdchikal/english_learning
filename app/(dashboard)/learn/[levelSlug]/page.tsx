import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { EmptyState } from "@/components/common/empty-state";
import { Progress } from "@/components/ui/progress";
import { getLevelWithUnits } from "@/lib/data/learn";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ levelSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { levelSlug } = await params;
  const result = await getLevelWithUnits(levelSlug);
  return { title: result ? result.level.title : "Level" };
}

export default async function LevelUnitsPage({ params }: PageProps) {
  const { levelSlug } = await params;
  const result = await getLevelWithUnits(levelSlug);

  if (!result) notFound();

  const { level, units } = result;

  return (
    <PageContainer>
      <Breadcrumbs items={[{ label: "Belajar", href: "/learn" }, { label: level.title }]} />
      <PageHeader title={level.title} description={level.description} />

      {units.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Belum ada unit"
          description="Unit untuk level ini belum ditambahkan."
        />
      ) : (
        <div className="space-y-3">
          {units.map((unit, index) => {
            const content = (
              <div
                className={cn(
                  "flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-shadow sm:p-5",
                  unit.unlocked ? "hover:shadow-md" : "opacity-70"
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600/10 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">{unit.title}</h2>
                  <p className="truncate text-sm text-muted-foreground">{unit.description}</p>
                  {unit.unlocked && unit.totalLessons > 0 && (
                    <div className="mt-2 max-w-xs">
                      <Progress
                        value={Math.round((unit.completedLessons / unit.totalLessons) * 100)}
                        indicatorClassName="bg-emerald-500"
                      />
                    </div>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">
                    {unit.completedLessons}/{unit.totalLessons} pelajaran
                  </p>
                  {unit.unlocked ? (
                    unit.completedLessons === unit.totalLessons && unit.totalLessons > 0 ? (
                      <CheckCircle2 className="mt-1 ml-auto size-5 text-emerald-500" />
                    ) : (
                      <ChevronRight className="mt-1 ml-auto size-5 text-muted-foreground" />
                    )
                  ) : (
                    <Lock className="mt-1 ml-auto size-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            );

            return unit.unlocked ? (
              <Link key={unit.id} href={`/learn/${level.slug}/${unit.slug}`}>
                {content}
              </Link>
            ) : (
              <div key={unit.id} aria-disabled className="cursor-not-allowed">
                {content}
              </div>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
