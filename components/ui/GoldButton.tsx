"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoldButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function GoldButton({
  children,
  onClick,
  href,
  className,
  disabled = false,
}: GoldButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const classes = cn(
    "relative inline-block overflow-hidden rounded-full px-10 py-4",
    "font-body text-sm font-medium uppercase tracking-[0.2em] text-text",
    "bg-gradient-to-r from-primary-dark via-primary to-primary-light",
    "shadow-[0_8px_32px_rgba(212,175,55,0.35),inset_0_1px_0_rgba(255,255,255,0.4)]",
    "transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(212,175,55,0.45)]",
    "disabled:cursor-not-allowed disabled:opacity-60",
    className
  );

  const addRipple = (event: MouseEvent<HTMLElement>) => {
    if (disabled) return;

    const rect = (href ? linkRef.current : buttonRef.current)?.getBoundingClientRect();
    if (rect) {
      const ripple: Ripple = {
        id: Date.now(),
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      setRipples((prev) => [...prev, ripple]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 700);
    }

    onClick?.();
  };

  const rippleLayer = ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="pointer-events-none absolute rounded-full bg-white/40 animate-[ripple_700ms_ease-out_forwards]"
      style={{
        left: ripple.x,
        top: ripple.y,
        width: 8,
        height: 8,
        transform: "translate(-50%, -50%)",
      }}
    />
  ));

  if (href) {
    return (
      <motion.a
        ref={linkRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={addRipple}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        <span className="relative z-10">{children}</span>
        {rippleLayer}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      disabled={disabled}
      onClick={addRipple}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={classes}
    >
      <span className="relative z-10">{children}</span>
      {rippleLayer}
    </motion.button>
  );
}
