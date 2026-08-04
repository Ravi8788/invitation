import { cn } from "@/lib/utils";

interface OrnateArchProps {
  className?: string;
  /** "hero" = full mandap with pillars; "frame" = simpler photo frame */
  variant?: "hero" | "frame";
}

/** Ornate golden Indian arch — cinematic invitation reel style */
export function OrnateArch({ className, variant = "hero" }: OrnateArchProps) {
  if (variant === "frame") {
    return (
      <svg
        viewBox="0 0 800 900"
        className={cn("h-full w-full", className)}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="arch-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8CDA8" />
            <stop offset="35%" stopColor="#D4B483" />
            <stop offset="65%" stopColor="#B8935A" />
            <stop offset="100%" stopColor="#8A6A3D" />
          </linearGradient>
          <filter id="arch-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M80 860 L80 380 Q80 80 400 80 Q720 80 720 380 L720 860"
          fill="none"
          stroke="url(#arch-gold)"
          strokeWidth="3"
          filter="url(#arch-glow)"
          opacity="0.9"
        />
        <path
          d="M110 860 L110 400 Q110 120 400 120 Q690 120 690 400 L690 860"
          fill="none"
          stroke="url(#arch-gold)"
          strokeWidth="1.2"
          opacity="0.45"
        />
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 130 + i * 68;
          return (
            <path
              key={i}
              d={`M${x} 860 L${x} ${420 + (i % 2) * 20}`}
              stroke="url(#arch-gold)"
              strokeWidth="0.8"
              opacity="0.35"
            />
          );
        })}
        <ellipse cx="400" cy="78" rx="120" ry="28" fill="none" stroke="url(#arch-gold)" strokeWidth="2" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 800 920"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mandap-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0E0C0" />
          <stop offset="30%" stopColor="#D4B483" />
          <stop offset="70%" stopColor="#B8935A" />
          <stop offset="100%" stopColor="#7A5A2E" />
        </linearGradient>
        <filter id="mandap-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main arch — no side pillars (keeps content area clean) */}
      <path
        d="M72 900 L72 320 Q72 72 400 52 Q728 72 728 320 L728 900"
        fill="none"
        stroke="url(#mandap-gold)"
        strokeWidth="3.5"
        filter="url(#mandap-glow)"
      />
      <path
        d="M98 900 L98 340 Q98 108 400 92 Q702 108 702 340 L702 900"
        fill="none"
        stroke="url(#mandap-gold)"
        strokeWidth="1.2"
        opacity="0.4"
      />

      {/* Scalloped crown */}
      {Array.from({ length: 9 }).map((_, i) => {
        const cx = 148 + i * 63;
        return (
          <path
            key={i}
            d={`M${cx - 18} 108 Q${cx} 68 ${cx + 18} 108`}
            fill="none"
            stroke="url(#mandap-gold)"
            strokeWidth="1.1"
            opacity="0.55"
          />
        );
      })}

      {/* Inner lattice */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 7 }).map((__, col) => (
          <circle
            key={`${row}-${col}`}
            cx={168 + col * 66}
            cy={148 + row * 28}
            r="2.5"
            fill="url(#mandap-gold)"
            opacity={0.22 + (row % 2) * 0.12}
          />
        ))
      )}
    </svg>
  );
}
