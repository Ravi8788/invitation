import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

export function GlassCard({
  children,
  className,
  variant = "light",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        variant === "dark" ? "glass-card-dark" : "glass-card",
        className
      )}
    >
      {children}
    </div>
  );
}
