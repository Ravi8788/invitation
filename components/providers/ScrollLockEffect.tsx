"use client";

import { useEffect } from "react";
import { useInvitationOpened } from "@/hooks/useInvitationOpened";
import { useLenisContext } from "@/hooks/useLenisContext";
import { syncScrollLayout } from "@/lib/scrollSync";

/** Stops Lenis + native scroll while the invitation is locked. */
export function ScrollLockEffect() {
  const { isScrollLocked } = useInvitationOpened();
  const { lenisRef, isReady } = useLenisContext();

  useEffect(() => {
    if (!isReady) return;

    const lenis = lenisRef.current;
    const root = document.documentElement;

    if (isScrollLocked) {
      root.classList.add("invitation-locked");
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      root.classList.remove("invitation-locked");
      document.body.style.overflow = "";
      lenis?.start();
      syncScrollLayout(lenis);
      setTimeout(() => syncScrollLayout(lenis), 250);
      setTimeout(() => syncScrollLayout(lenis), 800);
    }

    return () => {
      root.classList.remove("invitation-locked");
      document.body.style.overflow = "";
    };
  }, [isScrollLocked, isReady, lenisRef]);

  return null;
}
