import { HERO_FRAME_COUNT, heroFrameUrl, type HeroFrameManifest } from "@/lib/heroFrames";

const PRELOAD_BATCH = 12;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  focusY = 0.42,
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
 * Canvas frame scrubber — pre-decoded images from final.mp4, no video seeking.
 */
export class FrameSequenceScrubber {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly frameCount: number;
  private readonly frames: Array<HTMLImageElement | undefined> = [];
  private currentIndex = -1;
  private dpr = 1;
  private destroyed = false;

  private constructor(canvas: HTMLCanvasElement, frameCount: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    })!;
    this.frameCount = frameCount;
    this.frames.length = frameCount;
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
    scrubber.resize();
    await scrubber.preloadFirstBatch(onProgress);
    scrubber.drawIndex(0);
    void scrubber.preloadRemaining(onProgress);
    return scrubber;
  }

  private loadFrame(index: number): Promise<HTMLImageElement> {
    const img = new Image();
    img.decoding = "async";
    img.src = heroFrameUrl(index);
    return img.decode().then(() => img);
  }

  private async preloadFirstBatch(onProgress?: (loaded: number, total: number) => void) {
    const end = Math.min(PRELOAD_BATCH, this.frameCount);
    const batch = await Promise.all(
      Array.from({ length: end }, (_, index) => this.loadFrame(index)),
    );
    for (let i = 0; i < batch.length; i += 1) {
      this.frames[i] = batch[i];
    }
    onProgress?.(batch.length, this.frameCount);
  }

  private async preloadRemaining(onProgress?: (loaded: number, total: number) => void) {
    let loaded = this.frames.filter(Boolean).length;
    for (let i = PRELOAD_BATCH; i < this.frameCount; i += PRELOAD_BATCH) {
      if (this.destroyed) return;
      const end = Math.min(i + PRELOAD_BATCH, this.frameCount);
      const batch = await Promise.all(
        Array.from({ length: end - i }, (_, j) => this.loadFrame(i + j)),
      );
      for (let j = 0; j < batch.length; j += 1) {
        this.frames[i + j] = batch[j];
      }
      loaded += batch.length;
      onProgress?.(loaded, this.frameCount);
      if (this.currentIndex >= 0) {
        this.drawIndex(this.currentIndex);
      }
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

  setProgress(progress: number) {
    const clamped = Math.min(1, Math.max(0, progress));
    const index = Math.min(
      this.frameCount - 1,
      Math.floor(clamped * (this.frameCount - 1) + 0.0001),
    );

    if (index === this.currentIndex) return;
    this.currentIndex = index;
    this.drawIndex(index);
  }

  private nearestLoaded(index: number): HTMLImageElement | undefined {
    if (this.frames[index]) return this.frames[index];
    for (let d = 1; d < this.frameCount; d += 1) {
      const before = index - d;
      const after = index + d;
      if (before >= 0 && this.frames[before]) return this.frames[before];
      if (after < this.frameCount && this.frames[after]) return this.frames[after];
    }
    return undefined;
  }

  private drawIndex(index: number) {
    const img = this.nearestLoaded(index);
    if (!img) return;
    const { width, height } = this.canvas;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, width, height);
    drawCover(this.ctx, img, width, height, 0.42);
  }

  destroy() {
    this.destroyed = true;
    this.frames.length = 0;
  }
}
