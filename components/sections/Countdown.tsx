"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { useCountdown } from "@/hooks/useCountdown";
import { FireworksCanvas } from "@/components/animations/FireworksCanvas";
import { CinematicHeading } from "@/components/ui/CinematicHeading";
import { CountdownGrid } from "@/components/ui/CountdownDisplay";
import { ScratchCard } from "@/components/ui/ScratchCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionShell } from "@/components/ui/SectionShell";

export function Countdown() {
  const { weddingDate } = WEDDING;
  const countdown = useCountdown(weddingDate.iso);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [fireworksDone, setFireworksDone] = useState(false);
  const showFireworks = scratchRevealed && countdown.isComplete && !fireworksDone;

  const handleFireworksComplete = useCallback(() => {
    setFireworksDone(true);
  }, []);

  return (
    <SectionShell
      id="countdown"
      theme="cinematic"
      cinematic
      atmosphere={<SectionAtmosphere embers={4} />}
      contentClassName="max-w-3xl"
      aria-label="Engagement countdown"
    >
      <CinematicHeading
        eyebrow="The Countdown Begins"
        title="Counting the Moments"
        className="mb-10 sm:mb-12"
      />

      <div className="relative w-full">
        {showFireworks ? (
          <FireworksCanvas active={showFireworks} onComplete={handleFireworksComplete} />
        ) : null}

        {!scratchRevealed ? (
          <ScratchCard
            variant="maroon"
            onReveal={() => setScratchRevealed(true)}
            scratchLabel={
              <>
                <p className="font-display text-sm uppercase tracking-[0.35em] text-ivory">
                  ✦ Let the fireworks begin ✦
                </p>
                <p className="font-body mt-3 max-w-xs text-sm leading-relaxed text-ivory/60">
                  Scratch to reveal the countdown
                </p>
              </>
            }
          >
            <CountdownGrid showFireworks={false} />
          </ScratchCard>
        ) : (
          <div className="invitation-card p-6 md:p-10">
            <CountdownGrid showFireworks={showFireworks} />
          </div>
        )}
      </div>

      {scratchRevealed && countdown.isReady && !countdown.isComplete ? (
        <motion.p
          className="font-body mt-8 text-center text-sm text-ivory/65 sm:text-base"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Until the moment begins ✦ {weddingDate.display}
        </motion.p>
      ) : null}
    </SectionShell>
  );
}
