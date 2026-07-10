"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import {
  isSpeechRecognitionSupported,
  startRecognition,
  type ActiveRecognition,
} from "@/lib/speech/stt";

const noopSubscribe = () => () => {};

export function useSpeechRecognition() {
  const isSupported = useSyncExternalStore(noopSubscribe, isSpeechRecognitionSupported, () => false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeRef = useRef<ActiveRecognition | null>(null);

  const listen = useCallback((onResult: (transcript: string) => void) => {
    setError(null);
    activeRef.current = startRecognition({
      onStart: () => setIsListening(true),
      onEnd: () => setIsListening(false),
      onResult: (transcript) => {
        onResult(transcript);
      },
      onError: (message) => {
        setError(message);
        setIsListening(false);
      },
    });
  }, []);

  const stop = useCallback(() => {
    activeRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isSupported, isListening, error, listen, stop };
}
