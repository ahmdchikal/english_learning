"use client";

import { useSyncExternalStore } from "react";
import { WifiOff } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

export function OfflineBanner() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, () => true);

  if (isOnline) return null;

  return (
    <div className="bg-destructive fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 px-4 py-2 text-center text-sm font-medium text-white">
      <WifiOff className="size-4" />
      Anda sedang offline. Beberapa fitur mungkin tidak berfungsi hingga koneksi tersambung kembali.
    </div>
  );
}
