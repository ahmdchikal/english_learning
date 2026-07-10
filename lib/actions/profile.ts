"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  updateProfileSchema,
  updateSettingsSchema,
  changePasswordSchema,
  AVATAR_MAX_SIZE_BYTES,
  AVATAR_ALLOWED_TYPES,
} from "@/lib/validations/profile";
import { toFriendlyErrorMessage } from "@/lib/utils/errors";
import type { ActionResult } from "@/lib/actions/auth";

export async function updateProfileAction(input: unknown): Promise<ActionResult> {
  const parsed = updateProfileSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Data profil tidak valid." };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { success: false, message: "Anda harus masuk untuk melanjutkan." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.fullName,
      daily_goal_minutes: parsed.data.dailyGoalMinutes,
    })
    .eq("id", userData.user.id);

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { success: true, message: "Profil berhasil diperbarui." };
}

export async function updateSettingsAction(input: unknown): Promise<ActionResult> {
  const parsed = updateSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Pengaturan tidak valid." };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { success: false, message: "Anda harus masuk untuk melanjutkan." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      sound_enabled: parsed.data.soundEnabled,
      tts_speed: parsed.data.ttsSpeed,
      theme: parsed.data.theme,
    })
    .eq("id", userData.user.id);

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  revalidatePath("/settings");
  return { success: true, message: "Pengaturan berhasil disimpan." };
}

export async function changePasswordAction(input: unknown): Promise<ActionResult> {
  const parsed = changePasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Kata sandi baru tidak valid." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.newPassword });

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  return { success: true, message: "Kata sandi berhasil diubah." };
}

export async function uploadAvatarAction(formData: FormData): Promise<ActionResult> {
  const file = formData.get("avatar");
  if (!(file instanceof File)) {
    return { success: false, message: "File avatar tidak ditemukan." };
  }

  if (!AVATAR_ALLOWED_TYPES.includes(file.type)) {
    return { success: false, message: "Format file harus PNG, JPEG, atau WebP." };
  }

  if (file.size > AVATAR_MAX_SIZE_BYTES) {
    return { success: false, message: "Ukuran file maksimal 2MB." };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { success: false, message: "Anda harus masuk untuk melanjutkan." };
  }

  const extension = file.name.split(".").pop() ?? "png";
  const path = `${userData.user.id}/avatar-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return { success: false, message: toFriendlyErrorMessage(uploadError) };
  }

  const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrlData.publicUrl })
    .eq("id", userData.user.id);

  if (updateError) {
    return { success: false, message: toFriendlyErrorMessage(updateError) };
  }

  revalidatePath("/profile");
  revalidatePath("/settings");
  return { success: true, message: "Foto profil berhasil diperbarui." };
}

export async function deleteAccountAction(): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { success: false, message: "Anda harus masuk untuk melanjutkan." };
  }

  try {
    const adminClient = createAdminClient();
    const { error } = await adminClient.auth.admin.deleteUser(userData.user.id);
    if (error) {
      return { success: false, message: toFriendlyErrorMessage(error) };
    }
  } catch (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  await supabase.auth.signOut();
  return { success: true, message: "Akun Anda telah dihapus." };
}
