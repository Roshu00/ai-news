"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useArticleContext } from "./article-context";
import { StepOne } from "./step-1";
import { StepTwo } from "./step-2";
import { StepThree } from "./step-3";
import { StepFour } from "./step-4";
import { Steps } from "./steps";

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
  const { step } = useArticleContext();
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0 flex flex-col items-center">
      <Steps
        steps={["Naslov", "Informacije", "Sadrzaj", "SEO", "Pregled"]}
        currentStep={step}
      />
      <Card className="max-w-2xl w-full">
        <CardHeader className="font-bold">Unesi naslov clanka</CardHeader>
        <CardContent>
          <RenderStep step={step} />
        </CardContent>
      </Card>
    </div>
  );
};
