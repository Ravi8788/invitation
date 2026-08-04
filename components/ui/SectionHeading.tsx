"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BlurFadeIn } from "@/components/animations/BlurFadeIn";
import { MOTION } from "@/lib/motion";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  headingId?: string;
  className?: string;
  align?: "center" | "left";
  /** Use "maroon" when heading sits on a maroon section background */
  theme?: "ivory" | "maroon" | "cinematic";
  /** Optional small-caps label above the title */
  eyebrow?: string;
}

export function SectionHeading({
  title,
  headingId,
  className,
  align = "center",
  theme = "ivory",
  eyebrow,
}: SectionHeadingProps) {
  const reduced = useReducedMotion();
  const { duration } = useMotionSettings();
  const onMaroon = theme === "maroon";
  const onCinematic = theme === "cinematic";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <BlurFadeIn
          as="p"
          className="font-display text-[11px] uppercase tracking-[0.4em] text-primary"
        >
          {eyebrow}
        </BlurFadeIn>
      ) : null}

      <BlurFadeIn
        as="h2"
        id={headingId}
        className={cn(
          "font-display text-3xl font-semibold tracking-[0.12em] sm:text-4xl",
          onMaroon ? "text-gold-gradient" : onCinematic ? "text-ivory" : "text-maroon"
        )}
      >
        {title}
      </BlurFadeIn>

      <motion.div
        className={cn(
          "h-px bg-gradient-to-r from-transparent via-primary to-transparent",
          align === "center" ? "w-32 sm:w-40" : "w-24"
        )}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: duration(MOTION.duration.base),
          delay: 0.12,
          ease: MOTION.ease,
        }}
        style={{ originX: align === "center" ? 0.5 : 0 }}
        aria-hidden="true"
      />
    </div>
  );
}
