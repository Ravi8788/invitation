import { ImageResponse } from "next/og";
import { WEDDING } from "@/lib/constants";

export const runtime = "edge";
export const alt = WEDDING.metadata.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { couple, weddingDate, venue, events } = WEDDING;
  const eventName = events[0]?.name ?? weddingDate.celebrationTitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4A0812 0%, #6B0F1A 50%, #8B1538 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid #D4AF37",
            borderRadius: 24,
            padding: "64px 80px",
            background: "rgba(74, 8, 18, 0.85)",
          }}
        >
          <p style={{ fontSize: 28, color: "#D4AF37", letterSpacing: 6, margin: 0 }}>
            {eventName}
          </p>
          <p style={{ fontSize: 64, color: "#FFF8F0", margin: "24px 0 8px" }}>
            {couple.bride} आणि {couple.groom}
          </p>
          <p style={{ fontSize: 32, color: "#D4AF37", margin: "16px 0" }}>
            {weddingDate.display}
          </p>
          <p style={{ fontSize: 24, color: "#FFF8F0", margin: 0, opacity: 0.85 }}>
            {venue.name}, {venue.city}
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
