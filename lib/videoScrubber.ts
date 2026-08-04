/** Frame-aligned HTML5 video scrubbing — avoids seek spam on every scroll event */

const DEFAULT_FPS = 24;
const MIN_SEEK_DELTA = 1 / DEFAULT_FPS - 0.001;

export function waitForVideoReady(video: HTMLVideoElement): Promise<void> {
  if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = () => {
      video.removeEventListener("canplaythrough", finish);
      video.removeEventListener("loadeddata", finish);
      video.removeEventListener("error", finish);
      resolve();
    };

    video.addEventListener("canplaythrough", finish, { once: true });
    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    video.load();
  });
}

export class FrameVideoScrubber {
  private readonly video: HTMLVideoElement;
  private readonly frameDuration: number;
  private lastSeekTime = -1;
  private rafId = 0;
  private pendingProgress = -1;

  constructor(video: HTMLVideoElement, fps = DEFAULT_FPS) {
    this.video = video;
    this.frameDuration = 1 / fps;
  }

  seekToProgress(progress: number) {
    this.pendingProgress = progress;
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => this.flush());
    }
  }

  private flush() {
    this.rafId = 0;
    const progress = this.pendingProgress;
    if (progress < 0) return;

    const duration = this.video.duration;
    if (!duration || Number.isNaN(duration)) return;

    const maxTime = Math.max(duration - this.frameDuration, 0);
    const rawTime = progress * duration;
    const frameIndex = Math.round(rawTime / this.frameDuration);
    const snappedTime = Math.min(frameIndex * this.frameDuration, maxTime);

    if (
      this.lastSeekTime >= 0 &&
      Math.abs(snappedTime - this.lastSeekTime) < MIN_SEEK_DELTA
    ) {
      return;
    }

    if (Math.abs(this.video.currentTime - snappedTime) >= MIN_SEEK_DELTA * 0.5) {
      this.video.currentTime = snappedTime;
    }

    this.lastSeekTime = snappedTime;
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.pendingProgress = -1;
    this.lastSeekTime = -1;
  }
}
