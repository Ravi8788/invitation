"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import { AmbientPetals } from "@/components/animations/AmbientPetals";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";

export function CoupleIllustration() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { couple } = WEDDING;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <SectionShell
      ref={sectionRef}
      theme="warm"
      cinematic
      className="overflow-hidden"
      aria-label="Couple illustration"
    >
      <AmbientPetals count={6} />
      <FadeIn className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        <SectionHeading title="The Couple" eyebrow="Together Forever" className="mb-10 sm:mb-12" />

        <div className="relative flex w-full items-center justify-center">
          <motion.div
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-96 md:w-96"
            style={{
              background:
                "radial-gradient(circle, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0.08) 45%, transparent 70%)",
            }}
            animate={
              reduced
                ? { opacity: 0.6 }
                : { opacity: [0.45, 0.75, 0.45], scale: [1, 1.08, 1] }
            }
            transition={{
              duration: 5,
              repeat: reduced ? 0 : Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />

          <motion.div
            className="relative z-10 w-full max-w-sm md:max-w-lg"
            style={reduced ? undefined : { y: parallaxY }}
          >
            <motion.div
              animate={reduced ? {} : { y: [0, -14, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative overflow-hidden rounded-t-[min(50vw,240px)] rounded-b-3xl border-2 border-primary/35 bg-bg-secondary/80 p-3 shadow-[0_24px_70px_rgba(122,30,43,0.14),inset_0_1px_0_rgba(255,255,255,0.85)]">
                <div
                  className="pointer-events-none absolute inset-3 rounded-t-[min(48vw,228px)] rounded-b-2xl border border-primary/25"
                  aria-hidden="true"
                />
                {/* Arch crown ornament */}
                <div
                  className="pointer-events-none absolute left-1/2 top-3 z-20 h-8 w-24 -translate-x-1/2 rounded-full border border-primary/30 bg-bg/80"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex min-h-[320px] items-center justify-center rounded-b-2xl rounded-t-[min(46vw,220px)] bg-[radial-gradient(circle,rgba(212,180,131,0.12)_0%,transparent_70%)]">
                  <span className="font-script text-6xl text-gold-gradient md:text-7xl">{couple.monogram}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
