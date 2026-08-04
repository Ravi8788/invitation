"use client";

import { memo } from "react";
import { useReducedMotion } from "framer-motion";
import { Mouse } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { HERO_STORY_SCENES } from "@/lib/heroStoryScenes";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

function SplitLetters({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className="hero-letter inline-block" aria-hidden>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function SceneLines({ lines }: { lines: readonly string[] }) {
  return (
    <div className="space-y-1 sm:space-y-1.5">
      {lines.map((line) => (
        <p key={line} data-scene-line className="hero-scene-subtitle font-body text-sm sm:text-base">
          {line}
        </p>
      ))}
    </div>
  );
}

function HeroParticles() {
  const dots = [
    { top: "18%", left: "14%", delay: "0s" },
    { top: "28%", left: "78%", delay: "0.6s" },
    { top: "62%", left: "22%", delay: "1.1s" },
    { top: "48%", left: "68%", delay: "0.3s" },
  ];
  return (
    <div data-hero-particles className="hero-particles pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="hero-particle absolute h-1 w-1 rounded-full bg-[#d4af37]"
          style={{ top: d.top, left: d.left, animationDelay: d.delay }}
        />
      ))}
    </div>
  );
}

const SceneShell = memo(function SceneShell({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div
      data-hero-scene={id}
      className="hero-scene pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-4 pt-[calc(4rem+env(safe-area-inset-top))] pb-[max(4rem,env(safe-area-inset-bottom))] sm:px-8"
    >
      <div className="hero-scene-inner">{children}</div>
    </div>
  );
});

const HeroScene = memo(function HeroScene({ scene }: { scene: (typeof HERO_STORY_SCENES)[number] }) {
  if ("isCouple" in scene && scene.isCouple) {
    return (
      <SceneShell id={scene.id}>
        <div data-scene-shimmer className="hero-couple-shimmer pointer-events-none absolute inset-0 opacity-0" aria-hidden />
        <div className="relative text-center">
          <p data-scene-bride className="font-script text-[clamp(2.75rem,11vw,4.5rem)] leading-none text-[#fdfbf7]">
            {scene.bride}
          </p>
          <p
            data-scene-with
            className="font-display my-2 text-[10px] uppercase tracking-[0.45em] text-[#d4af37] sm:text-[11px]"
          >
            with
          </p>
          <p data-scene-groom className="font-script text-[clamp(2.75rem,11vw,4.5rem)] leading-none text-[#fdfbf7]">
            {scene.groom}
          </p>
          <div className="mt-6">
            <SceneLines lines={scene.subtitleLines} />
          </div>
        </div>
      </SceneShell>
    );
  }

  if ("isSaveDate" in scene && scene.isSaveDate) {
    return (
      <SceneShell id={scene.id}>
        <div className="text-center">
          <h2 data-scene-heading className="hero-scene-heading font-display text-[clamp(1.25rem,5vw,2rem)] font-semibold uppercase tracking-[0.12em] text-[#fdfbf7]">
            {scene.heading}
          </h2>
          <p
            data-scene-date
            className="hero-scene-date font-display mt-5 text-[clamp(1.35rem,5.5vw,2.35rem)] font-semibold tracking-[0.06em] text-[#d4af37] sm:mt-6 [perspective:800px]"
          >
            {scene.date}
          </p>
          <div
            data-scene-divider
            className="mx-auto mt-4 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#d4af37] to-transparent sm:mt-5 sm:w-32"
          />
          <p
            data-scene-time
            className="font-body mt-4 text-xs uppercase tracking-[0.28em] text-[#fdfbf7]/90 sm:text-sm"
          >
            {scene.time}
          </p>
        </div>
      </SceneShell>
    );
  }

  if ("isVenue" in scene && scene.isVenue) {
    return (
      <SceneShell id={scene.id}>
        <div className="text-center">
          <h2 data-scene-heading className="hero-scene-heading font-display text-[clamp(1.25rem,5vw,2rem)] font-semibold uppercase tracking-[0.12em] text-[#fdfbf7]">
            {scene.heading}
          </h2>
          <p
            data-scene-venue-name
            className="font-display mt-5 text-xl text-[#d4af37] sm:mt-6 sm:text-2xl"
          >
            {scene.venueName}
          </p>
          <p data-scene-venue-city className="font-body mt-2 text-base text-[#fdfbf7]/85 sm:text-lg">
            {scene.venueCity}
          </p>
          <button
            type="button"
            data-scene-cta
            onClick={() => scrollToSection("#save-the-date")}
            className="hero-cta btn-gold-cinematic pointer-events-auto relative mt-8 min-h-11 px-8 py-2.5 text-[10px] uppercase tracking-[0.22em] sm:text-[11px]"
          >
            {scene.cta}
          </button>
        </div>
      </SceneShell>
    );
  }

  if ("isFinale" in scene && scene.isFinale) {
    return (
      <SceneShell id={scene.id}>
        <div className="max-w-lg text-center">
          <h2 data-scene-heading className="hero-scene-heading font-display text-[clamp(1.15rem,4.5vw,1.85rem)] font-semibold uppercase leading-snug tracking-[0.1em] text-[#fdfbf7]">
            {scene.heading}
          </h2>
          <div className="mt-5">
            <SceneLines lines={scene.subtitleLines} />
          </div>
          <button
            type="button"
            data-scene-cta
            onClick={() => scrollToSection("#save-the-date")}
            className="hero-cta btn-gold-cinematic pointer-events-auto relative mt-8 min-h-11 w-full max-w-xs px-8 py-2.5 text-[10px] uppercase tracking-[0.22em] sm:w-auto sm:text-[11px]"
          >
            {scene.cta}
          </button>
        </div>
      </SceneShell>
    );
  }

  if ("subtitleLines" in scene && scene.subtitleLines && "heading" in scene) {
    return (
      <SceneShell id={scene.id}>
        <div className="text-center">
          <h2 data-scene-heading className="hero-scene-heading font-display text-[clamp(1.15rem,4.8vw,2rem)] font-semibold uppercase leading-snug tracking-[0.1em] text-[#fdfbf7]">
            {scene.heading}
          </h2>
          {"id" in scene && scene.id === "2" ? (
            <div
              data-scene-divider
              className="mx-auto mt-4 h-px w-20 origin-center bg-gradient-to-r from-transparent via-[#d4af37] to-transparent sm:w-28"
            />
          ) : null}
          <div className="mt-5">
            <SceneLines lines={scene.subtitleLines} />
          </div>
        </div>
      </SceneShell>
    );
  }

  const s = scene as { id: string; eyebrow?: string; heading: string; subtitle: string };
  return (
    <SceneShell id={s.id}>
      <div className="text-center">
        {s.eyebrow ? (
          <p
            data-scene-eyebrow
            className="font-display text-[9px] uppercase tracking-[0.38em] text-[#d4af37] sm:text-[10px] sm:tracking-[0.42em]"
          >
            ◆&nbsp;{s.eyebrow}&nbsp;◆
          </p>
        ) : null}
        <h2
          data-scene-heading-wrap
          className="hero-scene-heading mt-4 font-display text-[clamp(1.25rem,5vw,2.1rem)] font-semibold uppercase leading-snug tracking-[0.1em] text-[#fdfbf7] sm:mt-5"
        >
          <SplitLetters text={s.heading} />
        </h2>
        <p data-scene-subtitle className={cn("hero-scene-subtitle font-body mt-5 text-sm sm:text-base")}>
          {s.subtitle}
        </p>
      </div>
    </SceneShell>
  );
});

const HeroScrollHint = memo(function HeroScrollHint() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      data-story-hint="true"
      className="pointer-events-none absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-30 -translate-x-1/2"
    >
      <div className="hero-scroll-hint-bob flex flex-col items-center gap-1 text-[#fdfbf7]/50">
        <span className="font-body text-[7px] uppercase tracking-[0.3em] sm:text-[8px]">
          {WEDDING.hero.scrollHint ?? "Scroll to begin"}
        </span>
        <Mouse className="h-3 w-3" strokeWidth={1.5} />
      </div>
    </div>
  );
});

const ReducedHero = memo(function ReducedHero() {
  const finale = HERO_STORY_SCENES[6];
  return (
    <div className="flex h-full items-center justify-center px-4 pt-16">
      <div className="hero-scene-inner max-w-lg text-center">
        <h1 className="font-display text-xl font-semibold uppercase tracking-[0.1em] text-[#fdfbf7] sm:text-2xl">
          {finale.heading}
        </h1>
        <button
          type="button"
          onClick={() => scrollToSection("#save-the-date")}
          className="btn-gold-cinematic mt-8 min-h-11 px-8 py-2.5 text-[10px] uppercase tracking-[0.22em]"
        >
          {finale.cta}
        </button>
      </div>
    </div>
  );
});

export const HeroStoryOverlays = memo(function HeroStoryOverlays() {
  const reduced = useReducedMotion();
  if (reduced) return <ReducedHero />;

  return (
    <div data-hero-story-root className="relative h-full w-full overflow-hidden">
      <div
        data-hero-glow
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(70vw,420px)] w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22)_0%,transparent_68%)] blur-2xl"
        aria-hidden
      />
      <HeroParticles />
      {HERO_STORY_SCENES.map((scene) => (
        <HeroScene key={scene.id} scene={scene} />
      ))}
      <HeroScrollHint />
    </div>
  );
});
