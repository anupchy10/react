// src/components/navbar/Nav.jsx
import React from 'react'
import { assets } from '../../assets/assets'
import { MdLocationPin } from "react-icons/md";
import SearchBar from './SearchBar';
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {

  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className='w-full max-md:px-4 max-sm:px-2 mb5 max-lg:px-10'>
      <div className='h-[60px] py-[8px] grid grid-cols-12 gap-4 w-full max-sm:grid-cols-2 max-sm:h-auto justify-items-center max-md:justify-items-center content-center max-sm:justify-items-stretch max-sm:gap-y-1 max-sm:py-[8px]'>
        <section className='col-span-2 Gap max-xl:col-span-3 max-lg:col-span-2 max-md:col-span-3 max-sm:col-span-1 max-md:content-center  max-sm:order-2'>
          <div className='w-full grid grid-cols-5 content-center max-sm:place-content-start'>
            <div className='w-full col-span-3 max-lg:col-span-5 content-center max-sm:place-content-start max-sm:mr-[-25px]'>
              <Link to={'/home'} >
                <img src={assets.logo} className='w-full max-sm:h-[40px] max-sm:w-auto' alt="jivorix..." loading="lazy" />
              </Link>
            </div>
            <div className='w-full col-span-2 max-lg:hidden'>
              <div className='flex items-center justify-center gap-[10px]'>
                <ul className='text-[25px] text3'>
                  <MdLocationPin />
                </ul>
                <ul>
                  <li className='text3 text-[11px] font-medium text-nowrap'>Deliver to</li>
                  <h6 className='text1 text-base text2 font-semibold text-nowrap'>Nepal</h6>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className='col-span-8 w-full max-2xl:col-span-7 max-xl:col-span-6 max-lg:col-span-8 max-md:col-span-8 max-sm:col-span-1 max-md:content-center max-sm:order-1 max-sm:col-end-3 max-sm:col-start-1'>
          <SearchBar />
        </section>

        <section className='col-span-2 max-2xl:col-span-3 max-lg:col-span-2 max-md:col-span-1 max-sm:col-span-1 max-md:content-center max-sm:order-3'>
          <div className='w-full grid grid-cols-6 Gap max-lg:gap-3 max-sm:grid-cols-1 max-sm:items-center max-sm:justify-center max-sm:col-span-1 max-md:grid-cols-1 max-md:content-center'>
            <div className='relative col-span-1 max-lg:hidden'>
              <Link to="/cart" className="relative">
                <div className='allCenter absolute top-[-9px] left-5 h-[28px] w-[28px] max-lg:h-[22px] max-lg:w-[22px] bg-[#b8a38a] rounded-full cursor-pointer'>
                  <p className='text-center text-white text-[16px] max-lg:text-[14px]'>
                    {cartItems.length}
                  </p>
                </div>
                <div className='text-[30px] text2 bottom-0 mt-[8px] col-span-3 max-lg:text-[20px] max-md:col-span-8 cursor-pointer'>
                  <PiShoppingCartSimpleFill />
                </div>
              </Link>
            </div>
            <div className='col-span-3 max-lg:col-span-4 max-md:hidden max-sm:block max-sm:col-span-1:'>
              <Link to={'/user'} >
                <div className='gap-4 max-lg:gap-2 flex max-sm:justify-end max-lg:col-span-full'>
                  <img src={assets.user} className=' w-[55px] max-lg:w-[40px]' alt="user..." loading='lazy' />
                  <ul>
                    <li className='text3 text-[11px] font-medium text-nowrap'>Hello</li>
                    {/* <h6 className='text1 text-base text2 font-semibold text-nowrap'>{user.name && <p>{user.name}</p>}</h6> */}
                    <h6 className='text1 text-base text2 font-semibold text-nowrap'>Nicholas</h6>
                  </ul>
                </div>
              </Link>
            </div>
            <div className='col-span-2 max-lg:hidden'>
              <ul>
                <li className='text3 text-[11px] font-medium text-nowrap'>Returns</li>
                <h6 className='text1 text-base text2 font-semibold text-nowrap'>& Orders</h6>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Nav