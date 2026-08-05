import gsap from "gsap";

const EASE = "power2.out";
/** Timeline ends at 92 — matches HERO_CONTENT_END_PROGRESS */
const T = 92;

function scene(root: HTMLElement, id: string) {
  return root.querySelector<HTMLElement>(`[data-hero-scene="${id}"]`);
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

  // Layer 1 — Ganesha + shloka (0–24%)
  const s1 = scene(root, "1");
  s1?.querySelectorAll<HTMLElement>("[data-scene-el]").forEach((node, i) => {
    inAnim(tl, node, 1 + i * 1.2, 2, { y: 18 });
  });

  // Layer 2 — Blessings (24–48%)
  const s2 = scene(root, "2");
  s2?.querySelectorAll<HTMLElement>("[data-scene-line]").forEach((line, i) => {
    inAnim(tl, line, 24 + i * 1.5, 2.2, { y: 16 });
  });

  // Layer 3 — Journey (48–72%)
  const s3 = scene(root, "3");
  s3?.querySelectorAll<HTMLElement>("[data-scene-line]").forEach((line, i) => {
    inAnim(tl, line, 48 + i * 1.5, 2.2, { y: 16 });
  });

  // Layer 4 — Couple + event (72–100%) — event title visible well before pin ends
  const s4 = scene(root, "4");
  const s4Nodes = s4?.querySelectorAll<HTMLElement>("[data-scene-el]") ?? [];
  s4Nodes.forEach((node, i) => {
    const isLast = i === s4Nodes.length - 1;
    inAnim(tl, node, isLast ? 77.5 : 73 + i * 1.25, isLast ? 2.5 : 1.6, { y: 16 });
  });

  return tl;
}
