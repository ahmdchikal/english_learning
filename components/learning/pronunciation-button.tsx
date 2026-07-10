"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { cn } from "@/lib/utils";

export function PronunciationButton({
  text,
  rate = 1,
  size = "icon",
  className,
}: {
  text: string;
  rate?: number;
  size?: "icon" | "icon-sm" | "default" | "sm";
  className?: string;
}) {
  const { isSupported, isSpeaking, play, stop } = useTextToSpeech(rate);

  if (!isSupported) {
    return (
      <Button type="button" size={size} variant="ghost" disabled title="Peramban tidak mendukung audio" className={className}>
        <VolumeX className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size={size}
      variant="ghost"
      onClick={() => (isSpeaking ? stop() : play(text))}
      aria-label={isSpeaking ? "Hentikan audio" : `Dengarkan pengucapan: ${text}`}
      className={cn(isSpeaking && "text-indigo-600", className)}
    >
      <Volume2 className={cn("size-4", isSpeaking && "animate-pulse")} />
    </Button>
  );
}
