"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mic, MicOff, Volume2, RotateCcw, AlertTriangle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { scoreSpeakingAttempt, type SpeakingScoreResult } from "@/lib/speech/similarity";
import { submitSpeakingScoreAction } from "@/lib/actions/learning";
import { cn } from "@/lib/utils";

export function SpeakingPractice({
  lessonId,
  targetText,
  initialBestScore = null,
}: {
  lessonId: string;
  targetText: string;
  initialBestScore?: number | null;
}) {
  const { isSupported: ttsSupported, play, isSpeaking } = useTextToSpeech();
  const { isSupported: sttSupported, isListening, listen, error: sttError } = useSpeechRecognition();

  const [transcript, setTranscript] = useState<string | null>(null);
  const [result, setResult] = useState<SpeakingScoreResult | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(initialBestScore);
  const [saving, setSaving] = useState(false);

  async function handleResult(spokenText: string) {
    setTranscript(spokenText);
    const scored = scoreSpeakingAttempt(targetText, spokenText);
    setResult(scored);

    setSaving(true);
    const response = await submitSpeakingScoreAction(lessonId, scored.score);
    setSaving(false);

    if (response.success && response.data) {
      setBestScore(response.data.best_speaking_score);
      if (response.data.xp_earned > 0) {
        toast.success(`+${response.data.xp_earned} XP! Skor berbicara terbaikmu meningkat.`);
      }
    } else if (!response.success) {
      toast.error(response.message ?? "Gagal menyimpan skor.");
    }
  }

  function handleRecord() {
    setTranscript(null);
    setResult(null);
    listen(handleResult);
  }

  function handleReset() {
    setTranscript(null);
    setResult(null);
  }

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">Latihan Berbicara</h3>
        {bestScore !== null && (
          <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            <Trophy className="size-3.5" />
            Skor terbaik: {bestScore}
          </span>
        )}
      </div>

      <p className="mt-3 rounded-xl bg-muted/50 p-4 text-center text-lg font-medium">{targetText}</p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" variant="outline" onClick={() => play(targetText)} disabled={!ttsSupported}>
          <Volume2 className={cn("size-4", isSpeaking && "animate-pulse")} />
          Dengarkan
        </Button>

        {sttSupported ? (
          <Button type="button" onClick={handleRecord} disabled={isListening || saving}>
            {isListening ? <MicOff className="size-4 animate-pulse" /> : <Mic className="size-4" />}
            {isListening ? "Mendengarkan..." : "Mulai Bicara"}
          </Button>
        ) : (
          <span className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            <AlertTriangle className="size-4" />
            Peramban Anda tidak mendukung pengenalan suara.
          </span>
        )}
      </div>

      {sttError && (
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-destructive">
          <AlertTriangle className="size-4" />
          {sttError}
        </p>
      )}

      {result && (
        <div className="mt-5 space-y-3 border-t pt-4">
          <div className="flex items-center justify-center gap-2">
            <span
              className={cn(
                "flex size-16 items-center justify-center rounded-full text-xl font-bold",
                result.score >= 90
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : result.score >= 70
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                    : "bg-destructive/10 text-destructive"
              )}
            >
              {result.score}
            </span>
          </div>
          <p className="text-center text-sm font-medium">{result.feedback}</p>

          <div className="flex flex-wrap justify-center gap-1.5">
            {result.targetWords.map((word, index) => (
              <span
                key={`${word.word}-${index}`}
                className={cn(
                  "rounded-md px-2 py-1 text-sm font-medium",
                  word.correct
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                    : "bg-destructive/10 text-destructive"
                )}
              >
                {word.word}
              </span>
            ))}
          </div>

          {transcript && (
            <p className="text-center text-xs text-muted-foreground">Anda mengucapkan: &ldquo;{transcript}&rdquo;</p>
          )}

          <div className="flex justify-center">
            <Button type="button" variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="size-4" />
              Coba Lagi
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
