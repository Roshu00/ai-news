import { getArticleBySlug } from "@/actions/article.actions";
import { formatErrors } from "@/lib/utils";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    return new ImageResponse(
      React.createElement(
        "div",
        {
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "40px",
          },
        },
        [
          React.createElement(
            "div",
            {
              key: "title",
              style: {
                fontSize: 60,
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
              },
            },
            article.data?.title ?? "Bez naslova"
          ),
          React.createElement(
            "div",
            {
              key: "subtitle",
              style: {
                fontSize: 30,
                color: "#666",
                marginTop: "20px",
              },
            },
            "Ovo je automatski generisano"
          ),
        ]
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
