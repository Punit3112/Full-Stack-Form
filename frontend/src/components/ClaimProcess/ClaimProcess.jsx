import React, { useState, useEffect } from 'react';
import { useClaimProcess } from '../../context/ClaimProcessContext';
import { Stepper } from './Stepper';
import { BondInformation } from './BondInformation';
import { ClaimInformation } from './ClaimInformation';
import { ClaimPayment } from './ClaimPayment';
import { ClaimRecovery } from './ClaimRecovery';

export const ClaimProcess = () => {
  const { steps, activeStep, completedSteps, handleSubmit, loading, error } = useClaimProcess();
  const [submitStatus, setSubmitStatus] = React.useState({ type: '', message: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setShowValidation(true);
    try {
      await handleSubmit();
      setSubmitStatus({
        type: 'success',
        message: 'Form submitted successfully!'
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit form'
      });
    }
  };

  // Reset validation styling when form data changes
  useEffect(() => {
    setShowValidation(false);
  }, [error]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Stepper - Hidden on mobile */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          completedSteps={completedSteps}
        />
      </div>

      {/* Form Content */}
      <div className={`${isMobile ? 'w-full' : 'flex-1 ml-[20vw]'} p-4 md:p-8 bg-white`}>
        <div className={isMobile ? 'min-h-screen pb-20' : ''}>
          <form onSubmit={handleFormSubmit}>
            <BondInformation showValidation={showValidation} />
            <ClaimInformation showValidation={showValidation} />
            <ClaimPayment showValidation={showValidation} />
            <ClaimRecovery showValidation={showValidation} />

            {submitStatus.message && (
              <div className={`mb-4 p-3 rounded ${
                submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>

        {/* Submit Button */}
        <div className={`flex justify-end ${isMobile ? 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50' : 'mt-8'}`}>
          <button
            type="submit"
            disabled={loading}
            onClick={handleFormSubmit}
            className={`px-6 py-2 bg-[#B4C424] text-white rounded hover:bg-opacity-90 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </div>
    </div>
  );
}; 