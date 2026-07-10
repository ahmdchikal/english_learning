"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, XCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PronunciationButton } from "@/components/learning/pronunciation-button";
import { shuffleArray } from "@/lib/utils/shuffle";
import { cn } from "@/lib/utils";
import type { ListeningQuestion } from "@/lib/data/practice";

export function ListeningPractice({ questions }: { questions: ListeningQuestion[] }) {
  const [order] = useState(() => shuffleArray(questions));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const question = order[index % order.length];
  const isCorrect = revealed && selected === question.correct_answer;

  function handleNext() {
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  function handleCheck() {
    if (!selected) return;
    setRevealed(true);
    if (selected === question.correct_answer) {
      setCorrectCount((c) => c + 1);
    }
  }

  const shuffledOptions = useMemo(() => shuffleArray(question.options), [question]);

  return (
    <div>
      <div className="text-muted-foreground mb-4 flex items-center justify-between text-sm">
        <span>
          Soal {(index % order.length) + 1} dari {order.length}
        </span>
        <span>Benar: {correctCount}</span>
      </div>

      <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-center gap-3 rounded-xl bg-indigo-50 p-6 dark:bg-indigo-500/10">
          <Headphones className="size-6 text-indigo-600 dark:text-indigo-400" />
          <PronunciationButton
            text={question.audio_text ?? question.prompt}
            size="default"
            className="w-auto gap-2 px-4"
          />
        </div>
        <p className="text-muted-foreground mt-3 text-center text-sm">
          {question.instruction || question.prompt}
        </p>

        <RadioGroup
          value={selected ?? ""}
          onValueChange={setSelected}
          disabled={revealed}
          className="mt-4 gap-2"
        >
          {shuffledOptions.map((option) => (
            <Label
              key={option.id}
              htmlFor={option.id}
              className={cn(
                "hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-xl border p-3",
                revealed &&
                  option.option_text === question.correct_answer &&
                  "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
                revealed &&
                  selected === option.option_text &&
                  option.option_text !== question.correct_answer &&
                  "border-destructive bg-destructive/10"
              )}
            >
              <RadioGroupItem value={option.option_text} id={option.id} />
              {option.option_text}
            </Label>
          ))}
        </RadioGroup>

        {revealed && (
          <div
            className={cn(
              "mt-4 flex items-start gap-2 rounded-xl p-3 text-sm",
              isCorrect
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {isCorrect ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            ) : (
              <XCircle className="mt-0.5 size-4 shrink-0" />
            )}
            <div>
              <p className="font-medium">
                {isCorrect ? "Benar!" : `Jawaban yang benar: ${question.correct_answer}`}
              </p>
              {question.explanation && <p className="mt-0.5 opacity-90">{question.explanation}</p>}
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          {!revealed ? (
            <Button type="button" onClick={handleCheck} disabled={!selected}>
              Periksa Jawaban
            </Button>
          ) : (
            <Button type="button" onClick={handleNext}>
              Soal Berikutnya
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
