import { cn } from "@/lib/utils";

/** Stylized varmala ceremony illustration for cinematic hero */
export function CoupleVarmala({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 520"
      className={cn("h-auto w-full max-w-md", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sherwani" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E6" />
          <stop offset="100%" stopColor="#D4C4A8" />
        </linearGradient>
        <linearGradient id="lehenga" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C41E3A" />
          <stop offset="100%" stopColor="#8B1528" />
        </linearGradient>
        <radialGradient id="couple-glow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FFB347" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="240" cy="280" rx="200" ry="180" fill="url(#couple-glow)" />

      {/* Groom */}
      <g transform="translate(248, 80)">
        <ellipse cx="0" cy="48" rx="38" ry="44" fill="#3D2A1F" />
        <path d="M-28 92 Q0 78 28 92 L32 200 Q0 220 -32 200 Z" fill="url(#sherwani)" />
        <path d="M-20 200 L-40 340 L40 340 L20 200 Z" fill="#E8DFC8" />
        <ellipse cx="0" cy="36" rx="32" ry="34" fill="#5C4030" />
        <path d="M-34 20 Q0 -8 34 20 L30 48 Q0 28 -30 48 Z" fill="#2A1810" />
        <path d="M-18 88 Q0 72 18 88" fill="none" stroke="#B8935A" strokeWidth="2" />
        {/* Turban */}
        <ellipse cx="0" cy="18" rx="28" ry="16" fill="#F5F0E6" />
        <rect x="-8" y="4" width="16" height="20" rx="4" fill="#D4B483" />
        {/* Garland */}
        <path
          d="M-30 100 Q-10 130 0 125 Q10 130 30 100"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="-20" cy="108" r="5" fill="#FF6B35" />
        <circle cx="0" cy="122" r="5" fill="#FFB347" />
        <circle cx="20" cy="108" r="5" fill="#FF6B35" />
      </g>

      {/* Bride */}
      <g transform="translate(168, 90)">
        <ellipse cx="0" cy="48" rx="36" ry="42" fill="#3D2A1F" />
        <path d="M-40 95 Q0 75 40 95 L50 280 Q0 310 -50 280 Z" fill="url(#lehenga)" />
        <ellipse cx="0" cy="36" rx="30" ry="32" fill="#5C4030" />
        <path d="M-32 18 Q0 -6 32 18 L28 44 Q0 24 -28 44 Z" fill="#1A0A08" />
        {/* Dupatta */}
        <path d="M30 60 Q80 100 70 200 L40 180 Q50 100 20 70 Z" fill="#E8A0A8" opacity="0.7" />
        {/* Raised arm with garland */}
        <path d="M38 95 Q70 60 85 45" fill="none" stroke="#5C4030" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M55 55 Q75 35 95 50"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="78" cy="42" r="4" fill="#FFB347" />
        <circle cx="92" cy="52" r="4" fill="#FF6B35" />
      </g>
    </svg>
  );
}
