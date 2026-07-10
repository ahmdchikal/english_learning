"use client";

/**
 * Thin wrapper around the Web Speech API's SpeechRecognition
 * (webkitSpeechRecognition in most browsers). Speech recognition support is
 * inconsistent across browsers, so callers must check
 * `isSpeechRecognitionSupported()` and show a clear fallback message when
 * it returns false, instead of letting the app crash.
 */

interface SpeechRecognitionResultLike {
  transcript: string;
  confidence: number;
}

export interface MinimalSpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: unknown) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => MinimalSpeechRecognition;

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getSpeechRecognitionConstructor() !== null;
}

export interface RecognizeOptions {
  onStart?: () => void;
  onResult: (transcript: string, confidence: number) => void;
  onError: (message: string) => void;
  onEnd?: () => void;
}

export interface ActiveRecognition {
  stop: () => void;
}

export function startRecognition(options: RecognizeOptions): ActiveRecognition | null {
  const Ctor = getSpeechRecognitionConstructor();
  if (!Ctor) {
    options.onError("Peramban ini tidak mendukung pengenalan suara.");
    return null;
  }

  const recognition = new Ctor();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => options.onStart?.();

  recognition.onresult = (event: unknown) => {
    const typed = event as {
      results: ArrayLike<ArrayLike<SpeechRecognitionResultLike>>;
    };
    const result = typed.results?.[0]?.[0];
    if (result) {
      options.onResult(result.transcript, result.confidence);
    } else {
      options.onError("Tidak ada suara yang terdeteksi. Coba lagi.");
    }
  };

  recognition.onerror = (event: unknown) => {
    const typed = event as { error?: string };
    const messages: Record<string, string> = {
      "no-speech": "Tidak ada suara yang terdeteksi. Coba bicara lebih jelas.",
      "audio-capture": "Mikrofon tidak ditemukan. Periksa perangkat Anda.",
      "not-allowed": "Izin mikrofon ditolak. Aktifkan izin mikrofon di peramban Anda.",
    };
    options.onError(messages[typed.error ?? ""] ?? "Terjadi kesalahan pada pengenalan suara.");
  };

  recognition.onend = () => options.onEnd?.();

  try {
    recognition.start();
  } catch {
    options.onError("Tidak dapat memulai pengenalan suara.");
    return null;
  }

  return {
    stop: () => recognition.stop(),
  };
}
