import { cn } from "@/lib/utils";
import React from "react";

export const Steps = ({
  steps,
  currentStep = 0,
}: {
  steps: string[];
  currentStep: number;
}) => {
  return (
    <div className="flex flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10 items-center w-full">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              "p-2 rounded-full text-center text-sm flex-1",
              index === currentStep ? "bg-secondary" : ""
            )}
          >
            {step}
          </div>
          {index !== steps.length - 1 && (
            <hr className="w-16 border-t border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
