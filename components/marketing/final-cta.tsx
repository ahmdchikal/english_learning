import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="rounded-3xl border bg-gradient-to-br from-indigo-600 to-indigo-700 px-6 py-14 text-center text-white shadow-xl sm:px-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Siap mulai perjalanan Bahasa Inggris Anda?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-indigo-100">
          Bergabunglah sekarang dan mulai belajar dengan langkah kecil setiap hari. Gratis, tanpa
          kartu kredit.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton
            href="/register"
            size="lg"
            variant="secondary"
            className="h-12 px-6 text-base"
          >
            Mulai Belajar Gratis
            <ArrowRight className="size-4" />
          </LinkButton>
          <LinkButton
            href="/levels"
            size="lg"
            variant="outline"
            className="h-12 border-white/40 bg-transparent px-6 text-base text-white hover:bg-white/10"
          >
            Lihat Level Belajar
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
