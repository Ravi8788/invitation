"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { preloadAssets } from "@/lib/preloadAssets";
import { TraditionalCornerMotifs } from "@/components/ui/TraditionalCornerMotifs";
import { GaneshaIcon } from "@/components/ui/GaneshaIcon";
import { cn } from "@/lib/utils";

interface GaneshaOpenerProps {
  onComplete: () => void;
}

/** Premium preloader — progress bar then Open Invitation (reference reel) */
export function GaneshaOpener({ onComplete }: GaneshaOpenerProps) {
  const reduced = useReducedMotion();
  const { couple, ui, weddingDate } = WEDDING;
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void preloadAssets((pct) => {
      if (!cancelled) setProgress(pct);
    }).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center overflow-hidden bg-onyx-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TraditionalCornerMotifs />

      <div className="relative z-10 flex max-w-md flex-col items-center px-6 text-center">
        <div className="relative mb-6 flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
          <svg
            className="absolute inset-0 h-full w-full animate-[spin_25s_linear_infinite] text-gold/30"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 3" />
          </svg>
          <GaneshaIcon className="relative z-10 h-36 w-36 sm:h-40 sm:w-40" />
        </div>

        <h2 className="hero-reel-gold font-serif mb-2 text-lg tracking-[0.3em] uppercase">
          || {ui.opener.ganeshaMantra} ||
        </h2>
        <p className="font-sans mb-8 text-[10px] tracking-[0.25em] text-white/50 uppercase">
          {couple.bride} & {couple.groom} • {ui.opener.eventTitle}
        </p>

        {!ready ? (
          <div className="flex flex-col items-center">
            <div className="relative mb-3 h-px w-64 overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold/50 via-gold to-gold-light shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="font-sans text-xs font-semibold tracking-widest text-reel-gold">{progress}%</div>
          </div>
        ) : (
          <motion.button
            type="button"
            onClick={onComplete}
            className={cn(
              "font-sans rounded-lg bg-gradient-to-r from-gold/80 to-gold px-8 py-3",
              "text-[10px] font-semibold tracking-[0.2em] text-onyx-dark uppercase",
              "shadow-lg transition-all duration-300 hover:from-gold hover:to-gold-dark hover:shadow-gold/20 active:scale-[0.98]",
            )}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={reduced ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {ui.opener.openButton}
          </motion.button>
        )}

        <p className="font-body mt-8 text-[10px] text-white/30">{weddingDate.display}</p>
      </div>
    </motion.div>
  );
}
