"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

function DiyaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      className={cn("h-10 w-10 sm:h-12 sm:w-12", className)}
      aria-hidden="true"
    >
      <ellipse cx="24" cy="46" rx="14" ry="4" fill="rgba(184,147,90,0.25)" />
      <path
        d="M14 46 C14 36, 34 36, 34 46"
        stroke="#B8935A"
        strokeWidth="1.2"
        fill="rgba(253,251,247,0.5)"
      />
      <path d="M16 38 L32 38" stroke="#8A6A3D" strokeWidth="1" />
      <path
        d="M24 28 C26 22, 28 18, 24 12 C20 18, 22 22, 24 28"
        fill="#D4B483"
        opacity="0.9"
      />
      <path
        d="M24 12 C24 8, 22 6, 24 4 C26 6, 24 8, 24 12"
        fill="#E8C878"
        opacity="0.85"
      />
    </svg>
  );
}

const CORNERS = [
  { id: "tl", className: "left-4 top-24 sm:left-8 sm:top-28", drift: { x: [0, 4, 0], y: [0, 6, 0] } },
  { id: "tr", className: "right-4 top-24 sm:right-8 sm:top-28", drift: { x: [0, -4, 0], y: [0, 5, 0] } },
  { id: "bl", className: "bottom-16 left-4 sm:bottom-20 sm:left-8", drift: { x: [0, 3, 0], y: [0, -5, 0] } },
  { id: "br", className: "bottom-16 right-4 sm:bottom-20 sm:right-8", drift: { x: [0, -3, 0], y: [0, -4, 0] } },
];

export function CornerDiyas({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[60] hidden overflow-hidden md:block",
        className
      )}
      aria-hidden="true"
    >
      {CORNERS.map((corner) => (
        <motion.div
          key={corner.id}
          className={cn("absolute", corner.className)}
          animate={reduced ? {} : corner.drift}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-20 sm:w-20"
            style={{
              background:
                "radial-gradient(circle, rgba(232,168,88,0.35) 0%, rgba(184,147,90,0.12) 45%, transparent 70%)",
            }}
          />
          <DiyaIcon />
        </motion.div>
      ))}
    </div>
  );
}
