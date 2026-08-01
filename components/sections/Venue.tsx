"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { getMapsEmbedUrl } from "@/lib/maps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { FadeIn } from "@/components/animations/FadeIn";
import { AmbientDust } from "@/components/animations/AmbientDust";
import { cn } from "@/lib/utils";

function MapLoading() {
  return (
    <div
      className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-primary/[0.06] via-bg-secondary to-primary/[0.1]"
      aria-hidden="true"
    >
      <div className="h-10 w-10 animate-pulse rounded-full border border-primary/30 bg-primary/10" />
    </div>
  );
}

function RedLocationPin({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      animate={reduced ? { y: 0 } : { y: [0, -10, 0] }}
      transition={{
        duration: 1.8,
        repeat: reduced ? 0 : Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <motion.span
        className="absolute -bottom-1 h-3 w-8 rounded-full bg-maroon/25 blur-sm"
        animate={
          reduced
            ? { scaleX: 1, opacity: 0.35 }
            : { scaleX: [1, 1.35, 1], opacity: [0.35, 0.15, 0.35] }
        }
        transition={{
          duration: 1.8,
          repeat: reduced ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.span
        className="absolute h-14 w-14 rounded-full border-2 border-maroon/30"
        animate={
          reduced
            ? { scale: 1, opacity: 0.35 }
            : { scale: [0.85, 1.45, 0.85], opacity: [0.45, 0, 0.45] }
        }
        transition={{
          duration: 2,
          repeat: reduced ? 0 : Infinity,
          ease: "easeOut",
        }}
      />
      <MapPin
        className="relative h-10 w-10 text-maroon drop-shadow-[0_4px_12px_rgba(122,30,43,0.45)]"
        fill="#7A1E2B"
        strokeWidth={1.5}
      />
    </motion.div>
  );
}

export function Venue() {
  const { venue } = WEDDING;
  const reduced = useReducedMotion();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible] = useState(false);

  const embedUrl = getMapsEmbedUrl();

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionShell id="venue" theme="ivory" className="overflow-hidden" aria-labelledby="venue-heading">
      <AmbientDust density={12} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <FadeIn className="mb-12 flex justify-center">
          <SectionHeading title="Venue" headingId="venue-heading" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-primary/25 bg-glass shadow-[0_12px_40px_rgba(122,30,43,0.08)] backdrop-blur-sm">
            <div className="flex flex-col gap-4 border-b border-primary/15 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-8">
              <div className="min-w-0">
                <p className="font-display text-xl text-maroon sm:text-2xl">
                  {venue.name}
                </p>
                <p className="font-body mt-1 text-sm text-text-muted">
                  {venue.nearestLandmark} · {venue.city}
                </p>
              </div>

              <motion.a
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3",
                  "font-body text-xs font-medium uppercase tracking-[0.18em] text-ivory",
                  "bg-gradient-to-r from-maroon-deep via-maroon to-maroon-light",
                  "shadow-[0_8px_24px_rgba(78,16,24,0.35),inset_0_1px_0_rgba(212,175,55,0.2)]",
                  "transition-shadow hover:shadow-[0_10px_28px_rgba(78,16,24,0.45)]"
                )}
              >
                <Navigation className="h-3.5 w-3.5 text-primary-light" strokeWidth={2} />
                Get Directions
              </motion.a>
            </div>

            <div className="p-4 sm:p-5 md:p-6">
              <div
                ref={mapContainerRef}
                className="relative overflow-hidden rounded-xl border-2 border-primary/30 shadow-[inset_0_0_0_1px_rgba(212,175,55,0.15)]"
              >
                {mapVisible ? (
                  <iframe
                    title={`Map showing ${venue.name}, ${venue.city}`}
                    src={embedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="aspect-[16/10] w-full border-0 grayscale-[12%] sepia-[10%] contrast-[1.04] saturate-[0.92]"
                    allowFullScreen
                  />
                ) : (
                  <MapLoading />
                )}

                <div
                  className="pointer-events-none absolute inset-0 bg-primary/[0.04] mix-blend-multiply"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-primary/15"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-3 rounded-lg border border-primary/20"
                  aria-hidden="true"
                />

                <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-full">
                  <RedLocationPin reduced={!!reduced} />
                </div>
              </div>

              <p className="font-body mt-4 text-center text-xs leading-relaxed text-text-muted sm:text-sm">
                {venue.address}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
