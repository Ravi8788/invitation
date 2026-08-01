"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

interface FireworksCanvasProps {
  active: boolean;
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
  exploded: boolean;
}

const FIREWORK_COLORS = [
  "#D4AF37",
  "#E8CD6D",
  "#A8841F",
  "#C9A227",
  "#6B1E23",
  "#FFFDF8",
];

export function FireworksCanvas({ active, onComplete }: FireworksCanvasProps) {
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
    let rocketInterval = 0;
    let cancelled = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    let frame = 0;
    const maxFrames = 240;

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(animationId);
      clearInterval(rocketInterval);
      cancelAnimationFrame(startFrame);
      requestAnimationFrame(() => {
        setVisible(false);
        onComplete();
      });
    };

    const spawnRocket = () => {
      rockets.push({
        x: Math.random() * canvas.width * 0.6 + canvas.width * 0.2,
        y: canvas.height,
        vy: -(Math.random() * 4 + 8),
        targetY: Math.random() * canvas.height * 0.35 + canvas.height * 0.1,
        color:
          FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]!,
        exploded: false,
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const count = 40 + Math.floor(Math.random() * 20);
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = Math.random() * 4 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          color,
          size: Math.random() * 2 + 1,
        });
      }
    };

    spawnRocket();
    rocketInterval = window.setInterval(() => {
      if (frame < maxFrames * 0.7) spawnRocket();
    }, 400);

    const render = () => {
      if (cancelled) return;

      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const rocket of rockets) {
        if (!rocket.exploded) {
          rocket.y += rocket.vy;
          ctx.beginPath();
          ctx.arc(rocket.x, rocket.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = rocket.color;
          ctx.fill();

          if (rocket.y <= rocket.targetY) {
            rocket.exploded = true;
            explode(rocket.x, rocket.y, rocket.color);
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i]!;
        p.life += 1;
        p.vy += 0.04;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
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
      clearInterval(rocketInterval);
      window.removeEventListener("resize", resize);
      setVisible(false);
    };
  }, [active, onComplete]);

  if (!active || !visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
