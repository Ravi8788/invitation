"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { AmbientDust } from "@/components/animations/AmbientDust";
import { SectionShell } from "@/components/ui/SectionShell";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { MOTION } from "@/lib/motion";

export function Quote() {
  const { quote } = WEDDING;
  const words = quote.split(" ");
  const reduced = useReducedMotion();
  const { duration, isMobile } = useMotionSettings();
  const wordDelay = isMobile ? 0.05 : 0.07;

  return (
    <SectionShell
      theme="cinematic"
      contentClassName="max-w-4xl py-16 md:py-24"
      atmosphere={
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          <AmbientDust density={10} />
        </div>
      }
      aria-labelledby="quote-heading"
    >
      <h2 id="quote-heading" className="sr-only">
        Engagement Quote
      </h2>
      <blockquote className="text-center font-display text-xl font-medium leading-relaxed tracking-wide text-ivory/90 sm:text-2xl md:text-3xl lg:text-4xl lg:leading-snug">
        <span className="sr-only">&ldquo;</span>
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="mr-[0.28em] inline-block"
            initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", y: 12 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: duration(MOTION.duration.fast),
              delay: reduced ? 0 : index * wordDelay,
              ease: MOTION.ease,
            }}
          >
            {word}
          </motion.span>
        ))}
        <span className="sr-only">&rdquo;</span>
      </blockquote>
    </SectionShell>
  );
}
