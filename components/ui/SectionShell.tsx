import { cn } from "@/lib/utils";
import { forwardRef, type ReactNode } from "react";

interface SectionShellProps {
  id?: string;
  theme?: "maroon" | "ivory" | "warm";
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell(
    { id, theme = "ivory", className, children, ...aria },
    ref
  ) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative px-6 py-24 md:py-32",
          theme === "maroon"
            ? "section-maroon"
            : theme === "warm"
              ? "section-warm"
              : "section-ivory",
          className
        )}
        {...aria}
      >
        {theme === "maroon" ? (
          <>
            <div
              className="section-maroon-glow pointer-events-none absolute inset-0"
              aria-hidden
            />
            <div
              className="section-maroon-pattern pointer-events-none absolute inset-0 opacity-[0.04]"
              aria-hidden
            />
          </>
        ) : null}
        <div className="relative z-10">{children}</div>
      </section>
    );
  }
);
