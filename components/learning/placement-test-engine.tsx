"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { LinkButton } from "@/components/ui/link-button";
import { submitPlacementTestAction } from "@/lib/actions/learning";
import type { PlacementQuestion } from "@/lib/data/placement";
import type { SubmitPlacementTestResult } from "@/types/database";

export function PlacementTestEngine({ questions }: { questions: PlacementQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitPlacementTestResult | null>(null);

  const question = questions[index];
  const selected = answers[question?.id] ?? "";
  const isLast = index === questions.length - 1;

  async function handleNext() {
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }

    const correctCount = questions.filter((q) => answers[q.id] === q.correct_answer).length;
    const score = Math.round((correctCount / questions.length) * 100);

    setSubmitting(true);
    const response = await submitPlacementTestAction(score);
    setSubmitting(false);

    if (!response.success || !response.data) {
      toast.error(response.message ?? "Gagal menyimpan hasil tes.");
      return;
    }

    setResult(response.data);
  }

  if (result) {
    return (
      <div className="bg-card rounded-2xl border p-6 text-center shadow-sm sm:p-8">
        <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
        <h2 className="mt-4 text-xl font-bold">Tes Selesai!</h2>
        <p className="text-muted-foreground mt-2">
          Skor Anda: <span className="text-foreground font-semibold">{result.score}</span>
        </p>
        <div className="mt-4 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-500/10">
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            Rekomendasi level untuk Anda:
          </p>
          <p className="mt-1 text-2xl font-bold text-indigo-700 dark:text-indigo-300">
            {result.recommended_level_name}
          </p>
        </div>
        <p className="bg-muted/50 text-muted-foreground mt-4 flex items-start gap-2 rounded-xl p-3 text-left text-xs">
          <Info className="mt-0.5 size-4 shrink-0" />
          Hasil ini hanya rekomendasi awal. Anda tetap dapat memulai dari level Pre-A1 atau memilih
          level lain sesuai kenyamanan Anda.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/learn">
            Mulai Belajar
            <ArrowRight className="size-4" />
          </LinkButton>
          <LinkButton href="/dashboard" variant="outline">
            Kembali ke Dashboard
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-muted-foreground mb-2 flex items-center justify-between text-sm">
        <span>
          Soal {index + 1} dari {questions.length}
        </span>
        <span>{Math.round(((index + 1) / questions.length) * 100)}%</span>
      </div>
      <Progress
        value={((index + 1) / questions.length) * 100}
        indicatorClassName="bg-indigo-600"
        className="mb-6"
      />

      <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
        <p className="text-lg font-semibold">{question.prompt}</p>
        {question.instruction && (
          <p className="text-muted-foreground mt-1 text-sm">{question.instruction}</p>
        )}

        <RadioGroup
          value={selected}
          onValueChange={(value) => setAnswers((prev) => ({ ...prev, [question.id]: value }))}
          className="mt-4 gap-2"
        >
          {question.options.map((option) => (
            <Label
              key={option.id}
              htmlFor={option.id}
              className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-xl border p-3 data-checked:border-indigo-500 data-checked:bg-indigo-50 dark:data-checked:bg-indigo-500/10"
              data-checked={selected === option.option_text || undefined}
            >
              <RadioGroupItem value={option.option_text} id={option.id} />
              {option.option_text}
            </Label>
          ))}
        </RadioGroup>

        <div className="mt-5 flex justify-end">
          <Button type="button" onClick={handleNext} disabled={!selected || submitting}>
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {isLast ? "Lihat Hasil" : "Selanjutnya"}
            {!submitting && <ArrowRight className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
