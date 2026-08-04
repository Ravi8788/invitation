"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionShell } from "@/components/ui/SectionShell";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { MOTION } from "@/lib/motion";

export function Quote() {
  const { quotes, ui } = WEDDING;
  const reduced = useReducedMotion();
  const { duration } = useMotionSettings();

  return (
    <SectionShell id="quotes" theme="reel" cinematic contentClassName="max-w-3xl" aria-labelledby="quotes-heading">
      <FadeIn className="relative z-10 w-full">
        <h2 id="quotes-heading" className="reel-heading-gold text-center font-display text-[clamp(1.25rem,5vw,2rem)] font-semibold tracking-[0.08em]">
          {ui.quotes.title}
        </h2>

        <div className="mt-10 space-y-6">
          {quotes.map((quote, index) => {
            const words = quote.split(" ");
            return (
              <blockquote
                key={quote}
                className="reel-glass-card px-6 py-8 text-center font-display text-[clamp(0.95rem,3.5vw,1.35rem)] leading-relaxed text-[#fff]/88"
              >
                {words.map((word, wordIndex) => (
                  <motion.span
                    key={`${index}-${word}-${wordIndex}`}
                    className="mr-[0.28em] inline-block"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: duration(MOTION.duration.fast),
                      delay: reduced ? 0 : wordIndex * 0.04 + index * 0.05,
                      ease: MOTION.ease,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </blockquote>
            );
          })}
        </div>
      </FadeIn>
    </SectionShell>
  );
}
