"use client";

import { useEffect } from "react";
import { useInvitationOpened } from "@/hooks/useInvitationOpened";
import { useLenisContext } from "@/hooks/useLenisContext";
import { syncScrollLayout } from "@/lib/scrollSync";

/** Recalculate Lenis + ScrollTrigger after hero and main content mount. */
export function HeroScrollMountSync() {
  const { loaderComplete } = useInvitationOpened();
  const { lenisRef, isReady } = useLenisContext();

  useEffect(() => {
    if (!loaderComplete || !isReady) return;

    const lenis = lenisRef.current;
    syncScrollLayout(lenis);
    const t1 = window.setTimeout(() => syncScrollLayout(lenis), 150);
    const t2 = window.setTimeout(() => syncScrollLayout(lenis), 600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [loaderComplete, isReady, lenisRef]);

  return null;
}
