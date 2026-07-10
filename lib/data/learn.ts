import { createClient } from "@/lib/supabase/server";
import type { Lesson, Level, Unit, UserLessonProgress } from "@/types/database";

export interface LevelOverview extends Level {
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  unlocked: boolean;
}

/**
 * Lock status is always re-verified through the `is_level_unlocked` /
 * `is_lesson_unlocked` Postgres functions (see supabase/migrations) so the
 * UI never diverges from the rules enforced server-side inside the RPCs
 * that actually mutate progress.
 */
export async function getLevelsOverview(): Promise<LevelOverview[]> {
  const supabase = await createClient();

  const { data: levelsData } = await supabase
    .from("levels")
    .select("*")
    .eq("is_published", true)
    .order("order_index", { ascending: true });
  const levels = (levelsData as Level[]) ?? [];
  if (levels.length === 0) return [];

  const { data: unitsData } = await supabase
    .from("units")
    .select("*")
    .in(
      "level_id",
      levels.map((l) => l.id)
    )
    .eq("is_published", true);
  const units = (unitsData as Unit[]) ?? [];

  const { data: lessonsData } = await supabase
    .from("lessons")
    .select("id, unit_id")
    .in(
      "unit_id",
      units.map((u) => u.id)
    )
    .eq("is_published", true);
  const lessons = (lessonsData as Pick<Lesson, "id" | "unit_id">[]) ?? [];

  const { data: userData } = await supabase.auth.getUser();
  let progress: UserLessonProgress[] = [];
  if (userData.user) {
    const { data: progressData } = await supabase
      .from("user_lesson_progress")
      .select("*")
      .eq("user_id", userData.user.id);
    progress = (progressData as UserLessonProgress[]) ?? [];
  }
  const completedLessonIds = new Set(
    progress.filter((p) => p.status === "completed").map((p) => p.lesson_id)
  );

  const unlockChecks = await Promise.all(
    levels.map((level) =>
      userData.user
        ? supabase.rpc("is_level_unlocked", { p_level_id: level.id })
        : Promise.resolve({ data: level.order_index === 0 })
    )
  );

  return levels.map((level, index) => {
    const unitIds = new Set(units.filter((u) => u.level_id === level.id).map((u) => u.id));
    const levelLessons = lessons.filter((l) => unitIds.has(l.unit_id));
    const completedLessons = levelLessons.filter((l) => completedLessonIds.has(l.id)).length;

    return {
      ...level,
      totalLessons: levelLessons.length,
      completedLessons,
      progressPercent:
        levelLessons.length > 0 ? Math.round((completedLessons / levelLessons.length) * 100) : 0,
      unlocked: Boolean(unlockChecks[index]?.data),
    };
  });
}

export interface UnitOverview extends Unit {
  totalLessons: number;
  completedLessons: number;
  unlocked: boolean;
}

export async function getLevelWithUnits(
  levelSlug: string
): Promise<{ level: Level; units: UnitOverview[] } | null> {
  const supabase = await createClient();

  const { data: levelData } = await supabase
    .from("levels")
    .select("*")
    .eq("slug", levelSlug)
    .eq("is_published", true)
    .single();
  const level = levelData as Level | null;
  if (!level) return null;

  const { data: unitsData } = await supabase
    .from("units")
    .select("*")
    .eq("level_id", level.id)
    .eq("is_published", true)
    .order("order_index", { ascending: true });
  const units = (unitsData as Unit[]) ?? [];

  const { data: lessonsData } = await supabase
    .from("lessons")
    .select("*")
    .in(
      "unit_id",
      units.map((u) => u.id)
    )
    .eq("is_published", true)
    .order("order_index", { ascending: true });
  const lessons = (lessonsData as Lesson[]) ?? [];

  const { data: userData } = await supabase.auth.getUser();
  let progress: UserLessonProgress[] = [];
  if (userData.user) {
    const { data: progressData } = await supabase
      .from("user_lesson_progress")
      .select("*")
      .eq("user_id", userData.user.id);
    progress = (progressData as UserLessonProgress[]) ?? [];
  }
  const completedLessonIds = new Set(
    progress.filter((p) => p.status === "completed").map((p) => p.lesson_id)
  );

  const firstLessonPerUnit = new Map<string, Lesson>();
  for (const lesson of lessons) {
    const existing = firstLessonPerUnit.get(lesson.unit_id);
    if (!existing || lesson.order_index < existing.order_index) {
      firstLessonPerUnit.set(lesson.unit_id, lesson);
    }
  }

  const unlockChecks = await Promise.all(
    units.map((unit) => {
      const firstLesson = firstLessonPerUnit.get(unit.id);
      if (!firstLesson) return Promise.resolve({ data: unit.force_unlocked });
      if (!userData.user)
        return Promise.resolve({ data: unit.order_index === 0 && level.order_index === 0 });
      return supabase.rpc("is_lesson_unlocked", { p_lesson_id: firstLesson.id });
    })
  );

  const unitOverviews: UnitOverview[] = units.map((unit, index) => {
    const unitLessons = lessons.filter((l) => l.unit_id === unit.id);
    const completedLessons = unitLessons.filter((l) => completedLessonIds.has(l.id)).length;
    return {
      ...unit,
      totalLessons: unitLessons.length,
      completedLessons,
      unlocked: Boolean(unlockChecks[index]?.data),
    };
  });

  return { level, units: unitOverviews };
}

export interface LessonOverview extends Lesson {
  status: UserLessonProgress["status"];
  bestQuizScore: number | null;
  unlocked: boolean;
}

export async function getUnitWithLessons(
  levelSlug: string,
  unitSlug: string
): Promise<{ level: Level; unit: Unit; lessons: LessonOverview[] } | null> {
  const supabase = await createClient();

  const { data: levelData } = await supabase
    .from("levels")
    .select("*")
    .eq("slug", levelSlug)
    .eq("is_published", true)
    .single();
  const level = levelData as Level | null;
  if (!level) return null;

  const { data: unitData } = await supabase
    .from("units")
    .select("*")
    .eq("level_id", level.id)
    .eq("slug", unitSlug)
    .eq("is_published", true)
    .single();
  const unit = unitData as Unit | null;
  if (!unit) return null;

  const { data: lessonsData } = await supabase
    .from("lessons")
    .select("*")
    .eq("unit_id", unit.id)
    .eq("is_published", true)
    .order("order_index", { ascending: true });
  const lessons = (lessonsData as Lesson[]) ?? [];

  const { data: userData } = await supabase.auth.getUser();
  let progress: UserLessonProgress[] = [];
  if (userData.user) {
    const { data: progressData } = await supabase
      .from("user_lesson_progress")
      .select("*")
      .eq("user_id", userData.user.id)
      .in(
        "lesson_id",
        lessons.map((l) => l.id)
      );
    progress = (progressData as UserLessonProgress[]) ?? [];
  }
  const progressByLesson = new Map(progress.map((p) => [p.lesson_id, p]));

  const unlockChecks = await Promise.all(
    lessons.map((lesson, index) => {
      if (!userData.user)
        return Promise.resolve({
          data: index === 0 && unit.order_index === 0 && level.order_index === 0,
        });
      return supabase.rpc("is_lesson_unlocked", { p_lesson_id: lesson.id });
    })
  );

  const lessonOverviews: LessonOverview[] = lessons.map((lesson, index) => ({
    ...lesson,
    status: progressByLesson.get(lesson.id)?.status ?? "not_started",
    bestQuizScore: progressByLesson.get(lesson.id)?.best_quiz_score ?? null,
    unlocked: Boolean(unlockChecks[index]?.data),
  }));

  return { level, unit, lessons: lessonOverviews };
}
