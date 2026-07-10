import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { SettingsForm } from "@/components/profile/settings-form";
import { ChangePasswordForm } from "@/components/profile/change-password-form";
import { getCurrentUser } from "@/lib/data/current-user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pengaturan",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/settings");

  const profile = user.profile;

  return (
    <PageContainer className="max-w-2xl">
      <PageHeader title="Pengaturan" description="Sesuaikan preferensi belajar dan keamanan akun Anda." />

      <div className="space-y-6">
        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 font-semibold">Preferensi</h2>
          <SettingsForm
            soundEnabled={profile?.sound_enabled ?? true}
            ttsSpeed={profile?.tts_speed ?? 1}
            theme={profile?.theme ?? "system"}
          />
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 font-semibold">Keamanan</h2>
          <ChangePasswordForm />
        </div>
      </div>
    </PageContainer>
  );
}
