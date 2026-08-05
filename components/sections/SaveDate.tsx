"use client";

import { WEDDING } from "@/lib/constants";
import { ReelSection } from "@/components/ui/ReelSection";
import { ScratchCard } from "@/components/ui/ScratchCard";

function DateScratchCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="date-scratch-column">
      <span className="date-scratch-label">{label}</span>
      <div className="date-scratch-card-glow">
        <ScratchCard variant="date" compact className="date-scratch-card">
          <p className="date-scratch-value">{value}</p>
        </ScratchCard>
      </div>
    </div>
  );
}

/** Save the Date — separate scratch cards for month, day, year */
export function SaveDate() {
  const { weddingDate, ui } = WEDDING;
  const { scratch, labels } = { scratch: weddingDate.scratch, labels: ui.saveDate.labels };

  return (
    <ReelSection
      id="save-date-section"
      theme="saveDate"
      eyebrow={ui.saveDate.eyebrow}
      title={<span className="save-date-title">{ui.saveDate.title}</span>}
      subtitle={<span className="save-date-hint">{ui.saveDate.scratchHint}</span>}
      headerClassName="!max-w-2xl"
    >
      <div className="save-date-stage mx-auto max-w-3xl">
        <div className="date-scratch-grid">
          <DateScratchCard label={labels.month} value={scratch.month} />
          <DateScratchCard label={labels.day} value={scratch.day} />
          <DateScratchCard label={labels.year} value={scratch.year} />
        </div>
      </div>
    </ReelSection>
  );
}
