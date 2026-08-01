import { ImageResponse } from "next/og";
import { WEDDING } from "@/lib/constants";

export const runtime = "edge";
export const alt = "Sonal & Avishkar Engagement Invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { couple, weddingDate, venue } = WEDDING;

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
          background:
            "linear-gradient(135deg, #FFFDF9 0%, #FAF3E9 50%, #F4D97633 100%)",
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
            background: "rgba(255, 253, 249, 0.9)",
          }}
        >
          <p style={{ fontSize: 28, color: "#7A1E2B", letterSpacing: 8, margin: 0 }}>
            ENGAGEMENT INVITATION
          </p>
          <p
            style={{
              fontSize: 72,
              color: "#241413",
              margin: "24px 0 8px",
              letterSpacing: 4,
            }}
          >
            {couple.bride} & {couple.groom}
          </p>
          <p style={{ fontSize: 32, color: "#D4AF37", margin: "16px 0" }}>
            {weddingDate.display}
          </p>
          <p style={{ fontSize: 24, color: "#6B5A52", margin: 0 }}>
            {venue.name}, {venue.city}
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
