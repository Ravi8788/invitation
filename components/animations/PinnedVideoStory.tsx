"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { useLenisContext } from "@/hooks/useLenisContext";
import { FrameVideoScrubber, waitForVideoReady } from "@/lib/videoScrubber";
import { buildHeroStoryTimeline, getScrollScroller, HERO_SCROLL_END } from "@/lib/heroStoryGsap";
import { enforceHeroSceneVisibility, hideAllHeroScenes } from "@/lib/heroSceneVisibility";
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
  src: string;
  children?: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Apple-style pinned scroll story — waits for Lenis/proxy, one master timeline, video scrub sync.
 */
export function PinnedVideoStory({ src, children, className, id }: PinnedVideoStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { isMobile } = useMotionSettings();
  const { isReady: scrollReady, isSmooth } = useLenisContext();

  const [ready, setReady] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const isCompleteRef = useRef(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!section || !pin || !video || !scrollReady) return;

    if (reduced) {
      video.pause();
      video.currentTime = 0;
      setReady(true);
      return;
    }

    let ctx: gsap.Context | undefined;
    let scrubber: FrameVideoScrubber | undefined;
    let cancelled = false;

    const scrollEnd = isMobile ? HERO_SCROLL_END.mobile : HERO_SCROLL_END.desktop;
    const scroller = getScrollScroller(isSmooth);
    const setProgressBar = progressBarRef.current
      ? gsap.quickSetter(progressBarRef.current, "scaleX")
      : null;

    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
    }

    const init = async () => {
      await waitForVideoReady(video);
      if (cancelled || !video.duration || Number.isNaN(video.duration)) return;

      video.pause();
      video.currentTime = 0;
      scrubber = new FrameVideoScrubber(video);

      const hintEl = overlayRef.current?.querySelector<HTMLElement>('[data-story-hint="true"]');
      const setHintOpacity = hintEl ? gsap.quickSetter(hintEl, "opacity") : null;
      const storyRoot = overlayRef.current?.querySelector<HTMLElement>("[data-hero-story-root]");

      if (!storyRoot) return;

      hideAllHeroScenes(storyRoot);
      const masterTimeline = buildHeroStoryTimeline(storyRoot);
      masterTimeline.progress(0);
      enforceHeroSceneVisibility(storyRoot, 0);

      ctx?.revert();
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: scrollEnd,
          pin,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scroller,
          animation: masterTimeline,
          onUpdate: (self) => {
            const progress = self.progress;
            enforceHeroSceneVisibility(storyRoot, progress);
            scrubber?.seekToProgress(progress);
            setProgressBar?.(progress);
            setHintOpacity?.(progress > 0.03 ? 0 : 1);

            const complete = progress >= 0.995;
            if (complete !== isCompleteRef.current) {
              isCompleteRef.current = complete;
              setIsComplete(complete);
            }
          },
        });
      }, section);

      ScrollTrigger.refresh();
      if (!cancelled) setReady(true);
    };

    void init();

    return () => {
      cancelled = true;
      scrubber?.destroy();
      ctx?.revert();
      setReady(false);
    };
  }, [reduced, isMobile, src, scrollReady, isSmooth]);

  return (
    <VideoStoryContext.Provider value={{ ready, isComplete }}>
      <section
        ref={sectionRef}
        id={id}
        data-hero-section="true"
        data-story-complete={isComplete ? "true" : "false"}
        className={cn("relative", className)}
        aria-label="Engagement invitation story"
      >
        <div ref={pinRef} className="relative h-[100dvh] h-[100svh] w-full overflow-hidden bg-twilight">
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            preload="auto"
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_38%]",
              ready ? "opacity-100" : "opacity-0",
            )}
            aria-hidden
          />

          {!ready ? (
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_30%,rgba(255,140,66,0.2),rgba(15,21,41,0.98)_68%)]"
              aria-hidden
            />
          ) : null}

          <div className="hero-video-overlay pointer-events-none absolute inset-0" aria-hidden />

          <div ref={overlayRef} className="absolute inset-0 z-20">
            {children}
          </div>

          {!reduced ? (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-0.5 bg-[#fdfbf7]/10"
              aria-hidden
            >
              <div
                ref={progressBarRef}
                className="h-full origin-left bg-gradient-to-r from-[#d4b483] to-[#b8935a] will-change-transform"
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
