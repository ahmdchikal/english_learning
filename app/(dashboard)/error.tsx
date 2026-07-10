"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { PageContainer } from "@/components/common/page-container";

export default function DashboardError({
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
    <PageContainer>
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed bg-muted/30 px-6 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-8" />
        </div>
        <h1 className="text-xl font-semibold">Terjadi kesalahan</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi.
        </p>
        <div className="flex gap-3">
          <Button onClick={reset}>
            <RotateCcw className="size-4" />
            Coba Lagi
          </Button>
          <LinkButton href="/dashboard" variant="outline">
            Kembali ke Dashboard
          </LinkButton>
        </div>
      </div>
    </PageContainer>
  );
}
