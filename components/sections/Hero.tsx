"use client";

import { PinnedVideoStory } from "@/components/animations/PinnedVideoStory";
import { HeroStoryOverlays } from "@/components/sections/HeroStoryOverlays";

export function Hero() {
  return (
    <PinnedVideoStory id="hero">
      <HeroStoryOverlays />
    </PinnedVideoStory>
  );
}
