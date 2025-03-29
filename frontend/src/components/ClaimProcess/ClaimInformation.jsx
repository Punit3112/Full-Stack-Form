import React, { useState, useRef } from 'react';
import { Switch } from '@headlessui/react';
import { FaCalendarAlt, FaLink, FaPlus, FaMinus } from 'react-icons/fa';
import { useClaimProcess } from '../../context/ClaimProcessContext';

const ClaimInformation = () => {
  const { formData, handleChange, completedSteps, handleSubmit, handleFileUpload, error, loading } = useClaimProcess();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const moveInVideoRef = useRef(null);
  const moveOutVideoRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Style classes
  const labelClass = "text-sm text-black block mb-2 text-left whitespace-nowrap pr-4 font-medium";
  const getInputClass = (fieldName) => `w-full px-0 pb-1 pt-0 text-sm border-b ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'} focus:outline-none text-left placeholder-gray-400`;
  const readOnlyClass = "w-full px-0 pb-1 pt-0 text-sm border-b border-gray-300 focus:outline-none text-left";
  const getDateInputClass = (fieldName) => `w-full px-0 pb-1 pt-0 text-sm border-b ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'} focus:outline-none text-left placeholder-gray-400`;
  const columnClass = "flex-1 space-y-6";

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
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
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Additional date validations
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formatDateForInput(formData.checkInDate));
      const checkOut = new Date(formatDateForInput(formData.checkOutDate));
      if (checkOut <= checkIn) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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

  const handleDateChange = (e, field) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
    handleChange({ target: { name: field, value: formattedDate } });
    // Clear error when field is filled
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputChange = (e, field) => {
    handleChange({ target: { name: field, value: e.target.value } });
    // Clear error when field is filled
    if (e.target.value && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileClick = (type) => {
    if (type === 'moveIn') {
      moveInVideoRef.current.click();
    } else {
      moveOutVideoRef.current.click();
    }
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await handleFileUpload(file);
        handleChange({
          target: {
            name: field,
            value: response.url
          }
        });
      } catch (error) {
        setSubmitStatus({
          type: 'error',
          message: error.message || 'Failed to upload file'
        });
      }
    }
  };

  // Convert DD/MM/YY to YYYY-MM-DD for date inputs
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `20${year}-${month}-${day}`;
  };

  return (
    <section className="bg-white rounded-lg p-4 md:p-8 mt-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-base font-bold
            ${completedSteps.claimInformation ? 'bg-[#B4C424]' : 'bg-[#B4C424]'}`}>
            {completedSteps.claimInformation ? '✓' : '2'}
          </div>
          <h2 className="text-xl font-semibold">Claim Information</h2>
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-400">
          {isCollapsed ? <FaPlus /> : <FaMinus />}
        </button>
      </div>

      {submitStatus.message && (
        <div className={`mb-4 p-3 rounded ${
          submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}

      {!isCollapsed && (
        <form onSubmit={handleFormSubmit} className="space-y-8 md:space-y-12 border border-black rounded-lg p-4 md:p-8">
          {/* First Row - Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className={columnClass}>
              <label className={labelClass}>
                Check-in Date
                {errors.checkInDate && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  value={formatDateForInput(formData?.checkInDate) || '2024-03-31'}
                  onChange={(e) => handleDateChange(e, 'checkInDate')}
                  className={getDateInputClass('checkInDate')}
                  required
                />
                {errors.checkInDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.checkInDate}</p>
                )}
                <button className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={columnClass}>
              <label className={labelClass}>
                Check-Out Date
                {errors.checkOutDate && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  value={formatDateForInput(formData?.checkOutDate) || '2024-03-31'}
                  onChange={(e) => handleDateChange(e, 'checkOutDate')}
                  className={getDateInputClass('checkOutDate')}
                  required
                />
                {errors.checkOutDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.checkOutDate}</p>
                )}
                <button className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={columnClass}>
              <label className={labelClass}>Stay Days</label>
              <input
                type="text"
                name="stayDays"
                value={formData?.stayDays || 'XX days'}
                className={getInputClass('stayDays')}
                disabled
              />
            </div>

            <div className={columnClass}>
              <label className={labelClass}>
                Check out Notice Date
                {errors.checkOutNoticeDate && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  value={formatDateForInput(formData?.checkOutNoticeDate) || ''}
                  onChange={(e) => handleDateChange(e, 'checkOutNoticeDate')}
                  className={getDateInputClass('checkOutNoticeDate')}
                  required
                />
                {errors.checkOutNoticeDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.checkOutNoticeDate}</p>
                )}
                <button className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className={columnClass}>
              <label className={labelClass}>
                Lock in Period (L&L)
                {errors.lockInPeriod && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <input
                type="text"
                name="lockInPeriod"
                value={formData?.lockInPeriod || ''}
                onChange={(e) => handleInputChange(e, 'lockInPeriod')}
                className={getInputClass('lockInPeriod')}
                placeholder="Enter period"
                required
              />
              {errors.lockInPeriod && (
                <p className="text-red-500 text-xs mt-1">{errors.lockInPeriod}</p>
              )}
            </div>

            <div className={columnClass}>
              <label className={labelClass}>
                Notice Period (L&L)
                {errors.noticePeriod && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <input
                type="text"
                name="noticePeriod"
                value={formData?.noticePeriod || ''}
                onChange={(e) => handleInputChange(e, 'noticePeriod')}
                className={getInputClass('noticePeriod')}
                placeholder="Enter period"
                required
              />
              {errors.noticePeriod && (
                <p className="text-red-500 text-xs mt-1">{errors.noticePeriod}</p>
              )}
            </div>

            <div className={columnClass}>
              <label className={labelClass}>
                Breach in Lock in period Days
                {errors.breachLockInDays && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <input
                type="text"
                name="breachLockInDays"
                value={formData?.breachLockInDays || ''}
                onChange={(e) => handleInputChange(e, 'breachLockInDays')}
                className={getInputClass('breachLockInDays')}
                placeholder="Enter days"
                required
              />
              {errors.breachLockInDays && (
                <p className="text-red-500 text-xs mt-1">{errors.breachLockInDays}</p>
              )}
            </div>

            <div className={columnClass}>
              <label className={labelClass}>
                Breach in Notice Period Days
                {errors.breachNoticeDays && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <input
                type="text"
                name="breachNoticeDays"
                value={formData?.breachNoticeDays || ''}
                onChange={(e) => handleInputChange(e, 'breachNoticeDays')}
                className={getInputClass('breachNoticeDays')}
                placeholder="Enter days"
                required
              />
              {errors.breachNoticeDays && (
                <p className="text-red-500 text-xs mt-1">{errors.breachNoticeDays}</p>
              )}
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className={columnClass}>
              <label className={labelClass}>
                Actual Locking Period Working
                {errors.actualLockingPeriod && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <input
                type="text"
                name="actualLockingPeriod"
                value={formData?.actualLockingPeriod || ''}
                onChange={(e) => handleInputChange(e, 'actualLockingPeriod')}
                className={getInputClass('actualLockingPeriod')}
                placeholder="Enter period"
                required
              />
              {errors.actualLockingPeriod && (
                <p className="text-red-500 text-xs mt-1">{errors.actualLockingPeriod}</p>
              )}
            </div>

            <div className={columnClass}>
              <label className={labelClass}>
                Actual Notice Period Working
                {errors.actualNoticePeriod && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <input
                type="text"
                name="actualNoticePeriod"
                value={formData?.actualNoticePeriod || ''}
                onChange={(e) => handleInputChange(e, 'actualNoticePeriod')}
                className={getInputClass('actualNoticePeriod')}
                placeholder="Enter period"
                required
              />
              {errors.actualNoticePeriod && (
                <p className="text-red-500 text-xs mt-1">{errors.actualNoticePeriod}</p>
              )}
            </div>

            <div className={columnClass}>
              <label className={labelClass}>
                Move-In Video Link
                {errors.moveInVideo && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="moveInVideo"
                  value={formData?.moveInVideo || ''}
                  onChange={(e) => handleInputChange(e, 'moveInVideo')}
                  className={getInputClass('moveInVideo')}
                  placeholder="Upload video"
                  readOnly
                  required
                />
                {errors.moveInVideo && (
                  <p className="text-red-500 text-xs mt-1">{errors.moveInVideo}</p>
                )}
                <input
                  type="file"
                  ref={moveInVideoRef}
                  onChange={(e) => handleFileChange(e, 'moveInVideo')}
                  className="hidden"
                  accept="video/*"
                />
                <button 
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  onClick={() => handleFileClick('moveIn')}
                >
                  <FaLink className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            <div className={columnClass}>
              <label className={labelClass}>
                Move Out Video Link
                {errors.moveOutVideo && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="moveOutVideo"
                  value={formData?.moveOutVideo || ''}
                  onChange={(e) => handleInputChange(e, 'moveOutVideo')}
                  className={getInputClass('moveOutVideo')}
                  placeholder="Upload video"
                  readOnly
                  required
                />
                {errors.moveOutVideo && (
                  <p className="text-red-500 text-xs mt-1">{errors.moveOutVideo}</p>
                )}
                <input
                  type="file"
                  ref={moveOutVideoRef}
                  onChange={(e) => handleFileChange(e, 'moveOutVideo')}
                  className="hidden"
                  accept="video/*"
                />
                <button 
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  onClick={() => handleFileClick('moveOut')}
                >
                  <FaLink className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-[#B4C424] text-white rounded hover:bg-opacity-90 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ClaimInformation;