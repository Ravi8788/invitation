"use client";

import { InvitationProvider, useInvitationOpened } from "@/hooks/useInvitationOpened";
import { ScrollLockEffect } from "@/components/providers/ScrollLockEffect";
import { Loader } from "@/components/sections/Loader";
import { Hero } from "@/components/sections/Hero";

function InvitationShell({ children }: { children: React.ReactNode }) {
  const {
    loaderComplete,
    skipLoader,
    completeLoader,
  } = useInvitationOpened();

  const showLoader = !loaderComplete && !skipLoader;

  return (
    <>
      <ScrollLockEffect />
      {showLoader && <Loader onComplete={completeLoader} />}
      <Hero />
      <main id="main-content">{children}</main>
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
