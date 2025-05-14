import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const CreditCardPayment = ({ 
  onClose, 
  onProceedToPay,
  productAmount,
  deliveryCharge,
  totalAmount
}) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  const [errors, setErrors] = useState({
    cardNumber: false,
    expiryDate: false,
    cvv: false,
    cardHolderName: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: !cardData.cardNumber,
      expiryDate: !cardData.expiryDate,
      cvv: !cardData.cvv,
      cardHolderName: !cardData.cardHolderName
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onProceedToPay(cardData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[15px] shadow-[0_0_10px_0_rgb(0,0,0,0.1)] w-full max-w-2xl overflow-hidden">
        {/* Header with gradient */}
        <div 
          className="flex justify-between items-center p-4"
          style={{
            background: 'linear-gradient(to right, #eab676, #e28743)'
          }}
        >
          <h3 className="text-xl font-semibold text-white">Credit Card Payment</h3>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Left side - Card Form */}
          <div className="w-full md:w-1/2 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgb(0,0,0,0.1)] focus:outline-none focus:ring-1 focus:ring-[#e28743] ${
                    errors.cardNumber ? 'border-2 border-red-500' : 'border border-gray-300'
                  }`}
                  required
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">Card number is required</p>
                )}
              </div>
              
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 text-lg font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`w-full px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgb(0,0,0,0.1)] focus:outline-none focus:ring-1 focus:ring-[#e28743] ${
                      errors.expiryDate ? 'border-2 border-red-500' : 'border border-gray-300'
                    }`}
                    required
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">Expiry date is required</p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 text-lg font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className={`w-full px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgb(0,0,0,0.1)] focus:outline-none focus:ring-1 focus:ring-[#e28743] ${
                      errors.cvv ? 'border-2 border-red-500' : 'border border-gray-300'
                    }`}
                    required
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">CVV is required</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Card Holder Name</label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={cardData.cardHolderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgb(0,0,0,0.1)] focus:outline-none focus:ring-1 focus:ring-[#e28743] ${
                    errors.cardHolderName ? 'border-2 border-red-500' : 'border border-gray-300'
                  }`}
                  required
                />
                {errors.cardHolderName && (
                  <p className="text-red-500 text-sm mt-1">Card holder name is required</p>
                )}
              </div>
            </form>
          </div>
          
          {/* Right side - Order Summary */}
          <div className="w-full md:w-1/2 bg-gray-50 p-6 border-t md:border-t-0 md:border-l border-[#D9D9D9]">
            <div className="rounded-[10px] shadow-[0_0_10px_0_rgb(0,0,0,0.1)] p-4 bg-white">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product Amount:</span>
                  <span className="font-medium">₹{productAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charge:</span>
                  <span className="font-medium">₹{deliveryCharge.toFixed(2)}</span>
                </div>
                
                <hr className='w-full h-[2px] bg-[#D9D9D9] my-3' />
                
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full mt-6 px-4 py-3 text-white rounded-[5px] hover:opacity-90 transition-colors font-medium"
                  style={{
                    background: 'linear-gradient(to right, #eab676, #e28743)'
                  }}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardPayment;