"use client";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type DataType = {
  title: string;
  description?: string | null;
  categoryId?: string | null;
  content: string | null;
  slug: string;
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string[];
};

type ArticleContextType = {
  article: DataType | undefined;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setArticle: React.Dispatch<React.SetStateAction<DataType | undefined>>;
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
  const [article, setArticle] = useState(currentArticle);

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
