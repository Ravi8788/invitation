import type { WeddingConfig } from "@/types";

/** Single-event engagement invitation — Sonal & Avishkar */
export const WEDDING: WeddingConfig = {
  eventType: "engagement",

  couple: {
    bride: "Sonal",
    groom: "Avishkar",
    monogram: "S ❤ A",
    initials: "SA",
    brideParents: "Mrs. Sharma & Mr. Sharma",
    groomParents: "Mrs. Patil & Mr. Patil",
  },

  hero: {
    eyebrow: "You're Cordially Invited",
    scrollHint: "Scroll to begin the story",
    tagline: "Ring ceremony & celebration with our families",
  },

  subtitle:
    "Together with our families, we cordially invite you to our engagement ceremony",

  storyNarrative:
    "Our paths crossed at a mutual friend's gathering — what began as chance quickly became late-night conversations, shared dreams, and countless cups of chai. We discovered a love that felt like home, and now we invite you to celebrate the beginning of our forever.",

  weddingDate: {
    date: "16 August 2026",
    time: "11:00 AM",
    iso: "2026-08-16T11:00:00+05:30",
    display: "16 August 2026 · 11:00 AM",
    dateRange: "16 August 2026",
    celebrationTitle: "Ring Ceremony & Celebration",
  },

  venue: {
    name: "Lakeview Hotel",
    city: "Satara",
    nearestLandmark: "Near Godoli Lake",
    address:
      "Hotel Lake View, Near Godoli Lake, Satara Rahimatpur Road, MIDC, Satara, Maharashtra 415001",
    coordinates: {
      lat: 17.6838,
      lng: 74.0042,
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Lake+View+Near+Godoli+Lake+Satara+Rahimatpur+Road+MIDC+Satara+Maharashtra+415001",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Lake+View+Near+Godoli+Lake+Satara+Rahimatpur+Road+MIDC+Satara+Maharashtra+415001",
  },

  quote:
    "Love is not about how many days, months, or years you have been together — it is about how much you love each other every single day.",

  story: [
    {
      id: "first-meet",
      title: "A Chance Encounter",
      monthLabel: "OCTOBER 2019",
      description:
        "Our paths crossed at a mutual friend's gathering — a chance encounter that felt anything but accidental. One conversation led to another, and we knew something special had begun.",
      icon: "users",
      year: "2019",
    },
    {
      id: "falling-in-love",
      title: "The Alignment of Hearts",
      monthLabel: "MARCH 2020",
      description:
        "Late-night conversations, shared dreams, and countless cups of chai — we discovered a love that felt like home. Every moment together felt written in the stars.",
      icon: "heart",
      year: "2020",
    },
    {
      id: "engagement",
      title: "The Auspicious Betrothal",
      monthLabel: "SEPTEMBER 2026",
      description:
        "Under a canopy of stars, Avishkar asked the question. Sonal said yes — and now we invite you to celebrate this cherished milestone with us.",
      icon: "gem",
      year: "2026",
    },
  ],

  promise: {
    subtitle: "A promise made, a forever begun",
    date: "16 August 2026",
    captionSuffix: "The moment it became forever",
    caption: "16 August 2026 · The moment it became forever",
  },

  events: [
    {
      id: "engagement",
      name: "Engagement Ceremony",
      date: "16 August 2026",
      time: "11:00 AM",
      venue: "Lakeview Hotel, Satara",
      description:
        "Join us for the ring ceremony, blessings from our families, and an evening of celebration.",
      icon: "gem",
    },
  ],

  attire: {
    eyebrow: "Dress to Impress",
    subtitle: "Celebrate in colour — honour the evening in your finest festive wear",
    avoidNote: "Please avoid plain white or all-black ensembles",
  },

  dressCode: [
    {
      id: "engagement-dress",
      event: "Engagement Evening",
      title: "Festive Semi-Formal",
      description:
        "Rich Indian festive wear — think royal maroons, antique golds, jewel tones, and elegant creams. Sherwanis, lehengas, sarees, and Indo-western all welcome.",
      colors: [
        { hex: "#7A1E2B", name: "Royal Maroon" },
        { hex: "#D4AF37", name: "Antique Gold" },
        { hex: "#FFFDF9", name: "Ivory Cream" },
        { hex: "#191970", name: "Midnight Blue" },
        { hex: "#006400", name: "Emerald" },
      ],
      illustration: "engagement",
    },
  ],

  families: {
    bride: {
      title: "Bride's Side",
      label: "Swagatotsuk",
      subtitle: "Welcomed With Joy By",
      note: "With hearts full of joy, we welcome you to celebrate our daughter's engagement.",
      members: [
        { name: "Mr. & Mrs. Sharma", relation: "Parents of the Bride" },
        { name: "Priya Sharma", relation: "Sister of the Bride" },
      ],
    },
    groom: {
      title: "Groom's Side",
      label: "Darshanaabhilashi",
      subtitle: "Awaiting Your Blessings",
      note: "With immense pride and happiness, we invite you to bless our son on this special day.",
      members: [
        { name: "Mr. & Mrs. Patil", relation: "Parents of the Groom" },
        { name: "Rahul Patil", relation: "Brother of the Groom" },
      ],
    },
  },

  guestAssistance: [
    {
      id: "parking",
      icon: "car",
      label: "Parking",
      detail: "Complimentary valet parking available at the venue entrance.",
    },
    {
      id: "contact",
      icon: "phone",
      label: "Contact Person",
      detail: "Rahul Patil",
      phone: "+91 98765 43210",
      link: "tel:+919876543210",
    },
    {
      id: "emergency",
      icon: "alert-circle",
      label: "Emergency Contact",
      detail: "Venue Security",
      phone: "+91 98765 43211",
      link: "tel:+919876543211",
    },
  ],

  social: [],

  blessings: {
    intro:
      "Your presence at our engagement means everything — if you'd like, leave us a few words of love and blessings to carry into this new chapter.",
    successMessage: "Thank you — your blessing has reached our hearts",
  },

  metadata: {
    title: "Sonal & Avishkar — Engagement Invitation",
    description:
      "Join Sonal and Avishkar for their engagement ceremony on 16 August 2026 at Lakeview Hotel, Satara.",
    ogImage: "/opengraph-image",
  },
} as const;

export const INVITATION = WEDDING;
