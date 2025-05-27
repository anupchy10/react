import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { MdLocationPin } from 'react-icons/md';
import SearchBar from './SearchBar';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Nav = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No user logged in');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost/react-auth-backend/get_user.php', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          setUserData(response.data.data);
          setError('');
        } else {
          setError(response.data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching user data');
        console.error('Fetch user error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fallback to 'Guest' if loading or error
  if (loading || error) {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mb-4">
        <div className="h-[56px] py-2 grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 w-full items-center justify-items-center sm:h-auto sm:gap-y-2 sm:py-2">
          {/* Logo and Location Section */}
          <section className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 flex items-center">
            <div className="w-full grid grid-cols-5 items-center sm:place-content-start">
              <div className="col-span-3 sm:col-span-5 lg:col-span-3">
                <Link to="/home">
                  <img
                    src={assets.logo}
                    className="w-full max-h-[32px] sm:max-h-[36px] md:max-h-[40px] lg:max-h-[44px] object-contain"
                    alt="jivorix logo"
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="col-span-2 hidden lg:flex items-center justify-center gap-1.5 sm:gap-2">
                <MdLocationPin className="text-[18px] sm:text-[20px] lg:text-[22px] text-[#6f4e37]" />
                <div>
                  <p className="text-[#6f4e37] text-[9px] sm:text-[10px] lg:text-xs font-medium">Deliver to</p>
                  <h6 className="text-[#6f4e37] text-xs sm:text-sm lg:text-base font-semibold">Nepal</h6>
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
            <div className="w-full grid grid-cols-6 gap-2 sm:gap-3 md:gap-3 lg:gap-4 items-center">
              {/* Cart Icon */}
              <div className="col-span-1 hidden md:block relative">
                <Link to="/cart" className="relative group">
                  <div className="absolute top-[-8px] left-3.5 h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 lg:h-6.5 lg:w-6.5 bg-[#b8a38a] rounded-full flex items-center justify-center">
                    <p className="text-center text-white text-[10px] sm:text-xs md:text-sm">{itemCount}</p>
                  </div>
                  <PiShoppingCartSimpleFill className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] text-[#6f4e37] mt-1.5 group-hover:text-[#b8a38a] transition-all duration-300" />
                </Link>
              </div>

              {/* Profile Section */}
              <div className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5 flex justify-end">
                <Link to="/profile">
                  <div className="flex items-center justify-end gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 bg-white border border-[#b8a38a]/50 rounded-lg p-1 sm:p-1.5 md:p-2 shadow-md hover:shadow-lg hover:bg-[#b8a38a]/10 transition-all duration-300 group">
                    <img
                      src={assets.user}
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full object-cover"
                      alt="user profile"
                      loading="lazy"
                    />
                    <div className="ml-1 sm:ml-1.5 md:ml-2 lg:ml-2.5">
                      <p className="text-[#6f4e37] text-[9px] sm:text-[10px] md:text-xs font-medium">Hello</p>
                      <h6 className="text-[#6f4e37] text-xs sm:text-sm md:text-base font-semibold group-hover:underline transition-all duration-300 truncate max-w-[100px] sm:max-w-[120px] md:max-w-[140px]">
                        Guest
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
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mb-4">
      <div className="h-[56px] py-2 grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 w-full items-center justify-items-center sm:h-auto sm:gap-y-2 sm:py-2">
        {/* Logo and Location Section */}
        <section className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 flex items-center">
          <div className="w-full grid grid-cols-5 items-center sm:place-content-start">
            <div className="col-span-3 sm:col-span-5 lg:col-span-3">
              <Link to="/home">
                <img
                  src={assets.logo}
                  className="w-full max-h-[32px] sm:max-h-[36px] md:max-h-[40px] lg:max-h-[44px] object-contain"
                  alt="jivorix logo"
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="col-span-2 hidden lg:flex items-center justify-center gap-1.5 sm:gap-2">
              <MdLocationPin className="text-[18px] sm:text-[20px] lg:text-[22px] text-[#6f4e37]" />
              <div>
                <p className="text-[#6f4e37] text-[9px] sm:text-[10px] lg:text-xs font-medium">Deliver to</p>
                <h6 className="text-[#6f4e37] text-xs sm:text-sm lg:text-base font-semibold">Nepal</h6>
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
          <div className="w-full grid grid-cols-6 gap-2 sm:gap-3 md:gap-3 lg:gap-4 items-center">
            {/* Cart Icon */}
            <div className="col-span-1 hidden md:block relative">
              <Link to="/cart" className="relative group">
                <div className="absolute top-[-8px] left-3.5 h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 lg:h-6.5 lg:w-6.5 bg-[#b8a38a] rounded-full flex items-center justify-center">
                  <p className="text-center text-white text-[10px] sm:text-xs md:text-sm">{itemCount}</p>
                </div>
                <PiShoppingCartSimpleFill className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] text-[#6f4e37] mt-1.5 group-hover:text-[#b8a38a] transition-all duration-300" />
              </Link>
            </div>

            {/* Profile Section */}
            <div className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5 flex justify-end">
              <Link to="/profile">
                <div className="flex items-center justify-end gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 bg-white border border-[#b8a38a]/50 rounded-lg p-1 sm:p-1.5 md:p-2 shadow-md hover:shadow-lg hover:bg-[#b8a38a]/10 transition-all duration-300 group">
                  <img
                    src={userData?.profileImage || assets.user}
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full object-cover"
                    alt="user profile"
                    loading="lazy"
                  />
                  <div className="ml-1 sm:ml-1.5 md:ml-2 lg:ml-2.5">
                    <p className="text-[#6f4e37] text-[9px] sm:text-[10px] md:text-xs font-medium">Hello</p>
                    <h6 className="text-[#6f4e37] text-xs sm:text-sm md:text-base font-semibold group-hover:underline transition-all duration-300 truncate max-w-[100px] sm:max-w-[120px] md:max-w-[140px]">
                      {userData?.firstName || 'Guest'}
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