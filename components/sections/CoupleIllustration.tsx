"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
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
      className="overflow-hidden"
      aria-label="Couple illustration"
    >
      <FadeIn className="mx-auto flex max-w-4xl flex-col items-center">
        <SectionHeading title="The Couple" className="mb-12" />

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
              <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-bg-secondary/80 p-3 shadow-[0_20px_60px_rgba(107,30,35,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]">
                <div
                  className="pointer-events-none absolute inset-3 rounded-2xl border border-primary/20"
                  aria-hidden="true"
                />
                <Image
                  src={couple.caricature}
                  alt={`Caricature portrait of ${couple.bride} and ${couple.groom}`}
                  width={640}
                  height={853}
                  priority
                  className="relative z-10 h-auto w-full rounded-2xl object-cover"
                  sizes="(max-width: 768px) 90vw, 512px"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
