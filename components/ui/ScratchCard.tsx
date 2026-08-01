"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScratchCardProps {
  className?: string;
  scratchLabel: React.ReactNode;
  revealThreshold?: number;
  onReveal?: () => void;
  children: React.ReactNode;
  /** "light" for ivory/warm sections; "maroon" for countdown on maroon bg */
  variant?: "light" | "maroon";
}

export function ScratchCard({
  className,
  scratchLabel,
  revealThreshold = 0.42,
  onReveal,
  children,
  variant = "light",
}: ScratchCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const scratchedRef = useRef(false);
  const isDrawingRef = useRef(false);
  const onMaroon = variant === "maroon";

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || scratchedRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent += 1;
    }

    const ratio = transparent / total;
    if (ratio >= revealThreshold) {
      scratchedRef.current = true;
      setRevealed(true);
      onReveal?.();
    }
  }, [onReveal, revealThreshold]);

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || scratchedRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx || scratchedRef.current) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#A8841F");
      gradient.addColorStop(0.35, "#D4AF37");
      gradient.addColorStop(0.65, "#F4D976");
      gradient.addColorStop(1, "#D4AF37");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!scratching) return;
    const interval = window.setInterval(checkReveal, 180);
    return () => window.clearInterval(interval);
  }, [scratching, checkReveal]);

  const handlePointerDown = (event: React.PointerEvent) => {
    if (revealed) return;
    isDrawingRef.current = true;
    setScratching(true);
    canvasRef.current?.setPointerCapture(event.pointerId);
    scratch(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!isDrawingRef.current || revealed) return;
    scratch(event.clientX, event.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    checkReveal();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border shadow-[0_12px_40px_rgba(122,30,43,0.12)]",
        onMaroon
          ? "border-primary/35 bg-bg shadow-[0_12px_40px_rgba(122,30,43,0.1)]"
          : "border-primary/30 bg-bg/90",
        className
      )}
    >
      <div className="relative z-0 p-8 text-center md:p-12">{children}</div>

      {!revealed ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 touch-none cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          aria-hidden="true"
        />
      ) : null}

      {!revealed ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-[11] flex flex-col items-center justify-center px-6 text-center",
            onMaroon ? "text-maroon" : "text-maroon-deep"
          )}
          aria-hidden="true"
        >
          {scratchLabel}
        </div>
      ) : null}
    </div>
  );
}
