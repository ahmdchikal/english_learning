/**
 * Maps raw Supabase/Postgres error messages (which may include English
 * technical detail or SQL error codes) into user-friendly Indonesian
 * messages. Never surface raw stack traces or SQL errors to end users.
 */
export function toFriendlyErrorMessage(error: unknown): string {
  const rawMessage = error instanceof Error ? error.message : String(error);

  const knownMessages: Record<string, string> = {
    "Invalid login credentials": "Email atau kata sandi salah.",
    "User already registered": "Email ini sudah terdaftar. Silakan masuk.",
    "Email not confirmed": "Silakan verifikasi email Anda terlebih dahulu.",
    "Anda harus masuk untuk melanjutkan.": "Anda harus masuk untuk melanjutkan.",
    "Pelajaran ini masih terkunci.": "Pelajaran ini masih terkunci.",
    "Pelajaran tidak ditemukan.": "Pelajaran tidak ditemukan.",
  };

  for (const [key, value] of Object.entries(knownMessages)) {
    if (rawMessage.includes(key)) return value;
  }

  if (rawMessage.toLowerCase().includes("fetch")) {
    return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
  }

  return "Terjadi kesalahan. Silakan coba lagi beberapa saat lagi.";
}
