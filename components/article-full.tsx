import { renderMarkdownToHtml } from "@/lib/renderMarkdownToHtml";
import { ArticleType } from "@/lib/types/shared.types";
import { Badge } from "lucide-react";
import Image from "next/image";
import React from "react";

const Article = async ({ article }: { article?: ArticleType }) => {
  if (!article) return null;

  const renderedContent = article.content
    ? await renderMarkdownToHtml(article.content)
    : "";

  return (
    <article className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0 prose">
      <div className="max-w-3xl">
        <div className="w-full max-w-xl aspect-video relative">
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
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      </div>
    </article>
  );
};

export default Article;
