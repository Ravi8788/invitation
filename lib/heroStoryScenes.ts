/** Scroll-synced hero story scenes — progress values are 0–1 of pinned scroll. */
export const HERO_SCENE_RANGES = {
  scene1: { start: 0, end: 0.15 },
  scene2: { start: 0.15, end: 0.3 },
  scene3: { start: 0.3, end: 0.5 },
  scene4: { start: 0.5, end: 0.7 },
  scene5: { start: 0.7, end: 0.85 },
  scene6: { start: 0.85, end: 0.95 },
  scene7: { start: 0.95, end: 1 },
} as const;

export const HERO_STORY_SCENES = [
  {
    id: "1",
    heading: "A Beautiful Beginning",
    subtitle: "Every beautiful journey begins with a promise of forever.",
  },
  {
    id: "2",
    heading: "Celebrating Maharashtrian Traditions",
    subtitle:
      "Rooted in culture, blessed by elders, and filled with love, we begin a new chapter together.",
  },
  {
    id: "3",
    heading: "Sonal ❤️ Avishkar",
    subtitle: "Two hearts. One beautiful journey.",
    isCouple: true,
  },
  {
    id: "4",
    heading: "Engagement Ceremony",
    subtitle: "Join us as we celebrate love, family, and togetherness.",
  },
  {
    id: "5",
    heading: "Save the Date",
    date: "16 August 2026",
    time: "11:00 AM",
    isSaveDate: true,
  },
  {
    id: "6",
    heading: "Venue",
    subtitle: "Lakeview Hotel, Satara",
    isVenue: true,
  },
  {
    id: "7",
    heading: "Your Presence is Our Greatest Blessing",
    subtitle:
      "We warmly invite you and your family to celebrate this special occasion with us.",
    cta: "View Invitation",
    isFinale: true,
  },
] as const;
