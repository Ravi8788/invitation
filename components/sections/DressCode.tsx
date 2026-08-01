"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import type { DressCodeItem } from "@/types";
import { ParticlesField } from "@/components/animations/ParticlesField";
import { BlurFadeIn } from "@/components/animations/BlurFadeIn";
import { SectionShell } from "@/components/ui/SectionShell";
import { DressIllustration } from "@/components/ui/DressIllustration";
import { ColorPalette } from "@/components/ui/ColorPalette";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { MOTION } from "@/lib/motion";

function PremiumAttireCard({ item }: { item: DressCodeItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-12%" });
  const reduced = useReducedMotion();
  const { duration } = useMotionSettings();

  return (
    <motion.div
      ref={cardRef}
      className="relative mx-auto max-w-xl"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: duration(MOTION.duration.base),
        ease: MOTION.ease,
      }}
    >
      {/* Animated gold border shimmer */}
      {!reduced ? (
        <motion.div
          className="pointer-events-none absolute -inset-[1px] rounded-[1.35rem] opacity-80"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(212,175,55,0.55), transparent, rgba(244,217,118,0.35), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      ) : null}

      <div className="relative overflow-hidden rounded-[1.3rem] border border-primary/40 bg-maroon-deep/90 p-6 shadow-[0_20px_60px_rgba(92,22,32,0.35),inset_0_1px_0_rgba(212,175,55,0.2)] backdrop-blur-md md:p-10">
        {/* Inner glow wash */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(212,175,55,0.14),transparent_65%)]"
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="text-left">
            <motion.p
              className="font-display text-[11px] uppercase tracking-[0.35em] text-primary-light"
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {item.event}
            </motion.p>
            <motion.h3
              className="font-display mt-2 text-2xl text-gold-gradient sm:text-3xl"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.55, ease: MOTION.ease }}
            >
              {item.title}
            </motion.h3>
          </div>

          <motion.div
            className="relative shrink-0"
            animate={
              reduced || !isInView
                ? {}
                : { y: [0, -8, 0], rotate: [0, 2, 0, -2, 0] }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            <div className="absolute inset-0 scale-110 rounded-full bg-primary/10 blur-md" />
            <DressIllustration
              type={item.illustration}
              className="relative h-24 w-16 opacity-90 sm:h-28 sm:w-[4.5rem]"
            />
          </motion.div>
        </div>

        <motion.div
          className="relative my-6"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: MOTION.ease }}
          style={{ originX: 0 }}
        >
          <OrnamentalDivider className="text-primary-light" />
        </motion.div>

        <motion.p
          className="font-body relative text-left text-sm leading-relaxed text-ivory/90 sm:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.38, duration: 0.55 }}
        >
          {item.description}
        </motion.p>

        <div className="relative mt-8 border-t border-primary/25 pt-8">
          <p className="font-display mb-5 text-[10px] uppercase tracking-[0.3em] text-primary-light">
            Palette Inspiration
          </p>
          <ColorPalette colors={item.colors} onDark />
        </div>
      </div>
    </motion.div>
  );
}

export function DressCode() {
  const { attire, dressCode } = WEDDING;
  const { particleDensity } = useMotionSettings();
  const reduced = useReducedMotion();

  return (
    <SectionShell
      id="attire"
      theme="maroon"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="attire-heading"
    >
      <ParticlesField
        contained
        density={particleDensity(14)}
        direction="up"
        className="pointer-events-none absolute inset-0 -z-0 h-full w-full opacity-60"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-12 text-center md:mb-16">
          <BlurFadeIn
            as="p"
            className="font-display text-[11px] uppercase tracking-[0.4em] text-primary"
          >
            {attire.eyebrow}
          </BlurFadeIn>
          <BlurFadeIn
            as="h2"
            id="attire-heading"
            delay={0.08}
            className="font-display mt-3 text-4xl font-semibold tracking-[0.1em] text-gold-gradient sm:text-5xl"
          >
            What to Wear
          </BlurFadeIn>
          <BlurFadeIn
            as="p"
            delay={0.14}
            className="font-body mx-auto mt-4 max-w-lg text-base italic text-maroon/80 sm:text-lg"
          >
            {attire.subtitle}
          </BlurFadeIn>
        </div>

        {dressCode.map((item) => (
          <PremiumAttireCard key={item.id} item={item} />
        ))}

        <motion.div
          className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 rounded-full border border-primary/35 bg-bg/85 px-5 py-3 shadow-sm backdrop-blur-sm"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.5, ease: MOTION.ease }}
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.5} />
          <p className="font-body text-xs text-maroon/80 sm:text-sm">{attire.avoidNote}</p>
        </motion.div>
      </div>
    </SectionShell>
  );
}
