/** Shared Google Maps link for Lakeview Hotel, Satara */
export const VENUE_MAPS_URL = "https://maps.app.goo.gl/wpMpgsiBLyYvQA2t9";

/** Address query for Google Maps Embed API (when API key is set) */
export const VENUE_MAPS_QUERY =
  "Hotel+Lake+View,+Satara,+Maharashtra+415001";

export const VENUE_DIRECTIONS_URL = VENUE_MAPS_URL;

/** Verified place coordinates from the shared Maps link */
export const VENUE_COORDINATES = {
  lat: 17.6803341,
  lng: 74.0173874,
} as const;

/**
 * Google Maps place embed for Hotel Lake View (from shared Maps link).
 * Works without an API key — pins the verified place.
 */
export const VENUE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3788.338588756914!2d74.0173874!3d17.6803341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc239effcab37ed%3A0x94a9c71df65890b3!2sHotel%20Lake%20View!5e0!3m2!1sen!2sin!4v1722513904639!5m2!1sen!2sin";

/**
 * Returns a Google Maps iframe src.
 * Uses the official Embed API when NEXT_PUBLIC_GOOGLE_MAPS_KEY is set;
 * otherwise falls back to the free place embed (no key required).
 */
export function getMapsEmbedUrl(): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (key) {
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${VENUE_MAPS_QUERY}`;
  }
  return VENUE_MAPS_EMBED_URL;
}
