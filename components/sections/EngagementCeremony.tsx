"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionShell } from "@/components/ui/SectionShell";

export function EngagementCeremony() {
  const ceremony = WEDDING.events[0];

  return (
    <SectionShell
      id="ceremony"
      theme="cinematic"
      cinematic
      atmosphere={<SectionAtmosphere embers={3} glow />}
      contentClassName="max-w-lg"
      aria-labelledby="ceremony-heading"
    >
      <motion.div
        className="section-card invitation-card relative text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="invitation-card-corner invitation-card-corner-tl" aria-hidden />
        <span className="invitation-card-corner invitation-card-corner-tr" aria-hidden />
        <span className="invitation-card-corner invitation-card-corner-bl" aria-hidden />
        <span className="invitation-card-corner invitation-card-corner-br" aria-hidden />

        <p className="font-display text-[10px] uppercase tracking-[0.38em] text-[#d4b483]/85 sm:text-[11px]">
          Ring Ceremony
        </p>

        <h2
          id="ceremony-heading"
          className="mt-4 font-display text-[clamp(1.5rem,5.5vw,2.25rem)] font-semibold uppercase leading-snug tracking-[0.1em] text-[#fdfbf7]"
        >
          The Engagement
          <span className="mt-1 block font-script normal-case text-[#d4b483]">Ceremony</span>
        </h2>

        <p className="font-body mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#fdfbf7]/75 sm:text-base">
          Join us for the ring ceremony, blessings from our families, and an evening of celebration
          beneath the evening sky.
        </p>

        <div className="my-7 sm:my-8">
          <OrnamentalDivider className="text-[#d4b483]/55" />
        </div>

        <p className="font-display text-sm uppercase tracking-[0.22em] text-[#fdfbf7] sm:text-base">
          {ceremony.date} · {ceremony.time}
        </p>
        <p className="font-body mt-2 text-sm text-[#d4b483]">{ceremony.venue}</p>
      </motion.div>
    </SectionShell>
  );
}
