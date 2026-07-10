import Link from "next/link";
import { GraduationCap, Flame } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { siteConfig } from "@/lib/constants/site";
import type { Profile } from "@/types/database";

export function DashboardHeader({
  profile,
  email,
}: {
  profile: Profile | null;
  email: string | null;
}) {
  return (
    <header className="bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur sm:px-6">
      <Link href="/dashboard" className="flex items-center gap-2 font-bold lg:hidden">
        <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <GraduationCap className="size-5" />
        </span>
        {siteConfig.name}
      </Link>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-2 sm:gap-3">
        {profile && (
          <span className="hidden items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 sm:flex dark:bg-orange-500/10 dark:text-orange-300">
            <Flame className="size-3.5" />
            {profile.current_streak} hari
          </span>
        )}
        <ThemeToggle />
        <UserMenu profile={profile} email={email} />
      </div>
    </header>
  );
}
