"use client";

import { memo } from "react";
import { useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { scrollToSection } from "@/lib/scrollToSection";
import { FOOTER_GANESHA_IMAGE } from "@/lib/images";

const SceneShell = memo(function SceneShell({
  id,
  children,
  pointerEvents,
  backdrop,
}: {
  id: string;
  children: React.ReactNode;
  pointerEvents?: boolean;
  backdrop?: boolean;
}) {
  return (
    <div
      data-hero-scene={id}
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-4 pt-[calc(3rem+env(safe-area-inset-top))] pb-[max(5.5rem,env(safe-area-inset-bottom))] sm:px-6"
      style={{ pointerEvents: pointerEvents ? "auto" : undefined }}
    >
      <div
        className={
          backdrop
            ? "hero-scene-inner hero-reel-text-backdrop w-full max-w-4xl"
            : "hero-scene-inner w-full max-w-4xl"
        }
      >
        {children}
      </div>
    </div>
  );
});

function HeroIntroLayer() {
  const { couple, hero, ui } = WEDDING;
  return (
    <SceneShell id="1" backdrop>
      <div className="flex flex-col items-center text-center">
        <div className="relative mx-auto mb-3 flex h-32 w-32 items-center justify-center sm:mb-5 sm:h-36 sm:w-36 md:h-40 md:w-40">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.12)_0%,transparent_70%)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FOOTER_GANESHA_IMAGE}
            alt="श्री गणेश"
            data-scene-el
            className="relative z-10 h-full w-full object-contain"
            decoding="async"
          />
        </div>
        <span
          data-scene-el
          className="hero-reel-gold font-sans mb-3 text-xs tracking-[0.3em] uppercase sm:mb-4 sm:text-sm"
        >
          || {ui.opener.ganeshaMantra} ||
        </span>
        {hero.sanskrit ? (
          <p
            data-scene-el
            className="hero-reel-tagline font-serif mb-5 max-w-xl text-sm leading-relaxed tracking-wider sm:mb-8 sm:text-base md:text-lg"
          >
            {hero.sanskrit}
          </p>
        ) : null}
        <span
          data-scene-el
          className="hero-reel-muted font-sans mb-3 max-w-2xl px-2 text-center text-[10px] leading-relaxed tracking-[0.2em] uppercase sm:mb-4 sm:text-xs sm:tracking-[0.28em] md:text-sm"
        >
          {hero.eyebrow}
        </span>
        <h1
          data-scene-el
          className="hero-reel-heading font-display mb-3 flex w-full flex-col items-center justify-center text-[clamp(2rem,9vw,5rem)] font-semibold leading-none tracking-[0.12em] uppercase sm:mb-5 sm:flex-row md:text-7xl lg:text-8xl"
        >
          <span>{couple.bride}</span>
          <span className="hero-reel-accent font-serif px-2 py-1 text-[clamp(1.5rem,6vw,4rem)] font-normal italic sm:px-3 md:px-4">
            &
          </span>
          <span>{couple.groom}</span>
        </h1>
        <div data-scene-el className="mb-4 h-px w-20 bg-[var(--color-reel-gold)]/50 sm:mb-6 sm:w-24" />
        <p
          data-scene-el
          className="hero-reel-tagline font-serif max-w-2xl px-2 text-sm tracking-wide italic sm:text-lg md:text-2xl"
        >
          {hero.tagline}
        </p>
      </div>
    </SceneShell>
  );
}

function HeroTraditionLayer() {
  const { ui } = WEDDING;
  const layer = ui.heroLayers.tradition;
  return (
    <SceneShell id="2" backdrop>
      <div className="flex flex-col items-center px-2 text-center">
        <h2
          data-scene-heading
          className="hero-reel-heading font-display text-[clamp(1.65rem,6vw,3.75rem)] font-semibold leading-tight tracking-wide uppercase"
        >
          {layer.titlePrefix}{" "}
          <span className="hero-reel-accent font-serif italic">{layer.titleAccent}</span>
        </h2>
        <p
          data-scene-line
          className="hero-reel-muted font-sans mt-6 max-w-3xl text-sm leading-loose tracking-wider sm:mt-8 sm:text-lg md:text-xl"
        >
          {layer.body}
        </p>
        <p
          data-scene-tagline
          className="hero-reel-gold font-serif mt-6 text-base tracking-[0.2em] uppercase sm:mt-8 sm:text-2xl md:text-3xl"
        >
          {layer.tagline}
        </p>
      </div>
    </SceneShell>
  );
}

function HeroMuhuratLayer() {
  const { weddingDate, venue, ui, events } = WEDDING;
  const layer = ui.heroLayers.muhurat;
  const event = events[0];

  return (
    <SceneShell id="3" backdrop>
      <div className="flex flex-col items-center text-center">
        <span
          data-scene-eyebrow
          className="hero-reel-gold font-sans mb-3 text-xs font-semibold tracking-[0.4em] uppercase sm:mb-4 sm:text-sm"
        >
          {layer.eyebrow}
        </span>
        <h2
          data-scene-heading
          className="hero-reel-heading font-display mb-6 text-[clamp(1.5rem,5.5vw,3.25rem)] font-semibold leading-snug tracking-wide uppercase sm:mb-10 md:text-5xl"
        >
          {weddingDate.date}
        </h2>

        <div className="mx-auto mb-6 grid w-full max-w-sm grid-cols-1 gap-3 sm:mb-10">
          <div
            data-scene-schedule
            className="flex flex-col items-center justify-center rounded-2xl border border-reel-gold bg-black/55 p-4 text-center shadow-lg backdrop-blur-md sm:p-6"
          >
            <span className="hero-reel-gold mb-1 block text-[9px] font-semibold tracking-widest uppercase sm:text-xs">
              {event.name}
            </span>
            <span className="hero-reel-white text-xs font-bold whitespace-nowrap sm:text-lg md:text-xl">
              {event.time}
            </span>
          </div>
        </div>

        <div data-scene-venue-block className="font-sans text-sm tracking-wider sm:text-base">
          <span className="hero-reel-gold mb-1 block text-xs font-semibold tracking-widest uppercase sm:text-sm">
            {layer.venueLabel}
          </span>
          <span className="hero-reel-white mt-1 text-base font-bold uppercase sm:text-xl md:text-2xl">
            {venue.name}
          </span>
          <span className="hero-reel-gold mt-2 block text-xs sm:text-sm">{venue.city}</span>
        </div>
      </div>
    </SceneShell>
  );
}

function HeroCelebrationLayer() {
  const { ui } = WEDDING;
  const layer = ui.heroLayers.celebration;
  return (
    <SceneShell id="4" pointerEvents>
      <div className="flex w-full justify-center px-1">
        <div
          data-scene-card
          className="w-full max-w-xl rounded-3xl border border-reel-gold bg-black/75 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-10 md:p-12"
        >
          <span
            data-scene-el
            className="hero-reel-gold font-sans mb-3 block text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
          >
            {layer.eyebrow}
          </span>
          <h3
            data-scene-el
            className="hero-reel-heading font-display mb-4 text-2xl font-semibold tracking-wider uppercase sm:mb-6 sm:text-3xl md:text-4xl"
          >
            {layer.title}
          </h3>
          <p
            data-scene-el
            className="hero-reel-muted font-sans mb-6 text-xs leading-relaxed tracking-wider sm:mb-8 sm:text-sm"
          >
            {layer.body}
          </p>
          <button
            type="button"
            data-scene-el
            onClick={() => scrollToSection("#countdown")}
            className="reel-open-btn pointer-events-auto w-full py-4 text-xs font-bold tracking-[0.2em] uppercase sm:py-5 sm:text-sm"
          >
            {layer.cta}
          </button>
        </div>
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
      className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-10"
    >
      <span className="hero-reel-muted font-sans text-[9px] tracking-[0.3em] uppercase">
        {WEDDING.ui.opener.scrollHint}
      </span>
      <div className="relative flex h-8 w-5 justify-center rounded-full border border-white/40 p-1">
        <div className="h-2 w-1 animate-bounce rounded-full bg-[#d4af37]" />
      </div>
    </div>
  );
});

export const HeroStoryOverlays = memo(function HeroStoryOverlays() {
  return (
    <div data-hero-story-root className="relative h-full w-full overflow-hidden">
      <HeroIntroLayer />
      <HeroTraditionLayer />
      <HeroMuhuratLayer />
      <HeroCelebrationLayer />
      <HeroScrollHint />
    </div>
  );
});
