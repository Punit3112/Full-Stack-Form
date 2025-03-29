import { useState } from 'react';
import BondInformation from './BondInformation';
import ClaimInformation from './ClaimInformation';
import ClaimPayment from './ClaimPayment';
import ClaimRecovery from './ClaimRecovery';
import { validateForm } from './validation';

const ClaimProcessForm = () => {
  const [formData, setFormData] = useState({
    // Bond Information
    claimNo: '96/A',
    bondDueDate: '2024-03-31',
    bondStatus: 'Ongoing',
    claimStatus: 'Ongoing',
    bondId: '123',
    bondPeriod: '2024-03-31',
    lastPeriod: '2024-03-31',
    lastExpiryDate: '2024-03-31',
    
    // Claim Information
    checkInDate: '2024-03-31',
    checkOutDate: '2024-03-31',
    runDays: 'XX Days',
    checkOutNoticeDate: '2024-03-31',
    loginInvalidAG: 'XX Days',
    notedAG: 'XX Days',
    basedInLoginInvalidDay: 'XX Days',
    basedInNotedInvalidDay: 'XX Days',
    assailLoginTotalPackage: 'Need/Video/LMS',
    assailNoticeTotalPackage: 'Need/Video/LMS',
    notedTotalPackage: 'Need/Video/LMS',
    
    // Claim Payment
    paymentDate1: '',
    amount1: '₹7,500',
    upiCheque1: '',
    bankName1: '',
    tuesnetLtd1: 'Yes',
    expToH1: 'Yes',
    tAndT1: 'Yes',
    type1: '',
    advice1: '',
    
    paymentDate2: '',
    amount2: '₹7,500',
    upiCheque2: '',
    bankName2: '',
    tuesnetLtd2: 'Yes',
    expToH2: 'Yes',
    tAndT2: 'Yes',
    type2: '',
    advice2: '',
    
    paymentDate3: '',
    amount3: '₹7,500',
    upiCheque3: '',
    bankName3: '',
    tuesnetLtd3: 'Yes',
    expToH3: 'Yes',
    tAndT3: 'Yes',
    type3: '',
    advice3: '',
    
    // Claim Recovery
    recoveryRequestDate1: '',
    recoveryAmount1: '₹7,500',
    recoveryUpiCheque1: '',
    recoveryBankName1: '',
    recoveryTuesnetLtd1: 'Yes',
    recoveryExpToH1: 'Yes',
    recoveryTAndT1: 'Yes',
    recoveryType1: '',
    recoveryAdvice1: '',
    
    recoveryRequestDate2: '',
    recoveryAmount2: '₹7,500',
    recoveryUpiCheque2: '',
    recoveryBankName2: '',
    recoveryTuesnetLtd2: 'Yes',
    recoveryExpToH2: 'Yes',
    recoveryTAndT2: 'Yes',
    recoveryType2: '',
    recoveryAdvice2: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm(formData, setErrors)) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Claim Process</h1>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <BondInformation 
            formData={formData} 
            errors={errors} 
            handleChange={handleChange} 
          />
          
          <ClaimInformation 
            formData={formData} 
            errors={errors} 
            handleChange={handleChange} 
          />

          <ClaimPayment 
            formData={formData} 
            errors={errors} 
            handleChange={handleChange} 
          />

          <ClaimRecovery 
            formData={formData} 
            errors={errors} 
            handleChange={handleChange} 
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimProcessForm;