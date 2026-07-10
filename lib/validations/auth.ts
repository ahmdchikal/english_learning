import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Kata sandi minimal 8 karakter")
  .regex(/[A-Za-z]/, "Kata sandi harus mengandung huruf")
  .regex(/[0-9]/, "Kata sandi harus mengandung angka");

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter"),
    email: z.string().trim().email("Alamat email tidak valid"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Alamat email tidak valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Alamat email tidak valid"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ["Sangat lemah", "Lemah", "Cukup", "Kuat", "Sangat kuat"];
  const clamped = Math.min(score, labels.length - 1);
  return { score: clamped, label: labels[clamped] };
}
