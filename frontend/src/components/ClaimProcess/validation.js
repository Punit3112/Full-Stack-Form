export const validateForm = (formData, setErrors) => {
    const newErrors = {};
    let isValid = true;
  
    // Check all fields
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
        isValid = false;
      }
    });
  
    // Add any specific validation rules here
    // Example:
    // if (!formData.email.includes('@')) {
    //   newErrors.email = 'Please enter a valid email';
    //   isValid = false;
    // }
  
    setErrors(newErrors);
    return isValid;
  };