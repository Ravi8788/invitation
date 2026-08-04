import { PRELOAD_IMAGES } from "@/lib/images";
import { HERO_FRAME_COUNT, heroFrameUrl } from "@/lib/heroFrames";

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    const finish = () => resolve();
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
  });
}

function preloadFont(family: string): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  return document.fonts.load(`1rem "${family}"`).then(() => undefined).catch(() => undefined);
}

/** Preload opener assets + all hero frames so scroll scrub is smooth from frame 1 */
export async function preloadAssets(onProgress: (percent: number) => void): Promise<void> {
  const heroJobs = Array.from({ length: HERO_FRAME_COUNT }, (_, i) =>
    preloadImage(heroFrameUrl(i)),
  );

  const jobs = [
    preloadFont("Cinzel"),
    preloadFont("Montserrat"),
    preloadFont("Cormorant Garamond"),
    preloadFont("Noto Serif Devanagari"),
    ...PRELOAD_IMAGES.map(preloadImage),
    ...heroJobs,
  ];
  let completed = 0;

  const tick = () => {
    completed += 1;
    onProgress(Math.min(100, Math.round((completed / jobs.length) * 100)));
  };

  onProgress(0);
  await Promise.all(jobs.map((job) => job.finally(tick)));
  onProgress(100);
}
