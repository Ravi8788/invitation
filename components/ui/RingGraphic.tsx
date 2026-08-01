"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RingGraphicProps {
  className?: string;
  showBackgroundRings?: boolean;
}

function InterlockingRings({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 240 240"
        className="absolute h-[min(90vw,420px)] w-[min(90vw,420px)] opacity-[0.14]"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="102" cy="120" r="62" fill="none" stroke="#B8935A" strokeWidth="1.4" />
        <circle cx="138" cy="120" r="62" fill="none" stroke="#B8935A" strokeWidth="1.4" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 240 240"
        className="absolute h-[min(72vw,340px)] w-[min(72vw,340px)] opacity-[0.09]"
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="120" r="48" fill="none" stroke="#D4B483" strokeWidth="1" />
        <circle cx="140" cy="120" r="48" fill="none" stroke="#D4B483" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}

/** Premium gold line-art solitaire ring — 3/4 perspective */
export function RingGraphic({
  className,
  showBackgroundRings = true,
}: RingGraphicProps) {
  const reduced = useReducedMotion();
  const uid = "promise-ring";

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {showBackgroundRings ? <InterlockingRings reduced={!!reduced} /> : null}

      <svg
        viewBox="0 0 220 260"
        fill="none"
        className="relative z-10 h-[min(52vw,280px)] w-[min(44vw,220px)] drop-shadow-[0_20px_40px_rgba(138,106,61,0.2)] sm:h-72 sm:w-56"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-gold`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#F4D976" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A8841F" />
          </linearGradient>
          <linearGradient id={`${uid}-band`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#A8841F" />
            <stop offset="50%" stopColor="#F4D976" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
          <radialGradient id={`${uid}-diamond`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F4D976" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.25" />
          </radialGradient>
          <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Band — elliptical perspective */}
        <ellipse
          cx="110"
          cy="178"
          rx="72"
          ry="28"
          stroke={`url(#${uid}-band)`}
          strokeWidth="5"
          fill="none"
        />
        <path
          d="M38 178 C38 128, 182 128, 182 178 C182 210, 38 210, 38 178"
          stroke={`url(#${uid}-gold)`}
          strokeWidth="3"
          fill="rgba(168,132,31,0.08)"
        />
        <ellipse
          cx="110"
          cy="178"
          rx="58"
          ry="18"
          stroke="rgba(244,217,118,0.35)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Prongs & setting */}
        <path
          d="M88 148 L98 108 L110 98 L122 108 L132 148"
          stroke={`url(#${uid}-gold)`}
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="rgba(212,175,55,0.12)"
        />
        <path d="M98 108 L110 98 L122 108" stroke="#F4D976" strokeWidth="1.2" opacity="0.6" />
        <line x1="88" y1="148" x2="98" y2="108" stroke="#A8841F" strokeWidth="1.5" />
        <line x1="132" y1="148" x2="122" y2="108" stroke="#A8841F" strokeWidth="1.5" />
        <line x1="110" y1="98" x2="110" y2="82" stroke="#D4AF37" strokeWidth="1.8" />

        {/* Diamond */}
        <g filter={`url(#${uid}-glow)`}>
          <path
            d="M110 42 L138 78 L110 108 L82 78 Z"
            fill={`url(#${uid}-diamond)`}
            stroke={`url(#${uid}-gold)`}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M110 42 L110 108 M82 78 L138 78 M94 58 L126 98 M126 58 L94 98"
            stroke="rgba(255,253,249,0.55)"
            strokeWidth="0.8"
          />
          <path
            d="M110 42 L94 58 L110 78 L126 58 Z"
            fill="rgba(255,253,249,0.35)"
            stroke="none"
          />
        </g>

        {/* Band shine */}
        <path
          d="M52 168 Q110 152 168 168"
          stroke="rgba(255,253,249,0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
