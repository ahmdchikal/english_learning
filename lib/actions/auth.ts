"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/validations/auth";
import { toFriendlyErrorMessage } from "@/lib/utils/errors";
import { siteConfig } from "@/lib/constants/site";

export interface ActionResult {
  success: boolean;
  message?: string;
}

export async function loginAction(input: unknown): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Data yang dimasukkan tidak valid." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  return { success: true };
}

export async function registerAction(input: unknown): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Data yang dimasukkan tidak valid." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
      emailRedirectTo: `${siteConfig.url}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  return {
    success: true,
    message: "Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.",
  };
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function forgotPasswordAction(input: unknown): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Alamat email tidak valid." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${siteConfig.url}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  return {
    success: true,
    message: "Jika email terdaftar, tautan reset kata sandi telah dikirim.",
  };
}

export async function resetPasswordAction(input: unknown): Promise<ActionResult> {
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Kata sandi tidak valid." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });

  if (error) {
    return { success: false, message: toFriendlyErrorMessage(error) };
  }

  return { success: true, message: "Kata sandi berhasil diperbarui." };
}

export async function signInWithGoogleAction(): Promise<{ url: string | null; message?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteConfig.url}/auth/callback` },
  });

  if (error) {
    return { url: null, message: toFriendlyErrorMessage(error) };
  }

  return { url: data.url };
}
