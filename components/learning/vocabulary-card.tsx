import { PronunciationButton } from "@/components/learning/pronunciation-button";
import { Badge } from "@/components/ui/badge";
import type { Vocabulary } from "@/types/database";

export function VocabularyCard({ item }: { item: Vocabulary }) {
  return (
    <div className="bg-card rounded-2xl border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{item.english_word}</h3>
            <Badge variant="secondary" className="text-[10px]">
              {item.word_type}
            </Badge>
          </div>
          {item.phonetic && <p className="text-muted-foreground text-xs">/{item.phonetic}/</p>}
        </div>
        <PronunciationButton text={item.english_word} size="icon-sm" />
      </div>
      <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
        {item.indonesian_meaning}
      </p>
      {item.example_sentence && (
        <div className="bg-muted/50 mt-3 rounded-xl p-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm italic">&ldquo;{item.example_sentence}&rdquo;</p>
            <PronunciationButton text={item.example_sentence} size="icon-sm" />
          </div>
          {item.example_translation && (
            <p className="text-muted-foreground mt-1 text-xs">{item.example_translation}</p>
          )}
        </div>
      )}
    </div>
  );
}
