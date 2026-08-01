"use client";

import { WEDDING } from "@/lib/constants";
import { FloatingHearts } from "@/components/animations/FloatingHearts";
import { BlurFadeIn } from "@/components/animations/BlurFadeIn";
import { FadeIn } from "@/components/animations/FadeIn";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { SectionShell } from "@/components/ui/SectionShell";
import { useMotionSettings } from "@/hooks/useMotionSettings";

export function OurStory() {
  const { storyNarrative } = WEDDING;
  const { particleDensity } = useMotionSettings();

  return (
    <SectionShell
      id="our-story"
      theme="ivory"
      className="overflow-hidden"
      aria-labelledby="our-story-heading"
    >
      <FloatingHearts density={particleDensity(10)} />

      <FadeIn className="relative z-10 mx-auto max-w-2xl text-center">
        <BlurFadeIn
          as="p"
          className="font-display text-[11px] uppercase tracking-[0.4em] text-primary"
        >
          Our Story
        </BlurFadeIn>
        <BlurFadeIn
          as="h2"
          id="our-story-heading"
          delay={0.08}
          className="font-display mt-3 text-3xl font-semibold tracking-[0.1em] text-maroon sm:text-4xl"
        >
          How We Met
        </BlurFadeIn>

        <div className="my-10">
          <OrnamentalDivider />
        </div>

        <FadeIn delay={0.15} blur>
          <p className="font-body text-base italic leading-relaxed text-text-muted sm:text-lg md:text-xl">
            {storyNarrative}
          </p>
        </FadeIn>
      </FadeIn>
    </SectionShell>
  );
}
