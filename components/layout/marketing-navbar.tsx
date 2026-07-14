"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants/site";
import type { CurrentUser } from "@/lib/data/current-user";

const LINKS = [
  { href: "/levels", label: "Level" },
  { href: "/about", label: "Tentang" },
  { href: "/download-app", label: "Aplikasi Android" },
];

export function MarketingNavbar({ user }: { user: CurrentUser | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <GraduationCap className="size-5" />
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-muted-foreground hover:text-foreground text-sm font-medium transition-colors",
                pathname === link.href && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <LinkButton href="/dashboard">Ke Dashboard</LinkButton>
          ) : (
            <>
              <LinkButton href="/login" variant="ghost">
                Masuk
              </LinkButton>
              <LinkButton href="/register">Mulai Belajar Gratis</LinkButton>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="text-foreground flex size-10 items-center justify-center rounded-lg"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-background border-t px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t pt-3">
              {user ? (
                <LinkButton href="/dashboard">Ke Dashboard</LinkButton>
              ) : (
                <>
                  <LinkButton href="/login" variant="outline">
                    Masuk
                  </LinkButton>
                  <LinkButton href="/register">Mulai Belajar Gratis</LinkButton>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
