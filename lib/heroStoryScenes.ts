/** Scroll progress where the final hero line is fully visible — pin ends here. */
export const HERO_CONTENT_END_PROGRESS = 0.92;

/**
 * Scroll distance for pinned hero — ends soon after the last line appears.
 */
export function getHeroScrollEnd(): string {
  if (typeof window === "undefined") return "+=260%";
  const base = window.matchMedia("(max-width: 639px)").matches ? 2.8 : 3.6;
  return `+=${Math.round(base * HERO_CONTENT_END_PROGRESS * 100)}%`;
}

/** @deprecated use getHeroScrollEnd() */
export const HERO_SCROLL_END = "+=260%" as const;

export const HERO_SCENE_RANGES = {
  scene1: { start: 0, end: 0.24 },
  scene2: { start: 0.24, end: 0.48 },
  scene3: { start: 0.48, end: 0.72 },
  /** Stay visible through pin release so the event title line can show */
  scene4: { start: 0.72, end: 1 },
} as const;

export const HERO_STORY_SCENES = [
  { id: "1", isIntro: true as const },
  { id: "2", isTradition: true as const },
  { id: "3", isMuhurat: true as const },
  { id: "4", isCelebration: true as const },
] as const;
