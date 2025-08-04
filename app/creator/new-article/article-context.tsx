"use client";
import { getArticleBySlug } from "@/actions/article.actions";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { ArticleCreationStep } from "@prisma/client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type DataType = Awaited<ReturnType<typeof getArticleBySlug>>["data"];

type ArticleContextType = {
  article: DataType | undefined | null;
  setStep: React.Dispatch<React.SetStateAction<ArticleCreationStep>>;
  setArticle: React.Dispatch<React.SetStateAction<DataType | undefined | null>>;
  step: ArticleCreationStep;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleContextProvider = ({
  children,
  currentArticle,
}: {
  children: ReactNode;
  currentArticle: DataType | undefined;
}) => {
  const [step, setStep] = useState<ArticleCreationStep>(
    currentArticle?.step || ArticleCreationStep.CARD
  );
  const [article, setArticle] = useState<
    Awaited<ReturnType<typeof getArticleBySlug>>["data"] | undefined | null
  >(currentArticle);

  return (
    <ArticleContext.Provider value={{ article, step, setStep, setArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticleContext must be used within a MyProvider");
  }
  return context;
};
