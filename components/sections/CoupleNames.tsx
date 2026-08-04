"use client";



import { WEDDING } from "@/lib/constants";

import { ReelSection, ReelSectionGrid } from "@/components/ui/ReelSection";

import { cn } from "@/lib/utils";



interface AllianceCardProps {

  name: string;

  role: string;

  lineageLabel: string;

  parents: string;

  grandparents?: string;

  portrait?: string;

  portraitFallbackClass: string;

  initial: string;

}



function AllianceCard({

  name,

  role,

  lineageLabel,

  parents,

  grandparents,

  portrait,

  portraitFallbackClass,

  initial,

}: AllianceCardProps) {

  return (

    <div className="story-card reel-card rounded-3xl transition-all duration-500 hover:border-reel-gold hover:shadow-[0_15px_30px_rgba(212,175,55,0.05)]">

      <div className="relative mb-6 h-40 w-32 overflow-hidden rounded-t-full border border-gold/25 bg-[#1c0808] shadow-[0_5px_15px_rgba(0,0,0,0.4)]">

        {portrait ? (

          // eslint-disable-next-line @next/next/no-img-element

          <img

            src={portrait}

            alt={name}

            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"

          />

        ) : (

          <div

            className={cn(

              "flex h-full w-full items-end justify-center pb-5",

              portraitFallbackClass,

            )}

          >

            <span className="font-display text-4xl text-white/20">{initial}</span>

          </div>

        )}

      </div>



      <h3 className="font-display mb-1 text-2xl text-white">{name}</h3>

      <span className="hero-reel-gold mb-4 text-[9px]">{role}</span>

      <div className="mb-4 h-px w-12 bg-[var(--color-reel-gold)]/40" />



      <div className="space-y-3 font-sans text-sm text-white/80">

        <p className="font-serif text-base text-white italic">{lineageLabel}</p>

        <p className="hero-reel-tagline text-base font-bold">{parents}</p>

        {grandparents ? (

          <p className="mt-2 text-xs leading-relaxed text-white/50">{grandparents}</p>

        ) : null}

      </div>

    </div>

  );

}



/** Block 2 — The Sacred Alliance (reference reel) */

export function CoupleNames() {

  const { couple, ui } = WEDDING;



  return (

    <ReelSection

      id="alliance-section"

      theme="alliance"

      eyebrow={ui.couple.eyebrow}

      title={ui.couple.title}

    >

      <ReelSectionGrid>

        <AllianceCard

          name={couple.groom}

          role={couple.groomRole ?? "वर"}

          lineageLabel={ui.couple.sonOf}

          parents={couple.groomParents}

          grandparents={couple.groomGrandparents}

          portrait={couple.groomPortrait}

          portraitFallbackClass="bg-gradient-to-b from-[#3d2a0a] via-[#2a1808] to-[#1c0808]"

          initial={couple.groom.charAt(0)}

        />

        <AllianceCard

          name={couple.bride}

          role={couple.brideRole ?? "वधू"}

          lineageLabel={ui.couple.daughterOf}

          parents={couple.brideParents}

          grandparents={couple.brideGrandparents}

          portrait={couple.bridePortrait}

          portraitFallbackClass="bg-gradient-to-b from-[#4a1010] via-[#2a0808] to-[#1c0808]"

          initial={couple.bride.charAt(0)}

        />

      </ReelSectionGrid>

    </ReelSection>

  );

}


