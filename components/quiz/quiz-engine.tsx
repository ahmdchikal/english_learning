"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizProgressBar } from "@/components/quiz/quiz-progress-bar";
import { QuestionAnswerInput } from "@/components/learning/question-answer-input";
import { PronunciationButton } from "@/components/learning/pronunciation-button";
import { buildSubmissionValue, isAnswerCorrect } from "@/lib/quiz/answer-format";
import { shuffleArray } from "@/lib/utils/shuffle";
import { submitQuizAttemptAction } from "@/lib/actions/learning";
import type { QuestionWithOptions } from "@/lib/data/lesson";

function shuffleQuestionOptions(question: QuestionWithOptions): QuestionWithOptions {
  return { ...question, options: shuffleArray(question.options) };
}

export function QuizEngine({
  lessonId,
  questions,
}: {
  lessonId: string;
  questions: QuestionWithOptions[];
}) {
  const router = useRouter();

  const [shuffledQuestions] = useState(() => shuffleArray(questions).map(shuffleQuestionOptions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = shuffledQuestions[currentIndex];
  const isLastQuestion = currentIndex === shuffledQuestions.length - 1;
  const currentValue = answers[currentQuestion.id] ?? "";
  const currentCorrect = revealed && isAnswerCorrect(currentQuestion, currentValue);

  const answeredCount = useMemo(
    () => shuffledQuestions.filter((q) => Boolean(answers[q.id])).length,
    [shuffledQuestions, answers]
  );

  function handleCheck() {
    if (!currentValue) return;
    setRevealed(true);
  }

  async function handleContinue() {
    if (!isLastQuestion) {
      setCurrentIndex((i) => i + 1);
      setRevealed(false);
      return;
    }

    setSubmitting(true);
    const payload = shuffledQuestions.map((question) => ({
      question_id: question.id,
      value: buildSubmissionValue(question, answers[question.id] ?? ""),
    }));

    const result = await submitQuizAttemptAction(lessonId, payload);
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message ?? "Gagal mengirim jawaban kuis.");
      return;
    }

    router.push(`/quiz/${lessonId}/result`);
  }

  return (
    <div>
      <QuizProgressBar current={currentIndex + 1} total={shuffledQuestions.length} />

      <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-lg font-semibold">{currentQuestion.prompt}</p>
          {(currentQuestion.type === "listening" || currentQuestion.type === "speaking") && (
            <PronunciationButton text={currentQuestion.audio_text ?? currentQuestion.prompt} />
          )}
        </div>
        {currentQuestion.instruction && (
          <p className="text-muted-foreground mt-1 text-sm">{currentQuestion.instruction}</p>
        )}

        <div className="mt-4">
          <QuestionAnswerInput
            question={currentQuestion}
            value={currentValue}
            onChange={(value) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))}
            disabled={revealed}
            showFeedback={revealed ? (currentCorrect ? "correct" : "incorrect") : null}
          />
        </div>

        {revealed && (
          <div
            className={
              currentCorrect
                ? "mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-destructive/10 text-destructive mt-4 flex items-start gap-2 rounded-xl p-3 text-sm"
            }
          >
            {currentCorrect ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            ) : (
              <XCircle className="mt-0.5 size-4 shrink-0" />
            )}
            <div>
              <p className="font-medium">
                {currentCorrect
                  ? "Benar!"
                  : `Kurang tepat. Jawaban yang benar: ${currentQuestion.correct_answer}`}
              </p>
              {currentQuestion.explanation && (
                <p className="mt-0.5 opacity-90">{currentQuestion.explanation}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          {!revealed ? (
            <Button type="button" onClick={handleCheck} disabled={!currentValue}>
              Periksa Jawaban
            </Button>
          ) : (
            <Button type="button" onClick={handleContinue} disabled={submitting}>
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {isLastQuestion ? "Lihat Hasil" : "Lanjutkan"}
              {!submitting && <ArrowRight className="size-4" />}
            </Button>
          )}
        </div>
      </div>

      <p className="text-muted-foreground mt-3 text-center text-xs">
        {answeredCount} dari {shuffledQuestions.length} soal telah dijawab
      </p>
    </div>
  );
}
