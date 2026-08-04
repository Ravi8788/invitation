import { cn } from "@/lib/utils";

/** Rim-lit couple silhouette for Save the Date section */
export function CoupleSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 480"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="silhouette-rim" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFB347" stopOpacity="0" />
          <stop offset="35%" stopColor="#FF8C42" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="65%" stopColor="#FF8C42" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="silhouette-glow" cx="50%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="300" cy="320" rx="220" ry="140" fill="url(#silhouette-glow)" />

      {/* Bride silhouette */}
      <g fill="#0a0505">
        <ellipse cx="220" cy="180" rx="42" ry="48" />
        <path d="M178 228 Q220 200 262 228 L280 400 Q220 430 160 400 Z" />
        <path d="M262 240 L310 380 L280 400 L262 228 Z" opacity="0.85" />
      </g>

      {/* Groom silhouette */}
      <g fill="#0a0505">
        <ellipse cx="380" cy="175" rx="40" ry="46" />
        <path d="M340 220 Q380 195 420 220 L435 395 Q380 420 325 395 Z" />
        <ellipse cx="380" cy="155" rx="36" ry="18" />
      </g>

      {/* Rim light edges */}
      <path
        d="M178 228 Q220 200 262 228"
        fill="none"
        stroke="url(#silhouette-rim)"
        strokeWidth="2"
        opacity="0.7"
      />
      <path
        d="M340 220 Q380 195 420 220"
        fill="none"
        stroke="url(#silhouette-rim)"
        strokeWidth="2"
        opacity="0.7"
      />
    </svg>
  );
}
