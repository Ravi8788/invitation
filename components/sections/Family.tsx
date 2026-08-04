"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import type { Family } from "@/types";
import { CinematicHeading } from "@/components/ui/CinematicHeading";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionShell } from "@/components/ui/SectionShell";

function FamilyColumn({ family, delay }: { family: Family; delay: number }) {
  return (
    <motion.div
      className="invitation-card p-6 text-center md:p-8 md:text-left"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {family.label ? (
        <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold-light/70">
          {family.label}
        </p>
      ) : null}
      {family.subtitle ? (
        <p className="font-display mt-2 text-xs uppercase tracking-[0.25em] text-ivory/55">
          {family.subtitle}
        </p>
      ) : null}
      <h3 className="font-display mt-4 text-xl text-gold-gradient sm:text-2xl">{family.title}</h3>
      <p className="font-body mt-4 text-sm italic leading-relaxed text-ivory/55">{family.note}</p>
      <ul className="mt-8 space-y-5">
        {family.members.map((member, i) => (
          <motion.li
            key={member.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.1 + i * 0.08 }}
          >
            <p className="font-display text-base text-ivory sm:text-lg">{member.name}</p>
            <p className="font-body mt-0.5 text-sm text-ivory/50">{member.relation}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Family() {
  const { families } = WEDDING;

  return (
    <SectionShell
      id="family"
      theme="cinematic"
      cinematic
      atmosphere={<SectionAtmosphere embers={4} />}
      contentClassName="max-w-5xl"
      aria-label="Family"
    >
      <CinematicHeading
        eyebrow="Mangal Aashirwad"
        title="Welcoming Families"
        subtitle="A warm invitation from our families to join us in celebrating this divine union."
        className="mb-14 sm:mb-16"
      />

      <div className="grid w-full gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
        <FamilyColumn family={families.bride} delay={0.1} />
        <FamilyColumn family={families.groom} delay={0.2} />
      </div>
    </SectionShell>
  );
}
