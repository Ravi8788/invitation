export interface Couple {
  bride: string;
  groom: string;
  monogram: string;
  caricature?: string;
  brideParents: string;
  groomParents: string;
  initials: string;
  brideRole?: string;
  groomRole?: string;
  bridePortrait?: string;
  groomPortrait?: string;
  brideGrandparents?: string;
  groomGrandparents?: string;
}

export interface WeddingDate {
  date: string;
  time: string;
  iso: string;
  display: string;
  dateRange: string;
  celebrationTitle: string;
}

export interface HeroContent {
  eyebrow: string;
  tagline: string;
  sanskrit?: string;
  scrollHint?: string;
}

export interface Venue {
  name: string;
  city: string;
  address: string;
  nearestLandmark: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsUrl: string;
  directionsUrl: string;
}

export interface StoryMilestone {
  id: string;
  title: string;
  description: string;
  icon: "users" | "heart" | "gem" | "sparkles";
  year?: string;
  monthLabel?: string;
  image?: string;
}

export interface PromiseContent {
  subtitle: string;
  date: string;
  caption: string;
  captionSuffix: string;
  ringImage?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
  icon: string;
}

export interface DressColor {
  hex: string;
  name: string;
}

export interface DressCodeItem {
  id: string;
  event: string;
  title: string;
  description: string;
  colors: DressColor[];
  illustration: "haldi" | "mehendi" | "sangeet" | "wedding" | "reception" | "engagement";
}

export interface AttireContent {
  eyebrow: string;
  subtitle: string;
  avoidNote: string;
}

export interface FamilyMember {
  name: string;
  relation: string;
  photo?: string;
}

export interface Family {
  title: string;
  note: string;
  label?: string;
  subtitle?: string;
  members: FamilyMember[];
}

export interface GuestAssistanceItem {
  id: string;
  icon: "hotel" | "car" | "phone" | "alert-circle";
  label: string;
  detail: string;
  phone?: string;
  link?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface UiStrings {
  opener: {
    ganeshaMantra: string;
    eventTitle: string;
    openButton: string;
    scrollHint: string;
  };
  heroLayers: {
    tradition: {
      titlePrefix: string;
      titleAccent: string;
      body: string;
      tagline: string;
    };
    muhurat: {
      eyebrow: string;
      eventLabel: string;
      venueLabel: string;
    };
    celebration: {
      eyebrow: string;
      title: string;
      body: string;
      cta: string;
    };
  };
  door: {
    eyebrow: string;
    tapHint: string;
    eventLabel: string;
  };
  nav: {
    home: string;
    date: string;
    venue: string;
    family: string;
    quotes: string;
  };
  countdown: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    subtitle: string;
    scratchTitle: string;
    scratchHint: string;
    untilEvent: string;
    completeMessage: string;
    units: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
  };
  saveDate: {
    eyebrow: string;
  };
  couple: {
    eyebrow: string;
    title: string;
    sonOf: string;
    daughterOf: string;
  };
  venue: {
    titlePrefix: string;
    titleAccent: string;
    directions: string;
    eyebrow: string;
    subtitle: string;
    locationLabel: string;
    dateLabel: string;
    scheduleLabel: string;
    parkingLabel: string;
    parkingNote: string;
  };
  family: {
    eyebrow: string;
    title: string;
    subtitle: string;
    swagatTitle: string;
    welcomedBy: string;
    darshanTitle: string;
    awaitingBlessings: string;
    parivaarLine: string;
    guestsLine: string;
  };
  program: {
    eyebrow: string;
    title: string;
  };
  quotes: {
    title: string;
  };
  footer: {
    developer: string;
    madeFor: string;
    backToTop: string;
    shloka: string;
    shlokaEnglish: string;
    eventLabel: string;
    metaLine: string;
    navLinks: ReadonlyArray<{ label: string; href: string }>;
  };
}

export interface WeddingConfig {
  eventType: "engagement" | "wedding" | "supari-sukharpuda";
  couple: Couple;
  hero: HeroContent;
  subtitle: string;
  weddingDate: WeddingDate;
  venue: Venue;
  quote: string;
  quotes: string[];
  storyNarrative: string;
  story: StoryMilestone[];
  promise: PromiseContent;
  attire: AttireContent;
  events: WeddingEvent[];
  dressCode: DressCodeItem[];
  families: {
    bride: Family;
    groom: Family;
  };
  guestAssistance: GuestAssistanceItem[];
  social: SocialLink[];
  blessings: {
    intro: string;
    successMessage: string;
  };
  ui: UiStrings;
  metadata: {
    title: string;
    description: string;
    ogImage: string;
  };
}
