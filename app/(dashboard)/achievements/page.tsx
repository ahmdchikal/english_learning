import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Trophy } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { AchievementIcon } from "@/components/common/achievement-icon";
import { Progress } from "@/components/ui/progress";
import { getCurrentUser } from "@/lib/data/current-user";
import { getAchievementsForUser } from "@/lib/data/achievements";
import { formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pencapaian",
};

export default async function AchievementsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/achievements");

  const achievements = await getAchievementsForUser(user.id);
  const earnedCount = achievements.filter((a) => a.earnedAt).length;

  return (
    <PageContainer>
      <PageHeader
        title="Pencapaian"
        description={`Anda telah meraih ${earnedCount} dari ${achievements.length} lencana.`}
      />

      {achievements.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="Belum ada pencapaian"
          description="Pencapaian belum ditambahkan oleh administrator."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const earned = Boolean(achievement.earnedAt);
            const percent = Math.round(
              (achievement.currentProgress / achievement.requirement_value) * 100
            );

            return (
              <div
                key={achievement.id}
                className={cn(
                  "rounded-2xl border p-5 shadow-sm",
                  earned ? "bg-amber-50 dark:bg-amber-500/10" : "bg-card opacity-90"
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-xl",
                      earned ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"
                    )}
                  >
                    <AchievementIcon icon={achievement.icon} className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-muted-foreground text-sm">{achievement.description}</p>
                  </div>
                </div>

                {earned ? (
                  <p className="mt-3 text-xs font-medium text-amber-700 dark:text-amber-300">
                    Diraih pada {formatDate(achievement.earnedAt!)}
                  </p>
                ) : (
                  <div className="mt-3">
                    <Progress value={percent} indicatorClassName="bg-indigo-500" />
                    <p className="text-muted-foreground mt-1 text-xs">
                      {achievement.currentProgress}/{achievement.requirement_value}
                    </p>
                  </div>
                )}

                <p className="text-muted-foreground mt-2 text-xs">+{achievement.xp_reward} XP</p>
              </div>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
