import React, { useState, useRef } from 'react';
import { Switch } from '@headlessui/react';
import { FaCalendarAlt, FaLink, FaPlus, FaMinus } from 'react-icons/fa';
import { useClaimProcess } from '../../context/ClaimProcessContext';

export const ClaimInformation = ({ showValidation }) => {
  const { formData, handleChange, completedSteps, handleSubmit, handleFileUpload, error, loading } = useClaimProcess();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const moveInVideoRef = useRef(null);
  const moveOutVideoRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Style classes
  const inputClass = "w-full px-0 py-1 focus:outline-none border-b border-gray-300";
  const labelClass = "text-sm text-black block mb-2 text-left whitespace-nowrap pr-4 font-medium";
  const readOnlyClass = "w-full px-0 pb-1 pt-0 text-sm border-b border-gray-300 focus:outline-none text-left";
  const getDateInputClass = (fieldName) => `w-full px-0 pb-1 pt-0 text-sm border-b ${showValidation && !formData[fieldName] ? 'border-red-500' : 'border-gray-300'} focus:outline-none text-left placeholder-gray-400`;
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
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      if (checkOut <= checkIn) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }

    // Validate check-out notice date
    if (formData.checkOutNoticeDate && formData.checkOutDate) {
      const noticeDate = new Date(formData.checkOutNoticeDate);
      const checkOut = new Date(formData.checkOutDate);
      if (noticeDate > checkOut) {
        newErrors.checkOutNoticeDate = 'Notice date must be before or on check-out date';
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
    const date = e.target.value; // Get the raw date value from input
    handleChange({ target: { name: field, value: date } });
    
    // Validate dates after change
    if (field === 'checkInDate' || field === 'checkOutDate' || field === 'checkOutNoticeDate') {
      const newErrors = {};
      
      // Validate check-in and check-out dates
      if (formData.checkInDate && formData.checkOutDate) {
        const checkIn = new Date(formData.checkInDate);
        const checkOut = new Date(formData.checkOutDate);
        if (checkOut <= checkIn) {
          newErrors.checkOutDate = 'Check-out date must be after check-in date';
        }
      }

      // Validate check-out notice date
      if (formData.checkOutNoticeDate && formData.checkOutDate) {
        const noticeDate = new Date(formData.checkOutNoticeDate);
        const checkOut = new Date(formData.checkOutDate);
        if (noticeDate > checkOut) {
          newErrors.checkOutNoticeDate = 'Notice date must be before or on check-out date';
        }
      }

      setErrors(prev => ({ ...prev, ...newErrors }));
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

  return (
    <section id="claimInformation" className="bg-white rounded-lg p-4 md:p-8 mt-4">
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
        <div className="space-y-8 md:space-y-12 border border-black rounded-lg p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Check In Date *</label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate || ''}
                onChange={(e) => handleDateChange(e, 'checkInDate')}
                className={getDateInputClass('checkInDate')}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Check Out Date *</label>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate || ''}
                onChange={(e) => handleDateChange(e, 'checkOutDate')}
                className={getDateInputClass('checkOutDate')}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Stay Days</label>
              <input
                type="text"
                name="stayDays"
                value={formData.stayDays || 'XX days'}
                className={readOnlyClass}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Check out Notice Date *</label>
              <input
                type="date"
                name="checkOutNoticeDate"
                value={formData.checkOutNoticeDate || ''}
                onChange={(e) => handleDateChange(e, 'checkOutNoticeDate')}
                className={getDateInputClass('checkOutNoticeDate')}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Lock in Period (L&L) *</label>
              <input
                type="text"
                name="lockInPeriod"
                value={formData.lockInPeriod || ''}
                onChange={(e) => handleInputChange(e, 'lockInPeriod')}
                className={inputClass}
                placeholder="Enter period"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Notice Period (L&L) *</label>
              <input
                type="text"
                name="noticePeriod"
                value={formData.noticePeriod || ''}
                onChange={(e) => handleInputChange(e, 'noticePeriod')}
                className={inputClass}
                placeholder="Enter period"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Breach in Lock in period Days *</label>
              <input
                type="text"
                name="breachLockInDays"
                value={formData.breachLockInDays || ''}
                onChange={(e) => handleInputChange(e, 'breachLockInDays')}
                className={inputClass}
                placeholder="Enter days"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Breach in Notice Period Days *</label>
              <input
                type="text"
                name="breachNoticeDays"
                value={formData.breachNoticeDays || ''}
                onChange={(e) => handleInputChange(e, 'breachNoticeDays')}
                className={inputClass}
                placeholder="Enter days"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Actual Locking Period Working *</label>
              <input
                type="text"
                name="actualLockingPeriod"
                value={formData.actualLockingPeriod || ''}
                onChange={(e) => handleInputChange(e, 'actualLockingPeriod')}
                className={inputClass}
                placeholder="Enter period"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Actual Notice Period Working *</label>
              <input
                type="text"
                name="actualNoticePeriod"
                value={formData.actualNoticePeriod || ''}
                onChange={(e) => handleInputChange(e, 'actualNoticePeriod')}
                className={inputClass}
                placeholder="Enter period"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Move-In Video Link *</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="moveInVideo"
                  value={formData.moveInVideo || ''}
                  onChange={(e) => handleInputChange(e, 'moveInVideo')}
                  className={inputClass}
                  placeholder="Upload video"
                />
                <button
                  type="button"
                  onClick={() => moveInVideoRef.current?.click()}
                  className="p-2 bg-[#B4C424] text-white rounded"
                >
                  <FaLink />
                </button>
                <input
                  type="file"
                  ref={moveInVideoRef}
                  onChange={(e) => handleFileChange(e, 'moveInVideo')}
                  className="hidden"
                  accept="video/*"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Move Out Video Link *</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="moveOutVideo"
                  value={formData.moveOutVideo || ''}
                  onChange={(e) => handleInputChange(e, 'moveOutVideo')}
                  className={inputClass}
                  placeholder="Upload video"
                />
                <button
                  type="button"
                  onClick={() => moveOutVideoRef.current?.click()}
                  className="p-2 bg-[#B4C424] text-white rounded"
                >
                  <FaLink />
                </button>
                <input
                  type="file"
                  ref={moveOutVideoRef}
                  onChange={(e) => handleFileChange(e, 'moveOutVideo')}
                  className="hidden"
                  accept="video/*"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};