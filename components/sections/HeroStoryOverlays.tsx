"use client";

import { memo } from "react";
import { useReducedMotion } from "framer-motion";
import { MapPin, Mouse } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { HERO_STORY_SCENES } from "@/lib/heroStoryScenes";
import { useInvitationOpened } from "@/hooks/useInvitationOpened";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

function SplitLetters({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className="hero-letter inline-block will-change-transform" aria-hidden>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function GoldenParticles() {
  const seeds = [
    { left: "12%", top: "22%", delay: "0s", size: 3 },
    { left: "28%", top: "38%", delay: "0.4s", size: 2 },
    { left: "72%", top: "28%", delay: "0.8s", size: 4 },
    { left: "84%", top: "44%", delay: "1.1s", size: 2 },
    { left: "18%", top: "58%", delay: "0.6s", size: 3 },
    { left: "62%", top: "52%", delay: "1.4s", size: 2 },
    { left: "46%", top: "30%", delay: "0.2s", size: 3 },
    { left: "88%", top: "62%", delay: "1.8s", size: 2 },
  ];

  return (
    <div data-hero-particles className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {seeds.map((p, i) => (
        <span
          key={i}
          className="hero-particle absolute rounded-full bg-[#d4b483]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

const HeroScene = memo(function HeroScene({
  scene,
}: {
  scene: (typeof HERO_STORY_SCENES)[number];
}) {
  const baseClass =
    "hero-scene pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-5 sm:px-8";

  if ("isCouple" in scene && scene.isCouple) {
    return (
      <div data-hero-scene={scene.id} className={baseClass}>
        <div className="relative text-center">
          <div
            data-scene-glow
            className="hero-couple-glow pointer-events-none absolute left-1/2 top-1/2 h-48 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-56 sm:w-96"
            aria-hidden
          />
          <h2
            data-scene-heading
            className="hero-scene-heading font-script text-[clamp(2.25rem,10vw,4.25rem)] leading-tight text-[#fdfbf7]"
          >
            Sonal{" "}
            <span data-scene-heart className="hero-heart-pulse inline-block text-[#d4b483]">
              ❤️
            </span>{" "}
            Avishkar
          </h2>
          <p
            data-scene-subtitle
            className="hero-scene-subtitle font-body mx-auto mt-5 max-w-sm text-sm leading-relaxed text-[#fdfbf7]/85 sm:text-base"
          >
            {scene.subtitle}
          </p>
        </div>
      </div>
    );
  }

  if ("isSaveDate" in scene && scene.isSaveDate) {
    return (
      <div data-hero-scene={scene.id} className={baseClass}>
        <div className="text-center">
          <h2
            data-scene-heading
            className="hero-scene-heading font-display text-[clamp(1.35rem,5.5vw,2.25rem)] font-semibold uppercase tracking-[0.14em] text-[#fdfbf7]"
          >
            {scene.heading}
          </h2>
          <p
            data-scene-date
            className="hero-scene-date font-display mt-6 text-[clamp(1.5rem,6vw,2.5rem)] font-semibold tracking-[0.08em] text-[#d4b483] [perspective:600px]"
          >
            {scene.date}
          </p>
          <div
            data-scene-divider
            className="hero-scene-divider mx-auto mt-5 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#d4b483] to-transparent sm:w-32"
          />
          <p
            data-scene-time
            className="hero-scene-time font-body mt-5 text-sm uppercase tracking-[0.28em] text-[#fdfbf7]/90 sm:text-base"
          >
            {scene.time}
          </p>
        </div>
      </div>
    );
  }

  if ("isVenue" in scene && scene.isVenue) {
    return (
      <div data-hero-scene={scene.id} className={baseClass}>
        <div className="relative text-center">
          <div
            data-scene-glow
            className="hero-venue-glow pointer-events-none absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2 sm:h-48 sm:w-72"
            aria-hidden
          />
          <div data-scene-icon className="mb-4 flex justify-center">
            <MapPin className="h-7 w-7 text-[#d4b483] sm:h-8 sm:w-8" strokeWidth={1.25} />
          </div>
          <h2
            data-scene-heading
            className="hero-scene-heading font-display text-[clamp(1.35rem,5.5vw,2.25rem)] font-semibold uppercase tracking-[0.14em] text-[#fdfbf7]"
          >
            {scene.heading}
          </h2>
          <p
            data-scene-subtitle
            className="hero-scene-subtitle font-body mt-4 text-base text-[#d4b483] sm:text-lg"
          >
            {scene.subtitle}
          </p>
        </div>
      </div>
    );
  }

  if ("isFinale" in scene && scene.isFinale) {
    return (
      <div data-hero-scene={scene.id} className={baseClass}>
        <div className="mx-auto max-w-xl text-center">
          <h2
            data-scene-heading
            className="hero-scene-heading font-display text-[clamp(1.25rem,5vw,2rem)] font-semibold uppercase leading-snug tracking-[0.1em] text-[#fdfbf7] sm:tracking-[0.12em]"
          >
            {scene.heading}
          </h2>
          <p
            data-scene-subtitle
            className="hero-scene-subtitle font-body mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#fdfbf7]/85 sm:text-base"
          >
            {scene.subtitle}
          </p>
          <button
            type="button"
            data-scene-cta
            onClick={() => scrollToSection("#save-the-date")}
            className="hero-cta-shimmer btn-gold-cinematic pointer-events-auto relative mt-8 min-h-11 overflow-hidden px-10 py-2.5 text-[11px] uppercase tracking-[0.24em] sm:text-xs"
          >
            <span className="relative z-[1]">{scene.cta}</span>
          </button>
        </div>
      </div>
    );
  }

  const isScene1 = scene.id === "1";
  const isScene2 = scene.id === "2";

  return (
    <div data-hero-scene={scene.id} className={baseClass}>
      <div className="mx-auto max-w-2xl text-center">
        <h2
          data-scene-heading
          className="hero-scene-heading font-display text-[clamp(1.25rem,5vw,2.1rem)] font-semibold uppercase leading-snug tracking-[0.1em] text-[#fdfbf7] sm:tracking-[0.12em]"
        >
          {isScene1 ? <SplitLetters text={scene.heading} /> : scene.heading}
        </h2>

        {isScene2 ? (
          <div
            data-scene-divider
            className="hero-scene-divider mx-auto mt-5 h-px w-20 origin-center bg-gradient-to-r from-transparent via-[#d4b483] to-transparent sm:w-28"
          />
        ) : null}

        {"subtitle" in scene && scene.subtitle ? (
          <p
            data-scene-subtitle
            className="hero-scene-subtitle font-body mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#fdfbf7]/82 sm:text-base"
          >
            {scene.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
});

const HeroScrollHint = memo(function HeroScrollHint() {
  const { hero } = WEDDING;
  const { loaderComplete } = useInvitationOpened();
  const reduced = useReducedMotion();

  if (reduced || !loaderComplete) return null;

  return (
    <div
      data-story-hint="true"
      className="pointer-events-none absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 will-change-[opacity] sm:bottom-5"
    >
      <div className="hero-scroll-hint-bob flex flex-col items-center gap-1.5 text-[#fdfbf7]/55">
        <span className="font-body text-[8px] uppercase tracking-[0.32em] sm:text-[9px]">
          {hero.scrollHint ?? "Scroll to explore the story"}
        </span>
        <Mouse className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.5} />
      </div>
    </div>
  );
});

const ReducedMotionHero = memo(function ReducedMotionHero() {
  const finale = HERO_STORY_SCENES[6];

  return (
    <div className="flex h-full items-center justify-center px-5">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-[0.12em] text-[#fdfbf7] sm:text-3xl">
          {finale.heading}
        </h1>
        <p className="font-body mt-4 text-sm leading-relaxed text-[#fdfbf7]/85 sm:text-base">
          {finale.subtitle}
        </p>
        <button
          type="button"
          onClick={() => scrollToSection("#save-the-date")}
          className="btn-gold-cinematic mt-8 min-h-11 px-10 py-2.5 text-[11px] uppercase tracking-[0.24em] sm:text-xs"
        >
          {finale.cta}
        </button>
      </div>
    </div>
  );
});

export const HeroStoryOverlays = memo(function HeroStoryOverlays() {
  const reduced = useReducedMotion();

  if (reduced) {
    return <ReducedMotionHero />;
  }

  return (
    <div data-hero-story-root className="relative h-full w-full">
      <div
        data-hero-vignette
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(8,10,24,0.75),transparent_68%)]"
        aria-hidden
      />
      <GoldenParticles />
      {HERO_STORY_SCENES.map((scene) => (
        <HeroScene key={scene.id} scene={scene} />
      ))}
      <HeroScrollHint />
    </div>
  );
});
