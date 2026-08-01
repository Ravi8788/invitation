"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scrollToSection";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Save the Date", href: "#save-the-date" },
  { label: "Our Story", href: "#our-story" },
  { label: "Countdown", href: "#countdown" },
  { label: "Venue", href: "#venue" },
  { label: "The Promise", href: "#the-promise" },
  { label: "Attire", href: "#attire" },
  { label: "Blessings", href: "#blessings" },
] as const;

export function HeroNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
        scrolled
          ? "border-b border-primary/15 bg-bg/92 py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5"
      )}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 sm:gap-x-3">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 ? (
                <span
                  className="mx-1 hidden text-primary/40 sm:inline"
                  aria-hidden="true"
                >
                  ·
                </span>
              ) : null}
              <a
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.href);
                }}
                className={cn(
                  "font-body text-[10px] uppercase tracking-[0.18em] transition-colors sm:text-[11px]",
                  scrolled
                    ? "text-text-muted hover:text-maroon"
                    : "text-text-muted/90 hover:text-maroon"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
