import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun EnglishPath Anda untuk melanjutkan belajar.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <div className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Selamat Datang Kembali</h1>
        <p className="text-muted-foreground text-sm">Masuk untuk melanjutkan pembelajaran Anda</p>
      </div>

      <Suspense>
        <LoginForm />
      </Suspense>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs">atau</span>
        <Separator className="flex-1" />
      </div>

      <GoogleAuthButton />

      <p className="text-muted-foreground text-center text-sm">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
