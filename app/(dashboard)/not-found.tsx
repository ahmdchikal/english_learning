import { SearchX } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { PageContainer } from "@/components/common/page-container";

export default function DashboardNotFound() {
  return (
    <PageContainer>
      <div className="bg-muted/30 flex flex-col items-center gap-4 rounded-2xl border border-dashed px-6 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
          <SearchX className="size-8" />
        </div>
        <h1 className="text-xl font-semibold">Halaman tidak ditemukan</h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          Konten yang Anda cari tidak ditemukan atau mungkin sudah dihapus.
        </p>
        <LinkButton href="/dashboard">Kembali ke Dashboard</LinkButton>
      </div>
    </PageContainer>
  );
}
