import React from "react";
import { CreateArticle } from "./create-article";
import { prisma } from "@/db/prisma";
import { ArticleContextProvider } from "./article-context";

const CreateArticlePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: {
      slug,
    },
    include: {
      category: true,
      user: true,
    },
  });

  if (!article) return null;

  return (
    <ArticleContextProvider currentArticle={undefined}>
      <CreateArticle />
    </ArticleContextProvider>
  );
};

export default CreateArticlePage;
