"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { getMapsEmbedUrl } from "@/lib/maps";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionShell } from "@/components/ui/SectionShell";
import { cn } from "@/lib/utils";

function MapLoading() {
  return (
    <div
      className="flex aspect-[16/10] w-full items-center justify-center bg-twilight/40"
      aria-hidden="true"
    >
      <div className="h-10 w-10 animate-pulse rounded-full border border-primary/30 bg-primary/10" />
    </div>
  );
}

function GoldLocationPin({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      animate={reduced ? { y: 0 } : { y: [0, -10, 0] }}
      transition={{ duration: 1.8, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <MapPin
        className="relative h-10 w-10 text-[#d4b483] drop-shadow-[0_4px_12px_rgba(212,180,131,0.45)]"
        fill="#b8935a"
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
    <SectionShell
      id="venue"
      theme="cinematic"
      atmosphere={<SectionAtmosphere embers={3} />}
      contentClassName="max-w-3xl"
      aria-labelledby="venue-heading"
    >
      <FadeIn className="mb-12 flex w-full justify-center">
        <SectionHeading title="Venue" headingId="venue-heading" theme="cinematic" />
      </FadeIn>

      <FadeIn delay={0.1} className="w-full">
        <div className="invitation-card overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-primary/15 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-8">
            <div className="min-w-0">
              <p className="font-display text-xl text-ivory sm:text-2xl">{venue.name}</p>
              <p className="font-body mt-1 text-sm text-ivory/55">
                {venue.nearestLandmark} · {venue.city}
              </p>
            </div>

            <motion.a
              href={venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn("btn-gold-cinematic shrink-0")}
            >
              <Navigation className="h-3.5 w-3.5" strokeWidth={2} />
              Get Directions
            </motion.a>
          </div>

          <div className="p-4 sm:p-5 md:p-6">
            <div
              ref={mapContainerRef}
              className="relative overflow-hidden rounded-xl border border-primary/25"
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

              <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-full">
                <GoldLocationPin reduced={!!reduced} />
              </div>
            </div>

            <p className="font-body mt-4 text-center text-xs leading-relaxed text-ivory/55 sm:text-sm">
              {venue.address}
            </p>
          </div>
        </div>
      </FadeIn>
    </SectionShell>
  );
}
