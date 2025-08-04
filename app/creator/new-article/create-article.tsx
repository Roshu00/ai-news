"use client";
import { ArticleCreationStep } from "@prisma/client";
import { useArticleContext } from "./article-context";
import { StepOne } from "./step-1";
import { StepTwo } from "./step-2";
import { StepThree } from "./step-3";
import { StepFour } from "./step-4";
import { Steps } from "./steps";

const RenderStep = ({ step }: { step: ArticleCreationStep }) => {
  switch (step) {
    case ArticleCreationStep.CARD:
      return <StepOne />;
    case ArticleCreationStep.CONTENT:
      return <StepTwo />;
    case ArticleCreationStep.SEO:
      return <StepThree />;
    case ArticleCreationStep.FINISHED:
      return <StepFour />;
    default:
      return null;
  }
};

export const CreateArticle = () => {
  const { step } = useArticleContext();
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0 flex flex-col items-center">
      <Steps
        steps={["CARD", "CONTENT", "SEO", "FINISHED"] as ArticleCreationStep[]}
      />

      <RenderStep step={step} />
    </div>
  );
};
