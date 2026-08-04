import { cn } from "@/lib/utils";

interface CoupleGarmentSwapProps {
  className?: string;
}

/** Couple illustration — garment fills animated via GSAP on scroll */
export function CoupleGarmentSwap({ className }: CoupleGarmentSwapProps) {
  return (
    <svg
      viewBox="0 0 480 520"
      className={cn("h-auto w-full max-w-[min(88vw,380px)]", className)}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="swap-glow-gradient" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#FFB347" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
        </radialGradient>
        <filter id="swap-shimmer">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        className="swap-glow"
        cx="240"
        cy="270"
        rx="190"
        ry="170"
        fill="url(#swap-glow-gradient)"
        opacity="0.15"
      />

      {/* Groom */}
      <g id="groom-group" transform="translate(248, 80)">
        <ellipse cx="0" cy="48" rx="38" ry="44" fill="#3D2A1F" />
        <path
          className="groom-garment"
          d="M-28 92 Q0 78 28 92 L32 200 Q0 220 -32 200 Z"
          fill="#F5F0E6"
        />
        <path className="groom-legs" d="M-20 200 L-40 340 L40 340 L20 200 Z" fill="#E8DFC8" />
        <ellipse cx="0" cy="36" rx="32" ry="34" fill="#5C4030" />
        <path className="groom-hair" d="M-34 20 Q0 -8 34 20 L30 48 Q0 28 -30 48 Z" fill="#2A1810" />
        <ellipse className="groom-turban" cx="0" cy="18" rx="28" ry="16" fill="#F5F0E6" />
        <rect className="groom-turban-accent" x="-8" y="4" width="16" height="20" rx="4" fill="#D4B483" />
        <path
          className="groom-garland"
          d="M-30 100 Q-10 130 0 125 Q10 130 30 100"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* Bride */}
      <g id="bride-group" transform="translate(168, 90)">
        <ellipse cx="0" cy="48" rx="36" ry="42" fill="#3D2A1F" />
        <path
          className="bride-garment"
          d="M-40 95 Q0 75 40 95 L50 280 Q0 310 -50 280 Z"
          fill="#C41E3A"
        />
        <ellipse cx="0" cy="36" rx="30" ry="32" fill="#5C4030" />
        <path className="bride-hair" d="M-32 18 Q0 -6 32 18 L28 44 Q0 24 -28 44 Z" fill="#1A0A08" />
        <path
          className="bride-dupatta"
          d="M30 60 Q80 100 70 200 L40 180 Q50 100 20 70 Z"
          fill="#E8A0A8"
          opacity="0.75"
        />
        <path
          className="bride-garland-arm"
          d="M55 55 Q75 35 95 50"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>

      {/* Mid-swap shimmer ring */}
      <circle
        className="swap-ring"
        cx="240"
        cy="260"
        r="120"
        fill="none"
        stroke="#D4B483"
        strokeWidth="1.5"
        opacity="0"
        filter="url(#swap-shimmer)"
      />
    </svg>
  );
}
