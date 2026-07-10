import type { Metadata } from "next";
import { siteConfig, CONTACT_EMAIL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: `Syarat dan ketentuan penggunaan layanan ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Syarat &amp; Ketentuan</h1>
      <p className="mt-2 text-sm text-muted-foreground">Terakhir diperbarui: Juli 2026</p>

      <div className="prose prose-neutral mt-8 max-w-none space-y-6 text-muted-foreground dark:prose-invert">
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Penerimaan Ketentuan</h2>
          <p>
            Dengan mendaftar dan menggunakan {siteConfig.name}, Anda menyetujui syarat dan
            ketentuan yang tercantum di halaman ini.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">2. Penggunaan Layanan</h2>
          <p>
            Layanan ini disediakan secara gratis untuk tujuan pembelajaran pribadi. Anda dilarang
            menyalahgunakan sistem, termasuk mencoba memanipulasi XP atau progres belajar dengan
            cara yang tidak sah.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">3. Akun Pengguna</h2>
          <p>
            Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi akun Anda. Segala aktivitas
            yang terjadi melalui akun Anda menjadi tanggung jawab Anda.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">4. Konten Pembelajaran</h2>
          <p>
            Materi pembelajaran disediakan untuk tujuan edukasi. Kami berupaya menjaga akurasi
            konten, namun tidak menjamin bahwa seluruh materi bebas dari kesalahan.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">5. Perubahan Layanan</h2>
          <p>
            Kami dapat mengubah, menambah, atau menghentikan sebagian fitur layanan sewaktu-waktu
            dengan atau tanpa pemberitahuan sebelumnya.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">6. Kontak</h2>
          <p>
            Pertanyaan mengenai syarat dan ketentuan ini dapat dikirimkan ke{" "}
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
