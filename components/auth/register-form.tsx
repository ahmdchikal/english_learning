"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrengthMeter } from "@/components/auth/password-strength-meter";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { registerAction } from "@/lib/actions/auth";

export function RegisterForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const password = useWatch({ control, name: "password" });

  async function onSubmit(values: RegisterFormValues) {
    const result = await registerAction(values);
    if (!result.success) {
      toast.error(result.message ?? "Pendaftaran gagal.");
      return;
    }
    toast.success(result.message ?? "Pendaftaran berhasil!");
    setSubmitted(true);
    setTimeout(() => router.push("/login"), 1500);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
        <h2 className="text-lg font-semibold">Periksa email Anda</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Kami telah mengirimkan tautan verifikasi ke email Anda. Silakan verifikasi sebelum masuk.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="fullName">Nama Lengkap</Label>
        <Input
          id="fullName"
          autoComplete="name"
          placeholder="Nama lengkap Anda"
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
        />
        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Kata Sandi</Label>
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
          placeholder="Ulangi kata sandi"
          aria-invalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Daftar
      </Button>
    </form>
  );
}
