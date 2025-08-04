import React from "react";
import { prisma } from "@/db/prisma";
import { CreateArticle } from "../../new-article/create-article";
import { ArticleContextProvider } from "../../new-article/article-context";
import { getArticleBySlug } from "@/actions/article.actions";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

const CreateArticlePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return (
    <ArticleContextProvider currentArticle={article.data}>
      <SessionProvider session={session}>
        <CreateArticle />
      </SessionProvider>
    </ArticleContextProvider>
  );
};

export default CreateArticlePage;
