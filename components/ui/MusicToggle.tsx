"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio("/audio/bg-music.mp3");
      audio.loop = true;
      audio.volume = 0.35;
      audio.preload = "none";
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const toggle = async () => {
    const audio = getAudio();

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className={cn(
        "fixed bottom-6 left-6 z-[90] flex h-11 w-11 items-center justify-center rounded-full",
        "border border-primary/30 bg-twilight/85 text-gold-light shadow-lg backdrop-blur-md",
        "transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      )}
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
      title={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Music2 className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <VolumeX className="h-4 w-4" strokeWidth={1.5} />
      )}
    </motion.button>
  );
}
