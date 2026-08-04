"use client";

import { AlertCircle, Car, Phone, type LucideIcon } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import type { GuestAssistanceItem } from "@/types";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionShell } from "@/components/ui/SectionShell";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<GuestAssistanceItem["icon"], LucideIcon> = {
  car: Car,
  phone: Phone,
  "alert-circle": AlertCircle,
  hotel: Phone,
};

function AssistanceCard({ item }: { item: GuestAssistanceItem }) {
  const Icon = ICON_MAP[item.icon];

  return (
    <div className="invitation-card flex h-full flex-col items-center p-6 text-center md:p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
        <Icon className="h-5 w-5 text-gold-light" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-lg text-gold-gradient">{item.label}</h3>
      <p className="font-body mt-2 text-sm leading-relaxed text-ivory/75">{item.detail}</p>
      {item.phone && item.link ? (
        <a
          href={item.link}
          className={cn(
            "font-body mt-3 text-sm font-medium text-gold-light underline-offset-4",
            "transition-colors hover:text-primary-light hover:underline"
          )}
        >
          {item.phone}
        </a>
      ) : null}
    </div>
  );
}

export function GuestAssistance() {
  return (
    <SectionShell
      id="guest-assistance"
      theme="cinematic"
      atmosphere={<SectionAtmosphere embers={3} />}
      contentClassName="max-w-4xl"
      aria-label="Guest assistance"
    >
      <FadeIn className="mb-12 flex justify-center">
        <SectionHeading title="Guest Assistance" theme="cinematic" />
      </FadeIn>

      <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" stagger={0.1}>
        {WEDDING.guestAssistance.map((item) => (
          <StaggerItem key={item.id}>
            <AssistanceCard item={item} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionShell>
  );
}
