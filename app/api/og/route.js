import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Season color palettes for OG images
const seasonPalettes = {
  "Clear Spring": ["#FF6B4A", "#FFB347", "#FFD700", "#85C88A", "#40B5AD", "#FF8FAB"],
  "True Spring": ["#E8A838", "#F5C242", "#8DBE6D", "#FF7F50", "#FFAA5C", "#4DB8A4"],
  "Light Spring": ["#FFB5BA", "#FFDAB9", "#E8D5B7", "#A8D5BA", "#87CEEB", "#DDA0DD"],
  "Light Summer": ["#C9B1FF", "#B0C4DE", "#DDA0DD", "#87CEEB", "#D8BFD8", "#F0E68C"],
  "True Summer": ["#8B93AF", "#A0A0C0", "#C4A4C9", "#7B9BAA", "#B0A0B8", "#8899AA"],
  "Soft Summer": ["#B8B0A0", "#C4B8A8", "#A0A898", "#C0A8B0", "#B0A8B8", "#98A0A0"],
  "Soft Autumn": ["#C4A265", "#B89A72", "#8B8B6B", "#A08060", "#C5A880", "#7B8B6B"],
  "True Autumn": ["#C85A17", "#CC7722", "#8B6914", "#A0522D", "#B8860B", "#6B8E23"],
  "Deep Autumn": ["#8B4513", "#A0522D", "#556B2F", "#8B0000", "#CD853F", "#6B4423"],
  "Deep Winter": ["#1C1C3A", "#8B0000", "#006400", "#191970", "#4B0082", "#800020"],
  "True Winter": ["#0000CD", "#DC143C", "#006400", "#4B0082", "#FF1493", "#00CED1"],
  "Clear Winter": ["#FF0080", "#00BFFF", "#FF4500", "#9400D3", "#00FF7F", "#FF1493"],
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const season = searchParams.get("season") || "True Spring";
  const colors = seasonPalettes[season] || seasonPalettes["True Spring"];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #FFFBF7 0%, #F5EDE4 40%, #EDE5D8 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            fontSize: 14,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#C4A265",
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          SHADE DNA BY ALLELE
        </div>

        {/* Season Name */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#1a1a1a",
            lineHeight: 1.05,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {season}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 50,
            height: 3,
            background: colors[0] || "#C4A265",
            borderRadius: 2,
            marginBottom: 28,
            display: "flex",
          }}
        />

        {/* Color swatches */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 4px 12px ${color}40`,
                display: "flex",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "#8B8B7A",
            fontWeight: 300,
            letterSpacing: "0.04em",
          }}
        >
          Find your color season → allele.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
