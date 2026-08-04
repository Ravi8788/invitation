/**
 * Extracts scroll-scrub hero frames from background.mp4.
 * Run: node scripts/extract-hero-frames.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public/videos/background.mp4");
const outDir = join(root, "public/videos/hero-frames");
const manifestPath = join(root, "lib/heroFramesManifest.json");

const FPS = 15;
const WIDTH = 960;
const QUALITY = 72;

if (!existsSync(input)) {
  console.error("Missing input video:", input);
  process.exit(1);
}

if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
}
mkdirSync(outDir, { recursive: true });

const ffmpeg = ffmpegInstaller.path;
const pattern = join(outDir, "frame-%04d.webp");

console.log("Extracting hero frames…");
execFileSync(
  ffmpeg,
  [
    "-y",
    "-i",
    input,
    "-vf",
    `fps=${FPS},scale=${WIDTH}:-2:flags=lanczos`,
    "-c:v",
    "libwebp",
    "-quality",
    String(QUALITY),
    pattern,
  ],
  { stdio: "inherit" },
);

const frames = readdirSync(outDir)
  .filter((f) => f.startsWith("frame-") && f.endsWith(".webp"))
  .sort();

const manifest = {
  frameCount: frames.length,
  fps: FPS,
  width: WIDTH,
  format: "webp",
  basePath: "/videos/hero-frames",
  pattern: "frame-%04d.webp",
};

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Done — ${frames.length} frames → ${outDir}`);
