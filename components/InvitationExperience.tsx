"use client";

import { InvitationProvider, useInvitationOpened } from "@/hooks/useInvitationOpened";
import { ScrollLockEffect } from "@/components/providers/ScrollLockEffect";
import { HeroScrollMountSync } from "@/components/providers/HeroScrollMountSync";
import { GaneshaOpener } from "@/components/animations/GaneshaOpener";
import { Hero } from "@/components/sections/Hero";
import { cn } from "@/lib/utils";

function InvitationShell({ children }: { children: React.ReactNode }) {
  const { loaderComplete, completeLoader, skipLoader } = useInvitationOpened();

  return (
    <>
      <ScrollLockEffect />
      <HeroScrollMountSync />
      {!skipLoader && !loaderComplete ? (
        <GaneshaOpener onComplete={completeLoader} />
      ) : null}
      {loaderComplete ? (
        <>
          <Hero />
          <main
            id="main-content"
            className={cn(
              "relative w-full bg-onyx-dark transition-opacity duration-1000",
              loaderComplete ? "opacity-100" : "opacity-0",
            )}
          >
            {children}
          </main>
        </>
      ) : null}
    </>
  );
}

export function InvitationExperience({ children }: { children: React.ReactNode }) {
  return (
    <InvitationProvider>
      <InvitationShell>{children}</InvitationShell>
    </InvitationProvider>
  );
}
