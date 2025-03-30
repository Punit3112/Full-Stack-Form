import React from 'react';
import { ClaimProcessProvider } from './context/ClaimProcessContext';
import { ClaimProcess } from './components/ClaimProcess/ClaimProcess';

export const App = () => {
  return (
    <ClaimProcessProvider>
      <div className="min-h-screen bg-gray-50">
        <ClaimProcess />
      </div>
    </ClaimProcessProvider>
  );
};
