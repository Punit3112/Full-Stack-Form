import React, { useState } from 'react';
import { useClaimProcess } from '../../context/ClaimProcessContext';
import { FaPlus, FaMinus } from 'react-icons/fa';

export const ClaimPayment = ({ showValidation }) => {
  const { formData, handleChange, completedSteps } = useClaimProcess();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [rows, setRows] = useState([
    { id: 1, amount: '7500' },
    { id: 2, amount: '7500' },
    { id: 3, amount: '7500' }
  ]);

  // Style classes
  const inputClass = "w-full px-0 py-1 focus:outline-none border-b border-gray-300";
  const selectClass = "w-full px-0 py-1 bg-white focus:outline-none appearance-none cursor-pointer border-b border-gray-300";
  const dropdownClass = "w-full px-2 py-1 bg-white focus:outline-none cursor-pointer text-center";
  const cellClass = "py-2 pr-4";

  const getInputClass = (fieldName) => {
    return `${inputClass} ${showValidation && !formData[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
  };

  const getSelectClass = (fieldName) => {
    return `${selectClass} ${showValidation && !formData[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
  };

  const handleAmountChange = (id, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, amount: value.replace(/[^0-9]/g, '') } : row
    ));
  };

  const addNewRow = () => {
    const newId = Math.max(...rows.map(row => row.id)) + 1;
    setRows([...rows, { id: newId, amount: '0' }]);
  };

  const calculateTotal = () => {
    return rows.reduce((sum, row) => sum + (parseInt(row.amount) || 0), 0);
  };

  return (
    <section id="claimPayment" className="bg-white rounded-lg p-4 md:p-8 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-base font-bold
            ${completedSteps.claimPayment ? 'bg-[#B4C424]' : 'bg-[#B4C424]'}`}>
            {completedSteps.claimPayment ? '✓' : '3'}
          </div>
          <h2 className="text-xl font-semibold">Claim Payment</h2>
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-400">
          {isCollapsed ? <FaPlus /> : <FaMinus />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="border border-black rounded-lg p-6">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <colgroup>
                <col className="w-[12%]" />
                <col className="w-[10%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[8%]" />
                <col className="w-[8%]" />
                <col className="w-[8%]" />
                <col className="w-[10%]" />
                <col className="w-[15%]" />
                <col className="w-[5%]" />
              </colgroup>
              <thead>
                <tr className="text-sm font-medium">
                  <th className="text-left pb-4 pr-4">Payment Date</th>
                  <th className="text-left pb-4 pr-4">Amount</th>
                  <th className="text-left pb-4 pr-4">UTR/Cheque No.</th>
                  <th className="text-left pb-4 pr-4">Bank Name</th>
                  <th className="text-left pb-4 pr-4">Tenant to LL</th>
                  <th className="text-left pb-4 pr-4">Eqaro to All</th>
                  <th className="text-left pb-4 pr-4">TAT</th>
                  <th className="text-left pb-4 pr-4">Type</th>
                  <th className="text-left pb-4 pr-4">Advise</th>
                  <th className="text-left pb-4"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} className="text-sm">
                    <td className={cellClass}>
                      <input 
                        type="date" 
                        className={getInputClass(`paymentDate${row.id}`)} 
                        value={formData[`paymentDate${row.id}`] || ''}
                        onChange={(e) => handleChange({ target: { name: `paymentDate${row.id}`, value: e.target.value } })}
                      />
                    </td>
                    <td className={cellClass}>
                      <input
                        type="text"
                        className={getInputClass(`amount${row.id}`)}
                        value={`₹ ${row.amount}`}
                        onChange={(e) => handleAmountChange(row.id, e.target.value.replace(/[₹\s]/g, ''))}
                      />
                    </td>
                    <td className={cellClass}>
                      <input 
                        type="text" 
                        className={getInputClass(`upiCheque${row.id}`)}
                        value={formData[`upiCheque${row.id}`] || ''}
                        onChange={(e) => handleChange({ target: { name: `upiCheque${row.id}`, value: e.target.value } })}
                      />
                    </td>
                    <td className={cellClass}>
                      <input 
                        type="text" 
                        className={getInputClass(`bankName${row.id}`)}
                        value={formData[`bankName${row.id}`] || ''}
                        onChange={(e) => handleChange({ target: { name: `bankName${row.id}`, value: e.target.value } })}
                      />
                    </td>
                    <td className={cellClass}>
                      <select 
                        className={getSelectClass(`tuesnetLtd${row.id}`)}
                        value={formData[`tuesnetLtd${row.id}`] || 'Yes'}
                        onChange={(e) => handleChange({ target: { name: `tuesnetLtd${row.id}`, value: e.target.value } })}
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </td>
                    <td className={cellClass}>
                      <select 
                        className={getSelectClass(`expToH${row.id}`)}
                        value={formData[`expToH${row.id}`] || 'Yes'}
                        onChange={(e) => handleChange({ target: { name: `expToH${row.id}`, value: e.target.value } })}
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </td>
                    <td className={cellClass}>
                      <select 
                        className={getSelectClass(`tAndT${row.id}`)}
                        value={formData[`tAndT${row.id}`] || 'Yes'}
                        onChange={(e) => handleChange({ target: { name: `tAndT${row.id}`, value: e.target.value } })}
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </td>
                    <td className={cellClass}>
                      <select 
                        className={getSelectClass(`type${row.id}`)}
                        value={formData[`type${row.id}`] || ''}
                        onChange={(e) => handleChange({ target: { name: `type${row.id}`, value: e.target.value } })}
                      >
                        <option value="">Select type</option>
                        <option>Type 1</option>
                        <option>Type 2</option>
                      </select>
                    </td>
                    <td className={cellClass}>
                      <input 
                        type="text" 
                        className={getInputClass(`advice${row.id}`)}
                        value={formData[`advice${row.id}`] || ''}
                        onChange={(e) => handleChange({ target: { name: `advice${row.id}`, value: e.target.value } })}
                      />
                    </td>
                    <td className="py-2">
                      {index === rows.length - 1 && (
                        <button 
                          className="p-1 bg-[#B4C424] text-white rounded"
                          onClick={addNewRow}
                        >
                          <FaPlus />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="flex items-center mt-4 pt-4 border-t border-black">
            <span className="font-medium mr-2">Claim Paid:</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>
      )}
    </section>
  );
};