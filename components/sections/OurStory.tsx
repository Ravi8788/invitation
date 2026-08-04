"use client";

import { motion } from "framer-motion";
import { Gem, Heart, Users } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import type { StoryMilestone } from "@/types";
import { CinematicHeading } from "@/components/ui/CinematicHeading";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionShell } from "@/components/ui/SectionShell";
import { cn } from "@/lib/utils";

const ICONS = {
  users: Users,
  heart: Heart,
  gem: Gem,
  sparkles: Gem,
} as const;

function JourneyIcon({ milestone }: { milestone: StoryMilestone }) {
  const Icon = ICONS[milestone.icon] ?? Gem;

  return (
    <motion.div
      className={cn(
        "relative flex aspect-square w-full max-w-[220px] items-center justify-center justify-self-center rounded-full",
        "border border-primary/25 bg-[radial-gradient(circle,rgba(212,180,131,0.14)_0%,transparent_68%)]",
        "shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
      )}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <Icon className="h-10 w-10 text-gold-light/80 sm:h-12 sm:w-12" strokeWidth={1.25} />
    </motion.div>
  );
}

function JourneyEntry({
  milestone,
  index,
}: {
  milestone: StoryMilestone;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <div
      className={cn(
        "grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16",
        reversed && "md:[&>*:first-child]:order-2"
      )}
    >
      <JourneyIcon milestone={milestone} />

      <motion.div
        initial={{ opacity: 0, x: reversed ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
      >
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-ivory/45">
          {milestone.monthLabel ?? milestone.year}
        </p>
        <h3 className="font-display mt-2 text-xl text-ivory sm:text-2xl">{milestone.title}</h3>
        <p className="font-body mt-4 text-sm leading-relaxed text-ivory/65 sm:text-base">
          {milestone.description}
        </p>
      </motion.div>
    </div>
  );
}

export function OurStory() {
  const { story } = WEDDING;

  return (
    <SectionShell
      id="our-story"
      theme="cinematic"
      atmosphere={<SectionAtmosphere embers={4} />}
      contentClassName="max-w-5xl"
      aria-labelledby="our-story-heading"
    >
      <CinematicHeading
        eyebrow="The Path to Union"
        title="Our Journey"
        titleId="our-story-heading"
        className="mb-14 sm:mb-20"
      />

      <div className="space-y-16 sm:space-y-24">
        {story.map((milestone, index) => (
          <JourneyEntry key={milestone.id} milestone={milestone} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}
