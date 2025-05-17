import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const OnlinePayment = ({
  onClose,
  onProceedToPay,
  productAmount = 0,
  deliveryCharge = 0,
  discount = 0,
  totalAmount = 0,
  onPaymentSuccess,
  appliedPromo = null
}) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const PAYMENT_OPTIONS = [
    {
      id: 'esewa',
      name: 'eSewa',
      icon: 'src/components/cart/images/esewa.png',
      description: 'Pay securely with your eSewa wallet'
    },
    {
      id: 'khalti',
      name: 'Khalti',
      icon: 'src/components/cart/images/khalti.png',
      description: 'Pay with Khalti digital wallet'
    },
    {
      id: 'imepay',
      name: 'IME Pay',
      icon: 'src/components/cart/images/imepay.png',
      description: 'Secure payments with IME Pay'
    },
    {
      id: 'connectips',
      name: 'Connect IPS',
      icon: 'src/components/cart/images/connectips.png',
      description: 'Direct bank transfer through Connect IPS'
    },
    {
      id: 'fonepay',
      name: 'Fonepay',
      icon: 'src/components/cart/images/fonepay.png',
      description: 'Pay through Fonepay payment gateway'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleProceed = () => {
    if (!selectedMethod) return;

    onPaymentSuccess({
      transactionId: 'TXN' + Math.floor(Math.random() * 1000000000).toString().padStart(10, '0'),
      date: new Date().toLocaleString(),
      paymentMethod: selectedMethod.name,
      customerName: '',
      mobileNumber: '',
      paymentAmount: totalAmount,
      appliedPromo: appliedPromo ? appliedPromo.label : null
    });

    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all duration-300 ease-in-out scale-100 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">Choose Payment Method</h3>
          <button onClick={onClose} className="text-white hover:text-gray-300 transition">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Side: Payment Options */}
          <div className="w-full md:w-1/2 p-6 space-y-4">
            {PAYMENT_OPTIONS.map((option) => (
              <div
                key={option.id}
                className={`p-4 border-2 rounded-xl cursor-pointer transition duration-200 shadow-sm hover:shadow-md hover:border-indigo-400 ${
                  selectedMethod?.id === option.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedMethod(option)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl border border-gray-300 flex items-center justify-center shadow">
                    <img src={option.icon} alt={option.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{option.name}</h4>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full md:w-1/2 bg-gray-50 p-6 border-t md:border-t-0 md:border-l border-gray-200">
            <div className="rounded-2xl p-6 bg-white shadow-md space-y-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Order Summary</h4>

              <div className="flex justify-between text-gray-700">
                <span>Product Amount:</span>
                <span className="font-medium">₹{productAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Delivery Charge:</span>
                <span className="font-medium">
                  {appliedPromo?.type === 'fixed' ? (
                    <span className="text-green-500 line-through">₹{deliveryCharge.toFixed(2)}</span>
                  ) : (
                    `₹${deliveryCharge.toFixed(2)}`
                  )}
                </span>
              </div>

              {(discount > 0 || appliedPromo) && (
                <div className="flex justify-between text-gray-700">
                  <span>
                    Discount {appliedPromo ? `(${appliedPromo.label})` : ''}:
                  </span>
                  <span className="font-medium text-green-600">-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <hr className="border-gray-200" />

              <div className="flex justify-between font-semibold text-gray-900 text-lg">
                <span>Total:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>

              <button
                onClick={handleProceed}
                disabled={!selectedMethod}
                className={`w-full mt-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold tracking-wide transition ${
                  !selectedMethod ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                Proceed with {selectedMethod?.name || 'Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlinePayment;
