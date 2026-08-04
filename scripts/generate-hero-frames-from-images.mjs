/**
 * Builds scroll-scrub hero frames from client mandap PNGs (4 scenes × 30 frames).
 * Run: node scripts/generate-hero-frames-from-images.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sourceDir = join(root, "public/hero/source");
const outDir = join(root, "public/videos/hero-frames");
const manifestPath = join(root, "lib/heroFramesManifest.json");

const SOURCES = ["mandap-01.png", "mandap-02.png", "mandap-03.png", "mandap-04.png"];
const FRAMES_PER_IMAGE = 30;
const WIDTH = 960;
const QUALITY = 78;

const ffmpeg = ffmpegInstaller.path;

if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

let frameIndex = 1;

for (const file of SOURCES) {
  const input = join(sourceDir, file);
  if (!existsSync(input)) {
    console.error("Missing", input);
    process.exit(1);
  }

  const tempPattern = join(outDir, `temp-${file.replace(".png", "")}-%03d.webp`);

  // Slow zoom + slight pan for cinematic scroll feel
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-loop",
      "1",
      "-i",
      input,
      "-vf",
      `scale=${WIDTH}:-2:flags=lanczos,zoompan=z='min(zoom+0.0008,1.08)':x='iw/2-(iw/zoom/2)':y='ih*0.32-(ih/zoom/2)':d=${FRAMES_PER_IMAGE}:s=${WIDTH}x${Math.round(WIDTH * 9 / 16)}:fps=15`,
      "-frames:v",
      String(FRAMES_PER_IMAGE),
      "-c:v",
      "libwebp",
      "-quality",
      String(QUALITY),
      tempPattern,
    ],
    { stdio: "inherit" },
  );

  const temps = readdirSync(outDir)
    .filter((f) => f.startsWith(`temp-${file.replace(".png", "")}`))
    .sort();

  for (const temp of temps) {
    const dest = join(outDir, `frame-${String(frameIndex).padStart(4, "0")}.webp`);
    execFileSync("cmd", ["/c", "move", "/Y", join(outDir, temp), dest], { stdio: "pipe" });
    frameIndex += 1;
  }
}

const frames = readdirSync(outDir).filter((f) => f.startsWith("frame-")).sort();

writeFileSync(
  manifestPath,
  `${JSON.stringify(
    {
      frameCount: frames.length,
      fps: 15,
      width: WIDTH,
      format: "webp",
      basePath: "/videos/hero-frames",
      pattern: "frame-%04d.webp",
    },
    null,
    2,
  )}\n`,
);

console.log(`Done — ${frames.length} frames from ${SOURCES.length} mandap images`);
