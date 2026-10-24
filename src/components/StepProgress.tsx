"use client";

import React from "react";

export interface StepProgressProps {
  currentStep: number; // 1 to 4 (or totalSteps)
  totalSteps?: number; // default 4
  stepName?: string;
  className?: string;
  showStepText?: boolean;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps = 4,
  stepName,
  className = "",
  showStepText = true,
}) => {
  const clampedStep = Math.max(0, Math.min(currentStep, totalSteps));

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {showStepText && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="label-caps text-[#7A6A2E]">
              STEP {clampedStep} OF {totalSteps}
            </span>
            {stepName && (
              <>
                <span className="text-[#C5BEB2]">·</span>
                <span className="font-medium text-[#57534E] text-[11px]">
                  {stepName}
                </span>
              </>
            )}
          </div>
          <span className="label-micro text-[#8C867A]">
            {Math.round((clampedStep / totalSteps) * 100)}% COMPLETE
          </span>
        </div>
      )}

      {/* 4 Segments */}
      <div
        className="flex items-center gap-1.5 w-full"
        role="progressbar"
        aria-valuenow={clampedStep}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-label={`Step ${clampedStep} of ${totalSteps}`}
      >
        {Array.from({ length: totalSteps }, (_, index) => {
          const isFilled = index < clampedStep;
          const isCurrent = index === clampedStep - 1;

          return (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                isFilled
                  ? "bg-[#7A6A2E]"
                  : "bg-[#E8E6DF] opacity-60"
              } ${isCurrent ? "ring-1 ring-[#7A6A2E]/30" : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
