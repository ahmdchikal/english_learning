import type { LucideIcon } from "lucide-react";
import { Home, BookOpen, Dumbbell, LineChart, User, Trophy, Settings, Shield } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Bottom navigation on mobile, sidebar navigation on desktop. */
export const MAIN_NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Beranda", icon: Home },
  { href: "/learn", label: "Belajar", icon: BookOpen },
  { href: "/practice/vocabulary", label: "Latihan", icon: Dumbbell },
  { href: "/progress", label: "Progres", icon: LineChart },
  { href: "/profile", label: "Profil", icon: User },
];

/** Extra links shown only in the desktop sidebar, not in the mobile bar. */
export const SIDEBAR_SECONDARY_ITEMS: NavItem[] = [
  { href: "/achievements", label: "Pencapaian", icon: Trophy },
  { href: "/settings", label: "Pengaturan", icon: Settings },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Ringkasan", icon: Shield },
  { href: "/admin/levels", label: "Level", icon: BookOpen },
  { href: "/admin/units", label: "Unit", icon: BookOpen },
  { href: "/admin/lessons", label: "Pelajaran", icon: BookOpen },
  { href: "/admin/questions", label: "Soal", icon: Dumbbell },
  { href: "/admin/users", label: "Pengguna", icon: User },
];
