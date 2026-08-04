import { cn } from "@/lib/utils";
import { forwardRef, type ReactNode } from "react";

interface SectionShellProps {
  id?: string;
  theme?: "maroon" | "ivory" | "warm" | "cinematic";
  /** Full-viewport cinematic section */
  cinematic?: boolean;
  /** Ambient layer (embers, radial glow) — rendered full-bleed behind content */
  atmosphere?: ReactNode;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell(
    {
      id,
      theme = "ivory",
      cinematic = false,
      atmosphere,
      className,
      contentClassName,
      children,
      ...aria
    },
    ref
  ) {
    const isCinematic = theme === "cinematic";

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative w-full overflow-hidden",
          isCinematic ? "section-cinematic" : theme === "maroon" ? "section-maroon" : theme === "warm" ? "section-warm" : "section-ivory",
          cinematic && "flex min-h-[100dvh] min-h-[100svh] flex-col justify-center",
          !cinematic &&
            "px-[max(1rem,env(safe-area-inset-left))] py-16 sm:px-6 sm:py-24 md:py-28",
          className
        )}
        {...aria}
      >
        {theme === "maroon" ? (
          <>
            <div className="section-maroon-glow pointer-events-none absolute inset-0 z-0" aria-hidden />
            <div
              className="section-maroon-pattern pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
              aria-hidden
            />
          </>
        ) : null}

        {isCinematic ? (
          <>
            <div className="section-cinematic-glow pointer-events-none absolute inset-0 z-0" aria-hidden />
            <div
              className="section-twilight-vignette pointer-events-none absolute inset-0 z-0 opacity-60"
              aria-hidden
            />
          </>
        ) : null}

        {atmosphere}

        <div
          className={cn(
            "relative z-10 mx-auto w-full",
            cinematic
              ? cn(
                  "flex max-w-6xl flex-col items-center justify-center",
                  "px-[max(1rem,env(safe-area-inset-left))] py-14",
                  "pb-[max(2rem,env(safe-area-inset-bottom))]",
                  "sm:px-6 sm:py-16 md:py-20",
                )
              : "max-w-6xl",
            contentClassName
          )}
        >
          {children}
        </div>
      </section>
    );
  }
);
