"use client";

import { getPasswordStrength } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

const COLORS = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500", "bg-emerald-600"];

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const { score, label } = getPasswordStrength(password);

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "bg-muted h-1.5 flex-1 rounded-full transition-colors",
              index <= score && COLORS[score]
            )}
          />
        ))}
      </div>
      <p className="text-muted-foreground text-xs">Kekuatan kata sandi: {label}</p>
    </div>
  );
}
