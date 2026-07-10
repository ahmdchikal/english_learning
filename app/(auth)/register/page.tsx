import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Buat akun EnglishPath gratis dan mulai belajar Bahasa Inggris hari ini.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <div className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Buat Akun Baru</h1>
        <p className="text-sm text-muted-foreground">Mulai belajar Bahasa Inggris secara gratis</p>
      </div>

      <RegisterForm />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">atau</span>
        <Separator className="flex-1" />
      </div>

      <GoogleAuthButton />

      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
          Masuk
        </Link>
      </p>
    </div>
  );
}
