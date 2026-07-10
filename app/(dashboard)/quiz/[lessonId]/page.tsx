import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Lock, ListChecks } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { LinkButton } from "@/components/ui/link-button";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import { getLessonDetail } from "@/lib/data/lesson";
import { getCurrentUser } from "@/lib/data/current-user";
import { QUIZ_PASS_SCORE } from "@/lib/constants/levels";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const detail = await getLessonDetail(lessonId);
  return { title: detail ? `Kuis: ${detail.lesson.title}` : "Kuis" };
}

export default async function QuizPage({ params }: PageProps) {
  const { lessonId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?redirectTo=/quiz/${lessonId}`);

  const detail = await getLessonDetail(lessonId);
  if (!detail) notFound();

  const { lesson, unit, level, questions, unlocked } = detail;
  const quizQuestions = questions.filter((q) => q.type !== "speaking");

  if (!unlocked) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-muted/30 px-6 py-16 text-center">
          <Lock className="size-10 text-muted-foreground" />
          <h1 className="text-xl font-semibold">Pelajaran ini masih terkunci</h1>
          <LinkButton href="/learn">Kembali ke Daftar Belajar</LinkButton>
        </div>
      </PageContainer>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-muted/30 px-6 py-16 text-center">
          <ListChecks className="size-10 text-muted-foreground" />
          <h1 className="text-xl font-semibold">Kuis belum tersedia</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Soal untuk pelajaran ini belum ditambahkan oleh administrator.
          </p>
          <LinkButton href={`/lesson/${lesson.id}`}>Kembali ke Pelajaran</LinkButton>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Belajar", href: "/learn" },
          { label: level.title, href: `/learn/${level.slug}` },
          { label: unit.title, href: `/learn/${level.slug}/${unit.slug}` },
          { label: lesson.title, href: `/lesson/${lesson.id}` },
          { label: "Kuis" },
        ]}
      />

      <div className="mb-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <h1 className="text-xl font-bold">Kuis: {lesson.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {quizQuestions.length} soal · Skor minimal untuk lulus: {QUIZ_PASS_SCORE}
        </p>
      </div>

      <QuizEngine lessonId={lesson.id} questions={quizQuestions} />
    </PageContainer>
  );
}
