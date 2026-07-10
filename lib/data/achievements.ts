import { createClient } from "@/lib/supabase/server";
import type { Achievement, UserAchievement, UserLessonProgress } from "@/types/database";

export interface AchievementWithStatus extends Achievement {
  earnedAt: string | null;
  currentProgress: number;
}

export async function getAchievementsForUser(userId: string): Promise<AchievementWithStatus[]> {
  const supabase = await createClient();

  const [
    { data: achievementsData },
    { data: earnedData },
    { data: profileData },
    { data: progressData },
  ] = await Promise.all([
    supabase.from("achievements").select("*").order("requirement_value", { ascending: true }),
    supabase.from("user_achievements").select("*").eq("user_id", userId),
    supabase.from("profiles").select("longest_streak").eq("id", userId).single(),
    supabase.from("user_lesson_progress").select("*").eq("user_id", userId),
  ]);

  const achievements = (achievementsData as Achievement[]) ?? [];
  const earned = (earnedData as UserAchievement[]) ?? [];
  const earnedMap = new Map(earned.map((e) => [e.achievement_id, e.earned_at]));
  const progress = (progressData as UserLessonProgress[]) ?? [];

  const { data: vocabCountsData } = await supabase
    .from("vocabulary")
    .select("lesson_id")
    .in(
      "lesson_id",
      progress.filter((p) => p.status === "completed").map((p) => p.lesson_id)
    );
  const vocabularyCompleted = (vocabCountsData as { lesson_id: string }[])?.length ?? 0;

  const { data: perfectAttempts } = await supabase
    .from("quiz_attempts")
    .select("id")
    .eq("user_id", userId)
    .eq("score", 100);

  return achievements.map((achievement) => {
    let currentProgress = 0;
    switch (achievement.requirement_type) {
      case "lessons_completed":
        currentProgress = progress.filter((p) => p.status === "completed").length;
        break;
      case "quiz_perfect":
        currentProgress = perfectAttempts?.length ?? 0;
        break;
      case "streak_days":
        currentProgress = profileData?.longest_streak ?? 0;
        break;
      case "vocabulary_completed":
        currentProgress = vocabularyCompleted;
        break;
      case "speaking_attempts":
        currentProgress = progress.filter((p) => p.best_speaking_score !== null).length;
        break;
    }

    return {
      ...achievement,
      earnedAt: earnedMap.get(achievement.id) ?? null,
      currentProgress: Math.min(currentProgress, achievement.requirement_value),
    };
  });
}
