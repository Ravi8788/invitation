"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionShell } from "@/components/ui/SectionShell";

function DetailCard({
  icon: Icon,
  primary,
  secondary,
  delay = 0,
}: {
  icon: typeof Calendar;
  primary: string;
  secondary: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center rounded-2xl border border-primary/22 bg-twilight/55 px-4 py-5 text-center backdrop-blur-sm sm:px-5 sm:py-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Icon className="mb-3 h-4 w-4 text-gold-light/80" strokeWidth={1.5} aria-hidden />
      <p className="font-display text-xl leading-none text-ivory sm:text-2xl">{primary}</p>
      <p className="font-body mt-2.5 text-[9px] uppercase leading-relaxed tracking-[0.18em] text-gold-light/75 sm:max-w-none sm:text-[10px] sm:tracking-[0.2em]">
        {secondary}
      </p>
    </motion.div>
  );
}

export function WeddingDate() {
  const { weddingDate, venue, couple } = WEDDING;

  return (
    <SectionShell
      id="save-the-date"
      theme="cinematic"
      cinematic
      atmosphere={<SectionAtmosphere embers={4} glow />}
      aria-labelledby="save-the-date-heading"
    >
      <motion.div
        className="section-card invitation-card relative"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="invitation-card-corner invitation-card-corner-tl" aria-hidden />
        <span className="invitation-card-corner invitation-card-corner-tr" aria-hidden />
        <span className="invitation-card-corner invitation-card-corner-bl" aria-hidden />
        <span className="invitation-card-corner invitation-card-corner-br" aria-hidden />

        <div className="text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.42em] text-gold-light/80 sm:text-[11px]">
            Save the Date
          </p>

          <h2
            id="save-the-date-heading"
            className="hero-title-shadow mt-5 font-display text-[clamp(1.35rem,5.5vw,2rem)] font-semibold uppercase leading-snug tracking-[0.1em] text-ivory"
          >
            {weddingDate.date}
          </h2>

          <p className="font-body mt-3 text-[11px] uppercase tracking-[0.24em] text-ivory/55 sm:text-xs">
            {venue.name} · {venue.city}
          </p>

          <div className="my-7 sm:my-8">
            <OrnamentalDivider className="text-gold-light/60" />
          </div>

          <div
            className="mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-primary/30 bg-[radial-gradient(circle,rgba(212,180,131,0.14)_0%,transparent_72%)] sm:h-20 sm:w-20"
            aria-hidden
          >
            <span className="font-script text-[2rem] leading-none text-gold-gradient sm:text-4xl">
              {couple.initials}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:mt-9 sm:gap-4">
            <DetailCard icon={Calendar} primary={weddingDate.time} secondary="Ring Ceremony" delay={0.08} />
            <DetailCard icon={MapPin} primary={venue.city} secondary={venue.name} delay={0.14} />
          </div>

          <motion.p
            className="font-script mt-8 text-lg leading-snug text-gold-light/85 sm:mt-9 sm:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Join us for an evening of love &amp; celebration
          </motion.p>
        </div>
      </motion.div>
    </SectionShell>
  );
}
