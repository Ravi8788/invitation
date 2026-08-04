import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildHeroStoryTimeline, initHeroStoryElements } from "@/lib/heroStoryGsap";
import { HERO_SCROLL_END } from "@/lib/heroStoryScenes";
import { createHeroSceneController, getScrollScroller } from "@/lib/heroSceneVisibility";
import { FrameSequenceScrubber } from "@/lib/frameSequenceScrubber";

export interface HeroScrollEngineConfig {
  section: HTMLElement;
  stage: HTMLElement;
  canvas: HTMLCanvasElement;
  storyRoot: HTMLElement;
  progressBar: HTMLElement | null;
  scrollHint: HTMLElement | null;
  scroller: HTMLElement | Window;
  onReady: () => void;
  onCompleteChange?: (complete: boolean) => void;
}

/**
 * Single ScrollTrigger + master timeline + rAF-batched frame/visibility updates.
 * No React state on the scroll path.
 */
export class HeroScrollEngine {
  private readonly config: HeroScrollEngineConfig;
  private ctx?: gsap.Context;
  private scrubber?: FrameSequenceScrubber;
  private scrollTrigger?: ScrollTrigger;
  private sceneController?: ReturnType<typeof createHeroSceneController>;
  private setBar: ((value: number) => void) | null = null;
  private setHint: ((value: number) => void) | null = null;
  private pendingProgress = -1;
  private rafId = 0;
  private complete = false;
  private resizeObserver?: ResizeObserver;

  constructor(config: HeroScrollEngineConfig) {
    this.config = config;
  }

  async init() {
    const { section, stage, canvas, storyRoot, progressBar, scrollHint, scroller, onReady } =
      this.config;

    this.sceneController = createHeroSceneController(storyRoot);
    this.sceneController.hideAll();
    initHeroStoryElements(storyRoot);

    const master = buildHeroStoryTimeline(storyRoot);
    master.progress(0);
    this.sceneController.setProgress(0);

    this.setBar = progressBar
      ? (gsap.quickSetter(progressBar, "scaleX") as (value: number) => void)
      : null;
    this.setHint = scrollHint
      ? (gsap.quickSetter(scrollHint, "opacity") as (value: number) => void)
      : null;

    this.scrubber = await FrameSequenceScrubber.create(canvas);

    this.resizeObserver = new ResizeObserver(() => {
      this.scrubber?.resize();
    });
    this.resizeObserver.observe(stage);

    this.ctx = gsap.context(() => {
      this.scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: HERO_SCROLL_END,
        pin: stage,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        scroller,
        animation: master,
        onUpdate: (self) => {
          this.queueProgress(self.progress);
        },
      });
    }, section);

    ScrollTrigger.refresh();
    onReady();
  }

  /** Coalesce scroll-driven DOM work into one rAF — never seek video. */
  private queueProgress(progress: number) {
    this.pendingProgress = progress;
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => this.flush());
    }
  }

  private flush() {
    this.rafId = 0;
    const progress = this.pendingProgress;
    if (progress < 0) return;

    this.sceneController?.setProgress(progress);
    this.scrubber?.setProgress(progress);
    this.setBar?.(progress);
    this.setHint?.(progress > 0.02 ? 0 : 1);

    const done = progress >= 0.998;
    if (done !== this.complete) {
      this.complete = done;
      this.config.section.dataset.storyComplete = done ? "true" : "false";
      this.config.onCompleteChange?.(done);
    }
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.resizeObserver?.disconnect();
    this.scrubber?.destroy();
    this.ctx?.revert();
    this.scrollTrigger = undefined;
  }
}

export { getScrollScroller };
