"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MOBILE_BREAKPOINT, MOTION } from "@/lib/motion";

export function useMotionSettings() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const durationScale = reduced ? 1 : isMobile ? MOTION.mobileScale : 1;
  const particleScale = reduced ? 0 : isMobile ? 0.65 : 1;

  return {
    reduced: !!reduced,
    isMobile,
    durationScale,
    particleScale,
    duration: (base: number) =>
      reduced ? MOTION.duration.reduced : base * durationScale,
    particleDensity: (base: number) =>
      Math.max(4, Math.round(base * particleScale)),
  };
}
