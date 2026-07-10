import type { Metadata } from "next";
import { ClipboardCheck } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { EmptyState } from "@/components/common/empty-state";
import { LinkButton } from "@/components/ui/link-button";
import { PlacementTestEngine } from "@/components/learning/placement-test-engine";
import { getPlacementTestQuestions } from "@/lib/data/placement";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tes Penempatan",
};

export default async function PlacementTestPage() {
  const questions = await getPlacementTestQuestions();

  return (
    <PageContainer className="max-w-2xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Tes Penempatan</h1>
        <p className="text-muted-foreground mx-auto mt-2 max-w-lg">
          Tes ini bersifat opsional dan terdiri dari {questions.length || 20} soal dengan berbagai
          tingkat kesulitan. Hasilnya hanya berupa rekomendasi awal — Anda tetap dapat memulai dari
          level Pre-A1 kapan saja.
        </p>
      </div>

      {questions.length === 0 ? (
        <EmptyState
          icon={ClipboardCheck}
          title="Tes penempatan belum tersedia"
          description="Soal tes penempatan belum ditambahkan oleh administrator."
          action={<LinkButton href="/learn">Mulai dari Pre-A1</LinkButton>}
        />
      ) : (
        <PlacementTestEngine questions={questions} />
      )}
    </PageContainer>
  );
}
