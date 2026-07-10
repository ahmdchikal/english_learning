import { Compass, Home } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <div className="dark:to-background flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-indigo-50 to-white px-6 text-center dark:from-indigo-950/20">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
        <Compass className="size-10" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
          404
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Halaman tidak ditemukan</h1>
        <p className="text-muted-foreground mx-auto max-w-md">
          Sepertinya Anda tersesat. Halaman yang Anda cari mungkin sudah dipindahkan atau tidak
          pernah ada.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <LinkButton href="/">
          <Home className="size-4" />
          Kembali ke Beranda
        </LinkButton>
        <LinkButton href="/learn" variant="outline">
          Jelajahi Pelajaran
        </LinkButton>
      </div>
    </div>
  );
}
