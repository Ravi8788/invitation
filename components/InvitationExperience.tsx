"use client";

import { InvitationProvider, useInvitationOpened } from "@/hooks/useInvitationOpened";
import { BackgroundMusicProvider, useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { ScrollLockEffect } from "@/components/providers/ScrollLockEffect";
import { HeroScrollMountSync } from "@/components/providers/HeroScrollMountSync";
import { GaneshaOpener } from "@/components/animations/GaneshaOpener";
import { Hero } from "@/components/sections/Hero";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { cn } from "@/lib/utils";

function InvitationShell({ children }: { children: React.ReactNode }) {
  const { loaderComplete, completeLoader, skipLoader } = useInvitationOpened();
  const { play } = useBackgroundMusic();

  const handleOpenInvitation = () => {
    completeLoader();
    void play();
  };

  return (
    <>
      <ScrollLockEffect />
      <HeroScrollMountSync />
      {!skipLoader && !loaderComplete ? (
        <GaneshaOpener onComplete={handleOpenInvitation} />
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
          <MusicToggle />
        </>
      ) : null}
    </>
  );
}

export function InvitationExperience({ children }: { children: React.ReactNode }) {
  return (
    <InvitationProvider>
      <BackgroundMusicProvider>
        <InvitationShell>{children}</InvitationShell>
      </BackgroundMusicProvider>
    </InvitationProvider>
  );
}
