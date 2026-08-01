/** Address query for Google Maps search & optional Embed API */
export const VENUE_MAPS_QUERY =
  "Hotel+Lake+View,+Near+Godoli+Lake,+Satara+Rahimatpur+Road,+MIDC,+Satara,+Maharashtra+415001";

export const VENUE_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=Hotel+Lake+View+Near+Godoli+Lake+Satara+Rahimatpur+Road+MIDC+Satara+Maharashtra+415001";

/**
 * Google Maps place embed for Hotel Lake View (from Google Maps share).
 * Works without an API key — address resolves to the verified place.
 */
export const VENUE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3788.169176378457!2d74.00416957597148!3d17.683769983204995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2386c9f69f80f%3A0x6b4f74d00cf0440!2sHotel%20Lake%20View!5e0!3m2!1sen!2sin!4v1722513904639!5m2!1sen!2sin";

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
