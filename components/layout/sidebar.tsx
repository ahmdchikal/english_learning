"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, LogOut, ShieldCheck } from "lucide-react";
import { MAIN_NAV_ITEMS, SIDEBAR_SECONDARY_ITEMS } from "@/lib/constants/nav";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants/site";
import { logoutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

export function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-card px-4 py-6 lg:flex">
      <Link href="/dashboard" className="flex items-center gap-2 px-2 font-bold text-lg">
        <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <GraduationCap className="size-5" />
        </span>
        {siteConfig.name}
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {MAIN_NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-600 text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4.5" />
              {item.label}
            </Link>
          );
        })}

        <div className="my-3 h-px bg-border" />

        {SIDEBAR_SECONDARY_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-600 text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4.5" />
              {item.label}
            </Link>
          );
        })}

        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              pathname.startsWith("/admin")
                ? "bg-indigo-600 text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <ShieldCheck className="size-4.5" />
            Panel Admin
          </Link>
        )}
      </nav>

      <form action={logoutAction}>
        <Button type="submit" variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
          <LogOut className="size-4.5" />
          Keluar
        </Button>
      </form>
    </aside>
  );
}
