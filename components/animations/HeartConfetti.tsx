"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeartConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

const HEARTS = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  x: 8 + Math.random() * 84,
  delay: Math.random() * 0.35,
  size: 8 + Math.random() * 10,
  rotate: Math.random() * 40 - 20,
}));

export function HeartConfetti({ active, onComplete }: HeartConfettiProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [active, onComplete]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {HEARTS.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-maroon"
          style={{
            left: `${heart.x}%`,
            top: "35%",
            fontSize: heart.size,
          }}
          initial={{ opacity: 0, y: 0, rotate: heart.rotate }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, -80, 140],
            rotate: heart.rotate + 20,
          }}
          transition={{
            duration: 1.8,
            delay: heart.delay,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
