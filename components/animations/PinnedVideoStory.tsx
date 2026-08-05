"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useLenisContext } from "@/hooks/useLenisContext";
import { HeroScrollEngine } from "@/lib/heroScrollEngine";
import { getScrollScroller } from "@/lib/heroSceneVisibility";
import { HERO_BG_IMAGE } from "@/lib/images";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface VideoStoryContextValue {
  ready: boolean;
  isComplete: boolean;
}

const VideoStoryContext = createContext<VideoStoryContextValue>({
  ready: false,
  isComplete: false,
});

export function useVideoStoryProgress() {
  return useContext(VideoStoryContext);
}

interface PinnedVideoStoryProps {
  children?: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Pinned cinematic hero — static background image with scroll-driven text scenes.
 */
export function PinnedVideoStory({ children, className, id }: PinnedVideoStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<VideoStoryContextValue>({ ready: false, isComplete: false });

  const reduced = useReducedMotion();
  const { isReady: scrollReady, isSmooth, lenisRef } = useLenisContext();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    if (!section || !stage || !overlay || !scrollReady) return;

    if (reduced) {
      section.dataset.heroReady = "true";
      contextRef.current.ready = true;
      return;
    }

    const storyRoot = overlay.querySelector<HTMLElement>("[data-hero-story-root]");
    if (!storyRoot) return;

    let cancelled = false;
    let engine: HeroScrollEngine | undefined;

    engine = new HeroScrollEngine({
      section,
      stage,
      storyRoot,
      progressBar: progressRef.current,
      scrollHint: overlay.querySelector('[data-story-hint="true"]'),
      scroller: getScrollScroller(isSmooth),
      lenis: lenisRef.current,
      onReady: () => {
        if (cancelled) return;
        section.dataset.heroReady = "true";
        contextRef.current.ready = true;
      },
      onCompleteChange: (complete) => {
        contextRef.current.isComplete = complete;
      },
    });

    engine.init();

    return () => {
      cancelled = true;
      engine?.destroy();
    };
  }, [reduced, scrollReady, isSmooth, lenisRef]);

  return (
    <VideoStoryContext.Provider value={contextRef.current}>
      <section
        ref={sectionRef}
        id={id ?? "animation-viewport"}
        data-hero-section="true"
        data-story-complete="false"
        className={cn("relative", className)}
        aria-label="Engagement cinematic story"
      >
        <div
          ref={stageRef}
          className="hero-cinematic-stage relative h-[100svh] w-full overflow-hidden bg-[#1a0808]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="hero-bg-wrap" aria-hidden>
            <img
              src={HERO_BG_IMAGE}
              alt=""
              className="hero-bg-image pointer-events-none absolute inset-0"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
            />
          </div>

          <div className="hero-cinematic-warm-wash pointer-events-none absolute inset-0" aria-hidden />
          <div className="hero-cinematic-clarity pointer-events-none absolute inset-0" aria-hidden />
          <div className="hero-cinematic-overlay pointer-events-none absolute inset-0" aria-hidden />
          <div className="hero-cinematic-vignette pointer-events-none absolute inset-0" aria-hidden />
          <div className="hero-cinematic-frame pointer-events-none absolute inset-0" aria-hidden />

          <div ref={overlayRef} className="absolute inset-0 z-20">
            {children}
          </div>

          {!reduced ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30" aria-hidden>
              <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />
              <div className="h-[2px] bg-[#0a0a0a]/40">
                <div
                  ref={progressRef}
                  className="hero-progress-bar h-full origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </VideoStoryContext.Provider>
  );
}

export { VideoStoryContext };
