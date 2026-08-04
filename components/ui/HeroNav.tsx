"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scrollToSection";

const NAV_ITEMS = [
  { label: "Home", href: "#hero", short: "Home" },
  { label: "Save the Date", href: "#save-the-date", short: "Date" },
  { label: "Our Journey", href: "#our-story", short: "Story" },
  { label: "Countdown", href: "#countdown", short: "Timer" },
  { label: "Ceremony", href: "#ceremony", short: "Vows" },
  { label: "Venue", href: "#venue", short: "Venue" },
  { label: "Blessings", href: "#blessings", short: "Bless" },
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
        "fixed inset-x-0 top-0 z-[80] pt-[env(safe-area-inset-top,0px)] transition-all duration-300",
        scrolled
          ? "border-b border-[#d4b483]/20 bg-[#0f1529]/88 py-2 shadow-lg shadow-black/25 backdrop-blur-md sm:py-3"
          : "bg-gradient-to-b from-[#0f1529]/55 via-[#0f1529]/20 to-transparent py-2.5 sm:py-4",
      )}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="nav-scroll -mx-1 overflow-x-auto px-1 pb-0.5 sm:overflow-visible sm:pb-0">
          <ul className="flex w-max min-w-full items-center justify-start gap-1 sm:w-auto sm:min-w-0 sm:flex-wrap sm:justify-center sm:gap-x-2">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href} className="flex shrink-0 items-center">
                {index > 0 ? (
                  <span className="mx-0.5 hidden text-[#d4b483]/45 sm:mx-1 sm:inline" aria-hidden="true">
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
                    "inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center rounded-full px-2.5",
                    "font-body text-[9px] uppercase tracking-[0.14em] transition-colors sm:px-0 sm:text-[11px] sm:tracking-[0.18em]",
                    scrolled
                      ? "text-[#fdfbf7]/65 hover:text-[#d4b483] active:text-[#d4b483]"
                      : "hero-text-shadow text-[#fdfbf7]/75 hover:text-[#d4b483] active:text-[#d4b483]",
                  )}
                >
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
