"use client";

import { WEDDING } from "@/lib/constants";
import { useCountdown } from "@/hooks/useCountdown";
import { ReelSection, ReelSectionGrid } from "@/components/ui/ReelSection";
import { cn } from "@/lib/utils";

function CountdownUnit({
  value,
  label,
  ready,
}: {
  value: number;
  label: string;
  ready: boolean;
}) {
  const digits = ready ? String(value).padStart(2, "0") : "--";

  return (
    <div className="story-card flex min-h-[4.75rem] flex-col items-center justify-center rounded-xl border border-reel-gold bg-onyx-dark/60 p-2.5 text-center backdrop-blur-sm sm:min-h-[7.5rem] sm:rounded-2xl sm:p-5 md:min-h-[8.5rem] md:p-8">
      <span className="countdown-digit font-display tabular-nums">{digits}</span>
      <span className="font-sans mt-1.5 block text-[8px] text-white/60 sm:mt-3 sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

function MandalaBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
      <svg
        viewBox="0 0 400 400"
        className="h-[600px] w-[600px] text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        aria-hidden
      >
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="170" strokeDasharray="8 4" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="130" strokeDasharray="4 2" />
        <circle cx="200" cy="200" r="110" />
        <circle cx="200" cy="200" r="90" strokeDasharray="6 3" />
        <path d="M200,10 L200,390 M10,200 L390,200 M60,60 L340,340 M340,60 L60,340" />
      </svg>
    </div>
  );
}

function CountdownGrid({
  ready,
  countdown,
  units,
}: {
  ready: boolean;
  countdown: ReturnType<typeof useCountdown>;
  units: typeof WEDDING.ui.countdown.units;
}) {
  return (
    <ReelSectionGrid cols={4}>
      <CountdownUnit value={countdown.days} label={units.days} ready={ready} />
      <CountdownUnit value={countdown.hours} label={units.hours} ready={ready} />
      <CountdownUnit value={countdown.minutes} label={units.minutes} ready={ready} />
      <CountdownUnit value={countdown.seconds} label={units.seconds} ready={ready} />
    </ReelSectionGrid>
  );
}

/** Live countdown to the event */
export function Countdown() {
  const { weddingDate, ui, events } = WEDDING;
  const countdown = useCountdown(weddingDate.iso);
  const { units } = ui.countdown;
  const eventName = events[0]?.name ?? weddingDate.celebrationTitle;

  return (
    <ReelSection
      id="countdown-section"
      theme="countdown"
      className="relative"
      eyebrow={ui.countdown.eyebrow}
      title={
        <>
          {ui.countdown.titlePrefix}{" "}
          <span className="font-serif lowercase text-reel-gold-accent italic sm:normal-case">
            {ui.countdown.titleAccent}
          </span>
        </>
      }
      subtitle={ui.countdown.subtitle}
      meta={
        <span>
          {eventName} · {weddingDate.display}
        </span>
      }
    >
      <MandalaBackdrop />

      {!countdown.isReady ? (
        <div className="reel-section-grid mx-auto h-32 animate-pulse rounded-2xl bg-white/5" />
      ) : countdown.isComplete ? (
        <div className="reel-section-grid reel-card mx-auto max-w-lg rounded-2xl border border-reel-gold px-6 py-10">
          <p className="hero-reel-gold font-display text-xl sm:text-2xl md:text-3xl">
            {ui.countdown.completeMessage}
          </p>
          <p className="font-serif mt-4 text-base text-white/80 italic">{weddingDate.display}</p>
        </div>
      ) : (
        <div className="reel-section-grid" aria-live="polite" aria-atomic="true">
          <CountdownGrid ready={countdown.isReady} countdown={countdown} units={units} />
        </div>
      )}

      <p
        className={cn(
          "reel-section-header !mb-0 !mt-5 font-serif text-sm italic sm:!mt-10 sm:text-lg",
          "hero-reel-tagline",
        )}
      >
        {weddingDate.display}
      </p>
    </ReelSection>
  );
}
