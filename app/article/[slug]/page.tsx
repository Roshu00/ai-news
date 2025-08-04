import { getPublicArticle } from "@/actions/article.actions";
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

  if (!article) return notFound();

  const renderedContent = article.content
    ? await renderMarkdownToHtml(article.content)
    : "";

  return (
    <article className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0 prose">
      <div className="flex items-center gap-2 mb-4">
        <Badge>{article?.category?.name}</Badge>
      </div>
      <h1>{article?.title}</h1>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </article>
  );
};

export default Article;
