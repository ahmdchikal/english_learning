import { createClient } from "@/lib/supabase/server";
import { lastNDays } from "@/lib/utils/format";
import type {
  Achievement,
  DailyActivity,
  Lesson,
  Level,
  Unit,
  UserAchievement,
  UserLessonProgress,
} from "@/types/database";

export interface DashboardData {
  activeLevel: Level | null;
  levelProgressPercent: number;
  incompleteLessonsCount: number;
  mostRecentLesson: (Lesson & { unit: Unit | null }) | null;
  nextLesson: (Lesson & { unit: Unit | null }) | null;
  weeklyActivities: DailyActivity[];
  latestBadge: (UserAchievement & { achievement: Achievement }) | null;
  averageQuizScore: number;
  totalLessonsCompleted: number;
  hasAnyProgress: boolean;
}

export async function getDashboardData(userId: string, activeLevelId: string | null): Promise<DashboardData> {
  const supabase = await createClient();

  const [progressRes, achievementsRes] = await Promise.all([
    supabase
      .from("user_lesson_progress")
      .select("*")
      .eq("user_id", userId)
      .order("last_accessed_at", { ascending: false }),
    supabase
      .from("user_achievements")
      .select("*, achievement:achievements(*)")
      .eq("user_id", userId)
      .order("earned_at", { ascending: false })
      .limit(1),
  ]);

  const allProgress = (progressRes.data as UserLessonProgress[]) ?? [];
  const hasAnyProgress = allProgress.length > 0;

  const days = lastNDays(7);
  const { data: activityRows } = await supabase
    .from("daily_activities")
    .select("*")
    .eq("user_id", userId)
    .gte("activity_date", days[0])
    .order("activity_date", { ascending: true });

  const weeklyActivities = (activityRows as DailyActivity[]) ?? [];

  let activeLevel: Level | null = null;
  let levelProgressPercent = 0;
  let incompleteLessonsCount = 0;
  let mostRecentLesson: (Lesson & { unit: Unit | null }) | null = null;
  let nextLesson: (Lesson & { unit: Unit | null }) | null = null;

  if (activeLevelId) {
    const { data: levelData } = await supabase.from("levels").select("*").eq("id", activeLevelId).single();
    activeLevel = (levelData as Level) ?? null;

    const { data: unitsData } = await supabase
      .from("units")
      .select("*")
      .eq("level_id", activeLevelId)
      .eq("is_published", true)
      .order("order_index", { ascending: true });
    const units = (unitsData as Unit[]) ?? [];

    if (units.length > 0) {
      const { data: lessonsData } = await supabase
        .from("lessons")
        .select("*, unit:units(*)")
        .in("unit_id", units.map((u) => u.id))
        .eq("is_published", true)
        .order("order_index", { ascending: true });
      const lessons = (lessonsData as (Lesson & { unit: Unit })[]) ?? [];

      const progressByLesson = new Map(allProgress.map((p) => [p.lesson_id, p]));
      const completedCount = lessons.filter((l) => progressByLesson.get(l.id)?.status === "completed").length;
      levelProgressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;
      incompleteLessonsCount = lessons.length - completedCount;

      const sortedByUnitThenOrder = [...lessons].sort((a, b) => {
        const unitDiff = (a.unit?.order_index ?? 0) - (b.unit?.order_index ?? 0);
        return unitDiff !== 0 ? unitDiff : a.order_index - b.order_index;
      });
      nextLesson = sortedByUnitThenOrder.find((l) => progressByLesson.get(l.id)?.status !== "completed") ?? null;

      const mostRecentProgress = allProgress.find((p) => lessons.some((l) => l.id === p.lesson_id));
      if (mostRecentProgress) {
        mostRecentLesson = lessons.find((l) => l.id === mostRecentProgress.lesson_id) ?? null;
      }
    }
  }

  const scoredProgress = allProgress.filter((p) => typeof p.best_quiz_score === "number");
  const averageQuizScore =
    scoredProgress.length > 0
      ? Math.round(scoredProgress.reduce((sum, p) => sum + (p.best_quiz_score ?? 0), 0) / scoredProgress.length)
      : 0;
  const totalLessonsCompleted = allProgress.filter((p) => p.status === "completed").length;

  const latestBadgeRow = achievementsRes.data?.[0] as (UserAchievement & { achievement: Achievement }) | undefined;

  return {
    activeLevel,
    levelProgressPercent,
    incompleteLessonsCount,
    mostRecentLesson,
    nextLesson,
    weeklyActivities,
    latestBadge: latestBadgeRow ?? null,
    averageQuizScore,
    totalLessonsCompleted,
    hasAnyProgress,
  };
}
