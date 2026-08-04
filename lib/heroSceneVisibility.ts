import { HERO_SCENE_RANGES } from "@/lib/heroStoryScenes";

const SCENE_LIST = [
  { id: "1", ...HERO_SCENE_RANGES.scene1 },
  { id: "2", ...HERO_SCENE_RANGES.scene2 },
  { id: "3", ...HERO_SCENE_RANGES.scene3 },
  { id: "4", ...HERO_SCENE_RANGES.scene4 },
  { id: "5", ...HERO_SCENE_RANGES.scene5 },
  { id: "6", ...HERO_SCENE_RANGES.scene6 },
  { id: "7", ...HERO_SCENE_RANGES.scene7 },
] as const;

/** Fade window as a fraction of each segment (e.g. 0.08 = 8%). */
const SEGMENT_FADE = 0.08;

function segmentAlpha(progress: number, start: number, end: number): number {
  if (progress < start || progress >= end) return 0;
  const span = end - start;
  const local = (progress - start) / span;
  if (local < SEGMENT_FADE) return local / SEGMENT_FADE;
  if (local > 1 - SEGMENT_FADE) return (1 - local) / SEGMENT_FADE;
  return 1;
}

/**
 * Hard guarantee: only one hero scene visible at a time.
 * Uses inline styles so GSAP timeline cannot leave stale visibility.
 */
export function enforceHeroSceneVisibility(root: HTMLElement, progress: number) {
  const scenes = root.querySelectorAll<HTMLElement>("[data-hero-scene]");

  scenes.forEach((scene) => {
    const id = scene.dataset.heroScene;
    const range = SCENE_LIST.find((s) => s.id === id);
    const alpha = range ? segmentAlpha(progress, range.start, range.end) : 0;
    const visible = alpha > 0.02;

    scene.style.opacity = String(alpha);
    scene.style.visibility = visible ? "visible" : "hidden";
    scene.style.pointerEvents = alpha > 0.45 ? "auto" : "none";
    scene.dataset.active = visible ? "true" : "false";

    if (!visible) {
      scene.style.transform = "translateY(0px) scale(1)";
    }
  });

  const vignette = root.querySelector<HTMLElement>("[data-hero-vignette]");
  if (vignette) {
    vignette.style.opacity = "0";
    vignette.style.visibility = "hidden";
  }

  const particles = root.querySelector<HTMLElement>("[data-hero-particles]");
  if (particles) {
    const particleAlpha = segmentAlpha(progress, 0, 0.15) * 0.75;
    particles.style.opacity = String(particleAlpha);
    particles.style.visibility = particleAlpha > 0.02 ? "visible" : "hidden";
  }
}

export function hideAllHeroScenes(root: HTMLElement) {
  enforceHeroSceneVisibility(root, -1);
}
