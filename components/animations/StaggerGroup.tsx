"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  /** Margin passed to whileInView viewport */
  margin?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: MOTION.duration.base, ease: MOTION.ease },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: MOTION.duration.reduced } },
};

export function StaggerGroup({
  children,
  className,
  stagger = MOTION.stagger.default,
  margin = "-80px",
}: StaggerGroupProps) {
  const reduced = useReducedMotion();
  const { duration } = useMotionSettings();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { duration: dur } = useMotionSettings();

  return (
    <motion.div
      className={cn(className)}
      variants={
        reduced
          ? itemVariantsReduced
          : {
              hidden: itemVariants.hidden,
              visible: {
                ...itemVariants.visible,
                transition: {
                  duration: dur(MOTION.duration.base),
                  ease: MOTION.ease,
                },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
