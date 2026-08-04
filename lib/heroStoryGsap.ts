import gsap from "gsap";
import { HERO_SCENE_RANGES } from "@/lib/heroStoryScenes";

const EASE_OUT = "power2.out";
const EASE_IO = "power3.inOut";
const T = 100;

function sceneEl(root: HTMLElement, id: string) {
  return root.querySelector<HTMLElement>(`[data-hero-scene="${id}"]`);
}

function q<T extends Element>(parent: Element | null | undefined, sel: string) {
  return parent?.querySelector<T>(sel) ?? null;
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

/** Inner-content animations only — scene visibility is enforced separately on scroll. */
export function buildHeroStoryTimeline(root: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });
  const r = HERO_SCENE_RANGES;

  const s1 = sceneEl(root, "1");
  animateIn(tl, q(s1, "[data-scene-heading]"), 1, 2.5, { y: 36 }, { y: 0 });
  const s1Letters = s1?.querySelectorAll<HTMLElement>(".hero-letter");
  if (s1Letters?.length) {
    tl.fromTo(
      s1Letters,
      { y: 12, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.04, duration: 2 / T },
      1.5 / T,
    );
  }
  animateIn(tl, q(s1, "[data-scene-subtitle]"), 4, 2, { y: 18 }, { y: 0 });

  const s2 = sceneEl(root, "2");
  animateIn(tl, q(s2, "[data-scene-heading]"), 16, 2.5, { y: 28 }, { y: 0 });
  tl.fromTo(
    q(s2, "[data-scene-divider]"),
    { scaleX: 0, autoAlpha: 0 },
    { scaleX: 1, autoAlpha: 1, duration: 2 / T, ease: EASE_IO },
    18 / T,
  );
  animateIn(tl, q(s2, "[data-scene-subtitle]"), 19, 2, { y: 16 }, { y: 0 });

  const s3 = sceneEl(root, "3");
  tl.fromTo(q(s3, "[data-scene-heading]"), { scale: 0.88, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 3 / T }, 31.5 / T);
  tl.fromTo(q(s3, "[data-scene-heart]"), { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2 / T }, 34 / T);
  animateIn(tl, q(s3, "[data-scene-subtitle]"), 36, 2, { y: 14 }, { y: 0 });

  const s4 = sceneEl(root, "4");
  animateIn(tl, q(s4, "[data-scene-heading]"), 51, 2.5, { y: 22 }, { y: 0 });
  animateIn(tl, q(s4, "[data-scene-subtitle]"), 54, 2, { y: 14 }, { y: 0 });

  const s5 = sceneEl(root, "5");
  animateIn(tl, q(s5, "[data-scene-heading]"), 71, 2, { y: 18 }, { y: 0 });
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
  animateIn(tl, q(s5, "[data-scene-time]"), 77, 2, { y: 12 }, { y: 0 });

  const s6 = sceneEl(root, "6");
  tl.fromTo(q(s6, "[data-scene-icon]"), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 2 / T }, 86.5 / T);
  animateIn(tl, q(s6, "[data-scene-heading]"), 87.5, 2, { y: 18 }, { y: 0 });
  animateIn(tl, q(s6, "[data-scene-subtitle]"), 89, 2, { y: 12 }, { y: 0 });

  const s7 = sceneEl(root, "7");
  animateIn(tl, q(s7, "[data-scene-heading]"), 95.5, 2.5, { y: 24 }, { y: 0 });
  animateIn(tl, q(s7, "[data-scene-subtitle]"), 97, 2, { y: 16 }, { y: 0 });
  tl.fromTo(q(s7, "[data-scene-cta]"), { scale: 0.94, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2 / T }, 97.5 / T);

  return tl;
}

export const HERO_SCROLL_END = {
  desktop: "+=500%",
  mobile: "+=400%",
} as const;

export function getScrollScroller(isSmooth: boolean): HTMLElement | Window {
  return isSmooth ? document.body : window;
}
