import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useClaimProcess } from '../../context/ClaimProcessContext';

const BondInformation = () => {
  const { formData, handleChange, completedSteps } = useClaimProcess();
  const [llAgreement, setLlAgreement] = useState(true);

  // Style classes
  const labelClass = "text-sm text-black block mb-2 text-left whitespace-nowrap pr-4 font-medium";
  const inputClass = "w-full px-0 pb-1 pt-0 text-sm border-b border-gray-300 focus:outline-none text-left placeholder-gray-400";
  const readOnlyClass = "w-full px-0 pb-1 pt-0 text-sm border-b border-gray-300 focus:outline-none text-left";
  const dropdownClass = "w-full px-0 pb-1 pt-0 text-sm appearance-none bg-white cursor-pointer focus:outline-none";
  const columnClass = "flex-1 space-y-6";

  const handleInputChange = (e, field) => {
    handleChange({ target: { name: field, value: e.target.value } });
  };

  return (
    <section className="bg-white rounded-lg p-8 mt-4">
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
      <div className="flex gap-8 border border-black rounded-lg p-8">
        {/* Column 1 */}
        <div className={columnClass}>
          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Claim No</label>
            <div className={`${readOnlyClass} col-span-7`}>78978</div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Tenant (ID)/Name</label>
            <input
              type="text"
              name="tenantName"
              className={`${inputClass} col-span-7`}
              value={formData?.tenantName || ''}
              onChange={(e) => handleInputChange(e, 'tenantName')}
              placeholder="Enter tenant name"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              className={`${inputClass} col-span-7`}
              value={formData?.mobileNo || ''}
              onChange={(e) => handleInputChange(e, 'mobileNo')}
              placeholder="Enter mobile number"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond ID</label>
            <div className={`${readOnlyClass} col-span-7`}>132</div>
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond Version</label>
            <input
              type="text"
              name="bondVersion"
              className={`${inputClass} col-span-7`}
              value={formData?.bondVersion || ''}
              onChange={(e) => handleInputChange(e, 'bondVersion')}
              placeholder="Enter bond version"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond Status</label>
            <div className="col-span-7">
              <select
                name="bondStatus"
                value={formData?.bondStatus || 'Ongoing'}
                onChange={(e) => handleInputChange(e, 'bondStatus')}
                className={dropdownClass}
              >
                <option value="Ongoing">Ongoing ▼</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className={columnClass}>
          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Claim Date</label>
            <input
              type="date"
              name="claimDate"
              className={`${inputClass} col-span-7`}
              value={formData?.claimDate || '2024-03-31'}
              onChange={(e) => handleInputChange(e, 'claimDate')}
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Landlord (ID)/Name</label>
            <input
              type="text"
              name="landlordName"
              className={`${inputClass} col-span-7`}
              value={formData?.landlordName || ''}
              onChange={(e) => handleInputChange(e, 'landlordName')}
              placeholder="Enter landlord name"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Email ID</label>
            <input
              type="email"
              name="emailId"
              className={`${inputClass} col-span-7`}
              value={formData?.emailId || ''}
              onChange={(e) => handleInputChange(e, 'emailId')}
              placeholder="Enter email ID"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond Period</label>
            <input
              type="text"
              name="bondPeriod"
              className={`${inputClass} col-span-7`}
              value={formData?.bondPeriod || ''}
              onChange={(e) => handleInputChange(e, 'bondPeriod')}
              placeholder="Enter bond period"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Bond Value</label>
            <input
              type="text"
              name="bondValue"
              className={`${inputClass} col-span-7`}
              value={formData?.bondValue || ''}
              onChange={(e) => handleInputChange(e, 'bondValue')}
              placeholder="Enter bond value"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Claim Status</label>
            <div className="col-span-7">
              <select
                name="claimStatus"
                value={formData?.claimStatus || 'Ongoing'}
                onChange={(e) => handleInputChange(e, 'claimStatus')}
                className={dropdownClass}
              >
                <option value="Ongoing">Ongoing ▼</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className={columnClass}>
          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>Monthly Rent</label>
            <input
              type="text"
              name="monthlyRent"
              className={`${inputClass} col-span-7`}
              value={formData?.monthlyRent || ''}
              onChange={(e) => handleInputChange(e, 'monthlyRent')}
              placeholder="Enter monthly rent"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>L&L Period</label>
            <input
              type="text"
              name="llPeriod"
              className={`${inputClass} col-span-7`}
              value={formData?.llPeriod || ''}
              onChange={(e) => handleInputChange(e, 'llPeriod')}
              placeholder="Enter L&L period"
            />
          </div>

          <div className="grid grid-cols-12 items-center">
            <label className={`${labelClass} col-span-5`}>L&L Agreement</label>
            <div className="col-span-7 flex items-center">
              <Switch
                checked={llAgreement}
                onChange={setLlAgreement}
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
            <label className={`${labelClass} col-span-5`}>L&L Expiry Date</label>
            <input
              type="date"
              name="llExpiryDate"
              className={`${inputClass} col-span-7`}
              value={formData?.llExpiryDate || '2024-03-31'}
              onChange={(e) => handleInputChange(e, 'llExpiryDate')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BondInformation;