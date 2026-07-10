"use client";

/** Thin wrapper around window.speechSynthesis (text-to-speech). */

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSynthesisSupported()) return null;
  if (cachedVoice) return cachedVoice;

  const voices = window.speechSynthesis.getVoices();
  const englishVoice =
    voices.find((voice) => voice.lang === "en-US") ??
    voices.find((voice) => voice.lang?.startsWith("en")) ??
    null;

  cachedVoice = englishVoice;
  return englishVoice;
}

export interface SpeakOptions {
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export function speak(text: string, options: SpeakOptions = {}): void {
  if (!isSpeechSynthesisSupported() || !text.trim()) {
    options.onError?.();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = options.rate ?? 1;

  const voice = pickEnglishVoice();
  if (voice) utterance.voice = voice;

  if (options.onStart) utterance.onstart = options.onStart;
  if (options.onEnd) utterance.onend = options.onEnd;
  if (options.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

/** Voice lists load asynchronously in some browsers; call once on mount. */
export function primeVoices(): void {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
  };
}
