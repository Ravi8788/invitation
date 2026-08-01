"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ParticlesFieldProps {
  density?: number;
  className?: string;
  /** When true, canvas fills the parent container instead of the viewport. */
  contained?: boolean;
  /** "up" for embers rising; "down" for gentle drift downward */
  direction?: "up" | "down";
}

export function ParticlesField({
  density = 28,
  className,
  contained = false,
  direction = "down",
}: ParticlesFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const enabled = !reducedMotion;
  const rise = direction === "up";

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let lastTime = 0;
    const targetFps = 60;
    const frameInterval = 1000 / targetFps;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const getBounds = () => {
      if (contained && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }
      return { width: window.innerWidth, height: window.innerHeight };
    };

    const resize = () => {
      const bounds = getBounds();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: rise
          ? -(Math.random() * 0.35 + 0.15)
          : Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.35 + 0.15,
      }));
    };

    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw);

      if (document.hidden) return;

      const delta = time - lastTime;
      if (delta < frameInterval) return;
      lastTime = time - (delta % frameInterval);

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (rise) {
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 147, 90, ${p.opacity})`;
        ctx.fill();
      }
    };

    const onResize = () => {
      resize();
      initParticles();
    };

    resize();
    initParticles();
    animationId = requestAnimationFrame(draw);

    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (!document.hidden) lastTime = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, enabled, contained, rise]);

  if (!enabled) return null;

  if (contained) {
    return (
      <div ref={containerRef} className={className}>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
