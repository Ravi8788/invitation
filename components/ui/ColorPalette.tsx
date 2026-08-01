"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { DressColor } from "@/types";
import { MOTION } from "@/lib/motion";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { cn } from "@/lib/utils";

function ColorSwatch({
  color,
  index,
  onDark,
}: {
  color: DressColor;
  index: number;
  onDark?: boolean;
}) {
  const reduced = useReducedMotion();
  const { duration } = useMotionSettings();
  const isLight = color.hex.toUpperCase() === "#FFFDF9";

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 12 }}
      whileInView={
        reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
      }
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: duration(MOTION.duration.base),
        delay: 0.35 + index * 0.08,
        ease: MOTION.ease,
      }}
    >
      <motion.span
        className={cn(
          "relative block h-9 w-9 rounded-full sm:h-10 sm:w-10",
          isLight && "ring-1 ring-primary/25"
        )}
        style={{
          backgroundColor: color.hex,
          boxShadow: `0 4px 16px ${color.hex}55, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
        whileHover={
          reduced
            ? {}
            : {
                scale: 1.12,
                boxShadow: `0 6px 22px ${color.hex}77, 0 0 0 2px rgba(212,175,55,0.55)`,
              }
        }
        aria-hidden="true"
      >
        <motion.span
          className="absolute inset-0 rounded-full border border-primary/30"
          animate={reduced ? {} : { opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.span>
      <span
        className={cn(
          "font-body text-[10px] uppercase tracking-[0.14em]",
          onDark ? "text-ivory/80" : "text-text-muted"
        )}
      >
        {color.name}
      </span>
    </motion.div>
  );
}

export function ColorPalette({
  colors,
  className,
  onDark = false,
}: {
  colors: DressColor[];
  className?: string;
  /** Light labels for swatches on dark maroon cards */
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start justify-center gap-4 sm:gap-5",
        className
      )}
    >
      {colors.map((color, index) => (
        <ColorSwatch key={color.hex} color={color} index={index} onDark={onDark} />
      ))}
    </div>
  );
}
