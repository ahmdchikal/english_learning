"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants/site";
import type { CurrentUser } from "@/lib/data/current-user";

const LINKS = [
  { href: "/levels", label: "Level" },
  { href: "/about", label: "Tentang" },
];

export function MarketingNavbar({ user }: { user: CurrentUser | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
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
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
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

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
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
