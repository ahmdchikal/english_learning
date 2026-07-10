import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/data/current-user";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminUser();

  if (!user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader profile={user.profile} email={user.email} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
