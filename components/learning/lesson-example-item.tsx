import { PronunciationButton } from "@/components/learning/pronunciation-button";
import type { LessonExample } from "@/types/database";

export function LessonExampleItem({ example, index }: { example: LessonExample; index: number }) {
  return (
    <div className="flex gap-3 rounded-2xl border bg-card p-4 shadow-sm">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-600/10 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
        {index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium">{example.english_text}</p>
          <PronunciationButton text={example.english_text} size="icon-sm" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{example.indonesian_text}</p>
        {example.explanation && (
          <p className="mt-2 text-xs text-muted-foreground italic">{example.explanation}</p>
        )}
      </div>
    </div>
  );
}
