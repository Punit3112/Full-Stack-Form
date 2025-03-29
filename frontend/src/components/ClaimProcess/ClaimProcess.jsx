import React from 'react';
import { useClaimProcess } from '../../context/ClaimProcessContext';
import Stepper from './Stepper';
import BondInformation from './BondInformation';
import ClaimInformation from './ClaimInformation';
import ClaimPayment from './ClaimPayment';
import ClaimRecovery from './ClaimRecovery';

const ClaimProcess = () => {
  const { steps, activeStep, completedSteps } = useClaimProcess();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Stepper */}
      <Stepper
        steps={steps}
        activeStep={activeStep}
        completedSteps={completedSteps}
      />

      {/* Form Content */}
      <div className="flex-1 ml-[20vw] p-8 bg-white">
        <BondInformation />
        <ClaimInformation />
        <ClaimPayment />
        <ClaimRecovery />
      </div>
    </div>
  );
};

export default ClaimProcess; 