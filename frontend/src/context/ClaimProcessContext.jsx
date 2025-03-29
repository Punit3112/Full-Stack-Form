import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const ClaimProcessContext = createContext();

export const useClaimProcess = () => {
  const context = useContext(ClaimProcessContext);
  if (!context) {
    throw new Error('useClaimProcess must be used within a ClaimProcessProvider');
  }
  return context;
};

export const ClaimProcessProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Bond Information
    tenantName: '',
    mobileNo: '',
    bondVersion: '',
    bondStatus: 'Ongoing',
    claimStatus: 'Ongoing',
    claimDate: '',
    landlordName: '',
    emailId: '',
    bondPeriod: '',
    bondValue: '',
    monthlyRent: '',
    llPeriod: '',
    llAgreement: true,
    llExpiryDate: '',

    // Claim Information
    checkInDate: '',
    checkOutDate: '',
    stayDays: '',
    checkOutNoticeDate: '',
    lockInPeriod: '',
    noticePeriod: '',
    breachLockInDays: '',
    breachNoticeDays: '',
    actualLockingPeriod: '',
    actualNoticePeriod: '',
    moveInVideo: '',
    moveOutVideo: '',

    // Claim Payment
    paymentDate1: '',
    amount1: '',
    upiCheque1: '',
    bankName1: '',
    tuesnetLtd1: 'Yes',
    expToH1: 'Yes',
    tAndT1: 'Yes',
    type1: '',
    advice1: '',

    // Claim Recovery
    recoveryRequestDate1: '',
    recoveryAmount1: '',
    recoveryUpiCheque1: '',
    recoveryBankName1: '',
    recoveryTuesnetLtd1: 'Yes',
    recoveryExpToH1: 'Yes',
    recoveryTAndT1: 'Yes',
    recoveryType1: '',
    recoveryAdvice1: ''
  });

  const [completedSteps, setCompletedSteps] = useState({
    bondInformation: false,
    claimInformation: false,
    claimPayment: false,
    claimRecovery: false
  });

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 'bondInformation', label: 'Bond Information' },
    { id: 'claimInformation', label: 'Claim Information' },
    { id: 'claimPayment', label: 'Claim Payment' },
    { id: 'claimRecovery', label: 'Claim Recovery' }
  ];

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create claim with the current form data
      const response = await api.createClaim(formData);
      
      // Update completed steps based on the current active step
      setCompletedSteps(prev => ({
        ...prev,
        [steps[activeStep].id]: true
      }));

      // Move to next step if available
      if (activeStep < steps.length - 1) {
        setActiveStep(prev => prev + 1);
      }

      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.uploadDocument(file);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    formData,
    completedSteps,
    activeStep,
    steps,
    error,
    loading,
    handleChange,
    handleSubmit,
    handleFileUpload,
    setCompletedSteps,
    setActiveStep
  };

  return (
    <ClaimProcessContext.Provider value={value}>
      {children}
    </ClaimProcessContext.Provider>
  );
};

export default ClaimProcessContext; 