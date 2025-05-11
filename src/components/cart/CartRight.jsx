import React from 'react'
import { useSelector } from 'react-redux';
import { selectCartTotal, selectSelectedItemsTotal, selectSelectedItemsCount } from '../../redux/cart/cartSlice';
import { FaMapLocationDot, FaCity, FaTag  } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

const CartRight = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector(selectCartTotal);
  const selectedItemsTotal = useSelector(selectSelectedItemsTotal);
  const selectedItemsCount = useSelector(selectSelectedItemsCount);

  const handleOrderSelected = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    console.log('Ordering items:', selectedItems);
  };

  return (
    <section className='bg-white p-6 rounded-[15px] shadow-[0_0_6px_0_rgb(0,0,0,0.2)] w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-xl font-semibold text1">Shopping Cart</h2>
        <h2 className='text-xl font-semibold text-green-500'>{selectedItemsCount} Items</h2>
      </div>
      <hr className='w-full h-1 bg-[#D9D9D9] mb-5' />
      <div className="">
        <div className="p-3 flex flex-col gap-4 items-center w-full justify-center rounded-[10px] shadow-[0_0_10px_0_rgb(0,0,0,0.1)] mb20">
          <ul className='flex items-center justify-between w-full'>
            <li className="text-lg font-medium text3">Product Amount:</li>
            <li className="text-lg font-semibold text3">₹. {selectedItemsTotal.toFixed(2)}</li>
          </ul>
          <ul className='flex items-center justify-between w-full'>
            <li className="text-lg font-medium text3">Delivery Charge:</li>
            <li className="text-lg font-semibold text3">₹. 0</li>
          </ul>
          <hr className='w-full h-[2px] bg-[#D9D9D9] mx-1' />
          <ul className='flex items-center justify-between w-full'>
            <li className="text-lg font-medium text3">Total Amount:</li>
            <li className="text-lg font-semibold text3">₹. {selectedItemsTotal.toFixed(2)}</li>
          </ul>
        </div>

        <form className='mb-5'>
          <ul className='flex flex-col justify-center gap-5 w-full'>
            <li>
              <h4 className='text2 text-xl font-medium mb-2'>Country</h4>
              <div className='relative w-full h-auto'>
                <FaMapLocationDot className="absolute text3 right-4 translate-y-1/2" />
                <input type="text" placeholder='Nepal' className='px-5 py-2 text-[15px] text3 rounded-[5px] shadow-[0_0_5px_0_rgb(0,0,0,0.3)] w-full' required />
              </div>
            </li>
            <li>
              <h4 className='text2 text-xl font-medium mb-2'>City</h4>
              <div className='relative w-full h-auto'>
                <FaCity className="absolute text3 right-4 translate-y-1/2" />
                <input type="text" placeholder='Kathmandu' className='px-5 py-2 text-[15px] text3 rounded-[5px] shadow-[0_0_5px_0_rgb(0,0,0,0.3)] w-full' required />
              </div>
            </li>
            <li>
              <h4 className='text2 text-xl font-medium mb-2'>Address</h4>
              <div className='relative w-full h-auto'>
                <IoHome className="absolute text3 right-4 translate-y-1/2" />
                <input type="text" placeholder='State, colony, home number' className='px-5 py-2 text-[15px] text3 rounded-[5px] shadow-[0_0_5px_0_rgb(0,0,0,0.3)] w-full' required />
              </div>
            </li>
            <li>
              <h4 className='text2 text-xl font-medium mb-2'>Premo Code</h4>
              <div className='relative w-full h-auto'>
                <FaTag className="absolute text3 right-4 translate-y-1/2" />
                <input type="text" placeholder='#283-832' className='px-5 py-2 text-[15px] text3 rounded-[5px] shadow-[0_0_5px_0_rgb(0,0,0,0.3)] w-full' required />
              </div>
            </li>
          </ul>
        </form>

        <span>
          <h5 className='text1 text-[20px] font-semibold mb-4'>Payment</h5>
          <div className='rounded-[10px] shadow-[0_0_10px_0_rgb(0,0,0,0.1)]'>
            <label className='flex gap-5 py-4 px-3 items-center text2 text-[18px] font-medium cursor-pointer hover:bg-gray-200 mb-0 rounded-tl-[10px] rounded-tr-[10px]'>
              <input type="radio" className='w-4 h-4' name="option" value="payment on deliver" required />
              Payment On Deliver
            </label>
            <hr className='w-full h-[2px] bg-[#D9D9D9]' />
            <label className='flex gap-5 py-4 px-3 items-center text2 text-[18px] font-medium mb10 cursor-pointer hover:bg-gray-200 mb-0'>
              <input type="radio" className='w-4 h-4' name="option" value="card pyment" required />
              Card Payment
            </label>
            <hr className='w-full h-[2px] bg-[#D9D9D9]' />
            <label className='flex gap-5 py-4 px-3 items-center text2 text-[18px] font-medium mb10 cursor-pointer hover:bg-gray-200 mb-0'>
              <input type="radio" className='w-4 h-4' name="option" value="paypal payment" required />
              payPal Payment
            </label>
            <hr className='w-full h-[2px] bg-[#D9D9D9]' />
            <div className='flex items-center gap-5 py-4 px-2 cursor-pointer hover:bg-gray-200  rounded-bl-[10px] rounded-br-[10px]'>
              <IoMdAdd className='h-6 w-6 text2' />
              <p className='text2 text-[18px] font-semibold'>Add Credit Card</p>
            </div>
          </div>
        </span>
        <div className='w-full mt-6'>
          <button onClick={handleOrderSelected} className="px-3 py-3 bg-green-500 text-white rounded-[5px] w-full hover:bg-green-600">
            Order Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default CartRight