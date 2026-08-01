"use client";

import { useEffect, useState, type RefObject } from "react";
import type Lenis from "lenis";

function getNativeScrollProgress(): number {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  return scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0;
}

export function useScrollProgress(
  lenisRef: RefObject<Lenis | null>,
  isReady: boolean,
  isSmooth: boolean
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isReady) return;

    if (!isSmooth || !lenisRef.current) {
      const updateNative = () => setProgress(getNativeScrollProgress());
      updateNative();
      window.addEventListener("scroll", updateNative, { passive: true });
      window.addEventListener("resize", updateNative, { passive: true });

      return () => {
        window.removeEventListener("scroll", updateNative);
        window.removeEventListener("resize", updateNative);
      };
    }

    const lenis = lenisRef.current;

    const onScroll = (instance: Lenis) => {
      setProgress(instance.progress);
    };

    onScroll(lenis);
    lenis.on("scroll", onScroll);

    const onResize = () => onScroll(lenis);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      lenis.off("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isReady, isSmooth, lenisRef]);

  return progress;
}
