// One-off build script to rasterize SVG sources into the PNG icon sizes
// required for a compliant PWA manifest + Android (TWA) packaging.
// Run with: node scripts/generate-icons.mjs
// Requires `sharp` (installed ad-hoc, not a runtime dependency of the app).
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const iconsDir = path.join(publicDir, "icons");
mkdirSync(iconsDir, { recursive: true });

const ANY_SIZES = [48, 72, 96, 128, 144, 152, 180, 192, 384, 512];
const MASKABLE_SIZES = [192, 512];

async function run() {
  const anySource = path.join(publicDir, "icon.svg");
  const maskableSource = path.join(publicDir, "icon-maskable-source.svg");

  for (const size of ANY_SIZES) {
    const outFile = path.join(iconsDir, `icon-${size}.png`);
    await sharp(anySource).resize(size, size).png().toFile(outFile);
    console.log(`wrote ${outFile}`);
  }

  for (const size of MASKABLE_SIZES) {
    const outFile = path.join(iconsDir, `maskable-${size}.png`);
    await sharp(maskableSource).resize(size, size).png().toFile(outFile);
    console.log(`wrote ${outFile}`);
  }

  // Apple touch icon (no transparency, solid background expected)
  await sharp(anySource)
    .resize(180, 180)
    .flatten({ background: "#4f46e5" })
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("wrote apple-touch-icon.png");

  // Favicon-sized PNG fallback (some crawlers/launchers prefer png over svg)
  await sharp(anySource).resize(32, 32).png().toFile(path.join(publicDir, "favicon-32.png"));
  console.log("wrote favicon-32.png");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
