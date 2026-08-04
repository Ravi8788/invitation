"use client";



import { useCallback, useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { WEDDING } from "@/lib/constants";

import { FloatingEmbers } from "@/components/animations/FloatingEmbers";

import { cn } from "@/lib/utils";



interface LoaderProps {

  onComplete: () => void;

}



const GOLD = "#D4B483";

const GOLD_LIGHT = "#E8CDA8";

const CREAM = "#FDFBF7";

const DARK = "#0a0810";



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

      className="h-full w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.5)]"

      preserveAspectRatio="xMidYMid meet"

      aria-hidden="true"

    >

      <defs>

        <linearGradient id="env-paper" x1="0%" y1="0%" x2="100%" y2="100%">

          <stop offset="0%" stopColor="#1a1420" />

          <stop offset="100%" stopColor="#120a14" />

        </linearGradient>

        <linearGradient id="env-flap" x1="0%" y1="0%" x2="0%" y2="100%">

          <stop offset="0%" stopColor="#221828" />

          <stop offset="100%" stopColor="#1a1020" />

        </linearGradient>

        <linearGradient id="env-gold" x1="0%" y1="0%" x2="100%" y2="0%">

          <stop offset="0%" stopColor={GOLD_LIGHT} />

          <stop offset="50%" stopColor={GOLD} />

          <stop offset="100%" stopColor={GOLD_LIGHT} />

        </linearGradient>

      </defs>



      <rect x="16" y="28" width="388" height="264" rx="10" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.35" />



      <rect x="24" y="100" width="372" height="184" rx="8" fill="url(#env-paper)" stroke={GOLD} strokeWidth="1.6" />



      <path d="M36 112 L52 112 L36 128 Z" fill={GOLD} opacity="0.35" />

      <path d="M384 112 L368 112 L384 128 Z" fill={GOLD} opacity="0.35" />



      <motion.g

        animate={{ y: letterVisible ? -36 : 6, opacity: letterVisible ? 1 : 0 }}

        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: letterVisible ? 0.08 : 0 }}

      >

        <rect x="68" y="122" width="284" height="128" rx="4" fill={DARK} stroke={GOLD} strokeWidth="0.9" opacity="0.95" />

        <line x1="108" y1="148" x2="312" y2="148" stroke="url(#env-gold)" strokeWidth="0.8" opacity="0.7" />

        <text x="210" y="188" textAnchor="middle" fill={CREAM} fontSize="26" fontFamily="Georgia, serif" letterSpacing="8">

          {WEDDING.couple.initials}

        </text>

        <text x="210" y="218" textAnchor="middle" fill={GOLD} fontSize="9" fontFamily="Georgia, serif" letterSpacing="3">

          ENGAGEMENT

        </text>

      </motion.g>



      <path d="M24 284 L210 205 L396 284" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.45" />



      <motion.g

        style={{ transformOrigin: "210px 100px", transformBox: "fill-box" as const }}

        animate={{ rotate: flapOpen ? -175 : 0 }}

        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}

      >

        <path d="M24 100 L210 205 L396 100 Z" fill="url(#env-flap)" stroke={GOLD} strokeWidth="1.5" />

      </motion.g>



      {!flapOpen ? (

        <path d="M24 205 L210 258 L396 205 L396 284 L24 284 Z" fill="#1a1020" fillOpacity="0.55" stroke={GOLD} strokeWidth="1" />

      ) : null}

    </svg>

  );

}



function WaxSeal({ broken, onTap, pulsing }: { broken: boolean; onTap: () => void; pulsing: boolean }) {

  const { initials } = WEDDING.couple;



  return (

    <motion.button

      type="button"

      onClick={(e) => { e.stopPropagation(); onTap(); }}

      disabled={broken}

      className="relative z-30 flex h-[clamp(4.25rem,12vw,5.5rem)] w-[clamp(4.25rem,12vw,5.5rem)] items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-default"

      aria-label="Tap the wax seal to open the invitation"

      animate={

        broken

          ? { scale: [1, 1.15, 0.6], rotate: [0, 10, -6], opacity: [1, 1, 0] }

          : pulsing ? { scale: [1, 1.06, 1] } : { scale: 1 }

      }

      transition={broken ? { duration: 0.55, ease: "easeInOut" } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}

    >

      <span

        className="absolute inset-0 rounded-full"

        style={{

          background: "radial-gradient(circle at 32% 26%, #9A2535 0%, #7A1E2B 45%, #5C1620 100%)",

          boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.15)",

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

    const timer = window.setTimeout(() => { setPhase("done"); onComplete(); }, exitMs);

    return () => window.clearTimeout(timer);

  }, [phase, onComplete, reduced]);



  if (phase === "done") return null;



  return (

    <motion.div

      className={cn("fixed inset-0 z-[150] flex flex-col bg-[#0a0810]", phase === "idle" && "cursor-pointer")}

      initial={false}

      onClick={phase === "idle" ? handleSealTap : undefined}

      animate={

        phase === "exit"

          ? { clipPath: reduced ? "inset(0 0 0 0)" : ["inset(0 0 0 0)", "inset(0 0 100% 0)"], opacity: reduced ? 0 : 1 }

          : { clipPath: "inset(0 0 0 0)", opacity: 1 }

      }

      transition={{ duration: reduced ? 0.35 : 0.55, ease: [0.76, 0, 0.24, 1] }}

    >

      <FloatingEmbers count={12} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(255,140,66,0.08),transparent_70%)]" aria-hidden />



      <div className="relative flex h-full min-h-[100dvh] flex-col items-center justify-between px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:py-12">

        <motion.p

          className="font-display shrink-0 text-[11px] uppercase tracking-[0.48em] text-gold-light/80 sm:text-xs"

          initial={{ opacity: 0, y: -6 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.35 }}

        >

          An Invitation Awaits

        </motion.p>



        <div className="relative flex w-full flex-1 flex-col items-center justify-center">

          <motion.div

            className="relative aspect-[21/16] w-[min(92vw,560px)]"

            animate={phase === "opening" ? { scale: [1, 1.02, 0.99], y: [0, -6, -10] } : { scale: 1, y: 0 }}

            transition={{ duration: 0.75, ease: "easeOut" }}

          >

            <EnvelopeGraphic flapOpen={flapOpen} letterVisible={letterVisible} />

            <div className="absolute left-1/2 top-[56%] z-30 -translate-x-1/2 -translate-y-1/2">

              <WaxSeal broken={sealBroken} onTap={handleSealTap} pulsing={phase === "idle" && !reduced} />

            </div>

          </motion.div>

        </div>



        <motion.p

          className="font-script shrink-0 text-xl text-gold-light/90 sm:text-2xl"

          animate={phase === "idle" && !reduced ? { opacity: [0.6, 1, 0.6] } : { opacity: phase === "idle" ? 0.85 : 0 }}

          transition={{ duration: 2, repeat: phase === "idle" ? Infinity : 0, ease: "easeInOut" }}

        >

          ✦ Tap the seal to begin ✦

        </motion.p>

      </div>

    </motion.div>

  );

}

