import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BookOpenCheck, Flame, Mic, Target, TrendingUp } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { EmptyState } from "@/components/common/empty-state";
import { Progress } from "@/components/ui/progress";
import { WeeklyXpChart } from "@/components/progress/weekly-xp-chart";
import { StudyTimeChart } from "@/components/progress/study-time-chart";
import { ActivityCalendar } from "@/components/progress/activity-calendar";
import { getCurrentUser } from "@/lib/data/current-user";
import { getProgressPageData } from "@/lib/data/progress";
import { formatDate } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Progres Belajar",
};

export default async function ProgressPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/progress");

  const data = await getProgressPageData(user.id);

  return (
    <PageContainer>
      <PageHeader title="Progres Belajar" description="Pantau perkembangan belajar Bahasa Inggris Anda." />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={BookOpenCheck} label="Pelajaran Selesai" value={data.totalLessonsCompleted} accent="indigo" />
        <StatCard icon={TrendingUp} label="Rata-rata Skor Kuis" value={data.averageQuizScore} accent="emerald" />
        <StatCard icon={Mic} label="Skor Berbicara Tertinggi" value={data.highestSpeakingScore} accent="rose" />
        <StatCard icon={Flame} label="Streak Terpanjang" value={`${data.longestStreak} hari`} accent="orange" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold">XP 7 Hari Terakhir</h2>
          <WeeklyXpChart activities={data.recentActivities} />
        </div>
        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold">Waktu Belajar (30 Hari)</h2>
          <StudyTimeChart activities={data.recentActivities} days={30} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold">Progres Setiap Level</h2>
          <div className="mt-4 space-y-4">
            {data.levels.map((level) => (
              <div key={level.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {level.cefr_code} — {level.title}
                  </span>
                  <span className="text-muted-foreground">
                    {level.completedLessons}/{level.totalLessons}
                  </span>
                </div>
                <Progress value={level.progressPercent} indicatorClassName="bg-emerald-500" className="mt-1.5" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Kalender Aktivitas</h2>
          <div className="mt-3">
            <ActivityCalendar activities={data.recentActivities} days={30} />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Target className="size-3.5" />
            Semakin hijau, semakin lama Anda belajar hari itu.
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold">Riwayat Aktivitas Terbaru</h2>
          {data.recentActivities.length === 0 ? (
            <EmptyState icon={TrendingUp} title="Belum ada aktivitas" description="Mulai belajar untuk melihat riwayat di sini." />
          ) : (
            <ul className="mt-3 divide-y">
              {[...data.recentActivities]
                .reverse()
                .slice(0, 10)
                .map((activity) => (
                  <li key={activity.id} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="text-muted-foreground">{formatDate(activity.activity_date)}</span>
                    <span>
                      {activity.minutes_learned} menit · {activity.lessons_completed} pelajaran ·{" "}
                      {activity.xp_earned} XP
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold">Perlu Ditingkatkan</h2>
          {data.improvementAreas.length === 0 ? (
            <EmptyState
              icon={BookOpenCheck}
              title="Belum ada catatan"
              description="Kerjakan beberapa kuis untuk melihat area yang perlu ditingkatkan."
            />
          ) : (
            <ul className="mt-3 space-y-2">
              {data.improvementAreas.map((area) => (
                <li
                  key={area.lessonId}
                  className="flex items-center justify-between rounded-xl bg-destructive/5 px-3 py-2 text-sm"
                >
                  <span>{area.lessonTitle}</span>
                  <span className="font-medium text-destructive">{area.incorrectCount}x salah</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
