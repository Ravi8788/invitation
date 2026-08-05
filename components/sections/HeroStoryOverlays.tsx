"use client";

import { memo } from "react";
import { useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { FOOTER_GANESHA_IMAGE } from "@/lib/images";
import { cn } from "@/lib/utils";

const SceneShell = memo(function SceneShell({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-hero-scene={id}
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-2.5 pt-[calc(2rem+env(safe-area-inset-top))] pb-[max(3.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-[calc(3.25rem+env(safe-area-inset-top))] sm:pb-[max(6rem,env(safe-area-inset-bottom))]"
    >
      <div className="hero-scene-inner w-full max-w-[21rem] sm:max-w-lg">{children}</div>
    </div>
  );
});

function HeroIntroLayer() {
  const { hero, ui } = WEDDING;
  const shlokaLines = hero.sanskrit?.split("\n").filter(Boolean) ?? [];

  return (
    <SceneShell id="1">
      <div className="flex flex-col items-center text-center">
        <div className="hero-ganesha-ring mb-3 sm:mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FOOTER_GANESHA_IMAGE}
            alt="श्री गणेश"
            data-scene-el
            className="hero-ganesha-icon"
            decoding="async"
          />
        </div>

        <p data-scene-el className="hero-reel-shloka-invocation hero-text-gold mb-3">
          ॥ {ui.opener.ganeshaMantra} ॥
        </p>

        {shlokaLines.length > 0 ? (
          <p data-scene-el className="hero-reel-shloka hero-text-white">
            {shlokaLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </SceneShell>
  );
}

function HeroBlessingsLayer() {
  const { ui } = WEDDING;
  const layer = ui.heroLayers.blessings;

  return (
    <SceneShell id="2">
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
        <p data-scene-line className="hero-reel-narrative hero-text-white">
          {layer.line1}
        </p>
        <p data-scene-line className="hero-reel-narrative hero-reel-narrative-accent hero-text-gold-line">
          {layer.line2}
        </p>
      </div>
    </SceneShell>
  );
}

function HeroJourneyLayer() {
  const { ui } = WEDDING;
  const lines = ui.heroLayers.journey.lines;

  return (
    <SceneShell id="3">
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
        {lines.map((line, index) => (
          <p
            key={line}
            data-scene-line
            className={cn(
              "hero-reel-narrative",
              index === lines.length - 1
                ? "hero-reel-narrative-accent hero-text-gold-line"
                : "hero-text-white",
            )}
          >
            {line}
          </p>
        ))}
      </div>
    </SceneShell>
  );
}

function HeroCoupleLayer() {
  const { couple, ui } = WEDDING;
  const layer = ui.heroLayers.couple;
  const eventGoldPhrase = "सुपारी व साखरपुडा";
  const [eventBefore = "", eventAfter = ""] = layer.eventTitle.split(eventGoldPhrase);

  return (
    <SceneShell id="4">
      <div className="hero-couple-stack">
        <p data-scene-el className="hero-couple-eyebrow">
          {ui.couple.eyebrow}
        </p>

        <h1
          data-scene-el
          className="hero-couple-names font-display"
        >
          <span className="hero-couple-name hero-text-white">{couple.bride}</span>
          <span className="hero-couple-amp hero-text-gold font-serif">&</span>
          <span className="hero-couple-name hero-text-white">{couple.groom}</span>
        </h1>

        <div data-scene-el className="hero-couple-divider" aria-hidden />

        <p data-scene-el className="hero-reel-event-title hero-couple-event">
          <span className="hero-text-white">{eventBefore}</span>
          <span className="hero-text-gold">{eventGoldPhrase}</span>
          <span className="hero-text-white">{eventAfter}</span>
        </p>
      </div>
    </SceneShell>
  );
}

const HeroScrollHint = memo(function HeroScrollHint() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      data-story-hint="true"
      className="pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-10 sm:gap-2.5"
    >
      <span className="hero-scroll-hint-label">{WEDDING.ui.opener.scrollHint}</span>
      <div className="hero-scroll-hint-mouse">
        <div className="hero-scroll-hint-dot hero-scroll-hint-bob" />
      </div>
    </div>
  );
});

export const HeroStoryOverlays = memo(function HeroStoryOverlays() {
  return (
    <div data-hero-story-root className="relative h-full w-full overflow-hidden">
      <HeroIntroLayer />
      <HeroBlessingsLayer />
      <HeroJourneyLayer />
      <HeroCoupleLayer />
      <HeroScrollHint />
    </div>
  );
});
