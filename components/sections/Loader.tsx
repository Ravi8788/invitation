"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LoaderProps {
  onComplete: () => void;
}

const MAROON = "#7A1E2B";
const MAROON_DEEP = "#5C1620";
const GOLD = "#B8935A";
const GOLD_LIGHT = "#D4B483";
const CREAM = "#FDFBF7";
const CREAM_WARM = "#F8F3EA";

function EnvelopeGraphic({
  flapOpen,
  letterVisible,
}: {
  flapOpen: boolean;
  letterVisible: boolean;
}) {
  return (
    <svg
      viewBox="0 0 420 320"
      className="h-full w-full drop-shadow-[0_24px_60px_rgba(122,30,43,0.18)]"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="env-paper" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={CREAM} />
          <stop offset="100%" stopColor={CREAM_WARM} />
        </linearGradient>
        <linearGradient id="env-flap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={CREAM} />
          <stop offset="100%" stopColor="#EDE4D4" />
        </linearGradient>
        <linearGradient id="env-gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={GOLD_LIGHT} />
          <stop offset="50%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_LIGHT} />
        </linearGradient>
      </defs>

      {/* Outer maroon frame */}
      <rect
        x="16"
        y="28"
        width="388"
        height="264"
        rx="10"
        fill="none"
        stroke={MAROON}
        strokeWidth="1.2"
        opacity="0.35"
      />

      {/* Envelope body */}
      <rect
        x="24"
        y="100"
        width="372"
        height="184"
        rx="8"
        fill="url(#env-paper)"
        stroke={GOLD}
        strokeWidth="1.6"
      />

      {/* Gold corner accents */}
      <path d="M36 112 L52 112 L36 128 Z" fill={GOLD} opacity="0.35" />
      <path d="M384 112 L368 112 L384 128 Z" fill={GOLD} opacity="0.35" />
      <path d="M36 272 L52 272 L36 256 Z" fill={GOLD} opacity="0.25" />
      <path d="M384 272 L368 272 L384 256 Z" fill={GOLD} opacity="0.25" />

      {/* Inner letter */}
      <motion.g
        animate={{
          y: letterVisible ? -36 : 6,
          opacity: letterVisible ? 1 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: letterVisible ? 0.08 : 0 }}
      >
        <rect
          x="68"
          y="122"
          width="284"
          height="128"
          rx="4"
          fill={CREAM}
          stroke={MAROON}
          strokeWidth="0.9"
          opacity="0.95"
        />
        <line x1="108" y1="148" x2="312" y2="148" stroke="url(#env-gold)" strokeWidth="0.8" opacity="0.7" />
        <text
          x="210"
          y="188"
          textAnchor="middle"
          fill={MAROON}
          fontSize="26"
          fontFamily="Georgia, serif"
          letterSpacing="8"
        >
          {WEDDING.couple.initials}
        </text>
        <text
          x="210"
          y="218"
          textAnchor="middle"
          fill={GOLD}
          fontSize="9"
          fontFamily="Georgia, serif"
          letterSpacing="4"
        >
          ENGAGEMENT
        </text>
      </motion.g>

      {/* Fold lines */}
      <path d="M24 284 L210 205 L396 284" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.45" />
      <path d="M24 100 L210 205 L396 100" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />

      {/* Top flap */}
      <motion.g
        style={{ transformOrigin: "210px 100px", transformBox: "fill-box" as const }}
        animate={{ rotate: flapOpen ? -175 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <path
          d="M24 100 L210 205 L396 100 Z"
          fill="url(#env-flap)"
          stroke={GOLD}
          strokeWidth="1.5"
        />
        <path
          d="M24 100 L210 205 L396 100"
          fill="none"
          stroke={MAROON}
          strokeWidth="0.5"
          opacity="0.2"
        />
      </motion.g>

      {/* Front pocket when closed */}
      {!flapOpen ? (
        <path
          d="M24 205 L210 258 L396 205 L396 284 L24 284 Z"
          fill={CREAM_WARM}
          fillOpacity="0.55"
          stroke={GOLD}
          strokeWidth="1"
        />
      ) : null}

      {/* Decorative maroon line art */}
      <g stroke={MAROON} strokeWidth="0.6" fill="none" opacity="0.2">
        <path d="M60 240 C90 215, 120 225, 150 205" />
        <path d="M360 240 C330 215, 300 225, 270 205" />
      </g>
    </svg>
  );
}

function WaxSeal({
  broken,
  onTap,
  pulsing,
}: {
  broken: boolean;
  onTap: () => void;
  pulsing: boolean;
}) {
  const { initials } = WEDDING.couple;

  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onTap();
      }}
      disabled={broken}
      className="relative z-30 flex h-[clamp(4.25rem,12vw,5.5rem)] w-[clamp(4.25rem,12vw,5.5rem)] items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-default"
      aria-label="Tap the wax seal to open the invitation"
      animate={
        broken
          ? { scale: [1, 1.15, 0.6], rotate: [0, 10, -6], opacity: [1, 1, 0] }
          : pulsing
            ? { scale: [1, 1.06, 1] }
            : { scale: 1 }
      }
      transition={
        broken
          ? { duration: 0.55, ease: "easeInOut" }
          : { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 26%, #9A2535 0%, ${MAROON} 45%, ${MAROON_DEEP} 100%)`,
          boxShadow: `0 8px 24px rgba(92,22,32,0.4), inset 0 2px 4px rgba(255,255,255,0.22)`,
        }}
      />
      <span className="absolute inset-1 rounded-full border border-[#D4B483]/40" />
      {broken ? (
        <>
          <span className="absolute h-[65%] w-0.5 rotate-45 rounded-full bg-[#3D1218]/55" />
          <span className="absolute h-[65%] w-0.5 -rotate-45 rounded-full bg-[#3D1218]/55" />
        </>
      ) : (
        <span className="relative font-display text-lg font-semibold tracking-[0.22em] text-[#FDFBF7] sm:text-xl">
          {initials}
        </span>
      )}
    </motion.button>
  );
}

export function Loader({ onComplete }: LoaderProps) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "opening" | "exit" | "done">("idle");
  const [sealBroken, setSealBroken] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);

  const handleSealTap = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("opening");
    setSealBroken(true);
    window.setTimeout(() => setFlapOpen(true), reduced ? 80 : 160);
    window.setTimeout(() => setLetterVisible(true), reduced ? 200 : 380);
    window.setTimeout(() => setPhase("exit"), reduced ? 450 : 750);
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== "exit") return;
    const exitMs = reduced ? 280 : 520;
    const timer = window.setTimeout(() => {
      setPhase("done");
      onComplete();
    }, exitMs);
    return () => window.clearTimeout(timer);
  }, [phase, onComplete, reduced]);

  if (phase === "done") return null;

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[150] flex flex-col bg-bg",
        phase === "idle" && "cursor-pointer"
      )}
      initial={false}
      onClick={phase === "idle" ? handleSealTap : undefined}
      animate={
        phase === "exit"
          ? {
              clipPath: reduced
                ? "inset(0 0 0 0)"
                : ["inset(0 0 0 0)", "inset(0 0 100% 0)"],
              opacity: reduced ? 0 : 1,
            }
          : { clipPath: "inset(0 0 0 0)", opacity: 1 }
      }
      transition={{
        duration: reduced ? 0.35 : 0.55,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(184,147,90,0.1),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative flex h-full min-h-[100dvh] flex-col items-center justify-between px-6 py-8 sm:py-12">
        <motion.p
          className="font-display shrink-0 text-[11px] uppercase tracking-[0.48em] text-maroon sm:text-xs"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          An Invitation Awaits
        </motion.p>

        <div className="relative flex w-full flex-1 flex-col items-center justify-center">
          <motion.div
            className="relative aspect-[21/16] w-[min(92vw,560px)]"
            animate={
              phase === "opening"
                ? { scale: [1, 1.02, 0.99], y: [0, -6, -10] }
                : { scale: 1, y: 0 }
            }
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <EnvelopeGraphic flapOpen={flapOpen} letterVisible={letterVisible} />

            <div className="absolute left-1/2 top-[56%] z-30 -translate-x-1/2 -translate-y-1/2">
              <WaxSeal
                broken={sealBroken}
                onTap={handleSealTap}
                pulsing={phase === "idle" && !reduced}
              />
            </div>
          </motion.div>
        </div>

        <motion.p
          className="font-script shrink-0 text-xl text-maroon sm:text-2xl"
          animate={
            phase === "idle" && !reduced
              ? { opacity: [0.6, 1, 0.6] }
              : { opacity: phase === "idle" ? 0.85 : 0 }
          }
          transition={{ duration: 2, repeat: phase === "idle" ? Infinity : 0, ease: "easeInOut" }}
        >
          ✦ Tap the seal to begin ✦
        </motion.p>
      </div>
    </motion.div>
  );
}
