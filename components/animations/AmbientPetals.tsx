"use client";

import { motion, useReducedMotion } from "framer-motion";

const PETAL_PATH =
  "M12 2C12 2 4 10 4 16C4 20 7.5 22 12 22C16.5 22 20 20 20 16C20 10 12 2 12 2Z";

interface AmbientPetalsProps {
  count?: number;
  className?: string;
}

/** Soft drifting petals — no mouse dependency, reel-style ambience */
export function AmbientPetals({ count = 10, className }: AmbientPetalsProps) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div
      className={className ?? "pointer-events-none absolute inset-0 overflow-hidden"}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const left = `${(i * 19 + 4) % 96}%`;
        const top = `${(i * 27 + 8) % 88}%`;
        const size = 12 + (i % 5) * 5;
        const duration = 6 + (i % 4) * 1.5;
        const delay = i * 0.4;

        return (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className="absolute opacity-25"
            style={{ left, top }}
            initial={{ opacity: 0, y: 0, rotate: i * 24 }}
            animate={{
              opacity: [0.12, 0.32, 0.12],
              y: [0, -50, 90],
              x: [0, 18 + (i % 3) * 8, 30 + (i % 2) * 12],
              rotate: [i * 24, i * 24 + 60, i * 24 + 120],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d={PETAL_PATH}
              fill={
                i % 3 === 0
                  ? "#D4B483"
                  : i % 3 === 1
                    ? "#E8CDA8"
                    : "#B8935A"
              }
            />
          </motion.svg>
        );
      })}
    </div>
  );
}
