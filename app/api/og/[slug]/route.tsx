// Minimal edge runtime version
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Don't make database calls in edge runtime - use query params instead
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Bez naslova";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 60,
          backgroundColor: "white",
        }}
      >
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
