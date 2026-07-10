import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-50 via-white to-white dark:from-indigo-950/20 dark:via-background dark:to-background">
      <header className="px-4 py-6 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-lg">
          <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <GraduationCap className="size-5" />
          </span>
          {siteConfig.name}
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
