/**
 * Client-facing documentation of the XP/gamification rules. The actual XP
 * awarding happens server-side inside the Postgres RPC functions
 * (supabase/migrations/0002_functions.sql) — these constants are used only
 * for displaying informational copy (e.g. "+20 XP" badges) in the UI and
 * must be kept in sync with the SQL logic.
 */
export const XP_RULES = {
  lessonComplete: 20,
  quizComplete: 10,
  quizPerfectBonus: 15,
  speakingBonus: 10,
  speakingBonusThreshold: 80,
  quizPassThreshold: 70,
} as const;

export const ACHIEVEMENT_ICON_MAP: Record<string, string> = {
  footprints: "Footprints",
  star: "Star",
  flame: "Flame",
  "book-open": "BookOpen",
  mic: "Mic",
  "graduation-cap": "GraduationCap",
};

/** Mirrors the XP-based "learner rank" shown on the dashboard/profile. */
export function getLearnerRank(totalXp: number): {
  rank: number;
  label: string;
  nextRankXp: number;
} {
  const thresholds = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5200, 6600];
  let rank = 1;
  for (let i = 0; i < thresholds.length; i++) {
    if (totalXp >= thresholds[i]) {
      rank = i + 1;
    }
  }
  const nextThreshold = thresholds[rank] ?? thresholds[thresholds.length - 1] + 1500;
  return { rank, label: `Rank ${rank}`, nextRankXp: nextThreshold };
}
