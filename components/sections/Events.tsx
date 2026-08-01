"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Flower2,
  Heart,
  Music,
  Sun,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { FadeIn } from "@/components/animations/FadeIn";

gsap.registerPlugin(ScrollTrigger);

const EVENT_ICONS: Record<string, LucideIcon> = {
  sun: Sun,
  "flower-2": Flower2,
  music: Music,
  rings: Heart,
  wine: Wine,
};

export function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineHRef = useRef<HTMLDivElement>(null);
  const lineVRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) {
      if (lineHRef.current) gsap.set(lineHRef.current, { scaleX: 1 });
      if (lineVRef.current) gsap.set(lineVRef.current, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      if (lineHRef.current) {
        gsap.fromTo(
          lineHRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 40%",
              scrub: 0.5,
            },
          }
        );
      }
      if (lineVRef.current) {
        gsap.fromTo(
          lineVRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 35%",
              scrub: 0.5,
            },
          }
        );
      }
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <SectionShell
      ref={sectionRef}
      id="events"
      theme="maroon"
      aria-label="Wedding events"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 flex justify-center">
          <SectionHeading title="Events" theme="maroon" />
        </FadeIn>

        <div className="relative hidden lg:block">
          <div
            className="absolute left-[8%] right-[8%] top-[2.75rem] h-px bg-primary/20"
            aria-hidden="true"
          />
          <div
            ref={lineHRef}
            className="absolute left-[8%] right-[8%] top-[2.75rem] h-px origin-left bg-gradient-to-r from-primary via-primary-light to-primary"
            style={{ transform: "scaleX(0)" }}
            aria-hidden="true"
          />

          <div className="relative flex justify-between gap-4 px-[4%]">
            {WEDDING.events.map((event) => {
              const Icon = EVENT_ICONS[event.icon] ?? Sun;
              return (
                <FadeIn key={event.id} direction="up" className="flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className="relative z-10 mb-6 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-maroon-deep"
                      aria-hidden="true"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <GlassCard variant="dark" className="w-full p-5 text-center">
                      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-primary/35 bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-lg text-gold-gradient">
                        {event.name}
                      </h3>
                      <p className="font-body mt-2 text-xs text-ivory/65">
                        {event.date}
                      </p>
                      <p className="font-body text-xs font-medium text-ivory">
                        {event.time}
                      </p>
                      <p className="font-body mt-3 text-[11px] leading-relaxed text-ivory/65">
                        {event.venue}
                      </p>
                    </GlassCard>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <div className="relative lg:hidden">
          <div
            className="absolute bottom-0 left-[7px] top-0 w-px bg-primary/20"
            aria-hidden="true"
          />
          <div
            ref={lineVRef}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-primary via-primary-light to-primary"
            style={{ transform: "scaleY(0)" }}
            aria-hidden="true"
          />

          <div className="space-y-8 pl-8">
            {WEDDING.events.map((event) => {
              const Icon = EVENT_ICONS[event.icon] ?? Sun;
              return (
                <FadeIn key={event.id} direction="left">
                  <div className="relative">
                    <div
                      className="absolute -left-8 top-6 z-10 flex h-4 w-4 -translate-x-[calc(50%-1px)] items-center justify-center rounded-full border-2 border-primary bg-maroon-deep"
                      aria-hidden="true"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>
                    <GlassCard variant="dark" className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-display text-xl text-gold-gradient">
                            {event.name}
                          </h3>
                          <p className="font-body mt-1 text-sm text-ivory/65">
                            {event.date} · {event.time}
                          </p>
                          <p className="font-body mt-2 text-sm text-ivory/65">
                            {event.venue}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
