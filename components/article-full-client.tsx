"use client";
import { ArticleType } from "@/lib/types/shared.types";
import MDEditor from "@uiw/react-md-editor";
import { Badge } from "./ui/badge";
import Image from "next/image";

const ArticleClient = ({ article }: { article?: ArticleType }) => {
  if (!article) return null;

  return (
    <article
      className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0 prose"
      data-color-mode="light"
    >
      <div className="max-w-3xl">
        <div className="w-full aspect-video relative">
          <Image
            src={article.thumbnail?.url || "/placeholder.webp"}
            fill
            alt={article.title}
            className="object-cover"
          />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Badge>{article?.category?.name}</Badge>
        </div>
        <h1>{article?.title}</h1>
        <div className="w-full prose">
          <MDEditor.Markdown
            source={article.content || ""}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      </div>
    </article>
  );
};

export default ArticleClient;
