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
import { heroFrameUrl } from "@/lib/heroFrames";
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
 * Pinned cinematic hero — preloaded WebP frame sequence (no video seeking).
 */
export function PinnedVideoStory({ children, className, id }: PinnedVideoStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<VideoStoryContextValue>({ ready: false, isComplete: false });

  const reduced = useReducedMotion();
  const { isReady: scrollReady, isSmooth, lenisRef } = useLenisContext();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!section || !stage || !canvas || !overlay || !scrollReady) return;

    if (reduced) {
      section.dataset.heroReady = "true";
      placeholderRef.current?.remove();
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
      canvas,
      storyRoot,
      progressBar: progressRef.current,
      scrollHint: overlay.querySelector('[data-story-hint="true"]'),
      scroller: getScrollScroller(isSmooth),
      lenis: lenisRef.current,
      onReady: () => {
        if (cancelled) return;
        section.dataset.heroReady = "true";
        placeholderRef.current?.remove();
        contextRef.current.ready = true;
      },
      onCompleteChange: (complete) => {
        contextRef.current.isComplete = complete;
      },
    });

    void engine.init();

    return () => {
      cancelled = true;
      engine?.destroy();
    };
  }, [reduced, scrollReady, isSmooth]);

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
          className="hero-cinematic-stage relative h-[100svh] w-full overflow-hidden bg-[#0a0a0a]"
        >
          <canvas
            ref={canvasRef}
            className="hero-frame-canvas pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          />

          {/* Static poster while frames preload */}
          <div
            ref={placeholderRef}
            className="absolute inset-0 bg-onyx-dark"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroFrameUrl(0)}
              alt=""
              className="hero-frame-poster h-full w-full object-cover object-center opacity-100"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="hero-cinematic-overlay pointer-events-none absolute inset-0" aria-hidden />
          <div className="pointer-events-none absolute inset-0 z-10 bg-radial-vignette opacity-45" aria-hidden />

          <div ref={overlayRef} className="absolute inset-0 z-20">
            {children}
          </div>

          {!reduced ? (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-[#d4af37]/20"
              aria-hidden
            >
              <div
                ref={progressRef}
                className="hero-progress-bar h-full origin-left bg-gradient-to-r from-[#d4af37] to-[#b8935a]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          ) : null}
        </div>
      </section>
    </VideoStoryContext.Provider>
  );
}

export { VideoStoryContext };
