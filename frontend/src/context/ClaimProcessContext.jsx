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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const steps = [
    { id: 'bondInformation', label: 'Bond Information' },
    { id: 'claimInformation', label: 'Claim Information' },
    { id: 'claimPayment', label: 'Claim Payment' },
    { id: 'claimRecovery', label: 'Claim Recovery' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
    setSubmissionStatus(null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSubmissionStatus(null);

      // Define required fields by step
      const requiredFieldsByStep = {
        bondInformation: [
          'tenantName',
          'mobileNo',
          'bondVersion',
          'bondStatus',
          'claimStatus',
          'claimDate',
          'landlordName',
          'emailId',
          'bondPeriod',
          'bondValue',
          'monthlyRent',
          'llPeriod',
          'llAgreement',
          'llExpiryDate'
        ],
        claimInformation: [
          'checkInDate',
          'checkOutDate',
          'checkOutNoticeDate',
          'lockInPeriod',
          'noticePeriod',
          'breachLockInDays',
          'breachNoticeDays',
          'actualLockingPeriod',
          'actualNoticePeriod',
          'moveInVideo',
          'moveOutVideo'
        ],
        claimPayment: [
          'paymentDate1',
          'amount1',
          'upiCheque1',
          'bankName1'
        ],
        claimRecovery: [
          'recoveryRequestDate1',
          'recoveryAmount1',
          'recoveryUpiCheque1',
          'recoveryBankName1'
        ]
      };

      // Validate all steps
      const missingFields = [];
      for (const [step, fields] of Object.entries(requiredFieldsByStep)) {
        const stepMissingFields = fields.filter(field => !formData[field]);
        if (stepMissingFields.length > 0) {
          missingFields.push(...stepMissingFields.map(field => `${field} (${step})`));
        }
      }

      if (missingFields.length > 0) {
        // Find the first empty field
        const firstEmptyField = document.querySelector(`[name="${missingFields[0].split(' (')[0]}"]`);
        if (firstEmptyField) {
          // Scroll to the field
          firstEmptyField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstEmptyField.focus();
        }
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Additional date validations
      if (formData.checkInDate && formData.checkOutDate) {
        const checkIn = new Date(formData.checkInDate);
        const checkOut = new Date(formData.checkOutDate);
        if (checkOut <= checkIn) {
          const checkOutField = document.querySelector('[name="checkOutDate"]');
          if (checkOutField) {
            checkOutField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            checkOutField.focus();
          }
          throw new Error('Check-out date must be after check-in date');
        }
      }

      if (formData.checkOutNoticeDate && formData.checkOutDate) {
        const noticeDate = new Date(formData.checkOutNoticeDate);
        const checkOut = new Date(formData.checkOutDate);
        if (noticeDate > checkOut) {
          const noticeDateField = document.querySelector('[name="checkOutNoticeDate"]');
          if (noticeDateField) {
            noticeDateField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            noticeDateField.focus();
          }
          throw new Error('Notice date must be before or on check-out date');
        }
      }

      // Create claim with the complete form data
      const response = await api.createClaim(formData);
      
      // Mark all steps as completed
      const updatedCompletedSteps = {
        bondInformation: true,
        claimInformation: true,
        claimPayment: true,
        claimRecovery: true
      };
      setCompletedSteps(updatedCompletedSteps);

      setSubmissionStatus('success');
      return response;
    } catch (error) {
      setError(error.message);
      setSubmissionStatus('error');
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
    submissionStatus,
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

export { ClaimProcessContext }; 