import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, CheckCircle2, CircleDot, Circle, Clock, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { EmptyState } from "@/components/common/empty-state";
import { getUnitWithLessons } from "@/lib/data/learn";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ levelSlug: string; unitSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { levelSlug, unitSlug } = await params;
  const result = await getUnitWithLessons(levelSlug, unitSlug);
  return { title: result ? result.unit.title : "Unit" };
}

const STATUS_ICON = {
  completed: CheckCircle2,
  in_progress: CircleDot,
  not_started: Circle,
} as const;

export default async function UnitLessonsPage({ params }: PageProps) {
  const { levelSlug, unitSlug } = await params;
  const result = await getUnitWithLessons(levelSlug, unitSlug);

  if (!result) notFound();
  const { level, unit, lessons } = result;

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { label: "Belajar", href: "/learn" },
          { label: level.title, href: `/learn/${level.slug}` },
          { label: unit.title },
        ]}
      />
      <PageHeader title={unit.title} description={unit.description} />

      {lessons.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Belum ada pelajaran"
          description="Pelajaran untuk unit ini belum ditambahkan."
        />
      ) : (
        <ol className="space-y-3">
          {lessons.map((lesson, index) => {
            const StatusIcon = STATUS_ICON[lesson.status];
            const content = (
              <div
                className={cn(
                  "bg-card flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition-shadow sm:p-5",
                  lesson.unlocked ? "hover:shadow-md" : "opacity-70"
                )}
              >
                <StatusIcon
                  className={cn(
                    "size-6 shrink-0",
                    lesson.status === "completed" && "text-emerald-500",
                    lesson.status === "in_progress" && "text-indigo-500",
                    lesson.status === "not_started" && "text-muted-foreground"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-xs font-medium">Pelajaran {index + 1}</p>
                  <h2 className="font-semibold">{lesson.title}</h2>
                  <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {lesson.estimated_minutes} menit
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="size-3.5" />
                      {lesson.xp_reward} XP
                    </span>
                    {lesson.bestQuizScore !== null && (
                      <span>Skor terbaik: {lesson.bestQuizScore}</span>
                    )}
                  </div>
                </div>
                {!lesson.unlocked && <Lock className="text-muted-foreground size-5 shrink-0" />}
              </div>
            );

            return lesson.unlocked ? (
              <li key={lesson.id}>
                <Link href={`/lesson/${lesson.id}`}>{content}</Link>
              </li>
            ) : (
              <li key={lesson.id}>
                <div aria-disabled className="cursor-not-allowed">
                  {content}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </PageContainer>
  );
}
