import type { Metadata } from "next";
import { Headphones } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { ListeningPractice } from "@/components/learning/listening-practice";
import { getPracticeListeningQuestions } from "@/lib/data/practice";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latihan Mendengarkan",
};

export default async function ListeningPracticePage() {
  const questions = await getPracticeListeningQuestions();

  return (
    <PageContainer className="max-w-2xl">
      <PageHeader title="Latihan Mendengarkan" description="Dengarkan audio dan pilih jawaban yang tepat." />

      {questions.length === 0 ? (
        <EmptyState
          icon={Headphones}
          title="Belum ada latihan mendengarkan"
          description="Soal listening belum ditambahkan oleh administrator."
        />
      ) : (
        <ListeningPractice questions={questions} />
      )}
    </PageContainer>
  );
}
