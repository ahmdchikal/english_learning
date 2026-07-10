"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionAnswerInput } from "@/components/learning/question-answer-input";
import { isAnswerCorrect } from "@/lib/quiz/answer-format";
import type { QuestionWithOptions } from "@/lib/data/lesson";

export function PracticeExercises({ questions }: { questions: QuestionWithOptions[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  if (questions.length === 0) return null;

  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const value = answers[question.id] ?? "";
        const isChecked = checked[question.id];
        const correct = isChecked && isAnswerCorrect(question, value);

        return (
          <div key={question.id} className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
            <p className="text-xs font-medium text-muted-foreground">Latihan {index + 1}</p>
            <p className="mt-1 font-medium">{question.prompt}</p>
            {question.instruction && (
              <p className="mt-1 text-sm text-muted-foreground">{question.instruction}</p>
            )}

            <div className="mt-3">
              <QuestionAnswerInput
                question={question}
                value={value}
                onChange={(v) => setAnswers((prev) => ({ ...prev, [question.id]: v }))}
                disabled={isChecked}
                showFeedback={isChecked ? (correct ? "correct" : "incorrect") : null}
              />
            </div>

            {isChecked && (
              <div
                className={
                  correct
                    ? "mt-3 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "mt-3 flex items-start gap-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive"
                }
              >
                {correct ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                ) : (
                  <XCircle className="mt-0.5 size-4 shrink-0" />
                )}
                <div>
                  <p className="font-medium">
                    {correct ? "Benar!" : `Kurang tepat. Jawaban yang benar: ${question.correct_answer}`}
                  </p>
                  {question.explanation && <p className="mt-0.5 opacity-90">{question.explanation}</p>}
                </div>
              </div>
            )}

            <div className="mt-3 flex gap-2">
              {!isChecked ? (
                <Button
                  type="button"
                  size="sm"
                  disabled={!value}
                  onClick={() => setChecked((prev) => ({ ...prev, [question.id]: true }))}
                >
                  Cek Jawaban
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setChecked((prev) => ({ ...prev, [question.id]: false }));
                    setAnswers((prev) => ({ ...prev, [question.id]: "" }));
                  }}
                >
                  Coba Lagi
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
