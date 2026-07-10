import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { VocabularyFlashcard } from "@/components/learning/vocabulary-flashcard";
import { getPracticeVocabulary } from "@/lib/data/practice";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latihan Kosakata",
};

export default async function VocabularyPracticePage() {
  const vocabulary = await getPracticeVocabulary();

  return (
    <PageContainer>
      <PageHeader
        title="Latihan Kosakata"
        description="Klik kartu untuk melihat artinya, dan dengarkan pengucapannya."
      />

      {vocabulary.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Belum ada kosakata"
          description="Selesaikan beberapa pelajaran untuk mengumpulkan kosakata di sini."
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {vocabulary.map((item) => (
            <VocabularyFlashcard key={item.id} item={item} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
