"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { isTouchDevice } from "@/lib/isTouchDevice";
import { cn } from "@/lib/utils";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button'], [data-cursor-hover]";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const dotEl = useRef<HTMLDivElement>(null);
  const ringEl = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (reduced || isTouchDevice()) return;

    const frame = requestAnimationFrame(() => setEnabled(true));
    document.body.classList.add("custom-cursor-active");

    const onMove = (event: MouseEvent) => {
      dotRef.current = { x: event.clientX, y: event.clientY };
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };

    const tick = () => {
      ringRef.current.x += (dotRef.current.x - ringRef.current.x) * 0.18;
      ringRef.current.y += (dotRef.current.y - ringRef.current.y) * 0.18;

      if (dotEl.current) {
        dotEl.current.style.left = `${dotRef.current.x}px`;
        dotEl.current.style.top = `${dotRef.current.y}px`;
      }
      if (ringEl.current) {
        ringEl.current.style.left = `${ringRef.current.x}px`;
        ringEl.current.style.top = `${ringRef.current.y}px`;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(frameRef.current);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[500]" aria-hidden="true">
      <div
        ref={ringEl}
        className={cn(
          "absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40",
          "bg-primary/5 shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-[transform,border-color] duration-300",
          hovering && "scale-150 border-primary/60"
        )}
      />
      <div
        ref={dotEl}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_rgba(212,175,55,0.8)]"
      />
    </div>
  );
}
