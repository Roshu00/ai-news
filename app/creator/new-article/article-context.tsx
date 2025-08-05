"use client";
import { getArticleBySlug } from "@/actions/article.actions";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { isGraterStep } from "@/lib/utils";
import { ArticleCreationStep } from "@prisma/client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type DataType = Awaited<ReturnType<typeof getArticleBySlug>>["data"];

type ArticleContextType = {
  article: DataType | undefined | null;
  setStep: (incomingStep: ArticleCreationStep) => void;
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

  const setActiveStep = (incomingStep: ArticleCreationStep) => {
    console.log(
      incomingStep,
      article?.step,
      isGraterStep(incomingStep, article?.step || "CARD")
    );
    if (article?.step && !isGraterStep(incomingStep, article.step)) {
      setStep(incomingStep);
    }
  };

  return (
    <ArticleContext.Provider
      value={{ article, step, setStep: setActiveStep, setArticle }}
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
