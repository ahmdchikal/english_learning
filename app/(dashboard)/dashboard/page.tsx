import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  Flame,
  Trophy,
  BookOpen,
  Target,
  ArrowRight,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { PageContainer } from "@/components/common/page-container";
import { StatCard } from "@/components/common/stat-card";
import { EmptyState } from "@/components/common/empty-state";
import { WeeklyXpChart } from "@/components/progress/weekly-xp-chart";
import { ActivityCalendar } from "@/components/progress/activity-calendar";
import { Progress } from "@/components/ui/progress";
import { getCurrentUser } from "@/lib/data/current-user";
import { getDashboardData } from "@/lib/data/dashboard";
import { formatXp } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const profile = user.profile;
  const data = await getDashboardData(user.id, profile?.active_level_id ?? null);

  const firstName = profile?.full_name?.trim().split(" ")[0] || "Pelajar";
  const weeklyXp = data.weeklyActivities.reduce((sum, a) => sum + a.xp_earned, 0);
  const weeklyMinutes = data.weeklyActivities.reduce((sum, a) => sum + a.minutes_learned, 0);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Halo, {firstName}! 👋</h1>
        <p className="text-muted-foreground mt-1">
          {data.activeLevel
            ? `Level aktif: ${data.activeLevel.title} (${data.activeLevel.cefr_code})`
            : "Mari mulai perjalanan belajar Bahasa Inggris Anda."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={Sparkles}
          label="Total XP"
          value={formatXp(profile?.total_xp ?? 0)}
          accent="indigo"
        />
        <StatCard
          icon={Flame}
          label="Streak Harian"
          value={`${profile?.current_streak ?? 0} hari`}
          accent="orange"
        />
        <StatCard
          icon={Target}
          label="Target Harian"
          value={`${profile?.daily_goal_minutes ?? 15} menit`}
          accent="emerald"
        />
        <StatCard
          icon={Trophy}
          label="Pelajaran Selesai"
          value={data.totalLessonsCompleted}
          accent="rose"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {data.activeLevel && (
            <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold">Progres Level {data.activeLevel.cefr_code}</h2>
                <span className="text-muted-foreground text-sm font-medium">
                  {data.levelProgressPercent}%
                </span>
              </div>
              <Progress
                value={data.levelProgressPercent}
                className="mt-3"
                indicatorClassName="bg-emerald-500"
              />
              <p className="text-muted-foreground mt-2 text-sm">
                {data.incompleteLessonsCount > 0
                  ? `${data.incompleteLessonsCount} pelajaran belum diselesaikan pada level ini.`
                  : "Anda telah menyelesaikan semua pelajaran pada level ini!"}
              </p>
            </div>
          )}

          {data.nextLesson ? (
            <div className="rounded-2xl border bg-gradient-to-br from-indigo-600 to-indigo-700 p-5 text-white shadow-sm sm:p-6">
              <p className="text-xs font-semibold tracking-wide text-indigo-200 uppercase">
                Lanjutkan Belajar
              </p>
              <h2 className="mt-1 text-xl font-bold">{data.nextLesson.title}</h2>
              <p className="mt-1 text-sm text-indigo-100">{data.nextLesson.unit?.title}</p>
              <LinkButton
                href={`/lesson/${data.nextLesson.id}`}
                variant="secondary"
                className="mt-4"
              >
                Lanjutkan
                <ArrowRight className="size-4" />
              </LinkButton>
            </div>
          ) : (
            <EmptyState
              icon={BookOpen}
              title="Mulai pelajaran pertama Anda"
              description="Jelajahi level belajar dan mulai pelajaran pertama Anda untuk mendapatkan XP."
              action={
                <LinkButton href="/learn">
                  Jelajahi Pelajaran
                  <ArrowRight className="size-4" />
                </LinkButton>
              }
            />
          )}

          <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold">XP 7 Hari Terakhir</h2>
            <p className="text-muted-foreground text-sm">
              Total {formatXp(weeklyXp)} XP minggu ini
            </p>
            <div className="mt-3">
              <WeeklyXpChart activities={data.weeklyActivities} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-2xl border p-5 shadow-sm">
            <h2 className="font-semibold">Lencana Terbaru</h2>
            {data.latestBadge ? (
              <div className="mt-3 flex items-center gap-3 rounded-xl bg-amber-50 p-3 dark:bg-amber-500/10">
                <span className="flex size-10 items-center justify-center rounded-xl bg-amber-500 text-white">
                  <Trophy className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{data.latestBadge.achievement.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {data.latestBadge.achievement.description}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground mt-3 text-sm">
                Belum ada lencana. Selesaikan pelajaran pertama Anda untuk mendapatkan lencana!
              </p>
            )}
            <LinkButton href="/achievements" variant="link" className="mt-2 h-auto p-0">
              Lihat semua pencapaian
              <ArrowRight className="size-3.5" />
            </LinkButton>
          </div>

          <div className="bg-card rounded-2xl border p-5 shadow-sm">
            <h2 className="font-semibold">Statistik Minggu Ini</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Waktu belajar</dt>
                <dd className="font-medium">{weeklyMinutes} menit</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Rata-rata skor kuis</dt>
                <dd className="font-medium">{data.averageQuizScore}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Pelajaran diselesaikan</dt>
                <dd className="font-medium">{data.totalLessonsCompleted}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-card rounded-2xl border p-5 shadow-sm">
            <h2 className="font-semibold">Kalender Aktivitas</h2>
            <div className="mt-3">
              <ActivityCalendar activities={data.weeklyActivities} days={28} />
            </div>
          </div>

          <LinkButton href="/placement-test" variant="outline" className="w-full">
            <ClipboardCheck className="size-4" />
            Coba Tes Penempatan
          </LinkButton>
        </div>
      </div>

      {!data.hasAnyProgress && (
        <div className="mt-6">
          <EmptyState
            icon={Sparkles}
            title="Selamat datang di EnglishPath!"
            description="Anda belum memulai pelajaran apa pun. Mulai dari level Pre-A1 atau coba tes penempatan untuk rekomendasi level."
            action={
              <div className="flex gap-2">
                <LinkButton href="/learn">Mulai Belajar</LinkButton>
                <LinkButton href="/placement-test" variant="outline">
                  Tes Penempatan
                </LinkButton>
              </div>
            }
          />
        </div>
      )}
    </PageContainer>
  );
}
