"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatShortDate, lastNDays } from "@/lib/utils/format";
import type { DailyActivity } from "@/types/database";

export function StudyTimeChart({
  activities,
  days = 7,
}: {
  activities: DailyActivity[];
  days?: number;
}) {
  const dateList = lastNDays(days);
  const byDate = new Map(activities.map((a) => [a.activity_date, a]));

  const data = dateList.map((date) => ({
    label: formatShortDate(date),
    minutes: byDate.get(date)?.minutes_learned ?? 0,
  }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="studyTimeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} width={32} />
          <Tooltip
            formatter={(value) => [`${value} menit`, "Waktu belajar"]}
            contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="minutes"
            stroke="#22c55e"
            fill="url(#studyTimeGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
