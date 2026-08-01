"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FloatingPetalsProps {
  mouseX: number;
  mouseY: number;
  count?: number;
}

const PETAL_PATH =
  "M12 2C12 2 4 10 4 16C4 20 7.5 22 12 22C16.5 22 20 20 20 16C20 10 12 2 12 2Z";

export function FloatingPetals({
  mouseX,
  mouseY,
  count = 12,
}: FloatingPetalsProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (reduced) return null;

  // Keep transform at 0,0 until mounted so server HTML matches the client hydration pass.
  const parallaxX = mounted ? (mouseX - window.innerWidth / 2) * 0.015 : 0;
  const parallaxY = mounted ? (mouseY - window.innerHeight / 2) * 0.015 : 0;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        transition: "transform 0.6s ease-out",
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const left = `${(i * 17 + 8) % 95}%`;
        const top = `${(i * 23 + 5) % 90}%`;
        const size = 14 + (i % 4) * 6;
        const duration = 5 + (i % 5) * 1.2;
        const delay = i * 0.35;

        return (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className="absolute opacity-30"
            style={{ left, top }}
            initial={{ opacity: 0, y: 0, rotate: i * 30 }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              y: [0, -40, 80],
              x: [0, 20 + (i % 3) * 10, 40 + (i % 2) * 15],
              rotate: [i * 30, i * 30 + 45, i * 30 + 90],
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
              fill={i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#E8CD6D" : "#C9A227"}
            />
          </motion.svg>
        );
      })}
    </div>
  );
}
