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
            <span className="label-caps text-accent font-semibold">
              STEP {clampedStep} OF {totalSteps}
            </span>
            {stepName && (
              <>
                <span className="text-border">·</span>
                <span className="font-normal text-muted text-[11px]">
                  {stepName}
                </span>
              </>
            )}
          </div>
          <span className="label-micro text-muted">
            {Math.round((clampedStep / totalSteps) * 100)}% COMPLETE
          </span>
        </div>
      )}

      {/* Segments: 1px hairline segments, brass or stone */}
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

          return (
            <div
              key={index}
              className={`h-1 flex-1 rounded-[2px] transition-colors duration-150 ${
                isFilled ? "bg-accent" : "bg-border"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
