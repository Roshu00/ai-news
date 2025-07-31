"use client";
import { getArticleBySlug } from "@/actions/article.actions";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type DataType = Awaited<ReturnType<typeof getArticleBySlug>>["data"];

type ArticleContextType = {
  article: DataType | undefined | null;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setArticle: React.Dispatch<React.SetStateAction<DataType | undefined | null>>;
  step: number;
  nextStep: () => void;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleContextProvider = ({
  children,
  currentArticle,
}: {
  children: ReactNode;
  currentArticle: DataType | undefined;
}) => {
  const { getParam } = useSearchParamsState();
  const currentStep = Number(getParam("step"));
  const stepExists =
    typeof currentStep === "number" && currentStep >= 0 && currentStep < 4;
  const [step, setStep] = useState(stepExists ? currentStep : 0);
  const [article, setArticle] = useState<
    Awaited<ReturnType<typeof getArticleBySlug>>["data"] | undefined | null
  >(currentArticle);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <ArticleContext.Provider
      value={{ article, step, setStep, setArticle, nextStep }}
    >
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
