import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Nama lengkap minimal 2 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),
  dailyGoalMinutes: z
    .number()
    .int()
    .min(5, "Target harian minimal 5 menit")
    .max(240, "Target harian maksimal 240 menit"),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

export const updateSettingsSchema = z.object({
  soundEnabled: z.boolean(),
  ttsSpeed: z.number().min(0.5).max(1.5),
  theme: z.enum(["light", "dark", "system"]),
});

export type UpdateSettingsValues = z.infer<typeof updateSettingsSchema>;

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Kata sandi minimal 8 karakter")
      .regex(/[A-Za-z]/, "Kata sandi harus mengandung huruf")
      .regex(/[0-9]/, "Kata sandi harus mengandung angka"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export const AVATAR_MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
export const AVATAR_ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
