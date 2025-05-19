import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RiScreenshot2Fill } from "react-icons/ri";
import { PiPrinterFill } from "react-icons/pi";
import { MdOutlineAttachEmail } from "react-icons/md";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 w-full">
      <div className="flex flex-col gap-8 bg-[#F3F3F3] rounded-[15px] shadow-[0_0_10px_0_rgb(0,0,0,0.1)] max-w-[1000PX] p-6 max-lg:p-5 max-md:p-4 w-4/5">
        <div className="text-center mb-4">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-4xl max-lg:text-3xl max-md:text-xl font-semibold text1">Payment Successful</h3>
        </div>
        
        <div className='bg-white rounded-[10px] p-4'>
          <div className="flex flex-col justify-center gap-6 mb-6">
            <div className='flex flex-col gap-3'>
              <div className="flex justify-between">
                <span className="text3 max-md:text-[12px]">Transaction ID:</span>
                <span className="text2 text-[12px] font-medium">{transactionId}</span>
              </div>
              <hr className='w-full h-[2px] bg-[#3333333f]' />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text3 max-md:text-[12px]">Date:</span>
                <span className="text2 text-[12px] font-medium">{date}</span>
              </div>
              <hr className='w-full h-[2px] bg-[#3333333f]' />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text3 max-md:text-[12px]">Payment Method:</span>
                <span className="text2 text-[12px] font-medium">{paymentMethod}</span>
              </div>
              <hr className='w-full h-[2px] bg-[#3333333f]' />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text3 max-md:text-[12px]">Customer Name:</span>
                <span className="text2 text-[12px] font-medium">{customerName}</span>
              </div>
              <hr className='w-full h-[2px] bg-[#3333333f]' />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text3 text-[12px]">Mobile Number:</span>
                <span className="text2 max-md:text-[12px] font-medium">{mobileNumber}</span>
              </div>
              <hr className='h-[2pw-full x] bg-[#3333333f] mt25' />
            </div>
          </div>
          
          {/* Show applied promo if available */}
          {appliedPromo && (
            <div className="flex justify-between">
              <span className="text3 max-md:text-[12px]">Applied Promo:</span>
              <span className="text2 text-[13px] font-medium text-green-500">{appliedPromo}</span>
              <hr className='h-[2pw-full x] bg-[#3333333f] mt25' />
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text3 max-md:text-[12px]">Payment Amount:</span>
            <span className="text2 max-md:text-[12px] font-medium">₹{paymentAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className='w-full space-y-8'>
          <span className='w-11/12 max-md:w-2/3 m-auto flex justify-between items-center'>
            <div className='flex gap-3 text2 items-center'>
              <RiScreenshot2Fill className='w-8 h-8' />
              <p className='text2 text-[22px] max-lg:text-[16px] max-md:hidden'>Take Screenshot</p>
            </div>
            <div className='flex gap-3 text2 items-center'>
              <PiPrinterFill className='w-8 h-8' />
              <p className='text2 text-[22px] max-lg:text-[16px] max-md:hidden'>Print Receipt</p>
            </div>
            <div className='flex gap-3 text2 items-center'>
              <MdOutlineAttachEmail className='w-8 h-8' />
              <p className='text2 text-[22px] max-lg:text-[16px] max-md:hidden'>Email Receipt</p>
            </div>
          </span>

          <button
            onClick={handleOkClick}
            className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-[5px] hover:bg-green-600 transition-colors"
          >
            OK
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default PaymentSuccess;