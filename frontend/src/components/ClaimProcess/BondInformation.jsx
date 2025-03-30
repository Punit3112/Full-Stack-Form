import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useClaimProcess } from '../../context/ClaimProcessContext';

export const BondInformation = ({ showValidation }) => {
  const { formData, handleChange, completedSteps } = useClaimProcess();
  const [llAgreement, setLlAgreement] = useState(true);

  // Style classes
  const labelClass = "text-sm text-black block mb-2 text-left whitespace-nowrap pr-4 font-medium";
  const inputClass = "w-full px-0 py-1 focus:outline-none border-b border-gray-300";
  const readOnlyClass = "w-full px-0 py-1 focus:outline-none border-b border-gray-300";
  const dropdownClass = "w-full px-0 py-1 bg-white focus:outline-none cursor-pointer text-left";

  const getInputClass = (fieldName) => {
    return `${inputClass} ${showValidation && !formData[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
  };

  const getDropdownClass = (fieldName) => {
    return `${dropdownClass} ${showValidation && !formData[fieldName] ? 'text-red-500' : ''}`;
  };

  return (
    <section id="bondInformation" className="bg-white rounded-lg p-4 md:p-8 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-base font-bold
            ${completedSteps.bondInformation ? 'bg-[#B4C424]' : 'bg-[#B4C424]'}`}>
            {completedSteps.bondInformation ? '✓' : '1'}
          </div>
          <h2 className="text-xl font-semibold">Bond Information</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-black">Time-Barred Days:</span>
          <span className="text-xl font-semibold text-[#B4C424]">30 Days</span>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex flex-col md:flex-row gap-8 border border-black rounded-lg p-4 md:p-8">
        {/* Column 1 */}
        <div className="w-full md:flex-1 space-y-6">
          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Claim No</label>
            <div className={`${readOnlyClass} col-span-7`}>78978</div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Tenant (ID)/Name *</label>
            <input
              type="text"
              name="tenantName"
              className={`${getInputClass('tenantName')} col-span-7`}
              value={formData?.tenantName || ''}
              onChange={handleChange}
              placeholder="Enter tenant name"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond ID</label>
            <div className={`${readOnlyClass} col-span-7`}>132</div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Mobile No *</label>
            <input
              type="text"
              name="mobileNo"
              className={`${getInputClass('mobileNo')} col-span-7`}
              value={formData?.mobileNo || ''}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond Version *</label>
            <input
              type="text"
              name="bondVersion"
              className={`${getInputClass('bondVersion')} col-span-7`}
              value={formData?.bondVersion || ''}
              onChange={handleChange}
              placeholder="Enter bond version"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond Status *</label>
            <div className="col-span-7">
              <select
                name="bondStatus"
                value={formData?.bondStatus || ''}
                onChange={handleChange}
                className={getDropdownClass('bondStatus')}
              >
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="w-full md:flex-1 space-y-6">
          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Claim Date *</label>
            <input
              type="date"
              name="claimDate"
              className={`${getInputClass('claimDate')} col-span-7`}
              value={formData?.claimDate || ''}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Landlord (ID)/Name *</label>
            <input
              type="text"
              name="landlordName"
              className={`${getInputClass('landlordName')} col-span-7`}
              value={formData?.landlordName || ''}
              onChange={handleChange}
              placeholder="Enter landlord name"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Email ID *</label>
            <input
              type="email"
              name="emailId"
              className={`${getInputClass('emailId')} col-span-7`}
              value={formData?.emailId || ''}
              onChange={handleChange}
              placeholder="Enter email ID"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond Period *</label>
            <input
              type="text"
              name="bondPeriod"
              className={`${getInputClass('bondPeriod')} col-span-7`}
              value={formData?.bondPeriod || ''}
              onChange={handleChange}
              placeholder="Enter bond period"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond Value *</label>
            <input
              type="text"
              name="bondValue"
              className={`${getInputClass('bondValue')} col-span-7`}
              value={formData?.bondValue || ''}
              onChange={handleChange}
              placeholder="Enter bond value"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Claim Status *</label>
            <div className="col-span-7">
              <select
                name="claimStatus"
                value={formData?.claimStatus || ''}
                onChange={handleChange}
                className={getDropdownClass('claimStatus')}
              >
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="w-full md:flex-1 space-y-6">
          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Monthly Rent *</label>
            <input
              type="text"
              name="monthlyRent"
              className={`${getInputClass('monthlyRent')} col-span-7`}
              value={formData?.monthlyRent || ''}
              onChange={handleChange}
              placeholder="Enter monthly rent"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>L&L Period *</label>
            <input
              type="text"
              name="llPeriod"
              className={`${getInputClass('llPeriod')} col-span-7`}
              value={formData?.llPeriod || ''}
              onChange={handleChange}
              placeholder="Enter L&L period"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>L&L Agreement *</label>
            <div className="col-span-7 flex items-center">
              <Switch
                checked={llAgreement}
                onChange={(checked) => {
                  setLlAgreement(checked);
                  handleChange({ target: { name: 'llAgreement', value: checked } });
                }}
                className={`${
                  llAgreement ? 'bg-[#B4C424]' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    llAgreement ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>L&L Expiry Date *</label>
            <input
              type="date"
              name="llExpiryDate"
              className={`${getInputClass('llExpiryDate')} col-span-7`}
              value={formData?.llExpiryDate || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};