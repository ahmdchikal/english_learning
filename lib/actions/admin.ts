"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { toFriendlyErrorMessage } from "@/lib/utils/errors";
import {
  levelFormSchema,
  unitFormSchema,
  lessonFormSchema,
  vocabularyFormSchema,
  lessonExampleFormSchema,
  questionFormSchema,
} from "@/lib/validations/admin";
import type { ActionResult } from "@/lib/actions/auth";

async function requireAdminClient() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    throw new Error("Anda harus masuk untuk melanjutkan.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  if (profile?.role !== "admin") {
    throw new Error("Anda tidak memiliki izin untuk melakukan tindakan ini.");
  }

  return supabase;
}

function revalidateAdminPaths() {
  revalidatePath("/admin");
  revalidatePath("/admin/levels");
  revalidatePath("/admin/units");
  revalidatePath("/admin/lessons");
  revalidatePath("/admin/questions");
  revalidatePath("/learn");
}

// ---------------------------------------------------------------------------
// Levels
// ---------------------------------------------------------------------------
export async function upsertLevelAction(id: string | null, input: unknown): Promise<ActionResult> {
  const parsed = levelFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  try {
    const supabase = await requireAdminClient();
    const { error } = id
      ? await supabase.from("levels").update(parsed.data).eq("id", id)
      : await supabase.from("levels").insert(parsed.data);

    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Level berhasil disimpan." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

export async function deleteLevelAction(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdminClient();
    const { error } = await supabase.from("levels").delete().eq("id", id);
    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Level berhasil dihapus." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

// ---------------------------------------------------------------------------
// Units
// ---------------------------------------------------------------------------
export async function upsertUnitAction(id: string | null, input: unknown): Promise<ActionResult> {
  const parsed = unitFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  try {
    const supabase = await requireAdminClient();
    const { error } = id
      ? await supabase.from("units").update(parsed.data).eq("id", id)
      : await supabase.from("units").insert(parsed.data);

    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Unit berhasil disimpan." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

export async function deleteUnitAction(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdminClient();
    const { error } = await supabase.from("units").delete().eq("id", id);
    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Unit berhasil dihapus." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

// ---------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------
export async function upsertLessonAction(id: string | null, input: unknown): Promise<ActionResult> {
  const parsed = lessonFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  try {
    const supabase = await requireAdminClient();
    const { error } = id
      ? await supabase.from("lessons").update(parsed.data).eq("id", id)
      : await supabase.from("lessons").insert(parsed.data);

    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Pelajaran berhasil disimpan." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

export async function deleteLessonAction(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdminClient();
    const { error } = await supabase.from("lessons").delete().eq("id", id);
    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Pelajaran berhasil dihapus." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

// ---------------------------------------------------------------------------
// Vocabulary
// ---------------------------------------------------------------------------
export async function upsertVocabularyAction(
  id: string | null,
  input: unknown
): Promise<ActionResult> {
  const parsed = vocabularyFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  try {
    const supabase = await requireAdminClient();
    const { error } = id
      ? await supabase.from("vocabulary").update(parsed.data).eq("id", id)
      : await supabase.from("vocabulary").insert(parsed.data);

    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Kosakata berhasil disimpan." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

export async function deleteVocabularyAction(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdminClient();
    const { error } = await supabase.from("vocabulary").delete().eq("id", id);
    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Kosakata berhasil dihapus." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

// ---------------------------------------------------------------------------
// Lesson examples
// ---------------------------------------------------------------------------
export async function upsertLessonExampleAction(
  id: string | null,
  input: unknown
): Promise<ActionResult> {
  const parsed = lessonExampleFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  try {
    const supabase = await requireAdminClient();
    const { error } = id
      ? await supabase.from("lesson_examples").update(parsed.data).eq("id", id)
      : await supabase.from("lesson_examples").insert(parsed.data);

    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Contoh kalimat berhasil disimpan." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

export async function deleteLessonExampleAction(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdminClient();
    const { error } = await supabase.from("lesson_examples").delete().eq("id", id);
    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Contoh kalimat berhasil dihapus." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

// ---------------------------------------------------------------------------
// Questions + options (saved together in one transaction-like sequence)
// ---------------------------------------------------------------------------
export async function upsertQuestionAction(
  id: string | null,
  input: unknown
): Promise<ActionResult> {
  const parsed = questionFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const { options, ...questionFields } = parsed.data;

  try {
    const supabase = await requireAdminClient();

    let questionId = id;
    if (id) {
      const { error } = await supabase.from("questions").update(questionFields).eq("id", id);
      if (error) throw error;
      const { error: deleteOptionsError } = await supabase
        .from("question_options")
        .delete()
        .eq("question_id", id);
      if (deleteOptionsError) throw deleteOptionsError;
    } else {
      const { data, error } = await supabase
        .from("questions")
        .insert(questionFields)
        .select("id")
        .single();
      if (error) throw error;
      questionId = data.id;
    }

    if (options.length > 0 && questionId) {
      const { error: optionsError } = await supabase.from("question_options").insert(
        options.map((option, index) => ({
          question_id: questionId,
          option_text: option.option_text,
          is_correct: option.is_correct,
          order_index: index,
        }))
      );
      if (optionsError) throw optionsError;
    }

    revalidateAdminPaths();
    return { success: true, message: "Soal berhasil disimpan." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

export async function deleteQuestionAction(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdminClient();
    const { error } = await supabase.from("questions").delete().eq("id", id);
    if (error) throw error;
    revalidateAdminPaths();
    return { success: true, message: "Soal berhasil dihapus." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

// ---------------------------------------------------------------------------
// Publish toggles (shared helper for levels/units/lessons)
// ---------------------------------------------------------------------------
export async function togglePublishAction(
  table: "levels" | "units" | "lessons",
  id: string,
  isPublished: boolean
): Promise<ActionResult> {
  try {
    const supabase = await requireAdminClient();
    const { error } = await supabase.from(table).update({ is_published: isPublished }).eq("id", id);
    if (error) throw error;
    revalidateAdminPaths();
    return {
      success: true,
      message: isPublished ? "Konten dipublikasikan." : "Konten dijadikan draf.",
    };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}

export async function updateUserRoleAction(
  userId: string,
  role: "user" | "admin"
): Promise<ActionResult> {
  try {
    const supabase = await requireAdminClient();
    const { error } = await supabase.rpc("admin_set_user_role", {
      p_user_id: userId,
      p_role: role,
    });
    if (error) throw error;
    revalidatePath("/admin/users");
    return { success: true, message: "Peran pengguna berhasil diperbarui." };
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }
}
