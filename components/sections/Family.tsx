"use client";

import type { ReactNode } from "react";
import { WEDDING } from "@/lib/constants";
import { ReelSection, ReelSectionGrid } from "@/components/ui/ReelSection";

function MandalaIcon() {
  return (
    <div className="mx-auto mb-6 flex h-16 w-16 animate-[pulse_3s_infinite] items-center justify-center text-gold/80">
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="50" cy="50" r="44" />
        <circle cx="50" cy="50" r="38" strokeDasharray="4 2" />
        <path d="M50,15 C40,30 40,55 50,75 C60,55 60,30 50,15 Z" />
        <path d="M50,22 C45,35 45,50 50,68 C55,50 55,35 50,22 Z" strokeWidth="1" strokeDasharray="2 1" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}

function BlessingCard({
  label,
  sublabel,
  children,
}: {
  label: string;
  sublabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="blessing-card reel-card rounded-2xl transition-all duration-300 hover:border-reel-gold">
      <span className="hero-reel-gold font-sans mb-4 block text-[10px]">
        {label}
      </span>
      <span className="mb-4 block text-[10px] text-white/50">{sublabel}</span>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/** Block 3 — Welcoming Families (reference reel) */
export function Family() {
  const { couple, ui } = WEDDING;

  return (
    <ReelSection
      id="blessings-section"
      theme="blessings"
      eyebrow={ui.family.eyebrow}
      title={ui.family.title}
      subtitle={ui.family.subtitle}
      headerClassName="!max-w-xl"
      leading={<MandalaIcon />}
    >
      <ReelSectionGrid>
        <BlessingCard label={ui.family.swagatTitle} sublabel={ui.family.welcomedBy}>
          <p className="font-serif text-base font-medium text-white/90">{couple.groomParents}</p>
          <p className="font-serif text-base font-medium text-white/90">{couple.brideParents}</p>
        </BlessingCard>

        <BlessingCard label={ui.family.darshanTitle} sublabel={ui.family.awaitingBlessings}>
          <p className="font-serif text-base font-medium text-white/90">{ui.family.guestsLine}</p>
          <p className="font-serif text-base font-medium text-white/90">{ui.family.parivaarLine}</p>
        </BlessingCard>
      </ReelSectionGrid>
    </ReelSection>
  );
}
