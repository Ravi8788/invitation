"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { BG_MUSIC_SRC } from "@/lib/audio";

interface BackgroundMusicContextValue {
  audioRef: RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  hasSource: boolean;
  /** Call synchronously inside a user tap/click handler (required on iOS). */
  playFromGesture: () => void;
  play: () => Promise<boolean>;
  pause: () => void;
  toggle: () => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null);

export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSource, setHasSource] = useState(true);

  const playFromGesture = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !hasSource) return;

    audio.volume = 0.38;
    const attempt = audio.play();
    if (attempt !== undefined) {
      attempt
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [hasSource]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !hasSource) return false;

    try {
      audio.volume = 0.38;
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, [hasSource]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
      return;
    }
    playFromGesture();
  }, [isPlaying, pause, playFromGesture]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");
  }, []);

  const value = useMemo(
    () => ({ audioRef, isPlaying, hasSource, playFromGesture, play, pause, toggle }),
    [hasSource, isPlaying, pause, play, playFromGesture, toggle],
  );

  return (
    <BackgroundMusicContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={BG_MUSIC_SRC}
        loop
        preload="auto"
        playsInline
        className="pointer-events-none fixed h-0 w-0 opacity-0"
        aria-hidden
        onError={() => setHasSource(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic(): BackgroundMusicContextValue {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error("useBackgroundMusic must be used within BackgroundMusicProvider");
  }
  return context;
}
