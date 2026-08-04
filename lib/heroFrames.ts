import manifest from "@/lib/heroFramesManifest.json";

export interface HeroFrameManifest {
  frameCount: number;
  fps: number;
  width: number;
  format: string;
  basePath: string;
  pattern: string;
}

export const HERO_FRAMES: HeroFrameManifest = manifest;

/** Zero-padded frame URL — index is 0-based. */
export function heroFrameUrl(index: number): string {
  const n = Math.min(
    HERO_FRAMES.frameCount - 1,
    Math.max(0, Math.floor(index)),
  );
  const file = HERO_FRAMES.pattern.replace("%04d", String(n + 1).padStart(4, "0"));
  return `${HERO_FRAMES.basePath}/${file}`;
}

export const HERO_FRAME_COUNT = HERO_FRAMES.frameCount;
