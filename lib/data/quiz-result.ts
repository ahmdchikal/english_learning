import { createClient } from "@/lib/supabase/server";
import { getAdjacentLessons } from "@/lib/data/lesson-navigation";
import type { Lesson, QuizAnswer, QuizAttempt, Question, Unit, Level } from "@/types/database";

export interface QuizResultReviewItem extends QuizAnswer {
  question: Question;
}

export interface QuizResultData {
  attempt: QuizAttempt;
  lesson: Lesson;
  unit: Unit;
  level: Level;
  incorrectAnswers: QuizResultReviewItem[];
  nextLessonId: string | null;
}

export async function getLatestQuizResult(
  lessonId: string,
  userId: string
): Promise<QuizResultData | null> {
  const supabase = await createClient();

  const { data: attemptData } = await supabase
    .from("quiz_attempts")
    .select("*")
    .eq("lesson_id", lessonId)
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const attempt = attemptData as QuizAttempt | null;
  if (!attempt) return null;

  const { data: lessonData } = await supabase
    .from("lessons")
    .select("*, unit:units(*, level:levels(*))")
    .eq("id", lessonId)
    .single();
  const lesson = lessonData as Lesson & { unit: Unit & { level: Level } };

  const { data: answersData } = await supabase
    .from("quiz_answers")
    .select("*, question:questions(*)")
    .eq("attempt_id", attempt.id)
    .eq("is_correct", false);

  const incorrectAnswers = (answersData as QuizResultReviewItem[]) ?? [];

  const { nextLessonId } = await getAdjacentLessons(supabase, lesson.unit.level.id, lessonId);

  return {
    attempt,
    lesson,
    unit: lesson.unit,
    level: lesson.unit.level,
    incorrectAnswers,
    nextLessonId,
  };
}
