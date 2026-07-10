import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Atur Ulang Kata Sandi",
  description: "Buat kata sandi baru untuk akun EnglishPath Anda.",
  alternates: { canonical: "/reset-password" },
};

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Atur Ulang Kata Sandi</h1>
        <p className="text-sm text-muted-foreground">Masukkan kata sandi baru untuk akun Anda.</p>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
