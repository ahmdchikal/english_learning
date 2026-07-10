import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  accent = "indigo",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: "indigo" | "emerald" | "orange" | "rose";
}) {
  const accentClasses: Record<string, string> = {
    indigo: "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400",
    emerald: "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400",
    orange: "bg-orange-600/10 text-orange-600 dark:text-orange-400",
    rose: "bg-rose-600/10 text-rose-600 dark:text-rose-400",
  };

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
      <div className={cn("flex size-10 items-center justify-center rounded-xl", accentClasses[accent])}>
        <Icon className="size-5" />
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
