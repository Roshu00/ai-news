import React from "react";
import { prisma } from "@/db/prisma";
import { CreateArticle } from "../../new-article/create-article";
import { ArticleContextProvider } from "../../new-article/article-context";

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

  return (
    <ArticleContextProvider
      currentArticle={
        article
          ? {
              slug: article.slug,
              content: article.content,
              title: article.title,
              description: article.description,
              seoDescription: article.seoDescription,
              seoTitle: article.seoTitle,
              keywords: article.keywords,
              categoryId: article.categoryId,
            }
          : undefined
      }
    >
      <CreateArticle />
    </ArticleContextProvider>
  );
};

export default CreateArticlePage;
