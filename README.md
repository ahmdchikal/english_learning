# EnglishPath

Platform belajar Bahasa Inggris untuk pengguna Indonesia — dari pemula absolut (Pre-A1) hingga mahir (C1). EnglishPath adalah aplikasi web full-stack yang lengkap: pelajaran interaktif, kosakata dengan audio, latihan berbicara berbasis pengenalan suara, sistem kuis dengan penilaian otomatis, pelacakan progres, gamifikasi (XP, streak, lencana), dan panel admin untuk mengelola konten belajar.

> Antarmuka menggunakan Bahasa Indonesia. Materi belajar berbahasa Inggris disertai penjelasan dan terjemahan Bahasa Indonesia.

## Tangkapan Layar

> _Tambahkan tangkapan layar aplikasi Anda di sini setelah dijalankan secara lokal._

| Landing Page | Dashboard | Pelajaran | Kuis |
| --- | --- | --- | --- |
| `docs/screenshots/landing.png` | `docs/screenshots/dashboard.png` | `docs/screenshots/lesson.png` | `docs/screenshots/quiz.png` |

## Daftar Fitur

- **Autentikasi** — Registrasi, login, logout, lupa/reset kata sandi, verifikasi email, sesi persisten, rute terlindungi, login Google (opsional), dan indikator kekuatan kata sandi. Ditenagai oleh Supabase Auth.
- **Materi Belajar** — 6 level berbasis CEFR (Pre-A1 s.d. C1), masing-masing minimal 5 unit, dengan pelajaran lengkap: penjelasan Bahasa Indonesia, kosakata + audio pengucapan, contoh dialog, catatan tata bahasa, kesalahan umum, dan latihan interaktif.
- **Kuis** — Mesin kuis satu-soal-per-halaman dengan urutan soal & pilihan acak, progress bar, penjelasan setelah menjawab, penilaian otomatis di server (0–100, lulus minimal 70), penyimpanan skor terbaik, dan ulasan jawaban salah.
- **Latihan Berbicara** — Menggunakan Web Speech API (`SpeechRecognition` + `speechSynthesis`) untuk merekam ucapan, membandingkannya dengan kalimat target, memberi skor kemiripan 0–100, menyorot kata yang benar/salah, dan menyimpan skor tertinggi.
- **Gamifikasi** — XP, streak harian, lencana (achievements), kalender aktivitas, dan statistik mingguan — seluruhnya dihitung dan divalidasi di server melalui fungsi Postgres (RPC), bukan di browser.
- **Progres** — Status per-pelajaran (`not_started` → `in_progress` → `completed`), penguncian materi berurutan, aturan pembukaan level berikutnya (≥80% pelajaran selesai + rata-rata kuis ≥70), serta halaman statistik lengkap (grafik XP, grafik waktu belajar, area yang perlu ditingkatkan).
- **Tes Penempatan** — 20 soal berbagai tingkat kesulitan, satu soal per halaman, memberi rekomendasi level awal (bukan penguncian mutlak — pengguna tetap bisa mulai dari Pre-A1).
- **Panel Admin** — CRUD untuk level, unit, pelajaran, kosakata, contoh kalimat, soal (+ pilihan jawaban), publish/unpublish, draf, pencarian/filter, dan manajemen peran pengguna. Dilindungi oleh peran `admin` di database (RLS) dan pemeriksaan di server.
- **Desain Responsif** — Mobile-first, bottom navigation di perangkat mobile, sidebar di desktop, mode gelap, skeleton loading, toast notification, dialog konfirmasi untuk aksi penting, dan breadcrumb di halaman pelajaran/admin.
- **SEO** — Metadata per halaman, Open Graph & Twitter card, `sitemap.xml`, `robots.txt`, web app manifest, dan canonical URL.
- **Aplikasi Android** — Dapat dipasang langsung dari Chrome ("Tambahkan ke Layar Utama") sebagai Progressive Web App, atau diunduh sebagai berkas `.apk` mandiri di halaman `/download-app`. Lihat [`docs/android-app.md`](docs/android-app.md) untuk detail dan cara membangun ulang APK-nya.

## Teknologi

| Kategori | Teknologi |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript (strict mode) |
| Styling/UI | Tailwind CSS v4, shadcn/ui (Base UI primitives), Lucide React |
| Backend/DB | Supabase (PostgreSQL, Auth, Row Level Security, Storage) |
| Formulir & Validasi | React Hook Form, Zod |
| Grafik | Recharts |
| Suara | Web Speech API (`SpeechRecognition`, `speechSynthesis`) — gratis, bawaan peramban |
| Kualitas Kode | ESLint, Prettier |
| Deployment | Vercel |

Tidak ada layanan AI berbayar (mis. OpenAI API) yang digunakan — seluruh fitur inti (termasuk latihan berbicara dan text-to-speech) berjalan menggunakan Web Speech API bawaan peramban, sehingga aplikasi tetap berfungsi penuh secara gratis.

## Struktur Proyek

```text
app/
  (marketing)/        # Landing page, tentang, level, privasi, syarat & ketentuan
  (auth)/              # Login, registrasi, lupa/reset kata sandi
  (dashboard)/         # Dashboard, belajar, pelajaran, kuis, latihan, progres, profil, dst.
  admin/               # Panel admin (dilindungi peran admin)
  auth/callback/       # Route handler untuk konfirmasi email & OAuth
components/
  ui/                  # Komponen shadcn/ui (Base UI)
  layout/              # Navbar, sidebar, bottom nav, header
  learning/            # Kosakata, contoh kalimat, latihan soal
  quiz/                # Mesin kuis
  speaking/            # Komponen latihan berbicara
  progress/            # Grafik & kalender aktivitas
  admin/               # Form & tabel admin
  marketing/           # Seksi-seksi landing page
  auth/, profile/, common/
lib/
  supabase/            # Klien Supabase (browser, server, admin/service-role)
  validations/         # Skema Zod
  utils/                # Fungsi bantu (format, error, shuffle)
  constants/           # Konfigurasi situs, navigasi, level, XP
  speech/              # Wrapper Web Speech API + algoritma kemiripan ucapan
  progress/            # Kalkulasi progres
  actions/             # Server actions (mutasi data)
  data/                # Fungsi pengambilan data (server-only)
  quiz/                # Format jawaban & pesan motivasi
hooks/                 # React hooks (TTS, STT, media query)
types/                 # Tipe TypeScript untuk skema database
public/                # Aset statis
supabase/
  migrations/          # Migrasi SQL (skema, RLS, fungsi RPC, storage)
  seed.sql             # Data contoh (levels, units, lessons, soal, dll.)
```

## Kebutuhan Sistem

- Node.js 20 atau lebih baru
- npm 10 atau lebih baru
- Akun [Supabase](https://supabase.com) (gratis)
- Akun [Vercel](https://vercel.com) untuk deployment (gratis)

## Instalasi Lokal

```bash
git clone <url-repo-anda>
cd englishpath
npm install
cp .env.example .env.local
# isi .env.local dengan kredensial Supabase Anda (lihat bagian di bawah)
npm run dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

## Konfigurasi Supabase

### 1. Buat Proyek Supabase

1. Buka [supabase.com/dashboard](https://supabase.com/dashboard) dan buat proyek baru.
2. Catat **Project URL** dan **anon public key** dari **Settings → API**.
3. Catat juga **service_role key** dari halaman yang sama (jaga kerahasiaannya — jangan pernah commit ke repository atau expose ke frontend).

### 2. Jalankan Migrasi SQL

Buka **SQL Editor** di dashboard Supabase, lalu jalankan file-file berikut **secara berurutan**:

1. `supabase/migrations/0001_schema.sql` — membuat seluruh tabel.
2. `supabase/migrations/0002_functions.sql` — trigger, fungsi keamanan, dan RPC (mis. `submit_quiz_attempt`, `mark_lesson_started`).
3. `supabase/migrations/0003_rls.sql` — mengaktifkan Row Level Security dan seluruh policy.
4. `supabase/migrations/0004_storage.sql` — membuat bucket Storage `avatars` beserta policy-nya.

Atau, jika Anda menggunakan [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
supabase link --project-ref <project-ref-anda>
supabase db push
```

### 3. Jalankan Seed Data

Setelah migrasi selesai, jalankan `supabase/seed.sql` di **SQL Editor** untuk mengisi data contoh (6 level, 30 unit, 13 pelajaran contoh termasuk pelajaran lengkap "Greetings and Introductions", kosakata, soal, tes penempatan, dan pencapaian).

```sql
-- Jalankan isi file supabase/seed.sql di SQL Editor
```

Seed ini aman dijalankan berulang kali (idempotent — akan menghapus dan mengisi ulang data konten).

### 4. Konfigurasi Supabase Auth

Di **Authentication → URL Configuration**:

- **Site URL**: `http://localhost:3000` (untuk pengembangan lokal)
- **Redirect URLs**, tambahkan keduanya:
  - `http://localhost:3000/auth/callback`
  - `https://domain-vercel-anda.vercel.app/auth/callback` (tambahkan setelah deploy)

Di **Authentication → Providers**, pastikan **Email** aktif. Untuk mengaktifkan login Google (opsional), aktifkan provider **Google** dan isi Client ID/Secret dari Google Cloud Console — jika tidak dikonfigurasi, tombol "Lanjutkan dengan Google" akan menampilkan pesan error yang jelas tanpa merusak aplikasi.

### 5. Buat Bucket Storage (jika belum otomatis dari migrasi)

Migrasi `0004_storage.sql` sudah membuat bucket `avatars` (publik, maksimal 2MB, hanya PNG/JPEG/WebP). Jika Anda menjalankan migrasi secara manual dan bucket belum muncul, buat secara manual di **Storage** dengan nama `avatars`, akses publik, dan jalankan ulang bagian policy dari file migrasi tersebut.

## Environment Variables

Salin `.env.example` menjadi `.env.local` dan isi:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=EnglishPath
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
SUPABASE_SERVICE_ROLE_KEY=ey...
```

**Penting:** `SUPABASE_SERVICE_ROLE_KEY` hanya digunakan di server (lihat `lib/supabase/admin.ts`, yang dijaga oleh paket `server-only`) dan tidak pernah diteruskan ke browser.

## Cara Membuat Administrator

Tidak ada email/kata sandi admin yang di-hardcode di kode sumber. Untuk menjadikan seorang pengguna sebagai admin:

1. Daftar akun terlebih dahulu melalui `/register` seperti pengguna biasa.
2. Buka **SQL Editor** di Supabase dan jalankan:

   ```sql
   update public.profiles
   set role = 'admin'
   where id = (select id from auth.users where email = 'email-anda@contoh.com');
   ```

3. Muat ulang aplikasi — menu "Panel Admin" akan muncul di sidebar, dan halaman `/admin/*` dapat diakses.

## Menjalankan Aplikasi

```bash
npm install       # instal dependensi
npm run dev       # jalankan server pengembangan (http://localhost:3000)
npm run lint      # jalankan ESLint
npm run typecheck # jalankan pemeriksaan TypeScript (tsc --noEmit)
npm run build     # build produksi
npm run start     # jalankan build produksi secara lokal
```

## Deployment ke Vercel

1. **Buat proyek Supabase** dan jalankan migrasi + seed seperti pada bagian sebelumnya.
2. **Buat repository GitHub** untuk proyek ini (jika belum ada) dan push kode Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <url-repo-github-anda>
   git push -u origin main
   ```
3. **Import repository ke Vercel** melalui [vercel.com/new](https://vercel.com/new) dan pilih repository Anda. Vercel akan mendeteksi Next.js secara otomatis — tidak diperlukan konfigurasi khusus.
4. **Tambahkan environment variables** di **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` (gunakan domain Vercel Anda, mis. `https://englishpath.vercel.app`)
   - `NEXT_PUBLIC_SITE_NAME`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. **Jalankan deployment** — klik **Deploy**. Vercel akan menjalankan `npm install` dan `npm run build` secara otomatis.
6. **Tinjau build logs** di tab **Deployments** jika terjadi kegagalan — pesan error akan menunjukkan variabel lingkungan yang hilang atau kesalahan build lainnya.
7. **Perbarui Redirect URLs Supabase** dengan menambahkan `https://domain-vercel-anda.vercel.app/auth/callback` di **Authentication → URL Configuration**, dan perbarui **Site URL** ke domain produksi Anda.
8. **Konfigurasi domain khusus (opsional)** melalui **Project Settings → Domains** di Vercel, lalu tambahkan juga domain tersebut ke Redirect URLs Supabase.

Setelah langkah-langkah di atas, aplikasi dapat diakses secara online dan siap digunakan.

## Pemecahan Masalah (Troubleshooting)

| Masalah | Solusi |
| --- | --- |
| Halaman menampilkan "Terjadi kesalahan" saat memuat data | Periksa `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di environment variables Anda. |
| Login berhasil tetapi langsung logout / sesi tidak tersimpan | Pastikan `proxy.ts` (middleware) tidak diblokir dan cookie domain sesuai dengan domain aplikasi Anda. |
| Tombol "Panel Admin" tidak muncul setelah diberi peran admin | Logout dan login ulang, atau muat ulang halaman agar sesi profil diperbarui. |
| Latihan berbicara menampilkan peringatan tidak didukung | Fitur `SpeechRecognition` hanya didukung sebagian peramban (lihat bagian Browser Support). Gunakan Chrome/Edge untuk pengalaman terbaik. |
| Upload avatar gagal | Pastikan bucket Storage `avatars` sudah dibuat (migrasi `0004_storage.sql`) dan berukuran di bawah 2MB dengan format PNG/JPEG/WebP. |
| `npm run build` gagal karena environment variable hilang | Set seluruh variabel di `.env.example` sebelum build, baik secara lokal maupun di Vercel. |

## Dukungan Peramban (Browser Support)

Aplikasi berfungsi penuh pada peramban modern (Chrome, Edge, Firefox, Safari) untuk seluruh fitur pembelajaran, kuis, dan progres. Dua fitur bergantung pada Web Speech API dengan tingkat dukungan yang berbeda antar peramban:

- **Text-to-Speech** (`speechSynthesis`) — didukung secara luas di Chrome, Edge, Safari, dan Firefox terbaru.
- **Speech Recognition** (`SpeechRecognition`/`webkitSpeechRecognition`) — dukungan terbaik di Chrome dan Edge (berbasis Chromium). Safari memiliki dukungan terbatas, dan Firefox saat ini belum mendukungnya secara native. Jika tidak didukung, aplikasi akan menampilkan peringatan yang jelas alih-alih error, dan seluruh fitur lain tetap dapat digunakan.

## Keterbatasan yang Diketahui (Known Limitations)

- Latihan berbicara menggunakan algoritma kemiripan kata sederhana (bukan model pengenalan pengucapan berbasis AI), sehingga penilaian bersifat indikatif, bukan penilaian linguistik profesional.
- Login Google memerlukan konfigurasi OAuth provider secara manual di dashboard Supabase; jika belum dikonfigurasi, tombol akan menampilkan pesan kegagalan yang jelas.
- Editor konten admin menggunakan area teks terstruktur (bukan rich-text editor penuh) sesuai cakupan MVP.
- Rate limiting pada rute sensitif bersifat dasar (divalidasi di server actions/RPC); untuk trafik produksi skala besar, pertimbangkan menambahkan rate limiting di level edge/proxy.
- Data pengguna, testimoni, dan statistik pada landing page yang berupa contoh secara eksplisit diberi label "contoh/demo" dan bukan data pengguna nyata.
