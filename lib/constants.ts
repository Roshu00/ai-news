import { ArticleCreationStep } from "@prisma/client";

export const STEP_ORDER = [
  ArticleCreationStep.CARD,
  ArticleCreationStep.CONTENT,
  ArticleCreationStep.SEO,
  ArticleCreationStep.FINISHED,
] as ArticleCreationStep[];
