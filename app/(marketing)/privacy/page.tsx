import type { Metadata } from "next";
import { siteConfig, CONTACT_EMAIL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: `Kebijakan privasi ${siteConfig.name} mengenai pengumpulan dan penggunaan data pengguna.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Kebijakan Privasi</h1>
      <p className="text-muted-foreground mt-2 text-sm">Terakhir diperbarui: Juli 2026</p>

      <div className="prose prose-neutral text-muted-foreground dark:prose-invert mt-8 max-w-none space-y-6">
        <section>
          <h2 className="text-foreground text-xl font-semibold">1. Data yang Kami Kumpulkan</h2>
          <p>
            Kami mengumpulkan nama lengkap, alamat email, dan data progres belajar (XP, streak, skor
            kuis, riwayat aktivitas) yang Anda hasilkan saat menggunakan {siteConfig.name}. Jika
            Anda mengunggah foto profil, kami juga menyimpan berkas gambar tersebut.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-xl font-semibold">2. Penggunaan Data</h2>
          <p>
            Data yang kami kumpulkan digunakan untuk menyediakan dan meningkatkan layanan, termasuk
            menyimpan progres belajar Anda, menampilkan statistik pribadi, dan mengirimkan email
            terkait akun (verifikasi, reset kata sandi).
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-xl font-semibold">3. Penyimpanan Data</h2>
          <p>
            Seluruh data disimpan menggunakan layanan Supabase dengan Row Level Security aktif, yang
            memastikan Anda hanya dapat mengakses data milik Anda sendiri.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-xl font-semibold">4. Hak Anda</h2>
          <p>
            Anda dapat memperbarui data profil Anda kapan saja melalui halaman Pengaturan, dan dapat
            menghapus akun Anda beserta seluruh data terkait melalui halaman Profil.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-xl font-semibold">5. Kontak</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami di{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 dark:text-indigo-400">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
