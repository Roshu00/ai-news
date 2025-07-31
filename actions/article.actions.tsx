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
import { ArticleStatus } from "@prisma/client";

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

export const getArticleBySlug = async (slug: string) => {
  try {
    const user = await requireUser();
    const article = await prisma.article.findFirst({
      where: {
        userId: user.id,
        slug,
      },
      include: {
        user: true,
        category: true,
      },
    });
    return formatSuccess("Article found!", article);
  } catch (err) {
    return formatError(err, null);
  }
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
      include: {
        user: true,
        category: true,
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
      include: {
        user: true,
        category: true,
      },
    });
    return formatSuccess("Article is updated", article);
  } catch (err) {
    return formatError(err);
  }
};

export const publishArticle = async (slug: string) => {
  try {
    const user = await requireUser();
    const article = await prisma.article.update({
      where: {
        userId: user.id,
        slug,
      },
      data: {
        status: ArticleStatus.PUBLIC,
      },
    });
    return formatSuccess("Article is published", article);
  } catch (err) {
    return formatError(err);
  }
};

export const getPublicArticle = async (slug: string) => {
  try {
    const article = await prisma.article.findFirst({
      where: {
        slug,
      },
      include: {
        user: true,
        category: true,
      },
    });
    return formatSuccess("Article found!", article);
  } catch (err) {
    return formatError(err, null);
  }
};
