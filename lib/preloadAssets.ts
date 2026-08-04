import { PRELOAD_IMAGES } from "@/lib/images";
import { HERO_VIDEO } from "@/lib/videos";

function preloadVideo(src: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    const finish = () => {
      video.removeEventListener("canplaythrough", finish);
      video.removeEventListener("error", finish);
      resolve();
    };
    video.addEventListener("canplaythrough", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    video.src = src;
    video.load();
  });
}

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

/**
 * Preloads critical site assets and reports real progress (0–100).
 * Failed assets still advance progress so the loader never stalls.
 */
export async function preloadAssets(
  onProgress: (percent: number) => void
): Promise<void> {
  const fontJobs = [
    preloadFont("Cinzel"),
    preloadFont("Poppins"),
    preloadFont("Great Vibes"),
  ];
  const imageJobs = PRELOAD_IMAGES.map(preloadImage);
  const videoJob = preloadVideo(HERO_VIDEO);
  const jobs = [...fontJobs, ...imageJobs, videoJob];
  const total = jobs.length;
  let completed = 0;

  const tick = () => {
    completed += 1;
    onProgress(Math.min(100, Math.round((completed / total) * 100)));
  };

  onProgress(0);

  await Promise.all(
    jobs.map((job) =>
      job.finally(() => {
        tick();
      })
    )
  );

  onProgress(100);
}
