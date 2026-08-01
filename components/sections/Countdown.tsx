"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { useCountdown } from "@/hooks/useCountdown";
import { FireworksCanvas } from "@/components/animations/FireworksCanvas";
import { FadeIn } from "@/components/animations/FadeIn";
import { BlurFadeIn } from "@/components/animations/BlurFadeIn";
import { CountdownGrid } from "@/components/ui/CountdownDisplay";
import { SectionShell } from "@/components/ui/SectionShell";

export function Countdown() {
  const { weddingDate } = WEDDING;
  const countdown = useCountdown(weddingDate.iso);
  const [fireworksDone, setFireworksDone] = useState(false);
  const showFireworks = countdown.isComplete && !fireworksDone;

  const handleFireworksComplete = useCallback(() => {
    setFireworksDone(true);
  }, []);

  return (
    <SectionShell
      id="countdown"
      theme="warm"
      className="overflow-hidden py-20 md:py-28"
      aria-label="Engagement countdown"
    >
      <FadeIn className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-10 text-center md:mb-12">
          <BlurFadeIn
            as="p"
            className="font-display text-[11px] uppercase tracking-[0.4em] text-maroon"
          >
            The Countdown Begins
          </BlurFadeIn>
          <BlurFadeIn
            as="h2"
            delay={0.06}
            className="font-display mt-4 text-4xl font-semibold tracking-[0.1em] text-maroon sm:text-5xl md:text-6xl"
          >
            Counting the Moments
          </BlurFadeIn>
        </div>

        <div className="relative rounded-2xl border border-primary/30 bg-bg/80 p-6 shadow-[0_12px_40px_rgba(122,30,43,0.08)] backdrop-blur-sm md:p-10">
          {showFireworks ? (
            <FireworksCanvas active={showFireworks} onComplete={handleFireworksComplete} />
          ) : null}

          <CountdownGrid showFireworks={showFireworks} />
        </div>

        {!countdown.isComplete ? (
          <motion.p
            className="font-body mt-8 text-center text-sm text-maroon/80 sm:text-base"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            Until the moment begins ✦ {weddingDate.display}
          </motion.p>
        ) : null}
      </FadeIn>
    </SectionShell>
  );
}
