export interface Couple {
  bride: string;
  groom: string;
  monogram: string;
  caricature: string;
  brideParents: string;
  groomParents: string;
  initials: string;
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

export interface WeddingConfig {
  eventType: "engagement" | "wedding";
  couple: Couple;
  hero: HeroContent;
  subtitle: string;
  weddingDate: WeddingDate;
  venue: Venue;
  quote: string;
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
  metadata: {
    title: string;
    description: string;
    ogImage: string;
  };
}
