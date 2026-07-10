import type { Metadata } from "next";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { LevelsTable } from "@/components/admin/levels-table";
import { getAllLevels } from "@/lib/data/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kelola Level",
};

export default async function AdminLevelsPage() {
  const levels = await getAllLevels();

  return (
    <PageContainer>
      <Breadcrumbs
        items={[{ label: "Panel Admin", href: "/admin" }, { label: "Level" }]}
        homeHref="/admin"
      />
      <PageHeader title="Kelola Level" description="Buat, ubah, dan publikasikan level CEFR." />
      <LevelsTable levels={levels} />
    </PageContainer>
  );
}
