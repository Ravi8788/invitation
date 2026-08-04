"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionShell } from "@/components/ui/SectionShell";

function PromiseEmblem({ active }: { active: boolean }) {
  const { couple } = WEDDING;
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(72vw,280px)] shrink-0 sm:max-w-[320px]">
      <motion.div
        className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(212,180,131,0.28)_0%,transparent_68%)] blur-xl"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      {[100, 86, 72].map((size, i) => (
        <motion.div
          key={size}
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-[#d4b483]/30"
          style={{ width: `${size}%`, height: `${size}%`, x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={active ? { opacity: 0.28 + i * 0.14, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.75, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 z-10 flex aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#d4b483]/50 bg-[radial-gradient(circle_at_50%_38%,rgba(212,180,131,0.14)_0%,rgba(15,21,41,0.92)_58%)] shadow-[0_0_48px_rgba(212,180,131,0.18),inset_0_0_32px_rgba(0,0,0,0.35)]"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-script text-[clamp(2rem,9vw,3.25rem)] leading-none text-[#d4b483]">
          {couple.initials}
        </span>
        {!reduced && active ? (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/12 to-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
        ) : null}
      </motion.div>
    </div>
  );
}

export function ThePromise() {
  const { promise } = WEDDING;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-5%" });
  const reduced = useReducedMotion();

  const fade = (delay = 0) =>
    reduced
      ? { initial: { opacity: 0 }, animate: isInView ? { opacity: 1 } : { opacity: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <SectionShell
      ref={sectionRef}
      id="the-promise"
      theme="cinematic"
      cinematic
      contentClassName="flex w-full max-w-4xl flex-col items-center justify-center gap-6 py-12 sm:gap-8 sm:py-16 md:gap-10 md:py-20"
      atmosphere={
        <>
          <SectionAtmosphere embers={3} glow />
          <div
            className="pointer-events-none absolute left-[8%] top-[18%] z-[1] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(212,180,131,0.18)_0%,transparent_70%)] blur-xl"
            aria-hidden
          />
        </>
      }
      aria-labelledby="the-promise-heading"
    >
      <div className="flex w-full flex-col items-center text-center">
        <motion.p
          {...fade(0)}
          className="font-display text-[10px] uppercase tracking-[0.42em] text-[#d4b483]/85 sm:text-[11px]"
        >
          Sealed with Love
        </motion.p>

        <motion.h2
          {...fade(0.06)}
          id="the-promise-heading"
          className="hero-scene-heading mt-4 font-display text-[clamp(2rem,8vw,3.5rem)] font-semibold uppercase tracking-[0.12em] text-[#fdfbf7]"
        >
          The Promise
        </motion.h2>

        <motion.p
          {...fade(0.12)}
          className="font-body mt-3 max-w-md text-base italic leading-relaxed text-[#fdfbf7]/70 sm:text-lg"
        >
          {promise.subtitle}
        </motion.p>

        <motion.div {...fade(0.18)} className="my-6 w-full max-w-xs sm:my-8 sm:max-w-sm">
          <OrnamentalDivider className="text-[#d4b483]/55" />
        </motion.div>
      </div>

      <PromiseEmblem active={isInView} />

      <motion.p
        {...fade(reduced ? 0.2 : 0.45)}
        className="font-body max-w-lg px-4 text-center text-sm leading-relaxed text-[#fdfbf7]/60 sm:text-base"
      >
        <span className="font-display text-base tracking-[0.06em] text-[#d4b483] sm:text-lg">
          {promise.date}
        </span>
        <span className="mx-2 text-[#d4b483]/60" aria-hidden>
          ✦
        </span>
        <span className="font-script text-lg text-[#d4b483]/90 sm:text-xl">
          {promise.captionSuffix}
        </span>
      </motion.p>
    </SectionShell>
  );
}
