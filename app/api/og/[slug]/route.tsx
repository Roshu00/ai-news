// app/api/og/[slug]/route.tsx
import { getPublicArticle } from "@/actions/article.actions";
import { formatErrors } from "@/lib/utils";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Handle potential null responses
    const articleResult = await getPublicArticle(slug);
    const article = articleResult?.data || null;

    // Safely extract data with fallbacks
    const title = article?.title || "Bez naslova";
    const category = article?.category?.name || "";
    const author = article?.user?.name || "";
    const description = article?.description || "";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            background:
              "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%)",
            position: "relative",
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            overflow: "hidden",
          }}
        >
          {/* Animated Background Grid */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              opacity: 0.4,
            }}
          />

          {/* Glowing Orbs */}
          <div
            style={{
              position: "absolute",
              top: "-200px",
              right: "-200px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,69,255,0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-200px",
              left: "-200px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              padding: "50px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              {category && (
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139,69,255,0.2) 0%, rgba(59,130,246,0.2) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "10px 20px",
                    borderRadius: "25px",
                    fontSize: "16px",
                    color: "#e2e8f0",
                    fontWeight: 600,
                    backdropFilter: "blur(20px)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {category}
                </div>
              )}
            </div>

            {/* Title Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              <div
                style={{
                  fontSize:
                    title.length > 60
                      ? "42px"
                      : title.length > 40
                      ? "50px"
                      : "58px",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  maxWidth: "950px",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 40px rgba(255,255,255,0.1)",
                  letterSpacing: "-0.03em",
                  marginBottom: description ? "15px" : "0",
                }}
              >
                {title}
              </div>

              {description && (
                <div
                  style={{
                    fontSize: "18px",
                    color: "#94a3b8",
                    lineHeight: 1.4,
                    maxWidth: "700px",
                    fontWeight: 400,
                  }}
                >
                  {description.length > 120
                    ? description.substring(0, 120) + "..."
                    : description}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              {author && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px 20px",
                    borderRadius: "40px",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #8b45ff 0%, #3b82f6 100%)",
                      marginRight: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "white",
                      boxShadow: "0 4px 20px rgba(139,69,255,0.3)",
                    }}
                  >
                    {author.charAt(0).toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#e2e8f0",
                      fontWeight: 600,
                    }}
                  >
                    {author}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Accent Lines */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "4px",
              background:
                "linear-gradient(90deg, #8b45ff 0%, #3b82f6 50%, #06b6d4 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "40%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, #8b45ff 100%)",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error("OG Image Error:", formatErrors(e));

    // Fallback error image
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1a1a3e",
            color: "white",
            fontSize: "32px",
            fontFamily: "system-ui",
          }}
        >
          Greška pri generisanju slike
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
