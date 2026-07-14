import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2, XCircle, Sparkles, RotateCcw, ArrowRight, PartyPopper } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { LinkButton } from "@/components/ui/link-button";
import { getLatestQuizResult } from "@/lib/data/quiz-result";
import { getCurrentUser } from "@/lib/data/current-user";
import { getMotivationalMessage } from "@/lib/quiz/feedback";
import { QUIZ_PASS_SCORE } from "@/lib/constants/levels";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hasil Kuis",
};

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function QuizResultPage({ params }: PageProps) {
  const { lessonId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?redirectTo=/quiz/${lessonId}/result`);

  const result = await getLatestQuizResult(lessonId, user.id);
  if (!result) notFound();

  const { attempt, lesson, unit, level, incorrectAnswers, nextLessonId } = result;

  return (
    <PageContainer className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Belajar", href: "/learn" },
          { label: level.title, href: `/learn/${level.slug}` },
          { label: unit.title, href: `/learn/${level.slug}/${unit.slug}` },
          { label: lesson.title, href: `/lesson/${lesson.id}` },
          { label: "Hasil Kuis" },
        ]}
      />

      <div className="bg-card rounded-2xl border p-6 text-center shadow-sm sm:p-8">
        <div
          className={cn(
            "mx-auto flex size-24 items-center justify-center rounded-full text-3xl font-extrabold",
            attempt.passed
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {attempt.score}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {attempt.passed ? (
            <PartyPopper className="size-5 text-emerald-500" />
          ) : (
            <RotateCcw className="text-muted-foreground size-5" />
          )}
          <h1 className="text-xl font-bold">{attempt.passed ? "Kuis Lulus!" : "Belum Lulus"}</h1>
        </div>
        <p className="text-muted-foreground mt-1">
          {getMotivationalMessage(attempt.score, attempt.passed)}
        </p>
        {attempt.passed && !nextLessonId && (
          <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            🎉 Ini adalah pelajaran terakhir yang tersedia di level ini. Cek halaman Belajar untuk
            melihat level selanjutnya.
          </p>
        )}

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              {attempt.correct_answers}
            </p>
            <p className="text-muted-foreground text-xs">Benar</p>
          </div>
          <div className="bg-destructive/10 rounded-xl p-3">
            <p className="text-destructive text-lg font-bold">{attempt.incorrect_answers}</p>
            <p className="text-muted-foreground text-xs">Salah</p>
          </div>
          <div className="rounded-xl bg-indigo-50 p-3 dark:bg-indigo-500/10">
            <p className="flex items-center justify-center gap-1 text-lg font-bold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="size-4" />
              {attempt.xp_earned}
            </p>
            <p className="text-muted-foreground text-xs">XP Diperoleh</p>
          </div>
        </div>

        <p className="text-muted-foreground mt-4 text-xs">
          Skor minimal untuk lulus adalah {QUIZ_PASS_SCORE}. Skor tertinggi Anda akan selalu
          disimpan.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href={`/quiz/${lesson.id}`} variant="outline">
            <RotateCcw className="size-4" />
            Ulangi Kuis
          </LinkButton>
          {attempt.passed && nextLessonId ? (
            <LinkButton href={`/lesson/${nextLessonId}`}>
              Lanjut ke Pelajaran Berikutnya
              <ArrowRight className="size-4" />
            </LinkButton>
          ) : attempt.passed ? (
            <LinkButton href="/learn">
              Kembali ke Halaman Belajar
              <ArrowRight className="size-4" />
            </LinkButton>
          ) : (
            <LinkButton href={`/lesson/${lesson.id}`}>
              Kembali ke Pelajaran
              <ArrowRight className="size-4" />
            </LinkButton>
          )}
        </div>
      </div>

      {incorrectAnswers.length > 0 && (
        <div className="bg-card mt-6 rounded-2xl border p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold">Materi yang Perlu Ditinjau Kembali</h2>
          <ul className="mt-3 space-y-3">
            {incorrectAnswers.map((answer) => (
              <li key={answer.id} className="bg-destructive/5 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <XCircle className="text-destructive mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{answer.question.prompt}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Jawaban Anda:{" "}
                      <span className="font-medium">{answer.submitted_answer || "(kosong)"}</span>
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="mr-1 inline size-3" />
                      Jawaban benar: {answer.question.correct_answer}
                    </p>
                    {answer.question.explanation && (
                      <p className="text-muted-foreground mt-1 text-xs">
                        {answer.question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </PageContainer>
  );
}
