/** Hero cinematic story — scroll progress 0–1 maps to pinned scroll distance (600vh). */
export const HERO_SCROLL_END = "+=600%" as const;

export const HERO_SCENE_RANGES = {
  scene1: { start: 0, end: 0.15 },
  scene2: { start: 0.15, end: 0.3 },
  scene3: { start: 0.3, end: 0.45 },
  scene4: { start: 0.45, end: 0.6 },
  scene5: { start: 0.6, end: 0.75 },
  scene6: { start: 0.75, end: 0.9 },
  scene7: { start: 0.9, end: 1 },
} as const;

export const HERO_STORY_SCENES = [
  {
    id: "1",
    eyebrow: "Together with their families",
    heading: "A Beautiful Beginning",
    subtitle: "Every beautiful journey begins with a promise of forever.",
  },
  {
    id: "2",
    heading: "Celebrating Maharashtrian Traditions",
    subtitleLines: ["Rooted in culture.", "Blessed by elders.", "United by love."],
  },
  {
    id: "3",
    bride: "Sonal",
    groom: "Avishkar",
    subtitleLines: [
      "Together with our families,",
      "we joyfully invite you",
      "to celebrate our Engagement Ceremony.",
    ],
    isCouple: true as const,
  },
  {
    id: "4",
    heading: "Engagement Ceremony",
    subtitleLines: [
      "A celebration of love,",
      "family,",
      "tradition,",
      "and new beginnings.",
    ],
  },
  {
    id: "5",
    heading: "Save the Date",
    date: "16 August 2026",
    time: "11:00 AM",
    isSaveDate: true as const,
  },
  {
    id: "6",
    heading: "Venue",
    venueName: "Lakeview Hotel",
    venueCity: "Satara",
    cta: "View Invitation",
    isVenue: true as const,
  },
  {
    id: "7",
    heading: "Your Presence Is Our Greatest Blessing",
    subtitleLines: [
      "We warmly invite you and your family",
      "to celebrate this beautiful occasion.",
    ],
    cta: "Begin Invitation",
    isFinale: true as const,
  },
] as const;
