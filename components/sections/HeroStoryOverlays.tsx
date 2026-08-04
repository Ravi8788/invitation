"use client";

import { memo } from "react";
import { useReducedMotion } from "framer-motion";
import { MapPin, Mouse } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { HERO_STORY_SCENES } from "@/lib/heroStoryScenes";
import { useInvitationOpened } from "@/hooks/useInvitationOpened";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

const SCENE_BASE =
  "hero-scene pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-4 pt-[calc(3.75rem+env(safe-area-inset-top,0px))] pb-[max(4.5rem,env(safe-area-inset-bottom,0px))] sm:px-6 sm:pb-20";

const HEADING =
  "hero-scene-heading font-display text-[clamp(1.125rem,4.8vw,2.1rem)] font-semibold uppercase leading-snug tracking-[0.08em] text-[#fdfbf7] sm:tracking-[0.1em] md:text-[clamp(1.35rem,3.5vw,2.25rem)]";

const SUBTITLE =
  "hero-scene-subtitle font-body mx-auto mt-4 max-w-[22rem] text-[0.8125rem] leading-relaxed text-[#fdfbf7]/85 sm:mt-5 sm:max-w-md sm:text-sm md:text-base";

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
    { left: "72%", top: "28%", delay: "0.8s", size: 4 },
    { left: "46%", top: "30%", delay: "0.2s", size: 3 },
  ];

  return (
    <div data-hero-particles className="pointer-events-none absolute inset-0 z-[1] hidden sm:block" aria-hidden>
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
  if ("isCouple" in scene && scene.isCouple) {
    return (
      <div data-hero-scene={scene.id} className={SCENE_BASE}>
        <div className="hero-scene-inner">
          <h2
            data-scene-heading
            className="hero-scene-heading font-script text-[clamp(2rem,9vw,4rem)] leading-tight text-[#fdfbf7]"
          >
            Sonal{" "}
            <span data-scene-heart className="hero-heart-pulse inline-block text-[#d4b483]">
              ❤️
            </span>{" "}
            Avishkar
          </h2>
          <p data-scene-subtitle className={SUBTITLE}>
            {scene.subtitle}
          </p>
        </div>
      </div>
    );
  }

  if ("isSaveDate" in scene && scene.isSaveDate) {
    return (
      <div data-hero-scene={scene.id} className={SCENE_BASE}>
        <div className="hero-scene-inner">
          <h2 data-scene-heading className={HEADING}>
            {scene.heading}
          </h2>
          <p
            data-scene-date
            className="hero-scene-date font-display mt-5 text-[clamp(1.25rem,5.5vw,2.25rem)] font-semibold tracking-[0.06em] text-[#d4b483] sm:mt-6 [perspective:600px]"
          >
            {scene.date}
          </p>
          <div
            data-scene-divider
            className="hero-scene-divider mx-auto mt-4 h-px w-20 origin-center bg-gradient-to-r from-transparent via-[#d4b483] to-transparent sm:mt-5 sm:w-28"
          />
          <p
            data-scene-time
            className="hero-scene-time font-body mt-4 text-xs uppercase tracking-[0.22em] text-[#fdfbf7]/90 sm:text-sm"
          >
            {scene.time}
          </p>
        </div>
      </div>
    );
  }

  if ("isVenue" in scene && scene.isVenue) {
    return (
      <div data-hero-scene={scene.id} className={SCENE_BASE}>
        <div className="hero-scene-inner">
          <div data-scene-icon className="mb-3 flex justify-center sm:mb-4">
            <MapPin className="h-6 w-6 text-[#d4b483] sm:h-7 sm:w-7" strokeWidth={1.25} />
          </div>
          <h2 data-scene-heading className={HEADING}>
            {scene.heading}
          </h2>
          <p data-scene-subtitle className={cn(SUBTITLE, "text-[#d4b483]")}>
            {scene.subtitle}
          </p>
        </div>
      </div>
    );
  }

  if ("isFinale" in scene && scene.isFinale) {
    return (
      <div data-hero-scene={scene.id} className={SCENE_BASE}>
        <div className="hero-scene-inner max-w-lg">
          <h2 data-scene-heading className={HEADING}>
            {scene.heading}
          </h2>
          <p data-scene-subtitle className={SUBTITLE}>
            {scene.subtitle}
          </p>
          <button
            type="button"
            data-scene-cta
            onClick={() => scrollToSection("#save-the-date")}
            className="hero-cta-shimmer btn-gold-cinematic pointer-events-auto relative mt-6 min-h-11 w-full max-w-xs overflow-hidden px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] sm:mt-8 sm:w-auto sm:px-10 sm:text-[11px] sm:tracking-[0.24em]"
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
    <div data-hero-scene={scene.id} className={SCENE_BASE}>
      <div className="hero-scene-inner max-w-2xl">
        <h2 data-scene-heading className={HEADING}>
          {isScene1 ? <SplitLetters text={scene.heading} /> : scene.heading}
        </h2>

        {isScene2 ? (
          <div
            data-scene-divider
            className="hero-scene-divider mx-auto mt-4 h-px w-16 origin-center bg-gradient-to-r from-transparent via-[#d4b483] to-transparent sm:mt-5 sm:w-24"
          />
        ) : null}

        {"subtitle" in scene && scene.subtitle ? (
          <p data-scene-subtitle className={SUBTITLE}>
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
      className="pointer-events-none absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 will-change-[opacity] sm:bottom-4"
    >
      <div className="hero-scroll-hint-bob flex flex-col items-center gap-1 text-[#fdfbf7]/55">
        <span className="font-body text-[7px] uppercase tracking-[0.28em] sm:text-[8px] sm:tracking-[0.32em]">
          {hero.scrollHint ?? "Scroll to explore the story"}
        </span>
        <Mouse className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={1.5} />
      </div>
    </div>
  );
});

const ReducedMotionHero = memo(function ReducedMotionHero() {
  const finale = HERO_STORY_SCENES[6];

  return (
    <div className="flex h-full items-center justify-center px-4 pt-16 pb-8 sm:px-6">
      <div className="hero-scene-inner max-w-lg">
        <h1 className="font-display text-xl font-semibold uppercase tracking-[0.1em] text-[#fdfbf7] sm:text-2xl">
          {finale.heading}
        </h1>
        <p className="font-body mt-4 text-sm leading-relaxed text-[#fdfbf7]/85 sm:text-base">
          {finale.subtitle}
        </p>
        <button
          type="button"
          onClick={() => scrollToSection("#save-the-date")}
          className="btn-gold-cinematic mt-6 min-h-11 w-full px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] sm:mt-8 sm:w-auto sm:px-10 sm:text-[11px]"
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
    <div data-hero-story-root className="relative h-full w-full overflow-hidden">
      <GoldenParticles />
      {HERO_STORY_SCENES.map((scene) => (
        <HeroScene key={scene.id} scene={scene} />
      ))}
      <HeroScrollHint />
    </div>
  );
});
