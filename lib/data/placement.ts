import { createClient } from "@/lib/supabase/server";
import type { Question, QuestionOption } from "@/types/database";

export interface PlacementQuestion extends Question {
  options: QuestionOption[];
}

export async function getPlacementTestQuestions(): Promise<PlacementQuestion[]> {
  const supabase = await createClient();

  const { data: questionsData } = await supabase
    .from("questions")
    .select("*")
    .eq("is_placement_question", true)
    .order("order_index", { ascending: true });
  const questions = (questionsData as Question[]) ?? [];
  if (questions.length === 0) return [];

  const { data: optionsData } = await supabase
    .from("question_options")
    .select("*")
    .in("question_id", questions.map((q) => q.id));
  const options = (optionsData as QuestionOption[]) ?? [];

  return questions.map((question) => ({
    ...question,
    options: options.filter((o) => o.question_id === question.id).sort((a, b) => a.order_index - b.order_index),
  }));
}
