"use client";

import { useState } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeakingPractice } from "@/components/speaking/speaking-practice";
import { shuffleArray } from "@/lib/utils/shuffle";
import type { SpeakingQuestion } from "@/lib/data/practice";

export function SpeakingPracticeHub({ questions }: { questions: SpeakingQuestion[] }) {
  const [order, setOrder] = useState(() => shuffleArray(questions));
  const [index, setIndex] = useState(0);

  const question = order[index % order.length];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{question.lesson?.title}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setOrder(shuffleArray(questions));
            setIndex(0);
          }}
        >
          <Shuffle className="size-4" />
          Kalimat Lain
        </Button>
      </div>

      <SpeakingPractice key={question.id} lessonId={question.lesson_id ?? ""} targetText={question.prompt} />

      <div className="mt-4 flex justify-center">
        <Button type="button" variant="ghost" onClick={() => setIndex((i) => i + 1)}>
          Lanjut ke kalimat berikutnya
        </Button>
      </div>
    </div>
  );
}
