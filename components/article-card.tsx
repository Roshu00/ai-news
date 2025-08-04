import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { ArticleStatus, User } from "@prisma/client";
import { UserAvatar } from "./user-avatar";
import { User as PrismaUser } from "@prisma/client";
import { Session } from "next-auth";

export const ArticleCard = ({
  article,
}: {
  article: Partial<{
    status: ArticleStatus;
    title: string;
    category?: string;
    user: User | PrismaUser | Session["user"];
    createdAt: Date;
    description: string;
    imageUrl?: string | null;
  }>;
}) => {
  const dateCreated = article.createdAt || new Date();
  return (
    <Card className="shadow-none">
      <CardHeader className="p-2">
        <div className="aspect-video bg-muted rounded-lg w-full relative overflow-hidden">
          <Image
            src={article.imageUrl || "/placeholder.webp"}
            alt={article.title || "article title"}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-5">
        <Badge>
          {article.status !== ArticleStatus.DRAFT && article.category
            ? article.category
            : "DRAFT"}
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
            {dateCreated.getDate()}.{dateCreated.getMonth()}.
            {dateCreated.getFullYear()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
