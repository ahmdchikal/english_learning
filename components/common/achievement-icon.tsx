import { Award, Footprints, Star, Flame, BookOpen, Mic, GraduationCap, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  footprints: Footprints,
  star: Star,
  flame: Flame,
  "book-open": BookOpen,
  mic: Mic,
  "graduation-cap": GraduationCap,
};

export function AchievementIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = ICONS[icon] ?? Award;
  return <Icon className={className} />;
}
