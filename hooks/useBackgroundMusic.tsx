"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BG_MUSIC_SRC } from "@/lib/audio";

interface BackgroundMusicContextValue {
  isPlaying: boolean;
  hasSource: boolean;
  play: () => Promise<boolean>;
  pause: () => void;
  toggle: () => Promise<void>;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null);

export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSource, setHasSource] = useState(true);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(BG_MUSIC_SRC);
      audio.loop = true;
      audio.volume = 0.38;
      audio.preload = "metadata";
      audio.addEventListener("error", () => setHasSource(false));
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const play = useCallback(async () => {
    if (!hasSource) return false;

    try {
      const audio = getAudio();
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, [getAudio, hasSource]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
      return;
    }
    await play();
  }, [isPlaying, pause, play]);

  const value = useMemo(
    () => ({ isPlaying, hasSource, play, pause, toggle }),
    [hasSource, isPlaying, pause, play, toggle],
  );

  return (
    <BackgroundMusicContext.Provider value={value}>{children}</BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic(): BackgroundMusicContextValue {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error("useBackgroundMusic must be used within BackgroundMusicProvider");
  }
  return context;
}
