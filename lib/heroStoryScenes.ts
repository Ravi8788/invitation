import { HERO_FRAME_COUNT, HERO_FRAMES } from "@/lib/heroFrames";

/** Duration of final.mp4 reel (seconds) */
export const HERO_VIDEO_SECONDS = HERO_FRAME_COUNT / HERO_FRAMES.fps;

/**
 * Scroll distance for pinned hero — ~1 viewport height per second of video.
 * 10s reel → 1000% (10 screen-heights) while pinned.
 */
export const HERO_SCROLL_END = "+=1000%" as const;

export const HERO_SCENE_RANGES = {
  scene1: { start: 0, end: 0.25 },
  scene2: { start: 0.25, end: 0.5 },
  scene3: { start: 0.5, end: 0.75 },
  scene4: { start: 0.75, end: 1 },
} as const;

export const HERO_STORY_SCENES = [
  { id: "1", isIntro: true as const },
  { id: "2", isTradition: true as const },
  { id: "3", isMuhurat: true as const },
  { id: "4", isCelebration: true as const },
] as const;
