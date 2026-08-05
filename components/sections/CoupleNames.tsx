"use client";

import { WEDDING } from "@/lib/constants";
import { ReelSection } from "@/components/ui/ReelSection";

function SwastikaDivider() {
  return (
    <div className="alliance-swastika-rule" aria-hidden>
      <span className="alliance-swastika-line" />
      <span className="alliance-swastika">卐</span>
      <span className="alliance-swastika-line" />
    </div>
  );
}

function AlliancePersonBlock({
  name,
  parents,
  origin,
  relation,
}: {
  name: string;
  parents: string;
  origin: string;
  relation: string;
}) {
  return (
    <div className="alliance-person-block">
      <h3 className="alliance-person-name">{name}</h3>
      <p className="alliance-person-parents">{parents}</p>
      <p className="alliance-person-origin">
        {origin} {relation}
      </p>
    </div>
  );
}

/** Traditional Marathi alliance — groom, swastika, bride */
export function CoupleNames() {
  const { couple, ui } = WEDDING;

  return (
    <ReelSection
      id="alliance-section"
      theme="alliance"
      eyebrow={ui.couple.eyebrow}
      title={ui.couple.title}
      headerClassName="!max-w-2xl"
    >
      <div className="alliance-traditional mx-auto max-w-xl text-center">
        <AlliancePersonBlock
          name={couple.groomFormalName ?? couple.groom}
          parents={couple.groomParents}
          origin={couple.groomOrigin ?? WEDDING.venue.city}
          relation={ui.couple.groomRelation}
        />

        <SwastikaDivider />

        <AlliancePersonBlock
          name={couple.brideFormalName ?? couple.bride}
          parents={couple.brideParents}
          origin={couple.brideOrigin ?? WEDDING.venue.city}
          relation={ui.couple.brideRelation}
        />
      </div>
    </ReelSection>
  );
}
