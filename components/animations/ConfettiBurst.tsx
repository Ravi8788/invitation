"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

interface ConfettiBurstProps {
  active: boolean;
  onComplete: () => void;
}

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  width: number;
  height: number;
  opacity: number;
}

const COLORS = [
  "#D4AF37",
  "#E8CD6D",
  "#A8841F",
  "#6B1E23",
  "#FFFDF8",
  "#C9A227",
];

export function ConfettiBurst({ active, onComplete }: ConfettiBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasRun = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      hasRun.current = false;
      return;
    }
    if (hasRun.current) return;
    hasRun.current = true;

    if (prefersReducedMotion()) {
      onComplete();
      return;
    }

    const startFrame = requestAnimationFrame(() => setVisible(true));

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      cancelAnimationFrame(startFrame);
      return;
    }

    let animationId = 0;
    let cancelled = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const originX = window.innerWidth / 2;
    const originY = window.innerHeight * 0.45;
    const pieces: ConfettiPiece[] = Array.from({ length: 120 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 12 + 4;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - Math.random() * 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        width: Math.random() * 8 + 4,
        height: Math.random() * 4 + 2,
        opacity: 1,
      };
    });

    let frame = 0;
    const maxFrames = 150;

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(startFrame);
      requestAnimationFrame(() => {
        setVisible(false);
        onComplete();
      });
    };

    const render = () => {
      if (cancelled) return;

      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const piece of pieces) {
        piece.vy += 0.18;
        piece.vx *= 0.99;
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rotation += piece.rotationSpeed;
        if (frame > maxFrames * 0.6) {
          piece.opacity = Math.max(0, piece.opacity - 0.02);
        }

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.globalAlpha = piece.opacity;
        ctx.fillStyle = piece.color;
        ctx.fillRect(
          -piece.width / 2,
          -piece.height / 2,
          piece.width,
          piece.height
        );
        ctx.restore();
      }

      if (frame < maxFrames) {
        animationId = requestAnimationFrame(render);
      } else {
        finish();
      }
    };

    animationId = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(startFrame);
      window.removeEventListener("resize", resize);
      setVisible(false);
    };
  }, [active, onComplete]);

  if (!active || !visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[200]"
      aria-hidden="true"
    />
  );
}
