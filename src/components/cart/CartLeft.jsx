// pages/CartLeft.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeItemFromCart, 
  incrementQuantity, 
  decrementQuantity, 
  toggleItemSelection, 
  selectAllItems,
  selectCartTotal,
} from '../../redux/cart/cartSlice';
import { IoAddCircle } from "react-icons/io5";
import { FaCircleMinus } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import DividerLine from '../DividerLine';

const CartLeft = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector(selectCartTotal);

  const allItemsSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  const handleRemoveSelected = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    selectedItems.forEach(item => {
      dispatch(removeItemFromCart(item._id));
    });
  };

  const handleSelectAll = () => {
    dispatch(selectAllItems(!allItemsSelected));
  };

  return (
    <section className="w-full bg-white p-6 rounded-[15px] shadow-[0_0_6px_0_rgb(0,0,0,0.2)]">
      <div className=" flex justify-between max-sm:flex-col items-center mb-4">
        <h2 className="text-xl font-semibold text1 max-sm:text-[17px] text-start max-sm:w-full">Your Cart ({cartItems.length})</h2>
        <div className="flex gap-4 max-sm:gap-2 max-sm:justify-between max-sm:w-full">
          <aside 
            className='flex items-center gap-2 cursor-pointer'
            onClick={handleSelectAll}
          >
            <input 
              type="checkbox" 
              className='h-5 w-5 cursor-pointer'
              checked={allItemsSelected}
              onChange={handleSelectAll}
              onClick={(e) => e.stopPropagation()}
            />
            <p className='select-none'>Select All</p>
          </aside>
          <button onClick={handleRemoveSelected} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Remove All
          </button>
        </div>
      </div>
      <hr className='w-full h-1 bg-[#D9D9D9] mb-5' />

      {cartItems.length === 0 ? (
        <p className="text-center py-10">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <section key={item._id} className='max-sm:m-auto max-sm:p-2 min-w-[320px] max-sm:shadow-[0_0_10px_0_rgb(0,0,0,0.1)] max-sm:mb-5 max-sm:rounded-[15px]'>
              <div className="w-full p-1 flex max-sm:flex-col justify-between items-center gap-4 mb-5 relative h-auto ">
                <span >
                  <div className='flex gap-4 max-md:gap-1 items-center max-sm:items-start'>
                    <input
                      type="checkbox"
                      checked={item.selected || false}
                      onChange={() => dispatch(toggleItemSelection(item._id))}
                      className="h-5 w-5"
                    />

                  <div className='flex gap-4 max-sm:flex-col'>
                    <img src={item.image} alt={item.name} className="w-auto h-40 max-md:h-32 max-sm:h-auto max-sm:w-full object-cover rounded" />
                    <div className='h-full flex flex-col justify-between gap-4'>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[20px] max-md:text-[17px]">{item.name}</h3>
                        <p className="text-sm text3 max-md:text-[14px]">{item.desc}</p>
                      </div>

                      <div className='flex gap-5 items-center'>
                        <p className="font-medium text-[#B8A38A]">₹. {item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => dispatch(decrementQuantity(item._id))} className="text-red-500">
                            <FaCircleMinus className='h-6 w-6 max-md:h-5 max-md:w-5' />
                          </button>
                          <span className='allCenter w-10 h-8 max-md:h-6 max-md:w-8 max-md:text-[16px] mx-2 text-xl text-[#B8A38A] ring-1 ring-[#B8A38A] rounded-[5px]'>{item.quantity}</span>
                          <button onClick={() => dispatch(incrementQuantity(item._id))} className="text-green-500 text-3xl">
                            <IoAddCircle className='max-md:h-6 max-md:w-6' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </span>

                <span className='flex flex-col max-sm:flex-row max-sm:mt-3 items-end justify-between gap-11'>
                  <p className="font-semibold">₹. {(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => dispatch(removeItemFromCart(item._id))} 
                    className="p-1 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <RiDeleteBin6Fill className='h-6 w-6' />
                    Delete
                  </button>
                </span>
              </div>
              <hr className='w-full h-[2px] bg-[#D9D9D9] max-sm:hidden' />
            </section>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <div className="text-right flex gap-4 items-center">
          <h3 className="text-lg font-semibold text1">Cart Amount: ₹. {cartTotal.toFixed(2)}</h3>
        </div>
      </div>
    </section>
  );
};

export default CartLeft;