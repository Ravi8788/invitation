import gsap from "gsap";
import { HERO_SCENE_RANGES } from "@/lib/heroStoryScenes";

const EASE_OUT = "power2.out";
const EASE_IN = "power2.in";
const EASE_IO = "power3.inOut";

/** Timeline uses 0–100 so scroll % maps 1:1 to scene segments. */
const T = 100;
const FADE = 1.2;

function sceneEl(root: HTMLElement, id: string) {
  return root.querySelector<HTMLElement>(`[data-hero-scene="${id}"]`);
}

function q<T extends Element>(parent: Element | null | undefined, sel: string) {
  return parent?.querySelector<T>(sel) ?? null;
}

function hideAll(tl: gsap.core.Timeline, scenes: HTMLElement[], at: number) {
  tl.set(scenes, { autoAlpha: 0, pointerEvents: "none", y: 0, scale: 1 }, at / T);
}

/** Only one scene visible between start% and end%. */
function exclusiveScene(
  tl: gsap.core.Timeline,
  scene: HTMLElement | null,
  startPct: number,
  endPct: number,
  scenes: HTMLElement[],
) {
  if (!scene) return;

  const start = startPct / T;
  const end = endPct / T;
  const fade = FADE / T;
  const holdEnd = end - fade;

  hideAll(tl, scenes, startPct);
  tl.set(scene, { autoAlpha: 0, y: 28, pointerEvents: "none" }, start);
  tl.to(scene, { autoAlpha: 1, y: 0, duration: fade, ease: EASE_OUT }, start);
  if (holdEnd > start + fade) {
    tl.to(scene, { autoAlpha: 1, duration: holdEnd - (start + fade) }, start + fade);
  }
  tl.to(scene, { autoAlpha: 0, y: -18, duration: fade, ease: EASE_IN }, holdEnd);
  hideAll(tl, scenes, endPct);
}

function animateIn(
  tl: gsap.core.Timeline,
  el: Element | null,
  atPct: number,
  durPct: number,
  from: gsap.TweenVars,
  to: gsap.TweenVars = {},
) {
  if (!el) return;
  tl.fromTo(
    el,
    { autoAlpha: 0, ...from },
    { autoAlpha: 1, ...to, duration: durPct / T, ease: EASE_OUT },
    atPct / T,
  );
}

export function buildHeroStoryTimeline(root: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });

  const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-scene]"));
  const vignette = root.querySelector<HTMLElement>("[data-hero-vignette]");
  const particles = root.querySelector<HTMLElement>("[data-hero-particles]");

  gsap.set(scenes, { autoAlpha: 0, pointerEvents: "none" });
  gsap.set(vignette, { autoAlpha: 0 });
  gsap.set(particles, { autoAlpha: 0 });

  const pct = (n: number) => n;

  // Scene 1 — 0–15%
  const s1 = sceneEl(root, "1");
  exclusiveScene(tl, s1, pct(0), pct(15), scenes);
  animateIn(tl, q(s1, "[data-scene-heading]"), 1, 2.5, { y: 36 });
  const s1Letters = s1?.querySelectorAll<HTMLElement>(".hero-letter");
  if (s1Letters?.length) {
    tl.fromTo(
      s1Letters,
      { y: 12, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.04, duration: 2 / T },
      1.5 / T,
    );
  }
  animateIn(tl, q(s1, "[data-scene-subtitle]"), 4, 2, { y: 18 });
  tl.fromTo(particles, { autoAlpha: 0 }, { autoAlpha: 0.75, duration: 1.5 / T }, 0.5 / T);
  tl.to(particles, { autoAlpha: 0, duration: 1.5 / T }, 12 / T);

  // Scene 2 — 15–30%
  const s2 = sceneEl(root, "2");
  exclusiveScene(tl, s2, pct(15), pct(30), scenes);
  animateIn(tl, q(s2, "[data-scene-heading]"), 16, 2.5, { y: 28 });
  tl.fromTo(
    q(s2, "[data-scene-divider]"),
    { scaleX: 0, autoAlpha: 0 },
    { scaleX: 1, autoAlpha: 1, duration: 2 / T, ease: EASE_IO },
    18 / T,
  );
  animateIn(tl, q(s2, "[data-scene-subtitle]"), 19, 2, { y: 16 });

  // Scene 3 — 30–50%
  const s3 = sceneEl(root, "3");
  exclusiveScene(tl, s3, pct(30), pct(50), scenes);
  tl.fromTo(q(s3, "[data-scene-glow]"), { scale: 0.75, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 3 / T }, 31 / T);
  tl.fromTo(q(s3, "[data-scene-heading]"), { scale: 0.88, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 3 / T }, 31.5 / T);
  tl.fromTo(q(s3, "[data-scene-heart]"), { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2 / T }, 34 / T);
  animateIn(tl, q(s3, "[data-scene-subtitle]"), 36, 2, { y: 14 });

  // Scene 4 — 50–70%
  const s4 = sceneEl(root, "4");
  tl.to(vignette, { autoAlpha: 0.48, duration: 2 / T }, 50 / T);
  exclusiveScene(tl, s4, pct(50), pct(70), scenes);
  animateIn(tl, q(s4, "[data-scene-heading]"), 51, 2.5, { y: 22 });
  animateIn(tl, q(s4, "[data-scene-subtitle]"), 54, 2, { y: 14 });
  tl.to(vignette, { autoAlpha: 0.18, duration: 2 / T }, 68 / T);

  // Scene 5 — 70–85%
  const s5 = sceneEl(root, "5");
  exclusiveScene(tl, s5, pct(70), pct(85), scenes);
  animateIn(tl, q(s5, "[data-scene-heading]"), 71, 2, { y: 18 });
  tl.fromTo(
    q(s5, "[data-scene-date]"),
    { rotationX: -65, autoAlpha: 0, transformPerspective: 600 },
    { rotationX: 0, autoAlpha: 1, duration: 2.5 / T },
    73 / T,
  );
  tl.fromTo(
    q(s5, "[data-scene-divider]"),
    { scaleX: 0, autoAlpha: 0 },
    { scaleX: 1, autoAlpha: 1, duration: 1.8 / T, ease: EASE_IO },
    76 / T,
  );
  animateIn(tl, q(s5, "[data-scene-time]"), 77, 2, { y: 12 });

  // Scene 6 — 85–95%
  const s6 = sceneEl(root, "6");
  exclusiveScene(tl, s6, pct(85), pct(95), scenes);
  tl.fromTo(q(s6, "[data-scene-glow]"), { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 0.6, duration: 2.5 / T }, 86 / T);
  tl.fromTo(q(s6, "[data-scene-icon]"), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 2 / T }, 86.5 / T);
  animateIn(tl, q(s6, "[data-scene-heading]"), 87.5, 2, { y: 18 });
  animateIn(tl, q(s6, "[data-scene-subtitle]"), 89, 2, { y: 12 });

  // Scene 7 — 95–100%, fade before unpin
  const s7 = sceneEl(root, "7");
  hideAll(tl, scenes, 95);
  tl.to(vignette, { autoAlpha: 0.4, duration: 1.5 / T }, 95 / T);
  tl.set(s7, { autoAlpha: 0, y: 22, pointerEvents: "none" }, 95 / T);
  tl.to(s7, { autoAlpha: 1, y: 0, duration: FADE / T, ease: EASE_OUT }, 95 / T);
  animateIn(tl, q(s7, "[data-scene-heading]"), 95.5, 2.5, { y: 24 });
  animateIn(tl, q(s7, "[data-scene-subtitle]"), 97, 2, { y: 16 });
  tl.fromTo(q(s7, "[data-scene-cta]"), { scale: 0.94, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2 / T }, 97.5 / T);
  tl.set(s7, { pointerEvents: "auto" }, 98 / T);
  tl.to(s7, { autoAlpha: 0, y: -14, duration: 1.8 / T, ease: EASE_IN }, 98.2 / T);
  tl.to(vignette, { autoAlpha: 0, duration: 1.8 / T }, 98.2 / T);
  hideAll(tl, scenes, 100);
  tl.set(s7, { pointerEvents: "none" }, 100 / T);

  return tl;
}

export const HERO_SCROLL_END = {
  desktop: "+=500%",
  mobile: "+=400%",
} as const;

/** Scroller element used by Lenis + ScrollTrigger. */
export function getScrollScroller(isSmooth: boolean): HTMLElement | Window {
  return isSmooth ? document.body : window;
}
