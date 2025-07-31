// app/api/og/[slug]/route.tsx
import { getArticleBySlug } from "@/actions/article.actions";
import { formatErrors } from "@/lib/utils";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const article = await getArticleBySlug(slug);

    const title = String(article?.data?.title ?? "Bez naslova");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "40px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "black",
              textAlign: "center",
              maxWidth: "1000px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#666",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Ovo je automatski generisano
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(formatErrors(e));
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
