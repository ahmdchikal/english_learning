"use client";

import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrengthMeter } from "@/components/auth/password-strength-meter";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/validations/auth";
import { resetPasswordAction } from "@/lib/actions/auth";

export function ResetPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = useWatch({ control, name: "password" });

  async function onSubmit(values: ResetPasswordFormValues) {
    const result = await resetPasswordAction(values);
    if (!result.success) {
      toast.error(result.message ?? "Gagal memperbarui kata sandi.");
      return;
    }
    toast.success(result.message ?? "Kata sandi berhasil diperbarui.");
    router.push("/login");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="password">Kata Sandi Baru</Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          placeholder="Minimal 8 karakter"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        <PasswordStrengthMeter password={password ?? ""} />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="Ulangi kata sandi baru"
          aria-invalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Simpan Kata Sandi Baru
      </Button>
    </form>
  );
}
