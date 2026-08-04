"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  /** Vertical parallax speed multiplier */
  speed?: number;
}

/** GSAP parallax layer — cinematic depth on scroll */
export function ScrollParallax({
  children,
  className,
  speed = 0.3,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: () => -window.innerHeight * speed * 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
