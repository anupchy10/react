import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedItemsTotal, selectSelectedItemsCount } from '../../redux/cart/cartSlice';
import { FaMapLocationDot, FaCity, FaTag, FaPhone } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import CreditCardPayment from './CreditCardPayment';
import PaymentSuccess from './PaymentSuccess';

const CartRight = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const selectedItemsTotal = useSelector(selectSelectedItemsTotal);
  const selectedItemsCount = useSelector(selectSelectedItemsCount);

  // Form state
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    address: '',
    phone: '',
    promoCode: '',
    customerName: ''
  });

  const [errors, setErrors] = useState({
    country: '',
    city: '',
    address: '',
    phone: '',
    promoCode: '',
    customerName: ''
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('payment on deliver');
  const [showCreditCardPayment, setShowCreditCardPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    transactionId: '',
    date: '',
    paymentMethod: '',
    customerName: '',
    mobileNumber: '',
    paymentAmount: 0
  });

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      country: '',
      city: '',
      address: '',
      phone: '',
      promoCode: '',
      customerName: ''
    };

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
      valid = false;
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address should be at least 10 characters';
      valid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      valid = false;
    }

    // Customer name validation
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const generateTransactionId = () => {
    return 'TXN' + Math.floor(Math.random() * 1000000000).toString().padStart(10, '0');
  };

  const handleOrderSelected = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (paymentMethod === 'Credit Card payment') {
      setShowCreditCardPayment(true);
      return;
    }

    // For other payment methods, show success directly
    showPaymentSuccessModal();
  };

  const handleProceedToPay = (cardData) => {
    // In a real app, you would process payment here
    console.log('Processing payment with:', cardData);
    
    // After successful payment processing
    showPaymentSuccessModal();
    setShowCreditCardPayment(false);
  };

  const showPaymentSuccessModal = () => {
    const transactionDate = new Date().toLocaleString();
    
    setPaymentDetails({
      transactionId: generateTransactionId(),
      date: transactionDate,
      paymentMethod: paymentMethod,
      customerName: formData.customerName,
      mobileNumber: formData.phone,
      paymentAmount: selectedItemsTotal
    });
    
    setShowPaymentSuccess(true);
  };

  const handlePaymentSuccessClose = () => {
    setShowPaymentSuccess(false);
    // Reset form if needed
    setFormData({
      country: '',
      city: '',
      address: '',
      phone: '',
      promoCode: '',
      customerName: ''
    });
  };

  return (
    <section className='bg-white p-6 max-md:p-4 max-sm:p-3 rounded-[15px] shadow-[0_0_6px_0_rgb(0,0,0,0.2)] w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-xl font-semibold text-gray-800 max-sm:text-[18px]">Shopping Cart</h2>
        <h2 className='text-xl font-semibold text-green-500 max-sm:text-[18px]'>{selectedItemsCount} Items</h2>
      </div>
      <hr className='w-full h-1 bg-gray-300 mb-5' />

      <div className="p-3 flex flex-col gap-4 items-center w-full justify-center rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] mb-6">
        <ul className='flex items-center justify-between w-full'>
          <li className="text-lg font-medium text-gray-700 max-md:text-[14px]">Product Amount:</li>
          <li className="text-lg font-semibold text-gray-700 max-md:text-[14px]">₹ {selectedItemsTotal.toFixed(2)}</li>
        </ul>
        <ul className='flex items-center justify-between w-full'>
          <li className="text-lg font-medium text-gray-700 max-md:text-[14px]">Delivery Charge:</li>
          <li className="text-lg font-semibold text-gray-700 max-md:text-[14px]">₹ {selectedItemsCount * 50}.00</li>
        </ul>
        <ul className='flex items-center justify-between w-full'>
          <li className="text-lg font-medium text-gray-700 max-md:text-[14px]">Selected Items:</li>
          <li className="text-lg font-semibold text-gray-700 max-md:text-[14px]">{selectedItemsCount} Items</li>
        </ul>
        <hr className='w-full h-[2px] bg-gray-300 mx-1' />
        <ul className='flex items-center justify-between w-full'>
          <li className="text-lg font-medium text-gray-700 max-md:text-[14px]">Total Amount:</li>
          <li className="text-lg font-semibold text-gray-700 max-md:text-[14px]">₹ {(selectedItemsTotal + (selectedItemsCount * 50)).toFixed(2)}</li>
        </ul>
      </div>

      <form className='mb-5' onSubmit={handleOrderSelected}>
        <ul className='flex flex-col justify-center gap-5 w-full'>
          <li>
            <h4 className='text-gray-700 text-xl font-medium mb-2 max-sm:text-[18px]'>Customer Name</h4>
            <div className='relative w-full h-auto'>
              <input 
                type="text" 
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder='Your full name' 
                className={`px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgba(0,0,0,0.2)] w-full ${errors.customerName ? 'border-red-500 border-2' : ''}`} 
              />
              {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
            </div>
          </li>
          
          <li>
            <h4 className='text-gray-700 text-xl font-medium mb-2 max-sm:text-[18px]'>Country</h4>
            <div className='relative w-full h-auto'>
              <FaMapLocationDot className="absolute text-gray-500 right-4 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder='Nepal' 
                className={`px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgba(0,0,0,0.2)] w-full ${errors.country ? 'border-red-500 border-2' : ''}`} 
              />
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
          </li>
          
          <li>
            <h4 className='text-gray-700 text-xl font-medium mb-2 max-sm:text-[18px]'>City</h4>
            <div className='relative w-full h-auto'>
              <FaCity className="absolute text-gray-500 right-4 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder='Kathmandu' 
                className={`px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgba(0,0,0,0.2)] w-full ${errors.city ? 'border-red-500 border-2' : ''}`} 
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
          </li>
          
          <li>
            <h4 className='text-gray-700 text-xl font-medium mb-2 max-sm:text-[18px]'>Address</h4>
            <div className='relative w-full h-auto'>
              <IoHome className="absolute text-gray-500 right-4 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder='State, colony, home number' 
                className={`px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgba(0,0,0,0.2)] w-full ${errors.address ? 'border-red-500 border-2' : ''}`} 
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
          </li>
          
          <li>
            <h4 className='text-gray-700 text-xl font-medium mb-2 max-sm:text-[18px]'>Phone Number</h4>
            <div className='relative w-full h-auto'>
              <FaPhone className="absolute text-gray-500 right-4 top-1/2 transform -translate-y-1/2" />
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder='9876543210' 
                maxLength="10"
                className={`px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgba(0,0,0,0.2)] w-full ${errors.phone ? 'border-red-500 border-2' : ''}`} 
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </li>
          
          <li>
            <h4 className='text-gray-700 text-xl font-medium mb-2 max-sm:text-[18px]'>Promo Code</h4>
            <div className='relative w-full h-auto'>
              <FaTag className="absolute text-gray-500 right-4 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                name="promoCode"
                value={formData.promoCode}
                onChange={handleInputChange}
                placeholder='#283-832' 
                className='px-5 py-2 text-[15px] text-gray-700 rounded-[5px] shadow-[0_0_5px_0_rgba(0,0,0,0.2)] w-full' 
              />
            </div>
          </li>
        </ul>

        <span className='mt-6 block'>
          <h5 className='text-gray-800 text-xl font-semibold mb-4'>Payment Method</h5>
          <div className='rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'>
            <label className='flex gap-5 py-4 px-3 items-center text-gray-700 text-lg font-medium cursor-pointer hover:bg-gray-100 rounded-t-[10px]'>
              <input 
                type="radio" 
                className='w-4 h-4' 
                name="paymentOption" 
                value="payment on deliver" 
                checked={paymentMethod === 'payment on deliver'}
                onChange={() => setPaymentMethod('payment on deliver')}
                required 
              />
              Payment On Delivery
            </label>
            <hr className='w-full h-[2px] bg-gray-300' />
            <label className='flex gap-5 py-4 px-3 items-center text-gray-700 text-lg font-medium cursor-pointer hover:bg-gray-100'>
              <input 
                type="radio" 
                className='w-4 h-4' 
                name="paymentOption" 
                value="Online payment" 
                checked={paymentMethod === 'Online payment'}
                onChange={() => setPaymentMethod('Online payment')}
                required 
              />
              Online Payment
            </label>
            <hr className='w-full h-[2px] bg-gray-300' />
            <label className='flex gap-5 py-4 px-3 items-center text-gray-700 text-lg font-medium cursor-pointer hover:bg-gray-100 rounded-b-[10px]'>
              <input 
                type="radio" 
                className='w-4 h-4' 
                name="paymentOption" 
                value="Credit Card payment" 
                checked={paymentMethod === 'Credit Card payment'}
                onChange={() => setPaymentMethod('Credit Card payment')}
                required 
              />
              Credit Card Payment
            </label>
          </div>
        </span>
        
        <div className='w-full mt-6'>
          <button 
            type="submit" 
            className="px-3 py-3 bg-green-500 text-white rounded-[5px] w-full hover:bg-green-600 transition-colors duration-300 font-medium text-lg">
            {paymentMethod === 'Credit Card payment' ? 'Proceed to Payment' : 'Place Order'}
          </button>
        </div>
      </form>

      {showCreditCardPayment && (
        <CreditCardPayment
          onClose={() => setShowCreditCardPayment(false)}
          onProceedToPay={handleProceedToPay}
          productAmount={selectedItemsTotal}
          deliveryCharge={selectedItemsCount * 50}
          totalAmount={selectedItemsTotal + (selectedItemsCount * 50)}
        />
      )}
      
      {showPaymentSuccess && (
        <PaymentSuccess
          transactionId={paymentDetails.transactionId}
          date={paymentDetails.date}
          paymentMethod={paymentDetails.paymentMethod}
          customerName={paymentDetails.customerName}
          mobileNumber={paymentDetails.mobileNumber}
          paymentAmount={paymentDetails.paymentAmount}
          onClose={handlePaymentSuccessClose}
        />
      )}
    </section>
  );
};

export default CartRight;