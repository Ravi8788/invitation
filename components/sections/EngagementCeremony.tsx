"use client";

import { Gem } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { FadeIn } from "@/components/animations/FadeIn";

export function EngagementCeremony() {
  const ceremony = WEDDING.events[0];

  return (
    <SectionShell
      id="ceremony"
      theme="maroon"
      aria-labelledby="ceremony-heading"
    >
      <div className="mx-auto max-w-2xl">
        <FadeIn className="mb-12 flex justify-center">
          <SectionHeading
            title="The Ceremony"
            headingId="ceremony-heading"
            theme="maroon"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <GlassCard variant="dark" className="relative overflow-hidden p-8 text-center md:p-12">
            <div
              className="pointer-events-none absolute inset-3 rounded-2xl border border-primary/25"
              aria-hidden="true"
            />

            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-primary/35 bg-primary/10">
              <Gem className="h-6 w-6 text-primary" strokeWidth={1.5} />
            </div>

            <h3 className="font-display text-2xl text-gold-gradient sm:text-3xl">
              {ceremony.name}
            </h3>

            <p className="font-body mt-4 text-sm leading-relaxed text-text-muted">
              {ceremony.description}
            </p>

            <div className="mt-8 space-y-2 border-t border-primary/20 pt-8">
              <p className="font-display text-lg text-maroon">{ceremony.date}</p>
              <p className="font-body text-sm font-medium text-primary">
                {ceremony.time}
              </p>
              <p className="font-body text-sm text-text-muted">{ceremony.venue}</p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
