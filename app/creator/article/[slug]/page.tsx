import React from "react";
import { prisma } from "@/db/prisma";
import { CreateArticle } from "../../new-article/create-article";
import { ArticleContextProvider } from "../../new-article/article-context";
import { getArticleBySlug } from "@/actions/article.actions";

const CreateArticlePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return (
    <ArticleContextProvider currentArticle={article.data}>
      <CreateArticle />
    </ArticleContextProvider>
  );
};

export default CreateArticlePage;
