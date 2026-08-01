"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { AmbientDust } from "@/components/animations/AmbientDust";
import { SparkleBurst } from "@/components/animations/SparkleBurst";
import { BlurFadeIn } from "@/components/animations/BlurFadeIn";
import { RingGraphic } from "@/components/ui/RingGraphic";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { SectionShell } from "@/components/ui/SectionShell";

const STAGE = "min(82vw, 420px)";
const RING = "min(58vw, 240px)";

function CenteredStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ width: STAGE, height: STAGE }}
    >
      {children}
    </div>
  );
}

function RingShowcase({
  ringImage,
  isInView,
  reduced,
  sparkleActive,
  onRingComplete,
}: {
  ringImage?: string;
  isInView: boolean;
  reduced: boolean;
  sparkleActive: boolean;
  onRingComplete: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!isInView || revealed) return;
    const timer = window.setTimeout(() => {
      setRevealed(true);
      onRingComplete();
    }, reduced ? 550 : 1100);
    return () => window.clearTimeout(timer);
  }, [isInView, revealed, reduced, onRingComplete]);

  return (
    <CenteredStage className="relative mx-auto shrink-0">
      <SparkleBurst active={sparkleActive} />

      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: STAGE,
          height: STAGE,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(212,180,131,0.45) 0%, rgba(184,147,90,0.15) 42%, transparent 70%)",
        }}
        initial={reduced ? { opacity: 0.5 } : { opacity: 0, scale: 0.6 }}
        animate={
          isInView
            ? reduced
              ? { opacity: 0.55, scale: 1 }
              : { opacity: [0, 0.8, 0.55, 0.65, 0.5], scale: [0.6, 1.06, 1, 1.03, 1] }
            : { opacity: 0, scale: 0.6 }
        }
        transition={
          reduced ? { duration: 0.4 } : { duration: 1.5, times: [0, 0.28, 0.5, 0.72, 1] }
        }
        aria-hidden="true"
      />

      {/* Slow rotating outer maroon ring */}
      {!reduced ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-dashed border-maroon/25"
          style={{ width: STAGE, height: STAGE, x: "-50%", y: "-50%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      ) : null}

      {/* Counter-rotating gold ring */}
      {!reduced ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-primary/30"
          style={{ width: "88%", height: "88%", x: "-50%", y: "-50%" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      ) : null}

      {/* Ornate double frame */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2 border-maroon/35 p-[10px] shadow-[0_0_0_1px_rgba(122,30,43,0.1)]"
        style={{ width: "92%", height: "92%", x: "-50%", y: "-50%" }}
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full border border-primary/35" />
      </motion.div>

      {/* Inner vignette disc */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-maroon/15 bg-[radial-gradient(circle,rgba(253,251,247,0.65)_0%,rgba(248,243,234,0.25)_50%,transparent_72%)] shadow-[inset_0_0_36px_rgba(184,147,90,0.12),0_12px_40px_rgba(122,30,43,0.07)]"
        style={{ width: "84%", height: "84%", transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      />

      {/* Breathing pulse ring */}
      {isInView && !reduced ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-primary/20"
          style={{ width: "78%", height: "78%", x: "-50%", y: "-50%" }}
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.04, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          aria-hidden="true"
        />
      ) : null}

      {/* Ring photo / graphic — dead centre */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10"
        style={{ x: "-50%", y: "-50%" }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.72, rotate: -6 }}
        animate={
          isInView
            ? reduced
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 1, scale: 1, rotate: 0, y: [0, -5, 0] }
            : { opacity: 0, scale: 0.72, rotate: -6 }
        }
        transition={
          reduced
            ? { duration: 0.45, delay: 0.15 }
            : {
                opacity: { duration: 0.5, delay: 0.35 },
                scale: { type: "spring", stiffness: 180, damping: 16, delay: 0.35 },
                rotate: { duration: 0.6, delay: 0.35 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
              }
        }
      >
        {ringImage ? (
          <div className="relative" style={{ width: RING, height: RING }}>
            <div
              className="absolute -inset-2 rounded-full border border-maroon/25"
              aria-hidden="true"
            />
            <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-maroon/50 bg-bg shadow-[0_0_48px_rgba(122,30,43,0.22),inset_0_0_24px_rgba(255,255,255,0.45)]">
              <Image
                src={ringImage}
                alt="Engagement ring"
                fill
                className="object-cover object-center"
                sizes="240px"
                priority={false}
              />
              {/* Soft highlight sweep */}
              {!reduced ? (
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  aria-hidden="true"
                />
              ) : null}
            </div>
          </div>
        ) : (
          <RingGraphic />
        )}
      </motion.div>
    </CenteredStage>
  );
}

function AnimatedDivider({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="mx-auto w-full max-w-xs sm:max-w-sm"
      initial={reduced ? { opacity: 0 } : { opacity: 0, scaleX: 0.6 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <OrnamentalDivider className="text-maroon/70" />
    </motion.div>
  );
}

export function ThePromise() {
  const { promise } = WEDDING;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-12%" });
  const reduced = useReducedMotion();
  const [sparkleActive, setSparkleActive] = useState(false);

  const handleRingComplete = () => {
    if (!reduced) setSparkleActive(true);
  };

  return (
    <SectionShell
      ref={sectionRef}
      id="the-promise"
      theme="warm"
      className="relative overflow-hidden py-16 md:py-24"
      aria-labelledby="the-promise-heading"
    >
      <AmbientDust density={12} className="opacity-35" />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_42%,rgba(184,147,90,0.12),transparent_68%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center">
        <BlurFadeIn
          as="p"
          className="font-display text-[11px] uppercase tracking-[0.45em] text-maroon"
        >
          Sealed with Love
        </BlurFadeIn>

        <BlurFadeIn
          as="h2"
          id="the-promise-heading"
          delay={0.08}
          className="font-display mt-3 text-4xl font-semibold tracking-[0.14em] text-maroon sm:text-5xl md:text-6xl"
        >
          The Promise
        </BlurFadeIn>

        <BlurFadeIn
          as="p"
          delay={0.14}
          className="font-body mt-3 max-w-md text-base italic leading-relaxed text-text-muted sm:text-lg"
        >
          {promise.subtitle}
        </BlurFadeIn>

        <div className="my-8 w-full">
          <AnimatedDivider delay={0.2} />
        </div>

        <div className="flex w-full justify-center">
          <RingShowcase
            ringImage={promise.ringImage}
            isInView={isInView}
            reduced={!!reduced}
            sparkleActive={sparkleActive}
            onRingComplete={handleRingComplete}
          />
        </div>

        <div className="mt-8 w-full">
          <AnimatedDivider delay={0.35} />
        </div>

        <BlurFadeIn
          as="p"
          delay={reduced ? 0.25 : 0.85}
          className="font-body mt-6 max-w-lg text-sm leading-relaxed text-text-muted sm:text-base"
        >
          <span className="font-display text-base tracking-[0.08em] text-maroon sm:text-lg">
            {promise.date}
          </span>
          <span className="mx-2 text-primary" aria-hidden="true">
            ✦
          </span>
          <span className="font-script text-lg text-gold-light sm:text-xl">
            {promise.captionSuffix}
          </span>
        </BlurFadeIn>
      </div>
    </SectionShell>
  );
}
