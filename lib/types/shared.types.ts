import { getArticleBySlug } from "@/actions/article.actions";

export type ArticleType = Awaited<ReturnType<typeof getArticleBySlug>>["data"];
