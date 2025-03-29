import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Stepper = ({ steps, activeStep, completedSteps }) => {
  return (
    <div className="fixed left-0 top-0 w-[20vw] h-screen border-r border-black pt-8 bg-white">
      <div className="flex flex-col space-y-8 px-8">
        {steps.map((step, index) => {
          const isCompleted = completedSteps[step.id];
          const isActive = activeStep === index;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative">
              <div className="flex items-center gap-3">
                {/* Circle with number or check */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
                    ${isCompleted ? 'bg-[#B4C424] text-white' : 
                      isActive ? 'bg-[#B4C424] text-white' : 
                      'bg-gray-300 text-gray-600'}`}
                >
                  {isCompleted ? <FaCheck className="w-3 h-3" /> : index + 1}
                </div>

                {/* Label */}
                <span className={`text-sm font-medium
                  ${isCompleted || isActive ? 'text-black' : 'text-gray-500'}`}>
                  {step.label}
                </span>
              </div>

              {/* Vertical line */}
              {!isLast && (
                <div className="absolute left-[0.7rem] top-8 w-[2px] h-8 bg-gray-300 -translate-x-1/2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper; 