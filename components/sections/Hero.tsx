"use client";

import { PinnedVideoStory } from "@/components/animations/PinnedVideoStory";
import { HeroStoryOverlays } from "@/components/sections/HeroStoryOverlays";
import { HeroNav } from "@/components/ui/HeroNav";

export function Hero() {
  return (
    <>
      <HeroNav />
      <PinnedVideoStory id="hero">
        <HeroStoryOverlays />
      </PinnedVideoStory>
    </>
  );
}
