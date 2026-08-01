import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF9F6",
          borderRadius: 32,
          border: "4px solid #D4AF37",
        }}
      >
        <span style={{ fontSize: 64, color: "#D4AF37", fontFamily: "Georgia, serif" }}>
          SA
        </span>
      </div>
    ),
    { ...size }
  );
}
