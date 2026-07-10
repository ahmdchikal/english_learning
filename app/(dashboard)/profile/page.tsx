import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Calendar, Flame, Sparkles, Trophy } from "lucide-react";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { AvatarUpload } from "@/components/profile/avatar-upload";
import { ProfileForm } from "@/components/profile/profile-form";
import { DeleteAccountButton } from "@/components/profile/delete-account-button";
import { getCurrentUser } from "@/lib/data/current-user";
import { formatDate, formatXp } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profil",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/profile");

  const profile = user.profile;

  return (
    <PageContainer className="max-w-3xl">
      <PageHeader title="Profil" description="Kelola informasi akun Anda." />

      <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <div className="flex justify-center sm:justify-start">
          <AvatarUpload
            avatarUrl={profile?.avatar_url ?? null}
            fullName={profile?.full_name || user.email || "Pengguna"}
          />
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold">Informasi Akun</h2>
            <p className="text-muted-foreground mt-1 text-sm">{user.email}</p>
            <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
              <Calendar className="size-3.5" />
              Bergabung sejak {profile ? formatDate(profile.created_at) : "-"}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-indigo-50 p-3 dark:bg-indigo-500/10">
                <p className="flex items-center justify-center gap-1 font-bold text-indigo-700 dark:text-indigo-300">
                  <Sparkles className="size-4" />
                  {formatXp(profile?.total_xp ?? 0)}
                </p>
                <p className="text-muted-foreground text-xs">Total XP</p>
              </div>
              <div className="rounded-xl bg-orange-50 p-3 dark:bg-orange-500/10">
                <p className="flex items-center justify-center gap-1 font-bold text-orange-700 dark:text-orange-300">
                  <Flame className="size-4" />
                  {profile?.current_streak ?? 0}
                </p>
                <p className="text-muted-foreground text-xs">Streak</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-500/10">
                <p className="flex items-center justify-center gap-1 font-bold text-amber-700 dark:text-amber-300">
                  <Trophy className="size-4" />
                  {profile?.longest_streak ?? 0}
                </p>
                <p className="text-muted-foreground text-xs">Streak Terpanjang</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 font-semibold">Ubah Informasi</h2>
            <ProfileForm
              fullName={profile?.full_name ?? ""}
              dailyGoalMinutes={profile?.daily_goal_minutes ?? 15}
            />
          </div>

          <div className="border-destructive/30 bg-destructive/5 rounded-2xl border p-5 shadow-sm sm:p-6">
            <h2 className="text-destructive font-semibold">Zona Berbahaya</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Menghapus akun akan menghilangkan seluruh data Anda secara permanen.
            </p>
            <div className="mt-3">
              <DeleteAccountButton />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
