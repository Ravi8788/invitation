"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CinematicHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  titleId?: string;
  align?: "center" | "left";
}

export function CinematicHeading({
  eyebrow,
  title,
  subtitle,
  className,
  titleId,
  align = "center",
}: CinematicHeadingProps) {
  const reduced = useReducedMotion();

  const stagger = reduced ? 0 : 0.12;

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <motion.p
          className="font-display text-[10px] uppercase tracking-[0.45em] text-gold-light/80 sm:text-[11px]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h2
        id={titleId}
        className="font-display text-3xl font-semibold uppercase tracking-[0.14em] text-ivory sm:text-4xl md:text-5xl"
        style={{ textShadow: "0 0 40px rgba(212,180,131,0.25)" }}
        initial={{ opacity: 0, y: reduced ? 0 : 20, filter: reduced ? "none" : "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: eyebrow ? stagger : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>

      {subtitle ? (
        <motion.p
          className="font-body max-w-xl text-sm leading-relaxed text-ivory/65 sm:text-base"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: stagger * 2, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      ) : null}

      <motion.div
        className={cn(
          "mt-1 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent",
          align === "center" ? "w-32 sm:w-44" : "w-24"
        )}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: stagger * 3 }}
        aria-hidden="true"
      />
    </div>
  );
}
