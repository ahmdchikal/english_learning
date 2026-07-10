import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Clock, Sparkles, Lock, ChevronLeft, ChevronRight, BookOpen, Mic } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { LinkButton } from "@/components/ui/link-button";
import { VocabularyCard } from "@/components/learning/vocabulary-card";
import { LessonExampleItem } from "@/components/learning/lesson-example-item";
import { PracticeExercises } from "@/components/learning/practice-exercises";
import { SpeakingPractice } from "@/components/speaking/speaking-practice";
import { getLessonDetail } from "@/lib/data/lesson";
import { markLessonStartedAction } from "@/lib/actions/learning";
import { getCurrentUser } from "@/lib/data/current-user";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const detail = await getLessonDetail(lessonId);
  return { title: detail ? detail.lesson.title : "Pelajaran" };
}

function renderParagraphs(text: string) {
  return text
    .split(/\n\n+/)
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className="leading-relaxed">
        {paragraph}
      </p>
    ));
}

export default async function LessonPage({ params }: PageProps) {
  const { lessonId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?redirectTo=/lesson/${lessonId}`);

  const detail = await getLessonDetail(lessonId);
  if (!detail) notFound();

  const { lesson, unit, level, vocabulary, examples, questions, progress, unlocked, previousLessonId, nextLessonId } =
    detail;

  if (!unlocked) {
    return (
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Belajar", href: "/learn" },
            { label: level.title, href: `/learn/${level.slug}` },
            { label: unit.title, href: `/learn/${level.slug}/${unit.slug}` },
          ]}
        />
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-muted/30 px-6 py-16 text-center">
          <Lock className="size-10 text-muted-foreground" />
          <h1 className="text-xl font-semibold">Pelajaran ini masih terkunci</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Selesaikan pelajaran sebelumnya terlebih dahulu untuk membuka pelajaran ini.
          </p>
          <LinkButton href={`/learn/${level.slug}/${unit.slug}`}>Kembali ke Unit</LinkButton>
        </div>
      </PageContainer>
    );
  }

  await markLessonStartedAction(lessonId);

  const practiceQuestions = questions.filter((q) => q.type !== "speaking");
  const speakingQuestion = questions.find((q) => q.type === "speaking");

  return (
    <PageContainer className="max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Belajar", href: "/learn" },
          { label: level.title, href: `/learn/${level.slug}` },
          { label: unit.title, href: `/learn/${level.slug}/${unit.slug}` },
          { label: lesson.title },
        ]}
      />

      <div className="mb-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{lesson.title}</h1>
        <p className="mt-1 text-muted-foreground">{lesson.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-4" />
            {lesson.estimated_minutes} menit
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="size-4" />
            {lesson.xp_reward} XP
          </span>
          {progress?.status === "completed" && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              Selesai · Skor terbaik {progress.best_quiz_score}
            </span>
          )}
        </div>

        {lesson.learning_objectives.length > 0 && (
          <div className="mt-4 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-500/10">
            <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Tujuan Pembelajaran</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-indigo-900 dark:text-indigo-200">
              {lesson.learning_objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {lesson.explanation && (
        <section className="mb-6 space-y-3 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold">Penjelasan</h2>
          <div className="space-y-3 text-sm text-muted-foreground">{renderParagraphs(lesson.explanation)}</div>
        </section>
      )}

      {vocabulary.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">Kosakata</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {vocabulary.map((item) => (
              <VocabularyCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {examples.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">Contoh Kalimat & Dialog</h2>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <LessonExampleItem key={example.id} example={example} index={index} />
            ))}
          </div>
        </section>
      )}

      {lesson.grammar_notes && (
        <section className="mb-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold">Catatan Tata Bahasa</h2>
          <p className="mt-2 text-sm text-muted-foreground">{lesson.grammar_notes}</p>
        </section>
      )}

      {lesson.common_mistakes && (
        <section className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6 dark:border-amber-500/20 dark:bg-amber-500/10">
          <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300">Kesalahan Umum</h2>
          <p className="mt-2 text-sm text-amber-900 dark:text-amber-200">{lesson.common_mistakes}</p>
        </section>
      )}

      {practiceQuestions.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">Latihan Soal</h2>
          <PracticeExercises questions={practiceQuestions} />
        </section>
      )}

      {speakingQuestion && (
        <section className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Mic className="size-5" />
            Tantangan Berbicara
          </h2>
          <SpeakingPractice
            lessonId={lesson.id}
            targetText={speakingQuestion.prompt}
            initialBestScore={progress?.best_speaking_score ?? null}
          />
        </section>
      )}

      <section className="mb-6 rounded-2xl border bg-gradient-to-br from-indigo-600 to-indigo-700 p-5 text-center text-white shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold">Siap menguji pemahamanmu?</h2>
        <p className="mt-1 text-sm text-indigo-100">
          Kerjakan kuis untuk menandai pelajaran ini selesai dan mendapatkan XP.
        </p>
        <LinkButton href={`/quiz/${lesson.id}`} variant="secondary" className="mt-4">
          <BookOpen className="size-4" />
          Tandai Selesai &amp; Kerjakan Kuis
        </LinkButton>
      </section>

      <div className="flex items-center justify-between border-t pt-4">
        {previousLessonId ? (
          <LinkButton href={`/lesson/${previousLessonId}`} variant="outline">
            <ChevronLeft className="size-4" />
            Sebelumnya
          </LinkButton>
        ) : (
          <span />
        )}
        {nextLessonId ? (
          <LinkButton href={`/lesson/${nextLessonId}`} variant="outline">
            Selanjutnya
            <ChevronRight className="size-4" />
          </LinkButton>
        ) : (
          <span />
        )}
      </div>
    </PageContainer>
  );
}
