"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { toFriendlyErrorMessage } from "@/lib/utils/errors";
import type {
  SubmitPlacementTestResult,
  SubmitQuizAttemptResult,
  SubmitSpeakingScoreResult,
} from "@/types/database";

export interface RpcActionResult<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export async function markLessonStartedAction(lessonId: string): Promise<RpcActionResult<null>> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("mark_lesson_started", { p_lesson_id: lessonId });

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  return { success: true };
}

export interface QuizAnswerInput {
  question_id: string;
  value: string;
}

export async function submitQuizAttemptAction(
  lessonId: string,
  answers: QuizAnswerInput[]
): Promise<RpcActionResult<SubmitQuizAttemptResult>> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("submit_quiz_attempt", {
    p_lesson_id: lessonId,
    p_answers: answers,
  });

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  revalidatePath("/progress");
  revalidatePath("/dashboard");
  revalidatePath("/learn");

  return { success: true, data: data as SubmitQuizAttemptResult };
}

export async function submitSpeakingScoreAction(
  lessonId: string,
  score: number
): Promise<RpcActionResult<SubmitSpeakingScoreResult>> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("submit_speaking_score", {
    p_lesson_id: lessonId,
    p_score: Math.round(score),
  });

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  revalidatePath("/progress");
  revalidatePath("/dashboard");

  return { success: true, data: data as SubmitSpeakingScoreResult };
}

export async function submitPlacementTestAction(
  score: number
): Promise<RpcActionResult<SubmitPlacementTestResult>> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("submit_placement_test", {
    p_score: Math.round(score),
  });

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  revalidatePath("/learn");
  revalidatePath("/dashboard");

  return { success: true, data: data as SubmitPlacementTestResult };
}
