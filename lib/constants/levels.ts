export const CEFR_ORDER = ["pre-a1", "a1", "a2", "b1", "b2", "c1"] as const;

export const PLACEMENT_SCORE_TO_LEVEL: { max: number; slug: string; label: string }[] = [
  { max: 20, slug: "pre-a1", label: "Pre-A1" },
  { max: 40, slug: "a1", label: "A1" },
  { max: 55, slug: "a2", label: "A2" },
  { max: 70, slug: "b1", label: "B1" },
  { max: 85, slug: "b2", label: "B2" },
  { max: 100, slug: "c1", label: "C1" },
];

export function recommendLevelFromScore(score: number) {
  return (
    PLACEMENT_SCORE_TO_LEVEL.find((entry) => score <= entry.max) ?? PLACEMENT_SCORE_TO_LEVEL[0]
  );
}

export const LEVEL_UNLOCK_COMPLETION_THRESHOLD = 0.8;
export const LEVEL_UNLOCK_AVG_SCORE_THRESHOLD = 70;
export const QUIZ_PASS_SCORE = 70;
