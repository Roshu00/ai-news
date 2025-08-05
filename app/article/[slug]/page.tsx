import { getPublicArticle } from "@/actions/article.actions";
import Article from "@/components/article-full";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/db/prisma";
import { renderMarkdownToHtml } from "@/lib/renderMarkdownToHtml";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await getPublicArticle(slug);

  if (res.success) {
    const article = res.data!;
    return {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.description,
      keywords: article.keywords,
      openGraph: {
        title: article.seoTitle || article.title,
        description: article.seoDescription || article.description!,
        type: "article",
        images: "/api/og/" + article.slug,
      },
    };
  }
  return notFound();
}

const ArticleDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      user: true,
      thumbnail: true,
    },
  });

  if (!article) return notFound();

  return <Article article={article} />;
};

export default ArticleDetails;
