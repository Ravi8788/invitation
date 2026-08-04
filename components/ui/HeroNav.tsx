"use client";

import { WEDDING } from "@/lib/constants";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

const { ui } = WEDDING;

const NAV_ITEMS = [
  { label: ui.nav.home, href: "#hero" },
  { label: ui.nav.date, href: "#countdown" },
  { label: ui.nav.venue, href: "#venue" },
  { label: ui.nav.family, href: "#family" },
] as const;

export function HeroNav() {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[80] pt-[env(safe-area-inset-top,0px)]",
        "bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent py-2.5 sm:py-4",
      )}
      aria-label="मुख्य नेव्हिगेशन"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="inline-flex min-h-11 items-center px-2 font-body text-[9px] tracking-wide text-[#fff]/70 transition-colors hover:text-[#D4AF37] sm:text-[11px]"
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
