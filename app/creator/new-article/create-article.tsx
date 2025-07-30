"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { StepOne } from "./step-1";
import { StepTwo } from "./step-2";
import { StepThree } from "./step-3";
import { StepFour } from "./step-4";
import { Steps } from "./steps";
import { useArticleContext } from "./article-context";

const RenderStep = ({ step }: { step: number }) => {
  switch (step) {
    case 0:
      return <StepOne />;
    case 1:
      return <StepTwo />;
    case 2:
      return <StepThree />;
    case 3:
      return <StepFour />;
    default:
      return null;
  }
};

export const CreateArticle = () => {
  const { step, setStep } = useArticleContext();
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0 flex flex-col items-center">
      <Steps
        steps={["Naslov", "Informacije", "Sadrzaj", "SEO"]}
        currentStep={step}
      />
      <Card className="max-w-6xl w-full mx-auto">
        <CardHeader className="font-bold">Unesi naslov clanka</CardHeader>
        <CardContent>
          <RenderStep step={step} />
        </CardContent>
      </Card>
      <div className="flex">
        <Button
          size="icon"
          onClick={() => {
            setStep((prev) => prev - 1);
          }}
        >
          <MinusIcon />
        </Button>
        <Button
          size="icon"
          onClick={() => {
            setStep((prev) => prev + 1);
          }}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};
