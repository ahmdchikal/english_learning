"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatShortDate, lastNDays } from "@/lib/utils/format";
import type { DailyActivity } from "@/types/database";

export function WeeklyXpChart({ activities }: { activities: DailyActivity[] }) {
  const days = lastNDays(7);
  const byDate = new Map(activities.map((a) => [a.activity_date, a]));

  const data = days.map((date) => ({
    date,
    label: formatShortDate(date),
    xp: byDate.get(date)?.xp_earned ?? 0,
  }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} width={32} />
          <Tooltip
            formatter={(value) => [`${value} XP`, "XP"]}
            contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
          />
          <Bar dataKey="xp" radius={[6, 6, 0, 0]} fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
