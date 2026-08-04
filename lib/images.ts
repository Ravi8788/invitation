/** Local assets — ceremony section scroll reveal */

export const CEREMONY_COUPLE_SKETCH = "/images/ceremony-couple-sketch.jpg" as const;
export const CEREMONY_COUPLE = "/images/ceremony-couple.jpg" as const;

/** Promise portal — outdoor ceremony moment (chairs, florals, lawn) */
export const PROMISE_MOMENT =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80";

/** Legacy alias */
export const PROMISE_RING = PROMISE_MOMENT;

export const PRELOAD_IMAGES = [CEREMONY_COUPLE_SKETCH, CEREMONY_COUPLE, PROMISE_MOMENT] as const;
