import type { ReactNode } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

const THEME_CLASS = {
  alliance: "section-onyx-alliance",
  blessings: "section-onyx-blessings",
  countdown: "section-onyx-countdown",
  venue: "section-onyx-venue",
  footer: "section-onyx-footer",
} as const;

export type ReelSectionTheme = keyof typeof THEME_CLASS;

interface ReelSectionProps {
  id: string;
  theme: ReelSectionTheme;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  leading?: ReactNode;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  headerClassName?: string;
  noHeader?: boolean;
}

/** Shared section shell — consistent padding, width, and centered headers */
export function ReelSection({
  id,
  theme,
  eyebrow,
  title,
  subtitle,
  meta,
  leading,
  children,
  className,
  innerClassName,
  headerClassName,
  noHeader,
}: ReelSectionProps) {
  return (
    <section id={id} className={cn("reel-section", THEME_CLASS[theme], className)}>
      <FadeIn className={cn("reel-section-inner", innerClassName)}>
        {!noHeader ? (
          <header className={cn("reel-section-header", headerClassName)}>
            {leading}
            {eyebrow ? (
              <span className="reel-section-eyebrow hero-reel-gold font-sans mb-3 block">
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h2 className="reel-section-title font-display text-white">{title}</h2>
            ) : null}
            {subtitle ? (
              <p className="reel-section-subtitle font-serif mx-auto mt-4 max-w-xl italic">{subtitle}</p>
            ) : null}
            {meta ? <div className="reel-section-meta font-sans mt-4">{meta}</div> : null}
            <div className="reel-section-divider" aria-hidden />
          </header>
        ) : null}
        {children}
      </FadeIn>
    </section>
  );
}

interface ReelSectionGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 4;
  className?: string;
}

/** Centered content grid — same max-width across sections */
export function ReelSectionGrid({ children, cols = 2, className }: ReelSectionGridProps) {
  return (
    <div
      className={cn(
        "reel-section-grid grid w-full gap-6 sm:gap-8 md:gap-10",
        cols === 1 && "grid-cols-1",
        cols === 2 && "grid-cols-1 md:grid-cols-2",
        cols === 4 && "grid-cols-2 sm:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
