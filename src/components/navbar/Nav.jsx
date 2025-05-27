import React from 'react';
import { assets } from '../../assets/assets';
import { MdLocationPin } from 'react-icons/md';
import SearchBar from './SearchBar';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 mb-5">
      <div className="h-[60px] py-2 grid grid-cols-12 gap-4 w-full sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 items-center justify-items-center sm:h-auto sm:gap-y-2 sm:py-2">
        {/* Logo and Location Section */}
        <section className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 flex items-center">
          <div className="w-full grid grid-cols-5 items-center sm:place-content-start">
            <div className="col-span-3 lg:col-span-3 sm:col-span-5">
              <Link to="/home">
                <img
                  src={assets.logo}
                  className="w-full max-h-[36px] sm:max-h-[40px] lg:max-h-[48px] object-contain"
                  alt="jivorix logo"
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="col-span-2 hidden lg:flex items-center justify-center gap-2">
              <MdLocationPin className="text-[20px] sm:text-[22px] lg:text-[25px] text-[#6f4e37]" />
              <div>
                <p className="text-[#6f4e37] text-[10px] sm:text-xs font-medium">Deliver to</p>
                <h6 className="text-[#6f4e37] text-sm sm:text-base font-semibold">Nepal</h6>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-8 w-full flex items-center">
          <SearchBar />
        </section>

        {/* Cart and Profile Section */}
        <section className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 flex items-center justify-end">
          <div className="w-full grid grid-cols-6 gap-2 sm:gap-3 lg:gap-4 items-center">
            {/* Cart Icon */}
            <div className="col-span-1 hidden lg:block relative">
              <Link to="/cart" className="relative group">
                <div className="absolute top-[-8px] left-4 h-6 w-6 sm:h-6 sm:w-6 lg:h-7 lg:w-7 bg-[#b8a38a] rounded-full flex items-center justify-center">
                  <p className="text-center text-white text-xs sm:text-sm lg:text-base">{itemCount}</p>
                </div>
                <PiShoppingCartSimpleFill className="text-[24px] sm:text-[26px] lg:text-[30px] text-[#6f4e37] mt-2 group-hover:text-[#b8a38a] transition-all duration-300" />
              </Link>
            </div>

            {/* Profile Section */}
            <div className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5 flex justify-end">
              <Link to="/profile">
                <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 bg-white border border-[#b8a38a]/50 rounded-lg p-1 sm:p-2 shadow-md hover:shadow-lg hover:bg-[#b8a38a]/10 transition-all duration-300 group">
                  <img
                    src={assets.user}
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full object-cover"
                    alt="user profile"
                    loading="lazy"
                  />
                  <div className="ml-1 sm:ml-2 lg:ml-3">
                    <p className="text-[#6f4e37] text-[10px] sm:text-xs font-medium">Hello</p>
                    <h6 className="text-[#6f4e37] text-sm sm:text-base font-semibold group-hover:underline transition-all duration-300">
                      {user.firstName || 'Guest'}
                    </h6>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Nav;