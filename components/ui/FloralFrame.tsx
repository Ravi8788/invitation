import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FloralFrameProps {
  children: ReactNode;
  className?: string;
  /** Show full inner border ring */
  bordered?: boolean;
}

function CornerFloral({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-10 w-10 text-primary/55 sm:h-12 sm:w-12", className)}
      aria-hidden="true"
    >
      <path
        d="M4 32 C4 16, 16 4, 32 4 C24 12, 20 22, 32 32 C20 42, 24 52, 32 60 C16 60, 4 48, 4 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <path
        d="M8 20 C14 14, 22 10, 32 8 M12 32 C18 28, 26 26, 36 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.7"
      />
      <circle cx="14" cy="14" r="2" fill="currentColor" opacity="0.45" />
      <circle cx="22" cy="26" r="1.5" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

/** Ornate corner florals — luxury invitation reel style */
export function FloralFrame({
  children,
  className,
  bordered = true,
}: FloralFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <CornerFloral className="pointer-events-none absolute left-0 top-0" />
      <CornerFloral className="pointer-events-none absolute right-0 top-0 -scale-x-100" />
      <CornerFloral className="pointer-events-none absolute bottom-0 left-0 -scale-y-100" />
      <CornerFloral className="pointer-events-none absolute bottom-0 right-0 -scale-x-100 -scale-y-100" />

      {bordered ? (
        <div
          className="pointer-events-none absolute inset-4 rounded-xl border border-primary/25 sm:inset-5"
          aria-hidden="true"
        />
      ) : null}

      <div className="relative px-6 py-8 sm:px-10 sm:py-10">{children}</div>
    </div>
  );
}
