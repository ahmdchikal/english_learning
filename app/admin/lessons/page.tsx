import type { Metadata } from "next";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { LessonsTable } from "@/components/admin/lessons-table";
import { getAllLessons, getAllUnits } from "@/lib/data/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kelola Pelajaran",
};

export default async function AdminLessonsPage() {
  const [lessons, units] = await Promise.all([getAllLessons(), getAllUnits()]);

  return (
    <PageContainer>
      <PageHeader
        title="Kelola Pelajaran"
        description="Buat, ubah, dan publikasikan pelajaran. Klik judul untuk mengelola kosakata dan contoh kalimat."
      />
      <LessonsTable lessons={lessons} units={units} />
    </PageContainer>
  );
}
