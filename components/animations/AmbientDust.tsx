"use client";

import { ParticlesField } from "@/components/animations/ParticlesField";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { cn } from "@/lib/utils";

interface AmbientDustProps {
  /** Base particle count before mobile scaling */
  density?: number;
  className?: string;
}

/** Subtle gold dust for ivory sections only */
export function AmbientDust({ density = 14, className }: AmbientDustProps) {
  const { particleDensity, reduced } = useMotionSettings();

  if (reduced) return null;

  return (
    <ParticlesField
      contained
      density={particleDensity(density)}
      className={cn(
        "pointer-events-none absolute inset-0 -z-0 h-full w-full opacity-50",
        className
      )}
    />
  );
}
