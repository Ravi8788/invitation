"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

const UNITS = [
  { key: "days", label: WEDDING.ui.countdown.units.days },
  { key: "hours", label: WEDDING.ui.countdown.units.hours },
  { key: "minutes", label: WEDDING.ui.countdown.units.minutes },
  { key: "seconds", label: WEDDING.ui.countdown.units.seconds },
] as const;

function FlipDigit({
  value,
  size,
  ready,
  light,
}: {
  value: number;
  size: "sm" | "lg";
  ready: boolean;
  light?: boolean;
}) {
  const reduced = useReducedMotion();
  const display = ready ? String(value).padStart(2, "0") : "00";
  const sizeClass =
    size === "sm" ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl md:text-6xl";
  const color = light ? "text-maroon" : "text-ivory";

  if (reduced || !ready) {
    return (
      <span className={cn("font-display tabular-nums", color, sizeClass)}>
        {display}
      </span>
    );
  }

  return (
    <span className={cn("relative inline-flex h-[1.15em] overflow-hidden", sizeClass)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          className={cn("font-display block tabular-nums", color)}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountdownUnit({
  label,
  value,
  size,
  ready,
  light,
}: {
  label: string;
  value: number;
  size: "sm" | "lg";
  ready: boolean;
  light?: boolean;
}) {
  const compact = size === "sm";

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border shadow-[0_8px_24px_rgba(122,30,43,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]",
        light
          ? "border-primary/30 bg-ivory/90"
          : "border-primary/25 bg-twilight/70 shadow-[0_8px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]",
        compact
          ? "min-w-0 flex-1 px-1.5 py-2 sm:min-w-[4rem] sm:px-3 sm:py-3"
          : "min-w-[4rem] flex-1 px-3 py-5 sm:min-w-[5.5rem] sm:px-6 sm:py-8",
      )}
    >
      <FlipDigit value={value} size={size} ready={ready} light={light} />
      <span
        className={cn(
          "font-body tracking-[0.12em]",
          light ? "text-maroon/55" : "text-ivory/55",
          compact ? "mt-1 text-[8px] sm:text-[9px]" : "mt-3 text-[10px] sm:text-xs",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function CountdownGrid({
  className,
  showFireworks,
  light = true,
}: {
  className?: string;
  showFireworks?: boolean;
  light?: boolean;
}) {
  const countdown = useCountdown(WEDDING.weddingDate.iso);

  if (!countdown.isReady) {
    return (
      <div
        className={cn(
          "relative z-20 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
          className,
        )}
      >
        {UNITS.map(({ key, label }) => (
          <CountdownUnit key={key} label={label} value={0} size="lg" ready={false} light={light} />
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {countdown.isComplete ? (
        <motion.div
          key="arrived"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={cn("relative z-20 py-4 text-center", className)}
        >
          <p className="font-display text-2xl text-foil sm:text-3xl md:text-4xl">
            {WEDDING.ui.countdown.completeMessage} 🎉
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="timer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            "relative z-20 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
            showFireworks && "opacity-85",
            className,
          )}
        >
          {UNITS.map(({ key, label }) => (
            <CountdownUnit
              key={key}
              label={label}
              value={countdown[key]}
              size="lg"
              ready
              light={light}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
