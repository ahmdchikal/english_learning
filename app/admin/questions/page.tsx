import type { Metadata } from "next";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { QuestionsTable } from "@/components/admin/questions-table";
import { getAllQuestions, getAllLessons } from "@/lib/data/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kelola Soal",
};

export default async function AdminQuestionsPage() {
  const [questions, lessons] = await Promise.all([getAllQuestions(), getAllLessons()]);

  return (
    <PageContainer>
      <Breadcrumbs
        items={[{ label: "Panel Admin", href: "/admin" }, { label: "Soal" }]}
        homeHref="/admin"
      />
      <PageHeader
        title="Kelola Soal"
        description="Buat dan kelola soal latihan, kuis, dan tes penempatan."
      />
      <QuestionsTable questions={questions} lessons={lessons} />
    </PageContainer>
  );
}
