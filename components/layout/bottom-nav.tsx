"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_ITEMS } from "@/lib/constants/nav";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {MAIN_NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              active ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground"
            )}
            aria-current={active ? "page" : undefined}
          >
            <item.icon className={cn("size-5", active && "fill-indigo-100 dark:fill-indigo-500/20")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
