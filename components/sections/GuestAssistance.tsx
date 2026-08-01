"use client";

import { AlertCircle, Car, Phone, type LucideIcon } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import type { GuestAssistanceItem } from "@/types";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { FadeIn } from "@/components/animations/FadeIn";
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
    <GlassCard className="flex h-full flex-col items-center p-6 text-center md:p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
        <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-lg text-maroon">{item.label}</h3>
      <p className="font-body mt-2 text-sm leading-relaxed text-text-muted">
        {item.detail}
      </p>
      {item.phone && item.link ? (
        <a
          href={item.link}
          className={cn(
            "font-body mt-3 text-sm font-medium text-maroon underline-offset-4",
            "transition-colors hover:text-primary hover:underline"
          )}
        >
          {item.phone}
        </a>
      ) : null}
    </GlassCard>
  );
}

export function GuestAssistance() {
  return (
    <SectionShell
      id="guest-assistance"
      theme="ivory"
      aria-label="Guest assistance"
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn className="mb-12 flex justify-center">
          <SectionHeading title="Guest Assistance" />
        </FadeIn>

        <StaggerGroup className="grid gap-6 sm:grid-cols-3" stagger={0.1}>
          {WEDDING.guestAssistance.map((item) => (
            <StaggerItem key={item.id}>
              <AssistanceCard item={item} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </SectionShell>
  );
}
