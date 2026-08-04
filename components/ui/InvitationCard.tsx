import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { FloralFrame } from "@/components/ui/FloralFrame";

interface InvitationCardProps {
  children: ReactNode;
  className?: string;
  /** Reduce inner padding for compact cards */
  compact?: boolean;
}

/** Centered ornate card — matches luxury Instagram invitation reels */
export function InvitationCard({
  children,
  className,
  compact = false,
}: InvitationCardProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full overflow-hidden rounded-2xl",
        "bg-bg/95 shadow-[0_20px_60px_rgba(122,30,43,0.1),inset_0_1px_0_rgba(255,255,255,0.85)]",
        "ring-1 ring-primary/20 backdrop-blur-sm",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(212,180,131,0.12),transparent_65%)]"
        aria-hidden="true"
      />
      <FloralFrame className={compact ? "[&>div:last-child]:px-5 [&>div:last-child]:py-6 sm:[&>div:last-child]:px-7 sm:[&>div:last-child]:py-8" : undefined}>
        {children}
      </FloralFrame>
    </div>
  );
}
