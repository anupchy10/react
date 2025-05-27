import React, { useState, useEffect } from 'react';
import { FaCaretRight } from "react-icons/fa";
import { assets } from '../../assets/assets';
import { Link } from "react-router-dom";
import axios from 'axios';

const LeftHome = () => {
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

  if (loading) {
    return (
      <aside className="p-3 sm:p-5 mb-4 sm:mb-5 rounded-[15px] shadow-md bg-white">
        <div className="flex flex-col gap-6 sm:gap-8">
          <p className="text-[#6f4e37] text-sm sm:text-base">Loading...</p>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="p-3 sm:p-5 mb-4 sm:mb-5 rounded-[15px] shadow-md bg-white">
        <div className="flex flex-col gap-6 sm:gap-8">
          <p className="text-red-500 text-sm sm:text-base">{error}</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="p-3 sm:p-5 mb-4 sm:mb-5 rounded-[15px] shadow-md bg-white">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Categories Section */}
        <section className="flex flex-col gap-3 sm:gap-4">
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-[#6f4e37] text-xl sm:text-2xl md:text-[26px] font-medium">Categories</h1>
            <span className="h-[2px] w-full rounded-full bg-[#E0D7CC]"></span>
          </div>
          <ul className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4">
            {[
              "Seasonal collection",
              "Occasion based",
              "Style based",
              "Special collection",
              "Casual wares",
              "Sports & Activewear",
              "Traditional Wear"
            ].map((category, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-1 sm:py-2 px-2 sm:px-3 hover:bg-[#b8a38a]/10 rounded-md transition-all duration-300"
              >
                <p className="text-[#6f4e37] text-sm sm:text-base md:text-lg max-md:text-[14px] font-medium">
                  {category}
                </p>
                <FaCaretRight className="text-[#6f4e37] text-sm sm:text-base" />
              </li>
            ))}
          </ul>
          <Link to="/shop">
            <button className="w-full bg-[#6f4e37] text-white py-2 sm:py-3 px-4 rounded-md hover:bg-[#5a3c2e] transition-all duration-300 text-sm sm:text-base md:text-lg">
              Shop Now
            </button>
          </Link>
        </section>

        {/* Help & Support Section */}
        <section className="flex flex-col gap-3 sm:gap-4">
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-[#6f4e37] text-xl sm:text-2xl md:text-[26px] font-medium">Help & Support</h1>
            <span className="h-[2px] w-full rounded-full bg-[#E0D7CC]"></span>
          </div>
          <ul className="flex flex-col gap-2 sm:gap-3 mb-2 sm:mb-3">
            {["Help", "About", "FAQ Questions", "Terms & Conditions", "Privacy Policy", "Contact Us"].map((item, index) => (
              <li
                key={index}
                className="text-[#6f4e37] text-sm sm:text-base hover:underline cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="flex gap-2 sm:gap-3 items-center">
            <Link to="/profile" className="flex items-center gap-2 sm:gap-3 group">
              <img
                src={userData?.profileImage || assets.user}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover"
                alt="user profile"
                loading="lazy"
              />
              <div>
                <h6 className="text-[#6f4e37] text-sm sm:text-base md:text-lg font-semibold group-hover:underline transition-all duration-300 truncate max-w-[120px] sm:max-w-[150px]">
                  {userData?.firstName || 'Guest'}
                </h6>
                <p className="text-[#6f4e37] text-[10px] sm:text-xs md:text-sm font-medium">#{userData?.id || 'N/A'}</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default LeftHome;