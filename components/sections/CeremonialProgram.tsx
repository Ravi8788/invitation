"use client";

import { WEDDING } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";

/** Ceremonial program — single Supari Sukharpuda event (reference layout) */
export function CeremonialProgram() {
  const { events, ui } = WEDDING;
  const event = events[0];

  return (
    <section id="program" className="section-onyx-program relative overflow-hidden px-6 py-24 md:px-12 md:py-28">
      <FadeIn className="relative z-10 mx-auto max-w-6xl text-center">
        <span className="font-sans mb-3 block text-[10px] tracking-[0.4em] text-gold uppercase">{ui.program.eyebrow}</span>
        <h2 className="font-display mb-6 text-3xl tracking-wider text-white uppercase sm:text-5xl">{ui.program.title}</h2>
        <div className="mx-auto mb-16 h-px w-24 bg-gold/40" />

        <div className="mx-auto max-w-md">
          <div className="gallery-item group relative overflow-hidden rounded-2xl border border-gold/10 bg-onyx-dark/30 p-2 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(247,181,0,0.1)]">
            <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#2a0a0a] via-[#1a0505] to-[#0a0a0a] sm:h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-dark via-transparent to-transparent opacity-60" />
              <span className="font-display relative text-6xl text-gold/20">ॐ</span>
            </div>
            <div className="space-y-2 p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="font-display text-[9px] tracking-widest text-gold uppercase">{event.name}</span>
                <span className="text-xs font-semibold text-white/50">{event.time}</span>
              </div>
              <h4 className="font-serif text-xl font-medium text-white">{event.name}</h4>
              <div className="my-1 h-px w-12 bg-gold/20" />
              <p className="font-sans text-xs leading-relaxed text-white/70">{event.description}</p>
              <p className="font-sans pt-2 text-xs text-gold/70">{event.venue}</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
