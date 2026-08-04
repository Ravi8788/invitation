"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { CEREMONY_COUPLE, CEREMONY_COUPLE_SKETCH } from "@/lib/images";
import { FloatingEmbers } from "@/components/animations/FloatingEmbers";
import { useMotionSettings } from "@/hooks/useMotionSettings";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const CEREMONY_COPY = {
  titleLead: "The Engagement",
  titleAccent: "Ceremony",
  narrative:
    "Watch our story come alive — from a gentle sketch of dreams to the vivid colours of celebration, as we prepare to exchange rings beneath the evening sky.",
  tagline: "Ring Ceremony · Blessings · Celebration",
};

export function EngagementCeremony() {
  const ceremony = WEDDING.events[0];
  const reduced = useReducedMotion();
  const { isMobile } = useMotionSettings();

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<HTMLDivElement>(null);
  const vividRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const sketch = sketchRef.current;
    const vivid = vividRef.current;
    if (!section || !pin || !sketch || !vivid) return;

    if (reduced) {
      gsap.set(sketch, { opacity: 0, scale: 1 });
      gsap.set(vivid, { opacity: 1, scale: 1 });
      gsap.set(".ceremony-copy", { opacity: 1, y: 0 });
      return;
    }

    const scrollDistance = () => window.innerHeight * (isMobile ? 1.6 : 2.4);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin,
          scrub: isMobile ? 0.5 : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        sketch,
        { opacity: 1, scale: 1.06 },
        { opacity: 0, scale: 1.1, duration: 0.55, ease: "none" },
        0
      ).fromTo(
        vivid,
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 0.55, ease: "none" },
        0
      );

      tl.fromTo(
        ".ceremony-copy",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.35, ease: "none" },
        0.35
      );
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="ceremony"
      className="ceremony-scroll relative bg-twilight text-ivory"
      aria-labelledby="ceremony-heading"
    >
      <div ref={pinRef} className="relative h-[100dvh] w-full overflow-hidden">
        <div ref={sketchRef} className="absolute inset-0 origin-center will-change-[opacity,transform]">
          <Image
            src={CEREMONY_COUPLE_SKETCH}
            alt=""
            fill
            priority
            className="object-cover object-[center_42%] sm:object-center"
            sizes="100vw"
          />
        </div>

        <div
          ref={vividRef}
          className="absolute inset-0 origin-center opacity-0 will-change-[opacity,transform]"
        >
          <Image
            src={CEREMONY_COUPLE}
            alt=""
            fill
            priority
            className="object-cover object-[center_42%] sm:object-center"
            sizes="100vw"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-twilight/55 via-transparent to-twilight/85"
          aria-hidden
        />

        <FloatingEmbers count={4} className="z-[1]" />

        <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-24 text-center sm:px-6">
          <div className={cn("ceremony-copy mx-auto max-w-lg", reduced ? "opacity-100" : "opacity-0")}>
            <h2
              id="ceremony-heading"
              className="font-display text-[clamp(1.5rem,6vw,2.75rem)] font-semibold uppercase leading-tight tracking-[0.08em]"
              style={{ textShadow: "0 0 40px rgba(212,180,131,0.35)" }}
            >
              <span className="block text-ivory">{CEREMONY_COPY.titleLead}</span>
              <span className="mt-1 block font-script normal-case text-gold-gradient">
                {CEREMONY_COPY.titleAccent}
              </span>
            </h2>

            <p className="hero-text-shadow font-body mt-4 text-[13px] leading-relaxed text-ivory/80 sm:text-sm">
              {CEREMONY_COPY.narrative}
            </p>

            <p className="font-display mt-6 text-[8px] uppercase tracking-[0.32em] text-gold-light/85 sm:text-[9px]">
              {CEREMONY_COPY.tagline}
            </p>

            <div className="mt-6 space-y-2">
              <p className="font-display text-sm text-gold-light/90 sm:text-base">{ceremony.name}</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="hero-chip">{ceremony.date}</span>
                <span className="hero-chip">{ceremony.time}</span>
              </div>
              <p className="font-body text-[9px] uppercase tracking-[0.2em] text-ivory/50 sm:text-[10px]">
                {ceremony.venue}
              </p>
            </div>
          </div>

          {!reduced ? (
            <p className="font-body mt-6 text-[9px] uppercase tracking-[0.28em] text-ivory/40">
              Scroll to unveil
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
