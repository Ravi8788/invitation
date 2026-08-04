/**
 * Extracts scroll-scrub hero frames from final.mp4 (client reference reel).
 * Run: npm run extract-hero-frames
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public/videos/final.mp4");
const outDir = join(root, "public/videos/hero-frames");
const manifestPath = join(root, "lib/heroFramesManifest.json");

const FPS = 15;
const WIDTH = 960;
const QUALITY = 78;
/** Subtle colour lift — keep mandap natural, not over-bright */
const VIDEO_FILTER = "eq=brightness=0.02:contrast=1.04:saturation=1.06";

if (!existsSync(input)) {
  console.error("Missing public/videos/final.mp4");
  process.exit(1);
}

const source = input;

if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const ffmpeg = ffmpegInstaller.path;
const pattern = join(outDir, "frame-%04d.webp");

console.log("Extracting from", source);
execFileSync(
  ffmpeg,
  ["-y", "-i", source, "-vf", `fps=${FPS},scale=${WIDTH}:-2:flags=lanczos,${VIDEO_FILTER}`, "-c:v", "libwebp", "-quality", String(QUALITY), pattern],
  { stdio: "inherit" },
);

const frames = readdirSync(outDir).filter((f) => f.endsWith(".webp")).sort();

writeFileSync(
  manifestPath,
  `${JSON.stringify({ frameCount: frames.length, fps: FPS, width: WIDTH, format: "webp", basePath: "/videos/hero-frames", pattern: "frame-%04d.webp" }, null, 2)}\n`,
);
console.log(`Done — ${frames.length} frames`);
