"use client";

import { useReducedMotion } from "framer-motion";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { cn } from "@/lib/utils";

interface FloatingEmbersProps {
  count?: number;
  className?: string;
}

/** Lightweight embers — CSS on mobile, fewer particles everywhere */
export function FloatingEmbers({ count = 10, className }: FloatingEmbersProps) {
  const reduced = useReducedMotion();
  const { particleDensity, isMobile } = useMotionSettings();

  if (reduced) return null;

  const n = particleDensity(count);

  if (isMobile) {
    return (
      <div
        className={cn(className ?? "pointer-events-none absolute inset-0 overflow-hidden", "embers-mobile")}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={className ?? "pointer-events-none absolute inset-0 overflow-hidden"}
      aria-hidden="true"
    >
      {Array.from({ length: n }).map((_, i) => {
        const left = `${(i * 23 + 7) % 98}%`;
        const size = 2 + (i % 3);
        const duration = 3.5 + (i % 4) * 0.8;
        const delay = i * 0.2;

        return (
          <span
            key={i}
            className="ember-particle absolute rounded-full bg-[#FFB347]"
            style={{
              left,
              bottom: `${(i * 17) % 40}%`,
              width: size,
              height: size,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
