"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingHeartsProps {
  density?: number;
  className?: string;
}

interface Heart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  phase: number;
}

export function FloatingHearts({ density = 10, className }: FloatingHeartsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let hearts: Heart[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initHearts = () => {
      hearts = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 6 + 6,
        speedY: -(Math.random() * 0.25 + 0.08),
        speedX: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.25 + 0.12,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#7A1E2B";
      ctx.font = `${size}px serif`;
      ctx.fillText("♥", x, y);
      ctx.restore();
    };

    let start = performance.now();

    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw);
      if (document.hidden) return;

      const elapsed = (time - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      for (const heart of hearts) {
        heart.y += heart.speedY;
        heart.x += heart.speedX + Math.sin(elapsed + heart.phase) * 0.04;

        if (heart.y < -20) {
          heart.y = height + 20;
          heart.x = Math.random() * width;
        }
        if (heart.x > width + 20) heart.x = -20;
        if (heart.x < -20) heart.x = width + 20;

        drawHeart(heart.x, heart.y, heart.size, heart.opacity);
      }
    };

    resize();
    initHearts();
    animationId = requestAnimationFrame(draw);

    const observer = new ResizeObserver(() => {
      resize();
      initHearts();
    });
    const parent = canvas.parentElement;
    if (parent) observer.observe(parent);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [density, reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
