"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PronunciationButton } from "@/components/learning/pronunciation-button";
import { getMatchingLeftSide, parseScrambledWords } from "@/lib/quiz/answer-format";
import { cn } from "@/lib/utils";
import type { QuestionWithOptions } from "@/lib/data/lesson";

interface QuestionAnswerInputProps {
  question: QuestionWithOptions;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  showFeedback?: "correct" | "incorrect" | null;
}

export function QuestionAnswerInput({
  question,
  value,
  onChange,
  disabled,
  showFeedback,
}: QuestionAnswerInputProps) {
  if (question.type === "multiple_choice" || question.type === "listening" || question.type === "true_false") {
    return (
      <div className="space-y-3">
        {question.type === "listening" && question.audio_text && (
          <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
            <PronunciationButton text={question.audio_text} />
            <span className="text-sm text-muted-foreground">Klik untuk mendengarkan audio</span>
          </div>
        )}
        <RadioGroup value={value} onValueChange={onChange} disabled={disabled} className="gap-2">
          {question.options.map((option) => (
            <Label
              key={option.id}
              htmlFor={option.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50",
                value === option.option_text && "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10",
                showFeedback &&
                  value === option.option_text &&
                  (showFeedback === "correct"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                    : "border-destructive bg-destructive/10")
              )}
            >
              <RadioGroupItem value={option.option_text} id={option.id} />
              {option.option_text}
            </Label>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (question.type === "sentence_arrangement") {
    return <SentenceArrangementInput question={question} value={value} onChange={onChange} disabled={disabled} />;
  }

  if (question.type === "matching") {
    const leftSide = getMatchingLeftSide(question.correct_answer);
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
          <span className="font-semibold">{leftSide}</span>
          <PronunciationButton text={leftSide} size="icon-sm" />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Tulis arti dalam Bahasa Indonesia"
        />
      </div>
    );
  }

  // fill_blank, translation, speaking (text fallback)
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder="Ketik jawaban Anda"
    />
  );
}

function SentenceArrangementInput({
  question,
  value,
  onChange,
  disabled,
}: {
  question: QuestionWithOptions;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const words = useMemo(() => parseScrambledWords(question.prompt), [question.prompt]);
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);

  const selectedWords = usedIndexes.map((i) => words[i]);

  function selectWord(index: number) {
    if (disabled || usedIndexes.includes(index)) return;
    const nextUsed = [...usedIndexes, index];
    setUsedIndexes(nextUsed);
    onChange(nextUsed.map((i) => words[i]).join(" "));
  }

  function removeWord(position: number) {
    if (disabled) return;
    const nextUsed = usedIndexes.filter((_, i) => i !== position);
    setUsedIndexes(nextUsed);
    onChange(nextUsed.map((i) => words[i]).join(" "));
  }

  return (
    <div className="space-y-3">
      <div className="flex min-h-12 flex-wrap gap-2 rounded-xl border bg-muted/30 p-3">
        {selectedWords.length === 0 && (
          <span className="text-sm text-muted-foreground">Klik kata di bawah untuk menyusun kalimat</span>
        )}
        {selectedWords.map((word, position) => (
          <button
            key={`${word}-${position}`}
            type="button"
            disabled={disabled}
            onClick={() => removeWord(position)}
            className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            {word}
            {!disabled && <X className="size-3" />}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {words.map((word, index) => (
          <Button
            key={`${word}-${index}`}
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled || usedIndexes.includes(index)}
            onClick={() => selectWord(index)}
          >
            {word}
          </Button>
        ))}
      </div>
      {!disabled && value && (
        <Button type="button" variant="ghost" size="sm" onClick={() => { setUsedIndexes([]); onChange(""); }}>
          Atur ulang
        </Button>
      )}
    </div>
  );
}
