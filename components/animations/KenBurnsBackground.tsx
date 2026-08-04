"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface KenBurnsProps {
  children: ReactNode;
  className?: string;
}

/** Slow zoom on scroll — desktop only */
export function KenBurnsBackground({ children, className }: KenBurnsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { isMobile } = useMotionSettings();

  useEffect(() => {
    if (reduced || isMobile || !ref.current) return;

    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, isMobile]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
