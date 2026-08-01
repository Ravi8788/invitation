import { WEDDING } from "@/lib/constants";

const CRITICAL_ASSETS = [WEDDING.couple.caricature].filter(Boolean);

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
  const imageJobs = CRITICAL_ASSETS.map(preloadImage);
  const jobs = [...fontJobs, ...imageJobs];
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
