"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressBarProps {
  progress: number;
}

export function ScrollProgressBar({ progress }: ScrollProgressBarProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        className={cn(
          "h-full origin-left bg-gradient-to-r from-primary-dark via-primary to-primary-light",
          "will-change-transform"
        )}
        style={{ scaleX: progress }}
        initial={false}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </div>
  );
}
