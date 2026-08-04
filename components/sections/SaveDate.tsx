"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionShell } from "@/components/ui/SectionShell";

/** Shubh Muhurat — date + event schedule (final.mp4) */
export function SaveDate() {
  const { weddingDate, venue, events, ui } = WEDDING;
  const event = events[0];

  return (
    <SectionShell id="save-date" theme="reel" cinematic aria-labelledby="save-date-heading">
      <FadeIn className="relative z-10 w-full max-w-3xl text-center">
        <p className="font-display text-[10px] tracking-[0.35em] text-[#D4AF37]/75">
          {ui.saveDate.eyebrow}
        </p>
        <h2 id="save-date-heading" className="reel-heading-gold mt-4 font-display text-[clamp(1.25rem,4.5vw,2rem)] font-semibold tracking-[0.08em]">
          {weddingDate.display}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <motion.div
            className="reel-glass-card col-span-full px-6 py-5 sm:col-span-1 sm:col-start-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-[10px] tracking-[0.25em] text-[#D4AF37]">{event.name}</p>
            <p className="font-display mt-2 text-xl text-[#fff]">{event.time}</p>
          </motion.div>
        </div>

        <div className="mt-10">
          <p className="font-display text-[10px] tracking-[0.3em] text-[#D4AF37]/70">{ui.venue.locationLabel}</p>
          <p className="font-display mt-2 text-lg text-[#fff]">{venue.name}</p>
          <p className="font-body mt-1 text-sm text-[#fff]/55">{venue.city}</p>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
