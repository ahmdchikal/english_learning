"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-destructive/10 text-destructive">
        <AlertTriangle className="size-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Terjadi kesalahan</h1>
        <p className="mx-auto max-w-md text-muted-foreground">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi. Jika masalah berlanjut,
          coba beberapa saat lagi.
        </p>
      </div>
      <Button onClick={reset}>
        <RotateCcw className="size-4" />
        Coba Lagi
      </Button>
    </div>
  );
}
