import { deleteArticle } from "@/actions/article.actions";
import { DeleteDialog } from "@/components/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";
import { ArticleCreationStep, ArticleStatus } from "@prisma/client";
import { ListX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CreatorPage = async () => {
  const session = await auth();
  const articles = await prisma.article.findMany({
    where: { userId: session?.user.id },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      user: true,
      thumbnail: true,
    },
  });

  if (articles.length < 1)
    return (
      <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0 min-h-[80vh] flex items-center justify-center text-muted-foreground">
        <ListX size={80} />
        <h1>Lista članaka je trenutno prazna</h1>
      </div>
    );
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article) => (
          <Card className="shadow-lg h-fit" key={article.id}>
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
              <Badge>
                {article.status === ArticleStatus.DRAFT
                  ? "DRAFT"
                  : article.category?.name}
              </Badge>
              <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight">
                {article.title}
              </h3>
              <p>{article.description}</p>
              <div className="mt-6 flex items-center justify-between">
                {article.user && (
                  <div className="flex items-center gap-2">
                    <UserAvatar user={article.user} />
                  </div>
                )}

                <span className="text-muted-foreground text-sm">
                  {article.createdAt.getDate()}.{article.createdAt.getMonth()}.
                  {article.createdAt.getFullYear()}
                </span>
              </div>
              <div className="flex gap-4">
                <Button className="mt-4 w-full" asChild>
                  <Link href={`/creator/article/${article.slug}`}>
                    Nastavi {article.step}
                  </Link>
                </Button>

                <DeleteDialog id={article.id} action={deleteArticle}>
                  <Button className="mt-4 w-full" variant="destructive">
                    Izbrisi
                  </Button>
                </DeleteDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreatorPage;
