import type { createClient } from "@/lib/supabase/server";
import type { Lesson, Unit } from "@/types/database";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export interface AdjacentLessons {
  previousLessonId: string | null;
  nextLessonId: string | null;
}

/**
 * Finds the previous/next lesson for "Sebelumnya"/"Selanjutnya" navigation
 * and for "Lanjut ke Pelajaran Berikutnya" on the quiz result page.
 *
 * Lessons are ordered across the *entire level* (by unit order, then lesson
 * order within each unit) rather than only within the current unit, so
 * navigation correctly continues into the next unit once a unit's lessons
 * are exhausted — otherwise the last lesson of every unit would have no
 * "next lesson" at all.
 */
export async function getAdjacentLessons(
  supabase: SupabaseServerClient,
  levelId: string,
  currentLessonId: string
): Promise<AdjacentLessons> {
  const { data: unitsData } = await supabase
    .from("units")
    .select("id, order_index")
    .eq("level_id", levelId)
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  const units = (unitsData as Pick<Unit, "id" | "order_index">[]) ?? [];
  if (units.length === 0) return { previousLessonId: null, nextLessonId: null };

  const { data: lessonsData } = await supabase
    .from("lessons")
    .select("id, unit_id, order_index")
    .in(
      "unit_id",
      units.map((u) => u.id)
    )
    .eq("is_published", true);

  const lessons = (lessonsData as Pick<Lesson, "id" | "unit_id" | "order_index">[]) ?? [];
  const unitOrderById = new Map(units.map((u) => [u.id, u.order_index]));

  const orderedLessons = [...lessons].sort((a, b) => {
    const unitDiff = (unitOrderById.get(a.unit_id) ?? 0) - (unitOrderById.get(b.unit_id) ?? 0);
    return unitDiff !== 0 ? unitDiff : a.order_index - b.order_index;
  });

  const currentIndex = orderedLessons.findIndex((l) => l.id === currentLessonId);
  if (currentIndex === -1) return { previousLessonId: null, nextLessonId: null };

  return {
    previousLessonId: currentIndex > 0 ? orderedLessons[currentIndex - 1].id : null,
    nextLessonId:
      currentIndex < orderedLessons.length - 1 ? orderedLessons[currentIndex + 1].id : null,
  };
}
