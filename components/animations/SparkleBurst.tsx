"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SparkleBurstProps {
  active: boolean;
  onComplete?: () => void;
}

const SPARKLES = Array.from({ length: 28 }, (_, index) => {
  const angle = (index / 28) * Math.PI * 2;
  return {
    id: index,
    angle,
    distance: 70 + Math.random() * 50,
    size: 4 + Math.random() * 5,
    delay: Math.random() * 0.1,
  };
});

export function SparkleBurst({ active, onComplete }: SparkleBurstProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      onComplete?.();
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [active, onComplete, reduced]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-0 w-0"
      aria-hidden="true"
    >
      {SPARKLES.map((sparkle) => {
        const tx = Math.cos(sparkle.angle) * sparkle.distance;
        const ty = Math.sin(sparkle.angle) * sparkle.distance;

        return (
          <motion.span
            key={sparkle.id}
            className="absolute block rounded-full bg-primary-light shadow-[0_0_8px_rgba(184,147,90,0.75)]"
            style={{
              width: sparkle.size,
              height: sparkle.size,
              marginLeft: -sparkle.size / 2,
              marginTop: -sparkle.size / 2,
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: tx,
              y: ty,
              scale: [0, 1.2, 0.4],
            }}
            transition={{
              duration: 1.1,
              delay: sparkle.delay,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
