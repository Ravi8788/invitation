"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CinematicPhotoProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  aspect?: "video" | "square" | "portrait" | "fill";
  overlay?: "hero" | "arch" | "journey" | "none";
  fallback?: ReactNode;
  children?: ReactNode;
  sizes?: string;
}

const ASPECT = {
  video: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  fill: "h-full w-full",
} as const;

const OVERLAY = {
  hero: "bg-gradient-to-t from-twilight via-twilight/40 to-twilight/20",
  arch: "bg-gradient-to-t from-twilight/90 via-twilight/25 to-twilight/10",
  journey: "bg-gradient-to-t from-twilight/80 via-transparent to-twilight/20",
  none: "",
} as const;

export function CinematicPhoto({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  aspect = "video",
  overlay = "arch",
  fallback,
  children,
  sizes: sizesProp,
}: CinematicPhotoProps) {
  const [failed, setFailed] = useState(false);
  const isFill = aspect === "fill";

  if (failed && fallback) {
    return <div className={cn("relative overflow-hidden", !isFill && ASPECT[aspect], className)}>{fallback}</div>;
  }

  return (
    <div className={cn("relative overflow-hidden", !isFill && ASPECT[aspect], className)}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={70}
          loading={priority ? undefined : "lazy"}
          onError={() => setFailed(true)}
          className={cn("object-cover object-center", imageClassName)}
          sizes={
            sizesProp ??
            (isFill
              ? "100vw"
              : "(max-width: 768px) 88vw, (max-width: 1200px) 50vw, 480px")
          }
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-twilight via-[#121a32] to-twilight-deep" aria-hidden />
      )}
      {overlay !== "none" ? (
        <div className={cn("pointer-events-none absolute inset-0", OVERLAY[overlay])} aria-hidden />
      ) : null}
      {children}
    </div>
  );
}
