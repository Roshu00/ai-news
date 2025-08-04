import { prisma } from "@/db/prisma";
import { ArticleContextProvider } from "./article-context";
import { CreateArticle } from "./create-article";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

const CreateArticlePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();
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
      <SessionProvider session={session}>
        <CreateArticle />
      </SessionProvider>
    </ArticleContextProvider>
  );
};

export default CreateArticlePage;
