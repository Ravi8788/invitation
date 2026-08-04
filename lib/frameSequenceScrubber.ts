import { HERO_FRAME_COUNT, heroFrameUrl, type HeroFrameManifest } from "@/lib/heroFrames";

const PRELOAD_BATCH = 12;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  focusY = 0.4,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;

  const ir = iw / ih;
  const cr = cw / ch;
  let sw: number;
  let sh: number;
  let sx: number;
  let sy: number;

  if (ir > cr) {
    sh = ih;
    sw = sh * cr;
    sx = (iw - sw) * 0.5;
    sy = (ih - sh) * Math.max(0, Math.min(1, focusY - 0.5));
  } else {
    sw = iw;
    sh = sw / cr;
    sx = (iw - sw) * 0.5;
    sy = (ih - sh) * Math.max(0, Math.min(1, focusY - 0.5));
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

/**
 * Canvas frame scrubber — pre-decoded images, no video seeking.
 * Updates only when the frame index changes; draw runs inside rAF.
 */
export class FrameSequenceScrubber {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly frameCount: number;
  private readonly frames: HTMLImageElement[] = [];
  private currentIndex = -1;
  private dpr = 1;

  private constructor(canvas: HTMLCanvasElement, frameCount: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    })!;
    this.frameCount = frameCount;
  }

  static async create(
    canvas: HTMLCanvasElement,
    manifest: HeroFrameManifest = {
      frameCount: HERO_FRAME_COUNT,
      fps: 15,
      width: 960,
      format: "webp",
      basePath: "/videos/hero-frames",
      pattern: "frame-%04d.webp",
    },
    onProgress?: (loaded: number, total: number) => void,
  ): Promise<FrameSequenceScrubber> {
    const scrubber = new FrameSequenceScrubber(canvas, manifest.frameCount);
    await scrubber.preload(onProgress);
    scrubber.resize();
    scrubber.drawIndex(0);
    return scrubber;
  }

  private async preload(onProgress?: (loaded: number, total: number) => void) {
    const total = this.frameCount;
    for (let i = 0; i < total; i += PRELOAD_BATCH) {
      const end = Math.min(i + PRELOAD_BATCH, total);
      const batch = await Promise.all(
        Array.from({ length: end - i }, async (_, j) => {
          const index = i + j;
          const img = new Image();
          img.decoding = "async";
          img.src = heroFrameUrl(index);
          await img.decode();
          return img;
        }),
      );
      this.frames.push(...batch);
      onProgress?.(this.frames.length, total);
    }
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const pw = Math.round(w * this.dpr);
    const ph = Math.round(h * this.dpr);

    if (this.canvas.width !== pw || this.canvas.height !== ph) {
      this.canvas.width = pw;
      this.canvas.height = ph;
      this.canvas.style.width = `${w}px`;
      this.canvas.style.height = `${h}px`;
      if (this.currentIndex >= 0) {
        this.drawIndex(this.currentIndex);
      }
    }
  }

  /** Set progress — draw only when frame index changes (caller batches via rAF). */
  setProgress(progress: number) {
    const index = Math.min(
      this.frameCount - 1,
      Math.max(0, Math.round(progress * (this.frameCount - 1))),
    );

    if (index === this.currentIndex) return;
    this.currentIndex = index;
    this.drawIndex(index);
  }

  private drawIndex(index: number) {
    const img = this.frames[index];
    if (!img) return;
    const { width, height } = this.canvas;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, width, height);
    drawCover(this.ctx, img, width, height, 0.4);
  }

  destroy() {
    this.frames.length = 0;
  }
}
