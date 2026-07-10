"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { PronunciationButton } from "@/components/learning/pronunciation-button";
import { cn } from "@/lib/utils";
import type { VocabularyWithLesson } from "@/lib/data/practice";

export function VocabularyFlashcard({ item }: { item: VocabularyWithLesson }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      className={cn(
        "flex min-h-40 flex-col justify-between rounded-2xl border p-4 text-left shadow-sm transition-colors",
        flipped ? "bg-indigo-50 dark:bg-indigo-500/10" : "bg-card"
      )}
      aria-pressed={flipped}
    >
      <div className="flex items-start justify-between gap-2">
        {!flipped ? (
          <div>
            <p className="text-lg font-semibold">{item.english_word}</p>
            {item.phonetic && <p className="text-muted-foreground text-xs">/{item.phonetic}/</p>}
          </div>
        ) : (
          <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
            {item.indonesian_meaning}
          </p>
        )}
        <div onClick={(e) => e.stopPropagation()}>
          <PronunciationButton text={item.english_word} size="icon-sm" />
        </div>
      </div>
      {item.lesson && <p className="text-muted-foreground mt-2 text-xs">{item.lesson.title}</p>}
      <div className="text-muted-foreground mt-2 flex items-center gap-1 self-end text-xs">
        <RotateCw className="size-3" />
        Klik untuk membalik
      </div>
    </button>
  );
}
