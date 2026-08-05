"use client";

import { useEffect, useRef, useState } from "react";
import { WEDDING } from "@/lib/constants";
import { getMapsEmbedUrl } from "@/lib/maps";
import { ReelSection, ReelSectionGrid } from "@/components/ui/ReelSection";

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 text-left sm:gap-4">
      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10 sm:h-8 sm:w-8">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <span className="mb-0.5 block text-[9px] text-white/40">{label}</span>
        <span className="font-serif text-sm leading-snug text-white/90 sm:text-base">{value}</span>
      </div>
    </div>
  );
}

/** Block 5 — The Venue (reference reel) */
export function Venue() {
  const { venue, weddingDate, ui, events } = WEDDING;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible] = useState(false);
  const embedUrl = getMapsEmbedUrl();
  const scheduleLine = `${events[0]?.name ?? weddingDate.celebrationTitle} · ${weddingDate.time}`;

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
      { rootMargin: "200px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <ReelSection
      id="venue-section"
      theme="venue"
      eyebrow={ui.venue.eyebrow}
      title={
        <>
          {ui.venue.titlePrefix}{" "}
          <span className="font-serif text-reel-gold-accent italic normal-case">{ui.venue.titleAccent}</span>
        </>
      }
      subtitle={ui.venue.subtitle}
      innerClassName="max-w-6xl"
    >
      <ReelSectionGrid className="max-w-5xl items-stretch lg:grid-cols-2">
        <div className="story-card flex h-full flex-col justify-between rounded-xl border border-gold/15 bg-onyx-dark/50 p-5 backdrop-blur-sm transition-all duration-500 hover:border-gold/30 sm:rounded-2xl sm:p-10">
          <div>
            <div className="mb-4 flex items-center justify-center gap-2.5 sm:mb-6 sm:justify-start sm:gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                </svg>
              </div>
              <span className="hero-reel-gold font-sans text-[10px]">
                {ui.venue.locationLabel}
              </span>
            </div>

            <h3 className="font-display mb-1.5 text-center text-xl text-white sm:mb-2 sm:text-left sm:text-3xl">
              {venue.name}
            </h3>
            <p className="font-sans mb-5 text-center text-xs leading-relaxed text-white/60 sm:mb-8 sm:text-left sm:text-sm">
              {venue.address}
            </p>

            <div className="space-y-4 sm:space-y-5">
              <InfoRow
                label={ui.venue.dateLabel}
                value={weddingDate.date}
                icon={
                  <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                }
              />
              <InfoRow
                label={ui.venue.scheduleLabel}
                value={scheduleLine}
                icon={
                  <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <InfoRow
                label={ui.venue.parkingLabel}
                value={ui.venue.parkingNote}
                icon={
                  <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h17.25" />
                  </svg>
                }
              />
            </div>
          </div>

          <a
            href={venue.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reel-open-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[9px] font-semibold sm:mt-8 sm:py-3.5 sm:text-xs"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {ui.venue.directions}
          </a>
        </div>

        <div
          ref={mapContainerRef}
          className="story-card relative min-h-[240px] overflow-hidden rounded-xl border border-gold/15 sm:min-h-[400px] sm:rounded-2xl lg:min-h-full"
        >
          {mapVisible ? (
            <iframe
              title={`${venue.name}, ${venue.city}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 opacity-80 contrast-125 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-onyx-dark/80">
              <div className="h-10 w-10 animate-pulse rounded-full border border-gold/30" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx-dark/50 via-transparent to-onyx-dark/30" />
        </div>
      </ReelSectionGrid>
    </ReelSection>
  );
}
