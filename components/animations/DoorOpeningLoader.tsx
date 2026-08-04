"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { AmbientPetals } from "@/components/animations/AmbientPetals";
import { FloralFrame } from "@/components/ui/FloralFrame";
import { cn } from "@/lib/utils";

interface DoorOpeningLoaderProps {
  onComplete: () => void;
}

const GOLD = "#D4AF37";
const MAROON = "#6B0F1A";

function TempleDoors({ open }: { open: boolean }) {
  return (
    <div className="relative aspect-[3/4] w-[min(88vw,420px)]">
      <svg
        viewBox="0 0 360 480"
        className="h-full w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="door-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4D976" />
            <stop offset="50%" stopColor={GOLD} />
            <stop offset="100%" stopColor="#A8841F" />
          </linearGradient>
          <linearGradient id="door-panel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B1538" />
            <stop offset="100%" stopColor={MAROON} />
          </linearGradient>
        </defs>

        <path
          d="M24 440 L24 120 Q180 20 336 120 L336 440 Z"
          fill="none"
          stroke="url(#door-gold)"
          strokeWidth="3"
        />
        <path
          d="M40 430 L40 130 Q180 45 320 130 L320 430 Z"
          fill="#4A0812"
          stroke="url(#door-gold)"
          strokeWidth="1.5"
        />

        <motion.g
          style={{ transformOrigin: "40px 430px", transformBox: "fill-box" as const }}
          animate={{ rotate: open ? -78 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x="40" y="130" width="140" height="300" rx="4" fill="url(#door-panel)" stroke={GOLD} strokeWidth="1.2" />
          <circle cx="160" cy="280" r="8" fill="url(#door-gold)" />
          <path d="M70 170 L110 170 L90 210 Z" fill={GOLD} opacity="0.45" />
          <path d="M70 330 L110 330 L90 290 Z" fill={GOLD} opacity="0.45" />
        </motion.g>

        <motion.g
          style={{ transformOrigin: "320px 430px", transformBox: "fill-box" as const }}
          animate={{ rotate: open ? 78 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x="180" y="130" width="140" height="300" rx="4" fill="url(#door-panel)" stroke={GOLD} strokeWidth="1.2" />
          <circle cx="200" cy="280" r="8" fill="url(#door-gold)" />
          <path d="M250 170 L290 170 L270 210 Z" fill={GOLD} opacity="0.45" />
          <path d="M250 330 L290 330 L270 290 Z" fill={GOLD} opacity="0.45" />
        </motion.g>
      </svg>

      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.55, delay: open ? 0.35 : 0 }}
      >
        <p className="font-display text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] sm:text-[11px]">
          {WEDDING.ui.door.eventLabel}
        </p>
        <p className="font-script mt-3 text-[clamp(2rem,9vw,3.25rem)] leading-none text-[#FFF8F0]">
          {WEDDING.couple.bride}
        </p>
        <p className="font-display my-1 text-[10px] tracking-[0.4em] text-[#D4AF37]/90">
          आणि
        </p>
        <p className="font-script text-[clamp(2rem,9vw,3.25rem)] leading-none text-[#FFF8F0]">
          {WEDDING.couple.groom}
        </p>
      </motion.div>
    </div>
  );
}

export function DoorOpeningLoader({ onComplete }: DoorOpeningLoaderProps) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "opening" | "exit" | "done">("idle");
  const [doorsOpen, setDoorsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("opening");
    window.setTimeout(() => setDoorsOpen(true), reduced ? 60 : 120);
    window.setTimeout(() => setPhase("exit"), reduced ? 700 : 1200);
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== "exit") return;
    const timer = window.setTimeout(() => {
      setPhase("done");
      onComplete();
    }, reduced ? 320 : 580);
    return () => window.clearTimeout(timer);
  }, [phase, onComplete, reduced]);

  if (phase === "done") return null;

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[150] flex flex-col bg-[#4A0812]",
        phase === "idle" && "cursor-pointer",
      )}
      onClick={phase === "idle" ? handleOpen : undefined}
      animate={
        phase === "exit"
          ? {
              clipPath: reduced ? "inset(0 0 0 0)" : ["inset(0 0 0 0)", "inset(0 0 100% 0)"],
              opacity: reduced ? 0 : 1,
            }
          : { clipPath: "inset(0 0 0 0)", opacity: 1 }
      }
      transition={{ duration: reduced ? 0.35 : 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <AmbientPetals count={14} />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(212,175,55,0.12),transparent_70%)]"
        aria-hidden
      />

      <div className="relative flex h-full min-h-[100svh] flex-col items-center justify-between px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <motion.p
          className="font-display shrink-0 text-[11px] uppercase tracking-[0.4em] text-[#D4AF37]/85"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {WEDDING.ui.door.eyebrow}
        </motion.p>

        <FloralFrame bordered className="mx-auto w-[min(92vw,440px)]">
          <TempleDoors open={doorsOpen} />
        </FloralFrame>

        <motion.p
          className="font-body shrink-0 text-sm text-[#FFF8F0]/75 sm:text-base"
          animate={
            phase === "idle" && !reduced
              ? { opacity: [0.55, 1, 0.55] }
              : { opacity: phase === "idle" ? 0.8 : 0 }
          }
          transition={{ duration: 2, repeat: phase === "idle" ? Infinity : 0 }}
        >
          {WEDDING.ui.door.tapHint}
        </motion.p>
      </div>
    </motion.div>
  );
}
