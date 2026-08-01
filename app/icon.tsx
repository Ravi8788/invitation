import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "50%",
          border: "2px solid #D4AF37",
        }}
      >
        <span style={{ fontSize: 14, color: "#D4AF37", fontFamily: "Georgia, serif" }}>
          SA
        </span>
      </div>
    ),
    { ...size }
  );
}
