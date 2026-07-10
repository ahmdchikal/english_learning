"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { isSpeechSynthesisSupported, primeVoices, speak, stopSpeaking } from "@/lib/speech/tts";

const noopSubscribe = () => () => {};

export function useTextToSpeech(rate: number = 1) {
  const isSupported = useSyncExternalStore(noopSubscribe, isSpeechSynthesisSupported, () => false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    primeVoices();
    return () => stopSpeaking();
  }, []);

  const play = useCallback(
    (text: string) => {
      speak(text, {
        rate,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    },
    [rate]
  );

  const stop = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  return { isSupported, isSpeaking, play, stop };
}
