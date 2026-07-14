import type { Metadata } from "next";
import { Download, ShieldCheck, Smartphone, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Unduh Aplikasi Android",
  description: `Unduh dan pasang ${siteConfig.name} sebagai aplikasi Android langsung di ponsel Anda.`,
  alternates: { canonical: "/download-app" },
};

const STEPS = [
  {
    title: "Unduh berkas APK",
    description:
      "Klik tombol unduh di bawah untuk menyimpan berkas englishpath.apk ke ponsel Anda.",
  },
  {
    title: 'Izinkan "Instal dari sumber tidak dikenal"',
    description:
      'Karena aplikasi ini tidak diunduh dari Google Play Store, Android akan meminta izin khusus. Ketuk "Setelan" pada peringatan yang muncul, lalu aktifkan izin untuk browser atau pengelola berkas Anda.',
  },
  {
    title: "Buka berkas APK dan pasang",
    description:
      'Buka berkas yang telah diunduh (biasanya di folder "Downloads"), lalu ketuk "Pasang".',
  },
  {
    title: "Selesai!",
    description: `Ikon ${siteConfig.name} akan muncul di layar utama Anda, siap digunakan seperti aplikasi lainnya.`,
  },
];

export default function DownloadAppPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-indigo-600 text-white">
          <Smartphone className="size-8" />
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Pasang {siteConfig.name} di Android
        </h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-lg">
          Unduh langsung sebagai aplikasi Android — akses lebih cepat, ikon di layar utama, dan
          tampilan layar penuh tanpa bilah browser.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Button
            size="lg"
            className="h-12 px-8 text-base"
            render={<a href="/downloads/englishpath.apk" download="englishpath.apk" />}
          >
            <Download className="size-5" />
            Unduh EnglishPath.apk
          </Button>
          <p className="text-muted-foreground text-xs">
            Ukuran berkas sekitar 1 MB · Android 5.0 ke atas
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/20 dark:bg-amber-500/10">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              Bukan dari Google Play Store
            </p>
            <p className="mt-1 text-sm text-amber-900 dark:text-amber-200">
              Aplikasi ini didistribusikan langsung (side-loading), bukan melalui Google Play Store.
              Android akan menampilkan peringatan keamanan standar sebelum instalasi — ini normal
              untuk aplikasi yang dipasang di luar Play Store, dan tidak berarti aplikasi ini
              berbahaya.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Cara Memasang</h2>
        <ol className="mt-4 space-y-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="bg-card flex gap-4 rounded-2xl border p-4 shadow-sm">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-600/10 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {index + 1}
              </span>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="bg-card rounded-2xl border p-5">
          <ShieldCheck className="size-6 text-emerald-600 dark:text-emerald-400" />
          <h3 className="mt-3 font-semibold">Aman &amp; Resmi</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Aplikasi ini ditandatangani secara digital (signed APK) dan membuka konten yang sama
            persis dengan situs web {siteConfig.name} — tidak ada kode tambahan yang berbahaya.
          </p>
        </div>
        <div className="bg-card rounded-2xl border p-5">
          <RefreshCw className="size-6 text-indigo-600 dark:text-indigo-400" />
          <h3 className="mt-3 font-semibold">Selalu Terbaru</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Aplikasi ini menampilkan versi situs web terbaru secara otomatis — Anda tidak perlu
            mengunduh ulang setiap kali ada pembaruan fitur.
          </p>
        </div>
      </div>

      <p className="text-muted-foreground mt-10 text-center text-sm">
        Lebih suka tidak mengunduh berkas apa pun? Buka {siteConfig.name} di Chrome pada Android,
        lalu ketuk menu (⋮) dan pilih &ldquo;Tambahkan ke Layar Utama&rdquo; / &ldquo;Pasang
        Aplikasi&rdquo; untuk hasil yang serupa tanpa mengunduh APK.
      </p>
    </div>
  );
}
