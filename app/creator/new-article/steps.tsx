import { cn, isGraterStep } from "@/lib/utils";
import React from "react";
import { useArticleContext } from "./article-context";
import { ArticleCreationStep } from "@prisma/client";

export const Steps = ({ steps }: { steps: ArticleCreationStep[] }) => {
  const { step, setStep, article } = useArticleContext();
  return (
    <div className="flex flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10 items-center w-full">
      {steps.map((s, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              "p-2 rounded-full text-center text-sm flex-1",
              step === s ? "bg-secondary" : "",
              isGraterStep(s, article?.step || ArticleCreationStep.CARD)
                ? "text-muted-foreground"
                : ""
            )}
            aria-disabled
            onClick={() => {
              setStep(s);
            }}
          >
            {s}
          </div>
          {index !== steps.length - 1 && (
            <hr className="w-16 border-t border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
