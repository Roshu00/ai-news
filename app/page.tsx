import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/db/prisma";

export default async function Home() {
  const articles = await prisma.article.findMany({
    include: {
      category: true,
    },
  });

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article) => (
          <Card key={article.id} className="shadow-none">
            <CardHeader className="p-2">
              <div className="aspect-video bg-muted rounded-lg w-full" />
            </CardHeader>
            <CardContent className="pt-4 pb-5">
              <Badge>{article.category?.name}</Badge>

              <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight">
                {article.title}
              </h3>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <span className="text-muted-foreground font-semibold">
                    John Doe
                  </span>
                </div>

                <span className="text-muted-foreground text-sm">
                  Nov 30, 2024
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
