"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { COUPLE_LATIN, WEDDING } from "@/lib/constants";
import { useLenisContext } from "@/hooks/useLenisContext";
import { useScrollPastHero } from "@/hooks/useScrollPastHero";
import { scrollToSection } from "@/lib/scrollToSection";
import { FOOTER_GANESHA_IMAGE } from "@/lib/images";
import { ReelSection } from "@/components/ui/ReelSection";
import { cn } from "@/lib/utils";

function FooterOmDivider() {
  return (
    <div className="reel-footer-om-rule" aria-hidden>
      <span className="reel-footer-om">ॐ</span>
    </div>
  );
}

export function Footer() {
  const { ui } = WEDDING;
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
      <ReelSection id="footer-section" theme="footer" noHeader className="pb-16 pt-20 sm:pb-20 sm:pt-24">
        <div className="reel-footer-shell">
          <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center sm:mb-10 sm:h-44 sm:w-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FOOTER_GANESHA_IMAGE}
              alt="श्री गणेश"
              className="relative z-10 h-full w-full object-contain"
              decoding="async"
            />
          </div>

          <p className="reel-footer-shloka">{ui.footer.shloka}</p>
          <p className="reel-footer-shloka-en">{ui.footer.shlokaEnglish}</p>

          <h3 className="reel-footer-initials">
            {COUPLE_LATIN.bride.charAt(0)}{" "}
            <span className="font-serif text-reel-gold-accent italic">&</span>{" "}
            {COUPLE_LATIN.groom.charAt(0)}
          </h3>

          <p className="reel-footer-event">{ui.footer.eventLabel}</p>

          <nav className="reel-footer-nav" aria-label="Footer navigation">
            {ui.footer.navLinks.map((link, index) => (
              <span key={link.href} className="inline-flex items-center gap-2">
                {index > 0 ? <span className="reel-footer-nav-sep" aria-hidden>♦</span> : null}
                <button
                  type="button"
                  onClick={() => scrollToSection(link.href)}
                  className="reel-footer-nav-link"
                >
                  {link.label}
                </button>
              </span>
            ))}
          </nav>

          <FooterOmDivider />

          <p className="reel-footer-meta">{ui.footer.metaLine}</p>
          <p className="reel-footer-credit">{ui.footer.madeFor}</p>
          <p className="reel-footer-credit">{ui.footer.developer}</p>
        </div>
      </ReelSection>

      <motion.button
        type="button"
        onClick={scrollToTop}
        initial={false}
        animate={{
          opacity: pastHero ? 1 : 0,
          y: pastHero ? 0 : 16,
          pointerEvents: pastHero ? "auto" : "none",
        }}
        className={cn(
          "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-[90]",
          "flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-onyx-dark/90 text-gold shadow-lg",
        )}
        aria-label={ui.footer.backToTop}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
      </motion.button>
    </>
  );
}
