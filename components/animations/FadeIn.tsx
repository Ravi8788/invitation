"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FadeDirection = "up" | "left" | "right" | "scale";

interface FadeInProps {
  children: ReactNode;
  direction?: FadeDirection;
  delay?: number;
  className?: string;
  once?: boolean;
  blur?: boolean;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
  blur = false,
}: FadeInProps) {
  const reduced = useReducedMotion();
  const { duration } = useMotionSettings();

  const variants: Record<FadeDirection, Variants> = {
    up: {
      hidden: {
        opacity: 0,
        y: MOTION.heading.y,
        ...(blur && !reduced ? { filter: `blur(${MOTION.heading.blur}px)` } : {}),
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      },
    },
    left: {
      hidden: { opacity: 0, x: -24 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 24 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  if (reduced) {
    return (
      <motion.div
        className={cn(className)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: "-80px" }}
        transition={{ duration: MOTION.duration.reduced, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants[direction]}
      transition={{
        duration: duration(MOTION.duration.base),
        delay,
        ease: MOTION.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
