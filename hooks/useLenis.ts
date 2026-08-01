"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/utils";

export interface UseLenisReturn {
  lenisRef: React.RefObject<Lenis | null>;
  isReady: boolean;
  isSmooth: boolean;
}

export function useLenis(): UseLenisReturn {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSmooth, setIsSmooth] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const reducedMotion = prefersReducedMotion();

      if (reducedMotion) {
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
      setIsSmooth(true);
      setIsReady(true);

      lenis.on("scroll", ScrollTrigger.update);

      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        lenisRef.current = null;
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
