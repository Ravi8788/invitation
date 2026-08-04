import { HERO_SCENE_RANGES } from "@/lib/heroStoryScenes";

const SCENES = [
  { id: "1", ...HERO_SCENE_RANGES.scene1 },
  { id: "2", ...HERO_SCENE_RANGES.scene2 },
  { id: "3", ...HERO_SCENE_RANGES.scene3 },
  { id: "4", ...HERO_SCENE_RANGES.scene4 },
  { id: "5", ...HERO_SCENE_RANGES.scene5 },
  { id: "6", ...HERO_SCENE_RANGES.scene6 },
  { id: "7", ...HERO_SCENE_RANGES.scene7 },
] as const;

const EDGE = 0.05;

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

/** Cached scene nodes — no querySelector during scroll. */
export function createHeroSceneController(root: HTMLElement): HeroSceneController {
  const scenes = SCENES.map((range) => ({
    range,
    el: root.querySelector<HTMLElement>(`[data-hero-scene="${range.id}"]`),
  }));

  const particles = root.querySelector<HTMLElement>("[data-hero-particles]");
  const glow = root.querySelector<HTMLElement>("[data-hero-glow]");

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

    if (particles) {
      const a = alphaInSegment(progress, 0, 0.15) * 0.9;
      particles.style.opacity = String(a);
      particles.style.visibility = a > 0.02 ? "visible" : "hidden";
    }

    if (glow) {
      const a = alphaInSegment(progress, 0.3, 0.45) * 0.85;
      glow.style.opacity = String(a);
      glow.style.visibility = a > 0.02 ? "visible" : "hidden";
    }
  };

  return {
    setProgress: apply,
    hideAll: () => apply(-0.01),
  };
}

export function getScrollScroller(isSmooth: boolean): HTMLElement | Window {
  return isSmooth ? document.body : window;
}

/** @deprecated Use createHeroSceneController */
export function enforceHeroSceneVisibility(root: HTMLElement, progress: number) {
  createHeroSceneController(root).setProgress(progress);
}

/** @deprecated Use createHeroSceneController */
export function hideAllHeroScenes(root: HTMLElement) {
  createHeroSceneController(root).hideAll();
}
