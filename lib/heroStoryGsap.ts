import gsap from "gsap";

const EASE = "power2.out";
const EASE_IO = "power3.inOut";
/** Timeline duration = 100 ↔ scroll 0–100% */
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

/** Single master timeline — inner motion only; scene containers gated separately. */
export function initHeroStoryElements(root: HTMLElement) {
  const selectors = [
    "[data-scene-eyebrow]",
    "[data-scene-heading-wrap]",
    "[data-scene-heading]",
    "[data-scene-subtitle]",
    "[data-scene-line]",
    "[data-scene-divider]",
    "[data-scene-bride]",
    "[data-scene-with]",
    "[data-scene-groom]",
    "[data-scene-shimmer]",
    "[data-scene-date]",
    "[data-scene-time]",
    "[data-scene-venue-name]",
    "[data-scene-venue-city]",
    "[data-scene-cta]",
    ".hero-letter",
  ];
  selectors.forEach((sel) => {
    root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      gsap.set(el, { autoAlpha: 0 });
    });
  });
}

export function buildHeroStoryTimeline(root: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });

  // ── Scene 1 (0–15%) ─────────────────────────────────────────────
  const s1 = scene(root, "1");
  inAnim(tl, el(s1, "[data-scene-eyebrow]"), 1, 2, { y: 16 });
  const letters = s1?.querySelectorAll<HTMLElement>(".hero-letter");
  if (letters?.length) {
    tl.fromTo(
      letters,
      { y: 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.0035, duration: 2.2 / T, ease: EASE },
      2 / T,
    );
  }
  inAnim(tl, el(s1, "[data-scene-heading-wrap]"), 2.5, 2.5, { y: 28 });
  inAnim(tl, el(s1, "[data-scene-subtitle]"), 5, 2.2, { y: 20 });

  // ── Scene 2 (15–30%) ────────────────────────────────────────────
  const s2 = scene(root, "2");
  inAnim(tl, el(s2, "[data-scene-heading]"), 16, 2.8, { y: 26 });
  tl.fromTo(
    el(s2, "[data-scene-divider]"),
    { scaleX: 0, autoAlpha: 0 },
    { scaleX: 1, autoAlpha: 1, duration: 2 / T, ease: EASE_IO },
    18.5 / T,
  );
  s2?.querySelectorAll<HTMLElement>("[data-scene-line]").forEach((line, i) => {
    inAnim(tl, line, 19 + i * 1.2, 1.8, { y: 14 });
  });

  // ── Scene 3 (30–45%) ────────────────────────────────────────────
  const s3 = scene(root, "3");
  inAnim(tl, el(s3, "[data-scene-bride]"), 31, 3, { y: 32, scale: 0.92 }, { y: 0, scale: 1 });
  inAnim(tl, el(s3, "[data-scene-with]"), 32.5, 2, { y: 12 });
  inAnim(tl, el(s3, "[data-scene-groom]"), 33.5, 3, { y: 32, scale: 0.92 }, { y: 0, scale: 1 });
  tl.fromTo(
    el(s3, "[data-scene-shimmer]"),
    { x: "-120%", autoAlpha: 0 },
    { x: "120%", autoAlpha: 0.6, duration: 4 / T, ease: "none" },
    34 / T,
  );
  s3?.querySelectorAll<HTMLElement>("[data-scene-line]").forEach((line, i) => {
    inAnim(tl, line, 36 + i * 1.1, 1.6, { y: 12 });
  });

  // ── Scene 4 (45–60%) ────────────────────────────────────────────
  const s4 = scene(root, "4");
  inAnim(tl, el(s4, "[data-scene-heading]"), 46, 2.8, { y: 24 });
  s4?.querySelectorAll<HTMLElement>("[data-scene-line]").forEach((line, i) => {
    inAnim(tl, line, 48.5 + i * 1, 1.6, { y: 12 });
  });

  // ── Scene 5 (60–75%) ────────────────────────────────────────────
  const s5 = scene(root, "5");
  inAnim(tl, el(s5, "[data-scene-heading]"), 61, 2.5, { y: 20 });
  tl.fromTo(
    el(s5, "[data-scene-date]"),
    { rotationX: -72, autoAlpha: 0, transformPerspective: 800 },
    { rotationX: 0, autoAlpha: 1, duration: 2.8 / T, ease: EASE },
    63 / T,
  );
  tl.fromTo(
    el(s5, "[data-scene-divider]"),
    { scaleX: 0, autoAlpha: 0 },
    { scaleX: 1, autoAlpha: 1, duration: 2 / T, ease: EASE_IO },
    66 / T,
  );
  inAnim(tl, el(s5, "[data-scene-time]"), 67, 2, { y: 14 });

  // ── Scene 6 (75–90%) ────────────────────────────────────────────
  const s6 = scene(root, "6");
  inAnim(tl, el(s6, "[data-scene-heading]"), 76, 2.5, { y: 22 });
  inAnim(tl, el(s6, "[data-scene-venue-name]"), 78, 2.2, { y: 16 });
  inAnim(tl, el(s6, "[data-scene-venue-city]"), 79.5, 2, { y: 12 });
  tl.fromTo(
    el(s6, "[data-scene-cta]"),
    { scale: 0.94, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, duration: 2.2 / T, ease: EASE },
    81 / T,
  );

  // ── Scene 7 (90–100%) — hold then fade before unpin ─────────────
  const s7 = scene(root, "7");
  inAnim(tl, el(s7, "[data-scene-heading]"), 91, 3, { y: 28 });
  s7?.querySelectorAll<HTMLElement>("[data-scene-line]").forEach((line, i) => {
    inAnim(tl, line, 93 + i * 1.2, 2, { y: 14 });
  });
  tl.fromTo(
    el(s7, "[data-scene-cta]"),
    { scale: 0.92, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, duration: 2.5 / T, ease: EASE },
    95 / T,
  );
  tl.to(
    el(s7, "[data-scene-cta]"),
    { scale: 1.04, duration: 1.2 / T, yoyo: true, repeat: 1, ease: "sine.inOut" },
    96.5 / T,
  );

  return tl;
}
