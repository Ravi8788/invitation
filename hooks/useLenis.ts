"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { MOBILE_BREAKPOINT } from "@/lib/motion";
import { isTouchDevice } from "@/lib/isTouchDevice";
import { prefersReducedMotion } from "@/lib/utils";
import { getLenisScroller, syncScrollLayout } from "@/lib/scrollSync";

export interface UseLenisReturn {
  lenisRef: React.RefObject<Lenis | null>;
  isReady: boolean;
  isSmooth: boolean;
}

function shouldUseSmoothScroll(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  if (isTouchDevice()) return false;
  if (window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches) {
    return false;
  }
  return true;
}

export function useLenis(): UseLenisReturn {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSmooth, setIsSmooth] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      if (!shouldUseSmoothScroll()) {
        if (cancelled) return;
        setIsSmooth(false);
        setIsReady(true);
        return;
      }

      const [{ default: LenisCtor }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new LenisCtor({
        lerp: 0.1,
        smoothWheel: true,
        autoRaf: false,
      });

      lenisRef.current = lenis;
      (window as Window & { __lenis?: Lenis }).__lenis = lenis;
      setIsSmooth(true);
      setIsReady(true);

      const scroller = getLenisScroller();

      lenis.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.documentElement.style.transform ? "transform" : "fixed",
      });

      ScrollTrigger.defaults({ scroller });

      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
      syncScrollLayout(lenis);

      cleanup = () => {
        gsap.ticker.remove(tickerCallback);
        ScrollTrigger.scrollerProxy(scroller, {});
        ScrollTrigger.defaults({ scroller: window });
        lenis.destroy();
        lenisRef.current = null;
        delete (window as Window & { __lenis?: Lenis }).__lenis;
        setIsReady(false);
        setIsSmooth(false);
      };
    };

    void init();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return { lenisRef, isReady, isSmooth };
}
