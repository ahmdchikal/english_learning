import type { Lesson, Unit, UserLessonProgress } from "@/types/database";

export interface ProgressMap {
  [lessonId: string]: UserLessonProgress | undefined;
}

export function toProgressMap(rows: UserLessonProgress[]): ProgressMap {
  const map: ProgressMap = {};
  for (const row of rows) {
    map[row.lesson_id] = row;
  }
  return map;
}

export function calculateUnitCompletion(lessons: Lesson[], progress: ProgressMap): number {
  if (lessons.length === 0) return 0;
  const completed = lessons.filter((lesson) => progress[lesson.id]?.status === "completed").length;
  return Math.round((completed / lessons.length) * 100);
}

export function calculateLevelCompletion(
  units: Unit[],
  lessonsByUnit: Record<string, Lesson[]>,
  progress: ProgressMap
): number {
  const allLessons = units.flatMap((unit) => lessonsByUnit[unit.id] ?? []);
  if (allLessons.length === 0) return 0;
  const completed = allLessons.filter((lesson) => progress[lesson.id]?.status === "completed").length;
  return Math.round((completed / allLessons.length) * 100);
}

export function findNextLesson(lessons: Lesson[], progress: ProgressMap): Lesson | null {
  const sorted = [...lessons].sort((a, b) => a.order_index - b.order_index);
  const nextIncomplete = sorted.find((lesson) => progress[lesson.id]?.status !== "completed");
  return nextIncomplete ?? null;
}

export function averageQuizScore(progress: UserLessonProgress[]): number {
  const scored = progress.filter((p) => typeof p.best_quiz_score === "number");
  if (scored.length === 0) return 0;
  const total = scored.reduce((sum, p) => sum + (p.best_quiz_score ?? 0), 0);
  return Math.round(total / scored.length);
}

export function bestSpeakingScore(progress: UserLessonProgress[]): number {
  const scores = progress
    .map((p) => p.best_speaking_score)
    .filter((score): score is number => typeof score === "number");
  return scores.length > 0 ? Math.max(...scores) : 0;
}
