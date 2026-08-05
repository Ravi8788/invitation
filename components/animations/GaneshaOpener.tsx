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
  const { couple, ui } = WEDDING;
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
      className="opener-screen fixed inset-0 z-[150] flex flex-col items-center justify-center overflow-hidden bg-onyx-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TraditionalCornerMotifs />

      <div className="opener-content relative z-10 flex w-full max-w-sm flex-col items-center px-5 text-center sm:max-w-md sm:px-6">
        <div className="opener-ganesha-wrap relative mb-5 flex items-center justify-center sm:mb-6">
          <svg
            className="absolute inset-0 h-full w-full animate-[spin_25s_linear_infinite] text-gold/25"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 3" />
          </svg>
          <GaneshaIcon className="relative z-10 h-full w-full" />
        </div>

        <h2 className="opener-mantra">
          ॥ {ui.opener.ganeshaMantra} ॥
        </h2>

        <p className="opener-names">
          {couple.bride} <span className="opener-amp">&</span> {couple.groom}
        </p>
        <p className="opener-event">{ui.opener.eventTitle}</p>

        <div className="opener-divider" aria-hidden />

        {!ready ? (
          <div className="opener-progress flex w-full max-w-[14rem] flex-col items-center sm:max-w-xs">
            <div className="relative mb-2 h-px w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold/50 via-gold to-gold-light shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="font-sans text-[11px] font-semibold tracking-widest text-reel-gold">{progress}%</div>
          </div>
        ) : (
          <motion.button
            type="button"
            onClick={onComplete}
            className={cn(
              "opener-open-btn font-sans w-full max-w-[14rem] rounded-lg bg-gradient-to-r from-gold/85 to-gold px-6 py-3",
              "text-[10px] font-semibold tracking-[0.18em] text-onyx-dark uppercase sm:max-w-xs sm:px-8",
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
      </div>
    </motion.div>
  );
}
