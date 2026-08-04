"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function FlipDigit({
  value,
  size,
  ready,
}: {
  value: number;
  size: "sm" | "lg";
  ready: boolean;
}) {
  const reduced = useReducedMotion();
  const display = ready ? String(value).padStart(2, "0") : "00";
  const sizeClass =
    size === "sm"
      ? "text-2xl sm:text-3xl"
      : "text-4xl sm:text-5xl md:text-6xl";

  if (reduced || !ready) {
    return (
      <span className={cn("font-display tabular-nums text-ivory", sizeClass)}>
        {display}
      </span>
    );
  }

  return (
    <span className={cn("relative inline-flex h-[1.15em] overflow-hidden", sizeClass)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          className="font-display block tabular-nums text-ivory"
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
}: {
  label: string;
  value: number;
  size: "sm" | "lg";
  ready: boolean;
}) {
  const compact = size === "sm";

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border border-primary/25 bg-twilight/70 shadow-[0_8px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]",
        compact
          ? "min-w-0 flex-1 px-1.5 py-2 sm:min-w-[4rem] sm:px-3 sm:py-3"
          : "min-w-[4rem] flex-1 px-3 py-5 sm:min-w-[5.5rem] sm:px-6 sm:py-8"
      )}
    >
      <FlipDigit value={value} size={size} ready={ready} />
      <span
        className={cn(
          "font-body uppercase tracking-[0.22em] text-ivory/55",
          compact ? "mt-1 text-[8px] sm:text-[9px]" : "mt-3 text-[10px] sm:text-xs"
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function CountdownStrip({ className }: { className?: string }) {
  const countdown = useCountdown(WEDDING.weddingDate.iso);

  if (!countdown.isReady) {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <p className="font-display text-[9px] uppercase tracking-[0.35em] text-gold-light/75 sm:text-[10px]">
          Countdown to our engagement
        </p>
        <div className="grid w-full max-w-md grid-cols-4 gap-1.5 sm:max-w-lg sm:gap-2.5">
          {UNITS.map(({ key, label }) => (
            <CountdownUnit key={key} label={label} value={0} size="sm" ready={false} />
          ))}
        </div>
      </div>
    );
  }

  if (countdown.isComplete) {
    return (
      <p className={cn("font-script text-xl text-gold-gradient sm:text-2xl", className)}>
        The celebration begins today ✦
      </p>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <p className="font-display text-[9px] uppercase tracking-[0.35em] text-maroon/70 sm:text-[10px]">
        Countdown to our engagement
      </p>
      <div className="grid w-full max-w-md grid-cols-4 gap-1.5 sm:max-w-lg sm:gap-2.5">
        {UNITS.map(({ key, label }) => (
          <CountdownUnit key={key} label={label} value={countdown[key]} size="sm" ready />
        ))}
      </div>
    </div>
  );
}

export function CountdownGrid({
  className,
  showFireworks,
}: {
  className?: string;
  showFireworks?: boolean;
}) {
  const countdown = useCountdown(WEDDING.weddingDate.iso);

  if (!countdown.isReady) {
    return (
      <div
        className={cn(
          "relative z-20 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
          className
        )}
      >
        {UNITS.map(({ key, label }) => (
          <CountdownUnit key={key} label={label} value={0} size="lg" ready={false} />
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
          <div className="glass-cinematic rounded-2xl px-8 py-12">
            <p className="font-script text-3xl text-gold-gradient sm:text-4xl md:text-5xl">
              The Moment Has Arrived 🎉
            </p>
          </div>
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
            className
          )}
        >
          {UNITS.map(({ key, label }) => (
            <CountdownUnit key={key} label={label} value={countdown[key]} size="lg" ready />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
