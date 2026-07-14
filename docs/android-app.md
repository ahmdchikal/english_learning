# Aplikasi Android

EnglishPath dapat digunakan di Android melalui dua cara, tanpa memerlukan Google Play Store:

## 1. Progressive Web App (PWA) — cara tercepat

Buka `https://<domain-produksi-anda>` di Chrome untuk Android, lalu ketuk menu (⋮) →
**"Tambahkan ke Layar Utama"** / **"Pasang Aplikasi"**. Chrome akan menampilkan prompt
instalasi bawaan secara otomatis (lihat `components/common/install-app-prompt.tsx`).
Aplikasi akan berjalan dalam mode `standalone` (layar penuh, tanpa bilah alamat), dengan
ikon asli dan dukungan offline dasar (lihat `public/sw.js` dan `public/offline.html`).

Ini didukung oleh `app/manifest.ts`, yang menyediakan seluruh ukuran ikon (termasuk ikon
*maskable* untuk ikon adaptif Android) dan *shortcuts* aplikasi.

## 2. Berkas APK mandiri (side-load)

Untuk pengguna yang ingin memasang berkas `.apk` secara langsung (tanpa harus membuka
Chrome terlebih dahulu setiap kali), tersedia unduhan di halaman `/download-app` pada
situs, yang menyajikan `public/downloads/englishpath.apk`.

Berkas ini dibangun menggunakan **Trusted Web Activity (TWA)** — teknologi resmi Google
yang membungkus PWA dalam _shell_ Android native tipis (menggunakan Chrome sebagai mesin
render sesungguhnya), tanpa perlu menulis ulang aplikasi dalam bahasa native.

### Cara membangun ulang APK

Skrip dan proyek Android **tidak** disertakan dalam repositori ini (folder `android-twa/`
dan `.android-sdk/` diabaikan lewat `.gitignore`) karena berukuran besar dan dapat
dibuat ulang kapan saja. Berikut langkah membangunnya dari awal:

**Kebutuhan:** Node.js, JDK 17+ (disarankan JDK 21), dan koneksi internet (untuk
mengunduh Android SDK command-line tools + Gradle).

```bash
# 1. Siapkan folder kerja terpisah dari proyek utama
mkdir -p android-twa && cd android-twa
npm init -y
npm install @bubblewrap/cli

# 2. Unduh & pasang Android SDK command-line tools (sekali saja)
mkdir -p ../.android-sdk && cd ../.android-sdk
curl -o cmdline-tools.zip \
  "https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip"
unzip -q cmdline-tools.zip && rm cmdline-tools.zip
export JAVA_HOME=/path/ke/jdk-21   # sesuaikan dengan lokasi JDK Anda
export ANDROID_HOME="$PWD"
yes | ./tools/bin/sdkmanager --sdk_root="$ANDROID_HOME" --licenses
./tools/bin/sdkmanager --sdk_root="$ANDROID_HOME" \
  "platform-tools" "platforms;android-34" "build-tools;34.0.0"
cd ../android-twa

# 3. Beri tahu Bubblewrap CLI untuk memakai JDK & SDK yang sudah ada
#    (menghindari wizard interaktif yang tidak cocok untuk CI/agent)
mkdir -p ~/.bubblewrap
cat > ~/.bubblewrap/config.json << EOF
{"jdkPath":"$JAVA_HOME","androidSdkPath":"$ANDROID_HOME"}
EOF
```

Kemudian buat skrip `generate-twa.mjs` di dalam `android-twa/` yang memanggil
`@bubblewrap/core` secara langsung (bukan `bubblewrap init` yang interaktif):

```js
import { TwaManifest, TwaGenerator, JdkHelper, KeyTool, ConsoleLog } from "@bubblewrap/core";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PRODUCTION_URL = "https://<domain-produksi-anda>";
const TARGET_DIR = path.resolve("./project");
const KEYSTORE_PASSWORD = "<pilih-kata-sandi-kuat>";

const twaManifest = await TwaManifest.fromWebManifest(`${PRODUCTION_URL}/manifest.webmanifest`);
twaManifest.packageId = "com.englishpath.app";
twaManifest.name = "EnglishPath";
twaManifest.launcherName = "EnglishPath";
twaManifest.appVersionCode = 1; // naikkan setiap kali membangun ulang untuk rilis baru
twaManifest.appVersionName = "1.0.0";
twaManifest.signingKey.path = path.join(TARGET_DIR, "android.keystore");
twaManifest.signingKey.alias = "englishpath";

await fs.mkdir(TARGET_DIR, { recursive: true });
await twaManifest.saveToFile(path.join(TARGET_DIR, "twa-manifest.json"));

const log = new ConsoleLog("generate-twa");
await new TwaGenerator().createTwaProject(TARGET_DIR, twaManifest, log, () => {});

// Tulis checksum agar `bubblewrap build` tidak menganggap manifest berubah.
const manifestContents = await fs.readFile(path.join(TARGET_DIR, "twa-manifest.json"));
const checksum = crypto.createHash("sha1").update(manifestContents).digest("hex");
await fs.writeFile(path.join(TARGET_DIR, "manifest-checksum.txt"), checksum);

const jdkHelper = new JdkHelper(process, { jdkPath: process.env.JAVA_HOME, androidSdkPath: process.env.ANDROID_HOME });
await new KeyTool(jdkHelper, log).createSigningKey({
  fullName: "EnglishPath",
  organizationalUnit: "Engineering",
  organization: "EnglishPath",
  country: "ID",
  password: KEYSTORE_PASSWORD,
  keypassword: KEYSTORE_PASSWORD,
  alias: twaManifest.signingKey.alias,
  path: twaManifest.signingKey.path,
});
```

Jalankan generator, lalu build:

```bash
node generate-twa.mjs
cd project
echo "sdk.dir=$ANDROID_HOME" > local.properties

export BUBBLEWRAP_KEYSTORE_PASSWORD="<kata-sandi-yang-sama-di-atas>"
export BUBBLEWRAP_KEY_PASSWORD="<kata-sandi-yang-sama-di-atas>"
../node_modules/.bin/bubblewrap build --skipPwaValidation
```

Hasil akhirnya adalah `app-release-signed.apk` (siap dipasang) dan
`app-release-bundle.aab` (untuk diunggah ke Google Play Console, jika suatu saat ingin
merilis resmi ke Play Store). Salin `app-release-signed.apk` ke
`public/downloads/englishpath.apk` di repositori utama, commit, dan deploy.

### Verifikasi hasil build

```bash
# Pastikan tanda tangan APK valid
$ANDROID_HOME/build-tools/34.0.0/apksigner verify --verbose app-release-signed.apk

# Lihat metadata paket (nama paket, versi, label aplikasi)
$ANDROID_HOME/build-tools/34.0.0/aapt dump badging app-release-signed.apk
```

## Mengapa TWA, bukan aplikasi native penuh?

TWA membuka domain produksi yang sama persis di dalam Chrome (disematkan sebagai
_activity_ Android), sehingga:

- Tidak ada duplikasi kode — satu basis kode Next.js yang sama melayani web dan Android.
- Update otomatis — setiap deployment ke domain produksi langsung terlihat di aplikasi
  Android tanpa perlu merilis ulang APK.
- Ukuran unduhan sangat kecil (~1 MB) dibandingkan aplikasi native/React Native.

Kekurangannya: memerlukan koneksi internet aktif (tidak benar-benar "native offline-first"
seperti aplikasi React Native), meskipun `public/sw.js` menyediakan halaman offline
sederhana ketika koneksi terputus.
