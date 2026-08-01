"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { useLenisContext } from "@/hooks/useLenisContext";
import { useScrollPastHero } from "@/hooks/useScrollPastHero";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { SectionShell } from "@/components/ui/SectionShell";
import { cn } from "@/lib/utils";

export function Footer() {
  const { couple } = WEDDING;
  const { lenisRef, isReady } = useLenisContext();
  const pastHero = useScrollPastHero();
  const reduced = useReducedMotion();

  const scrollToTop = () => {
    if (isReady && lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: reduced ? 0 : 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <SectionShell
        theme="maroon"
        className="pb-28 pt-16 md:pb-32 md:pt-20"
        aria-label="Site footer"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="font-body text-sm text-maroon/85 sm:text-base">
            Made with <span aria-hidden="true">❤</span> for {couple.bride} &amp;{" "}
            {couple.groom}
          </p>

          <div className="my-8 w-full max-w-xs sm:max-w-sm">
            <OrnamentalDivider className="text-maroon/55" />
          </div>
        </div>
      </SectionShell>

      <motion.button
        type="button"
        onClick={scrollToTop}
        initial={false}
        animate={{
          opacity: pastHero ? 1 : 0,
          y: pastHero ? 0 : 16,
          pointerEvents: pastHero ? "auto" : "none",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn(
          "fixed bottom-6 right-6 z-[90] flex h-11 w-11 items-center justify-center rounded-full",
          "border border-primary/40 bg-maroon-deep/90 text-primary shadow-lg backdrop-blur-md",
          "transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        )}
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
      </motion.button>
    </>
  );
}
