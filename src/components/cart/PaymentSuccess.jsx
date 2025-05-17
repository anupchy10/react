import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = ({ 
  transactionId,
  date,
  paymentMethod,
  customerName,
  mobileNumber,
  paymentAmount,
  appliedPromo, // Added this prop
  onClose
}) => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    onClose();
    navigate('/shop');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[15px] shadow-[0_0_10px_0_rgb(0,0,0,0.1)] w-full max-w-md p-6">
        <div className="text-center mb-6">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Payment Successful</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Customer Name:</span>
            <span className="font-medium">{customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Mobile Number:</span>
            <span className="font-medium">{mobileNumber}</span>
          </div>
          
          {/* Show applied promo if available */}
          {appliedPromo && (
            <div className="flex justify-between">
              <span className="text-gray-600">Applied Promo:</span>
              <span className="font-medium text-green-500">{appliedPromo}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Amount:</span>
            <span className="font-medium">₹{paymentAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <button
          onClick={handleOkClick}
          className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-[5px] hover:bg-green-600 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;