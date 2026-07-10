import { createClient } from "@/lib/supabase/server";
import type { Lesson, Question, QuestionOption, Vocabulary } from "@/types/database";

export interface VocabularyWithLesson extends Vocabulary {
  lesson: Pick<Lesson, "id" | "title"> | null;
}

export async function getPracticeVocabulary(limit = 60): Promise<VocabularyWithLesson[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("vocabulary")
    .select("*, lesson:lessons!inner(id, title, is_published)")
    .eq("lesson.is_published", true)
    .limit(limit);

  return (
    (data as (Vocabulary & {
      lesson: (Pick<Lesson, "id" | "title"> & { is_published: boolean }) | null;
    })[]) ?? []
  ).map(({ lesson, ...vocab }) => ({
    ...vocab,
    lesson: lesson ? { id: lesson.id, title: lesson.title } : null,
  }));
}

export interface ListeningQuestion extends Question {
  options: QuestionOption[];
  lesson: Pick<Lesson, "id" | "title"> | null;
}

export async function getPracticeListeningQuestions(limit = 30): Promise<ListeningQuestion[]> {
  const supabase = await createClient();

  const { data: questionsData } = await supabase
    .from("questions")
    .select("*, lesson:lessons!inner(id, title, is_published)")
    .eq("type", "listening")
    .eq("is_placement_question", false)
    .eq("lesson.is_published", true)
    .limit(limit);

  const questions =
    (questionsData as (Question & {
      lesson: (Pick<Lesson, "id" | "title"> & { is_published: boolean }) | null;
    })[]) ?? [];
  if (questions.length === 0) return [];

  const { data: optionsData } = await supabase
    .from("question_options")
    .select("*")
    .in(
      "question_id",
      questions.map((q) => q.id)
    );
  const options = (optionsData as QuestionOption[]) ?? [];

  return questions.map(({ lesson, ...question }) => ({
    ...question,
    lesson: lesson ? { id: lesson.id, title: lesson.title } : null,
    options: options
      .filter((o) => o.question_id === question.id)
      .sort((a, b) => a.order_index - b.order_index),
  }));
}

export interface SpeakingQuestion extends Question {
  lesson: Pick<Lesson, "id" | "title"> | null;
}

export async function getPracticeSpeakingQuestions(limit = 30): Promise<SpeakingQuestion[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("questions")
    .select("*, lesson:lessons!inner(id, title, is_published)")
    .eq("type", "speaking")
    .eq("is_placement_question", false)
    .eq("lesson.is_published", true)
    .limit(limit);

  return (
    (data as (Question & {
      lesson: (Pick<Lesson, "id" | "title"> & { is_published: boolean }) | null;
    })[]) ?? []
  ).map(({ lesson, ...question }) => ({
    ...question,
    lesson: lesson ? { id: lesson.id, title: lesson.title } : null,
  }));
}
