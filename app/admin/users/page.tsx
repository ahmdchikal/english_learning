import type { Metadata } from "next";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { UsersTable } from "@/components/admin/users-table";
import { getAllUsersForAdmin } from "@/lib/data/admin";
import { getCurrentUser } from "@/lib/data/current-user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kelola Pengguna",
};

export default async function AdminUsersPage() {
  const [users, currentUser] = await Promise.all([getAllUsersForAdmin(), getCurrentUser()]);

  return (
    <PageContainer>
      <PageHeader title="Kelola Pengguna" description="Lihat statistik pengguna dan kelola peran administrator." />
      <UsersTable users={users} currentUserId={currentUser?.id ?? ""} />
    </PageContainer>
  );
}
