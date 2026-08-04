import { HERO_SCENE_RANGES } from "@/lib/heroStoryScenes";

const SCENES = [
  { id: "1", ...HERO_SCENE_RANGES.scene1 },
  { id: "2", ...HERO_SCENE_RANGES.scene2 },
  { id: "3", ...HERO_SCENE_RANGES.scene3 },
  { id: "4", ...HERO_SCENE_RANGES.scene4 },
] as const;

const EDGE = 0.06;

function alphaInSegment(progress: number, start: number, end: number): number {
  if (progress < start || progress >= end) return 0;
  const span = end - start;
  const t = (progress - start) / span;
  if (t < EDGE) return t / EDGE;
  if (t > 1 - EDGE) return (1 - t) / EDGE;
  return 1;
}

export interface HeroSceneController {
  setProgress: (progress: number) => void;
  hideAll: () => void;
}

export function createHeroSceneController(root: HTMLElement): HeroSceneController {
  const scenes = SCENES.map((range) => ({
    range,
    el: root.querySelector<HTMLElement>(`[data-hero-scene="${range.id}"]`),
  }));

  const apply = (progress: number) => {
    for (const { range, el } of scenes) {
      if (!el) continue;
      const alpha = alphaInSegment(progress, range.start, range.end);
      const on = alpha > 0.02;
      el.style.opacity = String(alpha);
      el.style.visibility = on ? "visible" : "hidden";
      el.style.pointerEvents = alpha > 0.5 ? "auto" : "none";
      el.dataset.active = on ? "true" : "false";
    }
  };

  return {
    setProgress: apply,
    hideAll: () => apply(-0.01),
  };
}

/** Lenis uses documentElement; mobile uses native window scroll. */
export function getScrollScroller(isSmooth: boolean): HTMLElement | Window {
  if (!isSmooth || typeof document === "undefined") return window;
  return document.documentElement;
}
