import type { Metadata } from "next";
import { Users, Layers, BookOpen, ListChecks, GraduationCap, ShieldCheck } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { getAdminOverviewStats } from "@/lib/data/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel Admin",
};

export default async function AdminOverviewPage() {
  const stats = await getAdminOverviewStats();

  return (
    <PageContainer>
      <PageHeader title="Ringkasan Admin" description="Statistik konten dan pengguna EnglishPath." />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Pengguna" value={stats.totalUsers} accent="indigo" />
        <StatCard icon={ShieldCheck} label="Administrator" value={stats.totalAdmins} accent="rose" />
        <StatCard icon={Layers} label="Level" value={stats.totalLevels} accent="emerald" />
        <StatCard icon={GraduationCap} label="Unit" value={stats.totalUnits} accent="orange" />
        <StatCard icon={BookOpen} label="Pelajaran Terpublikasi" value={stats.publishedLessons} accent="indigo" />
        <StatCard icon={BookOpen} label="Pelajaran Draf" value={stats.draftLessons} accent="orange" />
        <StatCard icon={ListChecks} label="Total Soal" value={stats.totalQuestions} accent="emerald" />
        <StatCard icon={ListChecks} label="Total Percobaan Kuis" value={stats.totalQuizAttempts} accent="rose" />
      </div>
    </PageContainer>
  );
}
