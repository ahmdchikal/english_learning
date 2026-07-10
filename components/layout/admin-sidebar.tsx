"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "@/lib/constants/nav";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants/site";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-card hidden w-64 shrink-0 flex-col border-r px-4 py-6 lg:flex">
      <Link href="/admin" className="flex items-center gap-2 px-2 text-lg font-bold">
        <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <GraduationCap className="size-5" />
        </span>
        {siteConfig.name}
      </Link>
      <p className="text-muted-foreground mt-1 px-2 text-xs font-medium tracking-wide uppercase">
        Panel Admin
      </p>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {ADMIN_NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
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
      </nav>

      <Link
        href="/dashboard"
        className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium"
      >
        <ArrowLeft className="size-4.5" />
        Kembali ke Aplikasi
      </Link>
    </aside>
  );
}
