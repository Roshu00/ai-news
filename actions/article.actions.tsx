"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";
import { createArticleSchema } from "@/lib/validation";
import slugify from "slugify";
import z from "zod";

export const createArticle = async (
  data: z.infer<typeof createArticleSchema>
) => {
  const session = await auth();

  if (session?.user.id) throw new Error("Auth required");

  const newArticle = await prisma.article.create({
    data: { ...data, slug: slugify(data.title), userId: session?.user.id },
  });

  return newArticle;
};
