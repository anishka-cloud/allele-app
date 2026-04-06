import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Full 10-color palettes matching seasonData.js bestColors
const seasonPalettes = {
  "Clear Spring": ["#FF6B6B", "#FF8C42", "#FFD166", "#06D6A0", "#118AB2", "#FF4365", "#F8961E", "#43AA8B", "#F94144", "#577590"],
  "True Spring": ["#FFD700", "#FF9F43", "#F8B500", "#4CAF50", "#FF6348", "#FECA57", "#FF7878", "#1ABC9C", "#E17055", "#A3CB38"],
  "Light Spring": ["#FFE4B5", "#FFB6C1", "#FFDAB9", "#98FB98", "#DDA0DD", "#FFC0CB", "#B0E0E6", "#F0E68C", "#AFEEEE", "#FFE4E1"],
  "Soft Summer": ["#C9929D", "#8E8E9A", "#7B9BA6", "#A4B494", "#B0A4C4", "#9EB1BD", "#C4A4B0", "#A0A0B0", "#8FAE80", "#D4B0C0"],
  "True Summer": ["#6495ED", "#DA70D6", "#DB7093", "#5F9EA0", "#BA55D3", "#778899", "#87CEEB", "#C71585", "#DDA0DD", "#B0C4DE"],
  "Light Summer": ["#B0C4DE", "#E6E6FA", "#FFC0CB", "#ADD8E6", "#DDA0DD", "#E0BBE4", "#98D8C8", "#B5EAD7", "#F7CAC9", "#87CEEB"],
  "Soft Autumn": ["#C4A882", "#A09060", "#8B7355", "#B5A68C", "#9B8B6B", "#C0A080", "#A89070", "#8A9A6B", "#B08F70", "#6B7B5B"],
  "True Autumn": ["#CC6633", "#CD853F", "#8B6914", "#A0522D", "#006400", "#B8860B", "#D2691E", "#556B2F", "#DAA520", "#8B4513"],
  "Dark Autumn": ["#8B4513", "#556B2F", "#8B0000", "#B8860B", "#800020", "#483D8B", "#CD853F", "#2E8B57", "#A0522D", "#4A3728"],
  "Dark Winter": ["#191970", "#8B008B", "#800020", "#006400", "#4B0082", "#B22222", "#2F4F4F", "#8B0000", "#483D8B", "#800080"],
  "True Winter": ["#FF0000", "#0000CD", "#008B8B", "#9400D3", "#DC143C", "#4169E1", "#000000", "#FFFFFF", "#00CED1", "#C71585"],
  "Bright Winter": ["#FF1493", "#00BFFF", "#00FF7F", "#FF4500", "#9400D3", "#1E90FF", "#FF69B4", "#00CED1", "#FF6347", "#4169E1"],
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
          background: "#FBF8F4",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            fontSize: 14,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#B8A080",
            marginBottom: 20,
            fontWeight: 400,
          }}
        >
          YOUR COLOR SEASON
        </div>

        {/* You're a */}
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 400,
            color: "#1a1a1a",
            lineHeight: 1.1,
            marginBottom: 4,
          }}
        >
          You're a
        </div>

        {/* Season Name - italic, larger */}
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#1a1a1a",
            lineHeight: 1.1,
            marginBottom: 36,
            textAlign: "center",
          }}
        >
          {season}
        </div>

        {/* Color swatches - all 10 in a row */}
        <div style={{ display: "flex", gap: 14 }}>
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: color,
                display: "flex",
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
