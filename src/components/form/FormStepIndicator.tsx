
import React from 'react';

interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const FormStepIndicator = ({ currentStep, totalSteps }: FormStepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-4 gap-1">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div
            className={`h-2 w-2 rounded-full ${
              index + 1 === currentStep ? 'bg-growave-green' : 'bg-white/20'
            }`}
          />
          {index < totalSteps - 1 && (
            <div className="h-px w-4 bg-white/20" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FormStepIndicator;
