"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";
import {
  createArticleSchema,
  createArticleStepFourthSchema,
  createArticleStepOneSchema,
  createArticleStepThreeSchema,
  createArticleStepTwoSchema,
} from "@/lib/validation";
import slugify from "slugify";
import z from "zod";
import { requireUser } from "./helpers.action";
import {
  formatError,
  formatErrors,
  formatResponse,
  formatSuccess,
} from "@/lib/utils";

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

export const createArticleStepOne = async (
  data: z.infer<typeof createArticleStepOneSchema>
) => {
  try {
    const user = await requireUser();
    const newArticle = await prisma.article.create({
      data: {
        slug: slugify(data.title),
        ...data,
        userId: user.id,
      },
    });

    return formatSuccess("Article is created", newArticle);
  } catch (err) {
    return formatError(err);
  }
};

export const updateArticle = async (
  slug: string,
  data:
    | z.infer<typeof createArticleStepOneSchema>
    | z.infer<typeof createArticleStepTwoSchema>
    | z.infer<typeof createArticleStepFourthSchema>
    | z.infer<typeof createArticleStepThreeSchema>
) => {
  console.log(data);
  try {
    const user = await requireUser();
    const article = await prisma.article.update({
      where: {
        slug,
        userId: user.id,
      },
      data: {
        ...data,
      },
    });
    console.log(article);
    return formatSuccess("Article is updated", article);
  } catch (err) {
    return formatError(err);
  }
};
