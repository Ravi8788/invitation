/** Shared motion tokens — mobile durations scaled ~15% shorter via useMotionSettings */

export const MOTION = {
  duration: {
    base: 0.6,
    fast: 0.5,
    slow: 0.7,
    reduced: 0.35,
  },
  mobileScale: 0.85,
  heading: {
    y: 20,
    blur: 4,
  },
  stagger: {
    default: 0.1,
    min: 0.08,
    max: 0.12,
  },
  ease: [0.22, 1, 0.36, 1] as const,
} as const;

export const MOBILE_BREAKPOINT = 768;
