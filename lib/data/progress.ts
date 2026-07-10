import { createClient } from "@/lib/supabase/server";
import { lastNDays } from "@/lib/utils/format";
import type { DailyActivity, Lesson, Level, Unit, UserLessonProgress } from "@/types/database";

export interface LevelProgressSummary extends Level {
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
}

export interface ImprovementArea {
  lessonId: string;
  lessonTitle: string;
  incorrectCount: number;
}

export interface ProgressPageData {
  totalLessonsCompleted: number;
  averageQuizScore: number;
  highestSpeakingScore: number;
  currentStreak: number;
  longestStreak: number;
  levels: LevelProgressSummary[];
  recentActivities: DailyActivity[];
  improvementAreas: ImprovementArea[];
}

export async function getProgressPageData(userId: string): Promise<ProgressPageData> {
  const supabase = await createClient();

  const [profileRes, progressRes, levelsRes, activitiesRes] = await Promise.all([
    supabase.from("profiles").select("current_streak, longest_streak").eq("id", userId).single(),
    supabase.from("user_lesson_progress").select("*").eq("user_id", userId),
    supabase.from("levels").select("*").eq("is_published", true).order("order_index", { ascending: true }),
    supabase
      .from("daily_activities")
      .select("*")
      .eq("user_id", userId)
      .gte("activity_date", lastNDays(30)[0])
      .order("activity_date", { ascending: true }),
  ]);

  const progress = (progressRes.data as UserLessonProgress[]) ?? [];
  const levels = (levelsRes.data as Level[]) ?? [];

  const { data: unitsData } = await supabase
    .from("units")
    .select("*")
    .in("level_id", levels.map((l) => l.id))
    .eq("is_published", true);
  const units = (unitsData as Unit[]) ?? [];

  const { data: lessonsData } = await supabase
    .from("lessons")
    .select("id, unit_id")
    .in("unit_id", units.map((u) => u.id))
    .eq("is_published", true);
  const lessons = (lessonsData as Pick<Lesson, "id" | "unit_id">[]) ?? [];

  const completedLessonIds = new Set(progress.filter((p) => p.status === "completed").map((p) => p.lesson_id));

  const levelSummaries: LevelProgressSummary[] = levels.map((level) => {
    const unitIds = new Set(units.filter((u) => u.level_id === level.id).map((u) => u.id));
    const levelLessons = lessons.filter((l) => unitIds.has(l.unit_id));
    const completedLessons = levelLessons.filter((l) => completedLessonIds.has(l.id)).length;
    return {
      ...level,
      totalLessons: levelLessons.length,
      completedLessons,
      progressPercent: levelLessons.length > 0 ? Math.round((completedLessons / levelLessons.length) * 100) : 0,
    };
  });

  const scored = progress.filter((p) => typeof p.best_quiz_score === "number");
  const averageQuizScore =
    scored.length > 0 ? Math.round(scored.reduce((sum, p) => sum + (p.best_quiz_score ?? 0), 0) / scored.length) : 0;

  const speakingScores = progress
    .map((p) => p.best_speaking_score)
    .filter((score): score is number => typeof score === "number");
  const highestSpeakingScore = speakingScores.length > 0 ? Math.max(...speakingScores) : 0;

  const { data: incorrectAnswers } = await supabase
    .from("quiz_answers")
    .select("question_id, attempt:quiz_attempts!inner(user_id, lesson_id)")
    .eq("is_correct", false)
    .eq("attempt.user_id", userId);

  const lessonIdsWithIncorrect = new Map<string, number>();
  for (const row of (incorrectAnswers as { attempt: { lesson_id: string } | { lesson_id: string }[] }[]) ?? []) {
    const attemptInfo = Array.isArray(row.attempt) ? row.attempt[0] : row.attempt;
    const lessonId = attemptInfo?.lesson_id;
    if (!lessonId) continue;
    lessonIdsWithIncorrect.set(lessonId, (lessonIdsWithIncorrect.get(lessonId) ?? 0) + 1);
  }

  let improvementAreas: ImprovementArea[] = [];
  if (lessonIdsWithIncorrect.size > 0) {
    const { data: lessonTitles } = await supabase
      .from("lessons")
      .select("id, title")
      .in("id", Array.from(lessonIdsWithIncorrect.keys()));

    improvementAreas = ((lessonTitles as Pick<Lesson, "id" | "title">[]) ?? [])
      .map((lesson) => ({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        incorrectCount: lessonIdsWithIncorrect.get(lesson.id) ?? 0,
      }))
      .sort((a, b) => b.incorrectCount - a.incorrectCount)
      .slice(0, 5);
  }

  return {
    totalLessonsCompleted: completedLessonIds.size,
    averageQuizScore,
    highestSpeakingScore,
    currentStreak: profileRes.data?.current_streak ?? 0,
    longestStreak: profileRes.data?.longest_streak ?? 0,
    levels: levelSummaries,
    recentActivities: (activitiesRes.data as DailyActivity[]) ?? [],
    improvementAreas,
  };
}
