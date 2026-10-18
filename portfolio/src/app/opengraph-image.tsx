import { ImageResponse } from "next/og";

export const alt = "[YOUR NAME] | Full-Stack Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0b",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
        height: "100%",
        fontSize: 64,
        fontWeight: 700,
      }}
    >
      [YOUR NAME]
      <span style={{ color: "#34d399", fontSize: 28, marginTop: 24 }}>
        Full-Stack Engineer
      </span>
    </div>,
    size,
  );
}