import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

/** Lenis scrolls window/documentElement — ScrollTrigger must use the same scroller. */
export function getLenisScroller(): HTMLElement {
  return document.documentElement;
}

export function syncScrollLayout(lenis?: Lenis | null) {
  lenis?.resize();
  ScrollTrigger.refresh();
  requestAnimationFrame(() => {
    lenis?.resize();
    ScrollTrigger.refresh();
  });
}

export function registerScrollPlugins() {
  gsap.registerPlugin(ScrollTrigger);
}
