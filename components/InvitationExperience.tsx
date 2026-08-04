"use client";

import { InvitationProvider } from "@/hooks/useInvitationOpened";
import { ScrollLockEffect } from "@/components/providers/ScrollLockEffect";
import { Hero } from "@/components/sections/Hero";

function InvitationShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollLockEffect />
      <Hero />
      <main id="main-content" className="reel-scroll">
        {children}
      </main>
    </>
  );
}

export function InvitationExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InvitationProvider>
      <InvitationShell>{children}</InvitationShell>
    </InvitationProvider>
  );
}
