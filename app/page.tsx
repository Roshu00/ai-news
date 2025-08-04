import Hero from "@/components/hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { prisma } from "@/db/prisma";
import { ArticleStatus } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const articles = await prisma.article.findMany({
    where: {
      status: {
        not: ArticleStatus.DRAFT,
      },
    },
    include: {
      category: true,
      user: true,
      thumbnail: true,
    },
  });

  return (
    <>
      <Hero />
      <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <Link href={`/article/${article.slug}`} key={article.id}>
              <Card className="shadow-none">
                <CardHeader className="p-2">
                  <div className="aspect-video bg-muted rounded-lg w-full relative overflow-hidden">
                    <Image
                      src={article.thumbnail?.url || "/api/og/" + article.slug}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-4 pb-5">
                  <Badge>{article.category?.name}</Badge>

                  <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight">
                    {article.title}
                  </h3>
                  <div className="mt-6 flex items-center justify-between">
                    {article.user && <UserAvatar user={article.user} />}

                    <span className="text-muted-foreground text-sm">
                      {article.createdAt.getDate()}.
                      {article.createdAt.getMonth()}.
                      {article.createdAt.getFullYear()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
