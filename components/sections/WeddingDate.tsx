"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { HeartConfetti } from "@/components/animations/HeartConfetti";
import { BlurFadeIn } from "@/components/animations/BlurFadeIn";
import { FadeIn } from "@/components/animations/FadeIn";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { ScratchCard } from "@/components/ui/ScratchCard";
import { SectionShell } from "@/components/ui/SectionShell";

export function WeddingDate() {
  const { weddingDate, venue } = WEDDING;
  const reduced = useReducedMotion();
  const [showHearts, setShowHearts] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <SectionShell
      id="save-the-date"
      theme="warm"
      className="overflow-hidden"
      aria-labelledby="save-the-date-heading"
    >
      <FadeIn className="mx-auto max-w-2xl">
        <div className="mb-4 text-center">
          <BlurFadeIn
            as="p"
            className="font-display text-[11px] uppercase tracking-[0.4em] text-primary"
          >
            Mark Your Calendar
          </BlurFadeIn>
          <BlurFadeIn
            as="h2"
            id="save-the-date-heading"
            delay={0.08}
            className="font-display mt-3 text-4xl font-semibold tracking-[0.1em] text-maroon sm:text-5xl"
          >
            Save the Date
          </BlurFadeIn>
        </div>

        <div className="mb-10">
          <OrnamentalDivider />
        </div>

        <div className="relative">
          <ScratchCard
            variant="light"
            onReveal={() => {
              setRevealed(true);
              setShowHearts(true);
            }}
            scratchLabel={
              <>
                <p className="font-display text-sm uppercase tracking-[0.35em]">
                  ✦ Scratch to Reveal ✦
                </p>
                <p className="font-body mt-3 max-w-xs text-sm leading-relaxed opacity-80">
                  Scratch the gold to unveil our engagement date
                </p>
              </>
            }
          >
            <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              {weddingDate.celebrationTitle}
            </p>
            <p className="font-display mt-4 text-2xl text-maroon sm:text-3xl md:text-4xl">
              {weddingDate.date}
            </p>
            <p className="font-body mt-3 text-base text-text-muted">
              {weddingDate.time}
            </p>
            <p className="font-body mt-2 text-sm text-text-muted">
              {venue.city}
            </p>
          </ScratchCard>

          <HeartConfetti
            active={showHearts}
            onComplete={() => setShowHearts(false)}
          />
        </div>

        <motion.p
          className="font-script mt-8 text-center text-lg text-maroon/80 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0.5 }}
          transition={{ duration: reduced ? 0.3 : 0.5 }}
        >
          {revealed
            ? "The magic is revealed — we cannot wait to celebrate with you"
            : "Swipe the gold to unveil the magic"}
        </motion.p>
      </FadeIn>
    </SectionShell>
  );
}
