import { prisma } from "@/db/prisma";
import ReactMarkdown from "react-markdown";
import React from "react";
import { Badge } from "@/components/ui/badge";

const Article = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });
  return (
    <article className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0 prose">
      <div className="flex items-center gap-2 mb-4">
        <Badge>{article?.category?.name}</Badge>
      </div>
      <h1>{article?.title}</h1>
      <ReactMarkdown>{article?.content || ""}</ReactMarkdown>
    </article>
  );
};

export default Article;
