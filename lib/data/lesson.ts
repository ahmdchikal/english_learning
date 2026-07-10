import { createClient } from "@/lib/supabase/server";
import type {
  Lesson,
  LessonExample,
  Level,
  Question,
  QuestionOption,
  Unit,
  UserLessonProgress,
  Vocabulary,
} from "@/types/database";

export interface QuestionWithOptions extends Question {
  options: QuestionOption[];
}

export interface LessonDetail {
  lesson: Lesson;
  unit: Unit;
  level: Level;
  vocabulary: Vocabulary[];
  examples: LessonExample[];
  questions: QuestionWithOptions[];
  progress: UserLessonProgress | null;
  unlocked: boolean;
  previousLessonId: string | null;
  nextLessonId: string | null;
}

export async function getLessonDetail(lessonId: string): Promise<LessonDetail | null> {
  const supabase = await createClient();

  const { data: lessonData } = await supabase
    .from("lessons")
    .select("*, unit:units(*, level:levels(*))")
    .eq("id", lessonId)
    .eq("is_published", true)
    .single();

  if (!lessonData) return null;

  const lesson = lessonData as Lesson & { unit: Unit & { level: Level } };
  const unit = lesson.unit;
  const level = unit.level;

  const [vocabRes, examplesRes, questionsRes, siblingLessonsRes, userRes] = await Promise.all([
    supabase
      .from("vocabulary")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true }),
    supabase
      .from("lesson_examples")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true }),
    supabase
      .from("questions")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true }),
    supabase
      .from("lessons")
      .select("id, order_index")
      .eq("unit_id", unit.id)
      .eq("is_published", true)
      .order("order_index", { ascending: true }),
    supabase.auth.getUser(),
  ]);

  const questions = (questionsRes.data as Question[]) ?? [];
  const optionsByQuestion = new Map<string, QuestionOption[]>();
  if (questions.length > 0) {
    const { data: optionsData } = await supabase
      .from("question_options")
      .select("*")
      .in(
        "question_id",
        questions.map((q) => q.id)
      );
    for (const option of (optionsData as QuestionOption[]) ?? []) {
      const list = optionsByQuestion.get(option.question_id) ?? [];
      list.push(option);
      optionsByQuestion.set(option.question_id, list);
    }
  }

  const questionsWithOptions: QuestionWithOptions[] = questions.map((q) => ({
    ...q,
    options: (optionsByQuestion.get(q.id) ?? []).sort((a, b) => a.order_index - b.order_index),
  }));

  const siblingLessons = (siblingLessonsRes.data as Pick<Lesson, "id" | "order_index">[]) ?? [];
  const currentIndex = siblingLessons.findIndex((l) => l.id === lessonId);
  const previousLessonId = currentIndex > 0 ? siblingLessons[currentIndex - 1].id : null;
  const nextLessonId =
    currentIndex >= 0 && currentIndex < siblingLessons.length - 1
      ? siblingLessons[currentIndex + 1].id
      : null;

  let progress: UserLessonProgress | null = null;
  let unlocked = false;

  if (userRes.data.user) {
    const [{ data: progressData }, { data: unlockedData }] = await Promise.all([
      supabase
        .from("user_lesson_progress")
        .select("*")
        .eq("user_id", userRes.data.user.id)
        .eq("lesson_id", lessonId)
        .maybeSingle(),
      supabase.rpc("is_lesson_unlocked", { p_lesson_id: lessonId }),
    ]);
    progress = (progressData as UserLessonProgress) ?? null;
    unlocked = Boolean(unlockedData);
  }

  return {
    lesson,
    unit,
    level,
    vocabulary: (vocabRes.data as Vocabulary[]) ?? [],
    examples: (examplesRes.data as LessonExample[]) ?? [],
    questions: questionsWithOptions,
    progress,
    unlocked,
    previousLessonId,
    nextLessonId,
  };
}
