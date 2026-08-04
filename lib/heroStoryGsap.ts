import gsap from "gsap";

const EASE = "power2.out";
const EASE_IO = "power3.inOut";
const T = 100;

function scene(root: HTMLElement, id: string) {
  return root.querySelector<HTMLElement>(`[data-hero-scene="${id}"]`);
}

function el(parent: Element | null | undefined, sel: string) {
  return parent?.querySelector<HTMLElement>(sel) ?? null;
}

function inAnim(
  tl: gsap.core.Timeline,
  target: Element | null,
  at: number,
  dur: number,
  from: gsap.TweenVars,
  to: gsap.TweenVars = {},
) {
  if (!target) return;
  tl.fromTo(
    target,
    { autoAlpha: 0, ...from },
    { autoAlpha: 1, ...to, duration: dur / T, ease: EASE },
    at / T,
  );
}

export function initHeroStoryElements(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-scene-el]").forEach((node) => {
    gsap.set(node, { autoAlpha: 0, y: 16 });
  });
}

export function buildHeroStoryTimeline(root: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });

  // Layer 1 — Intro (0–25%)
  const s1 = scene(root, "1");
  s1?.querySelectorAll<HTMLElement>("[data-scene-el]").forEach((node, i) => {
    inAnim(tl, node, 1 + i * 1.5, 2.2, { y: 20 });
  });

  // Layer 2 — Tradition (25–50%)
  const s2 = scene(root, "2");
  inAnim(tl, el(s2, "[data-scene-heading]"), 26, 2.8, { y: 26 });
  s2?.querySelectorAll<HTMLElement>("[data-scene-line]").forEach((line, i) => {
    inAnim(tl, line, 28 + i * 1.2, 2, { y: 14 });
  });
  inAnim(tl, el(s2, "[data-scene-tagline]"), 32, 2.5, { y: 16 });

  // Layer 3 — Shubh Muhurat (50–75%)
  const s3 = scene(root, "3");
  inAnim(tl, el(s3, "[data-scene-eyebrow]"), 51, 2, { y: 12 });
  inAnim(tl, el(s3, "[data-scene-heading]"), 52.5, 2.8, { y: 24 });
  s3?.querySelectorAll<HTMLElement>("[data-scene-schedule]").forEach((card, i) => {
    tl.fromTo(
      card,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 2 / T, ease: EASE, delay: (i * 0.08) / T },
      55 / T,
    );
  });
  inAnim(tl, el(s3, "[data-scene-venue-block]"), 60, 2.2, { y: 16 });

  // Layer 4 — Celebration card (75–100%)
  const s4 = scene(root, "4");
  tl.fromTo(
    el(s4, "[data-scene-card]"),
    { scale: 0.94, autoAlpha: 0, y: 24 },
    { scale: 1, autoAlpha: 1, y: 0, duration: 3 / T, ease: EASE_IO },
    76 / T,
  );
  s4?.querySelectorAll<HTMLElement>("[data-scene-el]").forEach((node, i) => {
    inAnim(tl, node, 78 + i * 1, 2, { y: 12 });
  });

  return tl;
}
