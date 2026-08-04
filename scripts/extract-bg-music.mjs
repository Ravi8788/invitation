/**
 * Extracts background music from public/videos/final.mp4 → public/audio/bg-music.mp3
 * Run: npm run extract-bg-music
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public/videos/final.mp4");
const outDir = join(root, "public/audio");
const output = join(outDir, "bg-music.mp3");

if (!existsSync(input)) {
  console.error("Missing public/videos/final.mp4");
  process.exit(1);
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

execFileSync(
  ffmpegInstaller.path,
  ["-y", "-i", input, "-vn", "-acodec", "libmp3lame", "-q:a", "2", output],
  { stdio: "inherit" },
);

console.log(`Saved ${output}`);
