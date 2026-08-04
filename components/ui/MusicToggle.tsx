"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { cn } from "@/lib/utils";

export function MusicToggle() {
  const { ui } = WEDDING;
  const { isPlaying, hasSource, toggle } = useBackgroundMusic();
  const touchHandledRef = useRef(false);

  if (!hasSource) return null;

  return (
    <motion.button
      type="button"
      onPointerDown={(event) => {
        if (event.pointerType !== "touch") return;
        touchHandledRef.current = true;
        toggle();
      }}
      onClick={() => {
        if (touchHandledRef.current) {
          touchHandledRef.current = false;
          return;
        }
        toggle();
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.45 }}
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-[90]",
        "flex h-11 w-11 items-center justify-center rounded-full",
        "border border-gold/40 bg-onyx-dark/90 text-reel-gold-light shadow-lg backdrop-blur-sm",
        "transition-colors hover:border-gold/60 hover:bg-onyx-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
        !isPlaying && "animate-[pulse_2.4s_ease-in-out_infinite]",
      )}
      aria-label={isPlaying ? ui.music.pauseLabel : ui.music.playLabel}
      title={isPlaying ? ui.music.pauseLabel : ui.music.playLabel}
    >
      {isPlaying ? (
        <Music2 className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <VolumeX className="h-4 w-4" strokeWidth={1.5} />
      )}
    </motion.button>
  );
}
