import type { Metadata } from "next";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { UnitsTable } from "@/components/admin/units-table";
import { getAllUnits, getAllLevels } from "@/lib/data/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kelola Unit",
};

export default async function AdminUnitsPage() {
  const [units, levels] = await Promise.all([getAllUnits(), getAllLevels()]);

  return (
    <PageContainer>
      <PageHeader title="Kelola Unit" description="Buat, ubah, dan publikasikan unit pembelajaran." />
      <UnitsTable units={units} levels={levels} />
    </PageContainer>
  );
}
