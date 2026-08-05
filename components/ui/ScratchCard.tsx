"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScratchCardProps {
  className?: string;
  scratchLabel?: React.ReactNode;
  revealThreshold?: number;
  onReveal?: () => void;
  children: React.ReactNode;
  variant?: "light" | "maroon" | "coral" | "date";
  compact?: boolean;
}

function paintCoralScratch(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#f6efe6";
  ctx.fillRect(0, 0, width, height);

  const blobs = [
    { x: 0.18, y: 0.22, rx: 0.34, ry: 0.28, color: "rgba(255, 198, 186, 0.72)" },
    { x: 0.72, y: 0.18, rx: 0.28, ry: 0.22, color: "rgba(255, 214, 204, 0.65)" },
    { x: 0.55, y: 0.58, rx: 0.38, ry: 0.3, color: "rgba(244, 180, 168, 0.58)" },
    { x: 0.22, y: 0.72, rx: 0.3, ry: 0.24, color: "rgba(255, 225, 216, 0.7)" },
  ];

  for (const blob of blobs) {
    ctx.fillStyle = blob.color;
    ctx.beginPath();
    ctx.ellipse(
      width * blob.x,
      height * blob.y,
      width * blob.rx,
      height * blob.ry,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.fillRect(0, height * 0.78, width, height * 0.22);

  ctx.fillStyle = "rgba(139, 58, 58, 0.45)";
  ctx.font = `600 ${Math.max(9, width * 0.055)}px Montserrat, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SCRATCH", width / 2, height * 0.9);
}

function paintScratchLayer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  variant: ScratchCardProps["variant"],
) {
  if (variant === "coral") {
    paintCoralScratch(ctx, width, height);
    return;
  }

  if (variant === "date" || variant === "maroon") {
    paintGold(ctx, width, height);
    return;
  }

  paintGold(ctx, width, height);
}

function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

function paintGold(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#A8841F");
  gradient.addColorStop(0.35, "#D4AF37");
  gradient.addColorStop(0.65, "#F4D976");
  gradient.addColorStop(1, "#D4AF37");
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

type LenisWindow = Window & { __lenis?: { stop: () => void; start: () => void } };

export function ScratchCard({
  className,
  scratchLabel,
  revealThreshold = 0.42,
  onReveal,
  children,
  variant = "maroon",
  compact = false,
}: ScratchCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const scratchedRef = useRef(false);
  const isDrawingRef = useRef(false);
  const hasStartedRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastHeightRef = useRef(0);
  const onMaroon = variant === "maroon";
  const onCoral = variant === "coral";
  const onDate = variant === "date";
  const mobile = isCoarsePointer();
  const threshold = mobile ? 0.28 : revealThreshold;
  const brushRadius = mobile ? 58 : 28;

  const pausePageScroll = useCallback(() => {
    (window as LenisWindow).__lenis?.stop();
    document.body.style.overflow = "hidden";
  }, []);

  const resumePageScroll = useCallback(() => {
    (window as LenisWindow).__lenis?.start();
    document.body.style.overflow = "";
  }, []);

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || scratchedRef.current) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent += 1;
    }

    const ratio = transparent / total;
    if (ratio >= threshold) {
      scratchedRef.current = true;
      setRevealed(true);
      setScratching(false);
      isDrawingRef.current = false;
      lastPointRef.current = null;
      resumePageScroll();
      onReveal?.();
    }
  }, [onReveal, resumePageScroll, threshold]);

  const scratchAt = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || scratchedRef.current) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      hasStartedRef.current = true;
      ctx.globalCompositeOperation = "destination-out";

      const last = lastPointRef.current;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const distance = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(distance / (brushRadius * 0.4)));

        for (let i = 0; i <= steps; i += 1) {
          const t = i / steps;
          const px = last.x + dx * t;
          const py = last.y + dy * t;
          ctx.beginPath();
          ctx.arc(px, py, brushRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      lastPointRef.current = { x, y };
    },
    [brushRadius],
  );

  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || scratchedRef.current) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = ((clientX - rect.left) / rect.width) * canvas.width;
      const y = ((clientY - rect.top) / rect.height) * canvas.height;
      scratchAt(x, y);
    },
    [scratchAt],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      if (scratchedRef.current) return;

      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      // Ignore mobile browser chrome resize mid-scratch
      if (hasStartedRef.current && Math.abs(height - lastHeightRef.current) < 80) return;
      lastHeightRef.current = height;

      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintScratchLayer(ctx, width, height, variant);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [mobile, variant]);

  useEffect(() => {
    if (!scratching) return;
    const interval = window.setInterval(checkReveal, 100);
    return () => window.clearInterval(interval);
  }, [scratching, checkReveal]);

  const beginStroke = useCallback(
    (clientX: number, clientY: number) => {
      if (scratchedRef.current || revealed) return;
      isDrawingRef.current = true;
      setScratching(true);
      lastPointRef.current = null;
      pausePageScroll();
      scratch(clientX, clientY);
    },
    [pausePageScroll, revealed, scratch],
  );

  const moveStroke = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDrawingRef.current || scratchedRef.current) return;
      scratch(clientX, clientY);
    },
    [scratch],
  );

  const endStroke = useCallback(() => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    setScratching(false);
    resumePageScroll();
    checkReveal();
  }, [checkReveal, resumePageScroll]);

  // Native touch handlers — reliable on iOS / Android
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const onTouchStart = (event: TouchEvent) => {
      if (scratchedRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      const touch = event.changedTouches[0] ?? event.touches[0];
      if (!touch) return;
      beginStroke(touch.clientX, touch.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isDrawingRef.current || scratchedRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      const touch = event.touches[0];
      if (!touch) return;
      moveStroke(touch.clientX, touch.clientY);
    };

    const onTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      endStroke();
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", onTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
      resumePageScroll();
    };
  }, [beginStroke, endStroke, moveStroke, revealed, resumePageScroll]);

  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed || event.pointerType === "touch") return;

    event.preventDefault();
    isDrawingRef.current = true;
    setScratching(true);
    lastPointRef.current = null;
    canvasRef.current?.setPointerCapture(event.pointerId);
    pausePageScroll();
    scratch(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === "touch") return;
    if (!isDrawingRef.current || revealed) return;
    event.preventDefault();
    scratch(event.clientX, event.clientY);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === "touch") return;
    if (canvasRef.current?.hasPointerCapture(event.pointerId)) {
      canvasRef.current.releasePointerCapture(event.pointerId);
    }
    endStroke();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden select-none overscroll-none touch-none",
        compact ? "date-scratch-card-shell" : "min-h-[min(72vw,320px)] rounded-2xl sm:min-h-[280px]",
        !compact && "rounded-2xl border shadow-[0_12px_40px_rgba(122,30,43,0.12)]",
        onDate
          ? "date-scratch-card-shell--date"
          : onCoral
            ? compact
              ? "date-scratch-card-shell--coral"
              : "border-[#c45c5c]/40 bg-[#b83d3d] shadow-[0_12px_32px_rgba(184,61,61,0.25)]"
            : onMaroon
              ? "border-primary/25 bg-twilight/80 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              : "border-primary/30 bg-bg/90",
        className,
      )}
      style={{ touchAction: "none", WebkitTouchCallout: "none", WebkitUserSelect: "none" }}
    >
      <div
        className={cn(
          "relative z-0 flex items-center justify-center text-center",
          compact ? "min-h-[118px] p-2.5 sm:min-h-[200px] sm:p-6" : "p-6 sm:p-8 md:p-12",
          onDate && "bg-[#fffaf5]",
          revealed ? "opacity-100" : "opacity-0",
        )}
        aria-hidden={!revealed}
      >
        {children}
      </div>

      {!revealed ? (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-20 cursor-crosshair touch-none"
            style={{ touchAction: "none" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            aria-label="Scratch to reveal"
            role="img"
          />
          {!onDate ? (
            <div
              className={cn(
                "pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center",
                onCoral
                  ? "text-[#8b3030]/80"
                  : onMaroon
                    ? "text-ivory"
                    : "text-maroon-deep",
              )}
              aria-hidden="true"
            >
              <>
                {!onCoral ? scratchLabel : null}
                {mobile ? (
                  <p className={cn("font-body text-[10px]", onCoral ? "mt-auto mb-4 opacity-70" : "mt-4 opacity-60")}>
                    घासून उघडा
                  </p>
                ) : onCoral ? (
                  <p className="font-body mt-auto mb-5 text-[10px] tracking-[0.18em] opacity-60">घासून उघडा</p>
                ) : null}
              </>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
