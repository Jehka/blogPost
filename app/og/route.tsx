import { ImageResponse } from "next/og";

export const runtime = "edge";

const BG = "#0e0c0a";
const GOLD = "#c9a96e";
const TEXT = "#f2ebe0";
const MUTED = "#8a8075";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rawTitle = searchParams.get("title")?.trim() || "Theology Subtext";
  const title = rawTitle.length > 140 ? `${rawTitle.slice(0, 137)}…` : rawTitle;

  const tags = (searchParams.get("tags") || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4);

  const titleSize = title.length > 80 ? 52 : title.length > 45 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          borderLeft: `14px solid ${GOLD}`,
          padding: "72px 80px 64px 80px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 999,
                border: `1.5px solid ${GOLD}`,
                color: GOLD,
                fontSize: 22,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontSize: titleSize,
            lineHeight: 1.15,
            color: TEXT,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid rgba(201, 169, 110, 0.35)`,
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", color: GOLD, fontFamily: "serif" }}>
            Theology Subtext
          </div>
          <div style={{ display: "flex", color: MUTED }}>theologysubtext.space</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
