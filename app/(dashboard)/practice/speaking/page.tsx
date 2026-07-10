import type { Metadata } from "next";
import { Mic } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { SpeakingPracticeHub } from "@/components/learning/speaking-practice-hub";
import { getPracticeSpeakingQuestions } from "@/lib/data/practice";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latihan Berbicara",
};

export default async function SpeakingPracticePage() {
  const questions = await getPracticeSpeakingQuestions();

  return (
    <PageContainer className="max-w-2xl">
      <PageHeader
        title="Latihan Berbicara"
        description="Latih pengucapan Bahasa Inggris Anda menggunakan mikrofon."
      />

      {questions.length === 0 ? (
        <EmptyState
          icon={Mic}
          title="Belum ada latihan berbicara"
          description="Soal speaking belum ditambahkan oleh administrator."
        />
      ) : (
        <SpeakingPracticeHub questions={questions} />
      )}
    </PageContainer>
  );
}
