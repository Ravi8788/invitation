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
      theme="ivory"
      className="overflow-hidden py-32 md:py-44"
      aria-labelledby="quote-heading"
    >
      <AmbientDust density={10} />
      <h2 id="quote-heading" className="sr-only">
        Engagement Quote
      </h2>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <blockquote className="font-display text-xl font-medium leading-relaxed tracking-wide text-maroon sm:text-2xl md:text-3xl lg:text-4xl lg:leading-snug">
          <span className="sr-only">&ldquo;</span>
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="mr-[0.28em] inline-block"
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, filter: "blur(4px)", y: 12 }
              }
              whileInView={
                reduced
                  ? { opacity: 1 }
                  : { opacity: 1, filter: "blur(0px)", y: 0 }
              }
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
      </div>
    </SectionShell>
  );
}
