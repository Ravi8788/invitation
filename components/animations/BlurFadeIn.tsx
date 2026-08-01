"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BlurFadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "h2" | "p";
  id?: string;
}

export function BlurFadeIn({
  children,
  className,
  delay = 0,
  as = "div",
  id,
}: BlurFadeInProps) {
  const reduced = useReducedMotion();
  const { duration } = useMotionSettings();
  const Component = motion.create(as);

  return (
    <Component
      id={id}
      className={cn(className)}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: MOTION.heading.y, filter: `blur(${MOTION.heading.blur}px)` }}
      whileInView={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: duration(MOTION.duration.base),
        delay,
        ease: MOTION.ease,
      }}
    >
      {children}
    </Component>
  );
}
