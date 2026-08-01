"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronDown, MapPin } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { useInvitationOpened } from "@/hooks/useInvitationOpened";
import { ParticlesField } from "@/components/animations/ParticlesField";
import { CornerDiyas } from "@/components/animations/CornerDiyas";
import { HeroNav } from "@/components/ui/HeroNav";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { scrollToSection } from "@/lib/scrollToSection";
import { CountdownStrip } from "@/components/ui/CountdownDisplay";
import { cn } from "@/lib/utils";

function ScriptNameReveal({
  name,
  delay,
  reduced,
}: {
  name: string;
  delay: number;
  reduced: boolean;
}) {
  if (reduced) {
    return (
      <motion.span
        className="font-script block text-[clamp(3.25rem,14vw,5.5rem)] leading-none text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay }}
      >
        {name}
      </motion.span>
    );
  }

  return (
    <motion.span
      className="font-script block text-[clamp(3.25rem,14vw,5.5rem)] leading-none text-primary"
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {name}
    </motion.span>
  );
}

function WithDivider({
  delay,
  reduced,
}: {
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="my-2 flex w-full max-w-xs items-center justify-center gap-4 sm:max-w-sm"
      initial={{ opacity: 0, scaleX: reduced ? 1 : 0.85 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary-dark/45" />
      <span className="font-script text-3xl text-gold-light sm:text-4xl">with</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary-dark/45" />
    </motion.div>
  );
}

function InfoChip({
  icon,
  label,
  onClick,
  delay,
  reduced,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-primary-dark/35 bg-bg px-5 py-2.5",
        "font-body text-xs tracking-wide text-text shadow-[0_4px_14px_rgba(122,30,43,0.08)]",
        "transition-all hover:border-primary/55 hover:shadow-[0_6px_18px_rgba(184,147,90,0.14)]"
      )}
    >
      <span className="text-primary-dark">{icon}</span>
      <span>{label}</span>
    </motion.button>
  );
}

export function Hero() {
  const { couple, hero, weddingDate, venue } = WEDDING;
  const { loaderComplete } = useInvitationOpened();
  const reduced = useReducedMotion();
  const { particleDensity } = useMotionSettings();

  const eyebrowDelay = loaderComplete ? (reduced ? 0.05 : 0.2) : 0;
  const brideDelay = eyebrowDelay + (reduced ? 0.1 : 0.25);
  const withDelay = brideDelay + (reduced ? 0.2 : 0.35);
  const groomDelay = withDelay + (reduced ? 0.15 : 0.25);
  const taglineDelay = groomDelay + (reduced ? 0.2 : 0.35);
  const chipsDelay = taglineDelay + (reduced ? 0.2 : 0.45);
  const countdownDelay = chipsDelay + (reduced ? 0.15 : 0.25);

  return (
    <>
      <HeroNav />
      <CornerDiyas />
      <section
        id="hero"
        data-hero-section="true"
        className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-bg px-6 pb-20 pt-28 sm:pt-32"
        aria-label="Engagement invitation hero"
      >
        <ParticlesField
          density={particleDensity(14)}
          className="pointer-events-none absolute inset-0 opacity-50"
        />

        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
          <motion.p
            className="font-display text-[10px] uppercase tracking-[0.42em] text-primary-dark sm:text-[11px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: eyebrowDelay }}
          >
            ◆ {hero.eyebrow} ◆
          </motion.p>

          <h1 className="mt-6 flex w-full flex-col items-center">
            <ScriptNameReveal
              name={couple.bride}
              delay={brideDelay}
              reduced={!!reduced}
            />
            <motion.p
              className="font-body mt-2 text-xs italic text-text-muted sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: brideDelay + 0.15, duration: 0.5 }}
            >
              (D/o {couple.brideParents})
            </motion.p>

            <WithDivider delay={withDelay} reduced={!!reduced} />

            <ScriptNameReveal
              name={couple.groom}
              delay={groomDelay}
              reduced={!!reduced}
            />
            <motion.p
              className="font-body mt-2 text-xs italic text-text-muted sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: groomDelay + 0.15, duration: 0.5 }}
            >
              (S/o {couple.groomParents})
            </motion.p>
          </h1>

          <motion.p
            className="font-body mt-8 max-w-xl text-base italic leading-relaxed text-text sm:mt-10 sm:text-lg sm:leading-relaxed"
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: taglineDelay, ease: "easeOut" }}
          >
            {hero.tagline}
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
            <InfoChip
              icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />}
              label={weddingDate.dateRange}
              onClick={() => scrollToSection("#save-the-date")}
              delay={chipsDelay}
              reduced={!!reduced}
            />
            <InfoChip
              icon={<MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />}
              label={venue.city}
              onClick={() => scrollToSection("#venue")}
              delay={chipsDelay + 0.1}
              reduced={!!reduced}
            />
          </div>

          <motion.div
            className="mt-8 sm:mt-10"
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: loaderComplete ? 1 : 0, y: loaderComplete ? 0 : 12 }}
            transition={{ duration: 0.45, delay: loaderComplete ? countdownDelay : 0 }}
          >
            <CountdownStrip />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: loaderComplete ? 1 : 0,
            y: loaderComplete ? 0 : 10,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          aria-hidden={!loaderComplete}
        >
          <motion.div
            animate={loaderComplete && !reduced ? { y: [0, 8, 0] } : { y: 0 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-primary-dark"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-text-muted">
              Scroll
            </span>
            <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
