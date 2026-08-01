"use client";

import Image from "next/image";
import { WEDDING } from "@/lib/constants";
import type { Family, FamilyMember } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { FadeIn } from "@/components/animations/FadeIn";

function MemberRow({ member }: { member: FamilyMember }) {
  return (
    <div className="flex items-center gap-4">
      {member.photo ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-primary p-0.5">
          <Image
            src={member.photo}
            alt={member.name}
            width={56}
            height={56}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      ) : null}
      <div>
        <p className="font-display text-base text-text">
          {member.name}
        </p>
        <p className="font-body text-sm text-text-muted">
          {member.relation}
        </p>
      </div>
    </div>
  );
}

function FamilyColumn({
  family,
  direction,
}: {
  family: Family;
  direction: "left" | "right";
}) {
  return (
    <FadeIn direction={direction}>
      <GlassCard variant="dark" className="h-full p-6 md:p-8">
        <h3 className="font-display text-xl text-gold-gradient sm:text-2xl">
          {family.title}
        </h3>
        <p className="font-body mt-4 text-sm leading-relaxed text-text-muted italic">
          {family.note}
        </p>
        <div className="mt-8 space-y-6">
          {family.members.map((member) => (
            <MemberRow key={member.name} member={member} />
          ))}
        </div>
      </GlassCard>
    </FadeIn>
  );
}

export function Family() {
  const { families } = WEDDING;

  return (
    <SectionShell id="family" theme="maroon" aria-label="Family">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-12 flex justify-center">
          <SectionHeading title="Family" theme="maroon" />
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <FamilyColumn family={families.bride} direction="left" />
          <FamilyColumn family={families.groom} direction="right" />
        </div>
      </div>
    </SectionShell>
  );
}
