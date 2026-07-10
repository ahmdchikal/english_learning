import { cn } from "@/lib/utils";
import { lastNDays } from "@/lib/utils/format";
import type { DailyActivity } from "@/types/database";

export function ActivityCalendar({
  activities,
  days = 28,
}: {
  activities: DailyActivity[];
  days?: number;
}) {
  const dateList = lastNDays(days);
  const byDate = new Map(activities.map((a) => [a.activity_date, a]));

  function intensity(minutes: number): string {
    if (minutes <= 0) return "bg-muted";
    if (minutes < 10) return "bg-emerald-200 dark:bg-emerald-900";
    if (minutes < 20) return "bg-emerald-400 dark:bg-emerald-700";
    return "bg-emerald-600 dark:bg-emerald-500";
  }

  return (
    <div className="flex flex-wrap gap-1.5" role="img" aria-label="Kalender aktivitas belajar">
      {dateList.map((date) => {
        const minutes = byDate.get(date)?.minutes_learned ?? 0;
        return (
          <div
            key={date}
            title={`${date}: ${minutes} menit belajar`}
            className={cn("size-4 rounded-sm sm:size-5", intensity(minutes))}
          />
        );
      })}
    </div>
  );
}
