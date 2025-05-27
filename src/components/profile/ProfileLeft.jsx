import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';

const ProfileLeft = () => {
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
      <section className="grid grid-cols-12 gap-1 py-4 sm:py-6">
        <div className="col-span-11 lg:col-span-11 max-lg:col-span-full">
          <div className="p-3 sm:p-4 flex justify-center items-center h-full">
            <p className="text-[#6f4e37] text-sm sm:text-base">Loading...</p>
          </div>
        </div>
        <div className="col-span-1 w-full relative max-lg:hidden">
          <aside className="h-full w-[2px] bg-[#E0D7CC]"></aside>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="grid grid-cols-12 gap-1 py-4 sm:py-6">
        <div className="col-span-11 lg:col-span-11 max-lg:col-span-full">
          <div className="p-3 sm:p-4 flex justify-center items-center h-full">
            <p className="text-red-500 text-sm sm:text-base">{error}</p>
          </div>
        </div>
        <div className="col-span-1 w-full relative max-lg:hidden">
          <aside className="h-full w-[2px] bg-[#E0D7CC]"></aside>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-12 gap-1 py-4 sm:py-6">
      <div className="col-span-11 lg:col-span-11 max-lg:col-span-full">
        <div className="p-3 sm:p-4 flex flex-col gap-4 sm:gap-6">
          {/* Profile Info */}
          <div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-lg:flex max-lg:items-center max-lg:gap-3">
              <img
                src={assets.user}
                className="cursor-pointer col-span-1 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover"
                alt="user profile"
                loading="lazy"
              />
              <div className="col-span-2 flex flex-col justify-center">
                <h6 className="text-[#6f4e37] text-sm sm:text-base md:text-lg font-semibold group-hover:underline transition-all duration-300">
                  {userData?.firstName || 'Guest'}
                </h6>
                <p className="text-[#6f4e37] text-[10px] sm:text-xs md:text-sm">#{userData?.id || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <h4 className="text-[#6f4e37] text-xl sm:text-2xl md:text-[26px] font-medium">About</h4>
              <ul className="flex flex-col gap-2 sm:gap-3">
                <li className="flex gap-2 text-[#6f4e37] text-xs sm:text-sm md:text-base truncate">
                  Phone: <p>{userData?.phone || 'N/A'}</p>
                </li>
                <li className="flex gap-2 text-[#6f4e37] text-xs sm:text-sm md:text-base truncate">
                  Email: <p>{userData?.email || 'N/A'}</p>
                </li>
              </ul>
            </div>
            <div className="h-[2px] w-full bg-[#E0D7CC] mt-4 sm:mt-6"></div>
          </div>

          {/* Additional Info */}
          <div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <h4 className="text-[#6f4e37] text-xl sm:text-2xl md:text-[26px] font-medium">User Details</h4>
              <ul className="flex flex-col gap-2 sm:gap-3">
                <li className="flex gap-2 text-[#6f4e37] text-xs sm:text-sm md:text-base truncate">
                  Middle Name: <p>{userData?.middleName || 'N/A'}</p>
                </li>
                <li className="flex gap-2 text-[#6f4e37] text-xs sm:text-sm md:text-base truncate">
                  Last Name: <p>{userData?.lastName || 'N/A'}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 w-full relative max-lg:hidden">
        <aside className="h-full w-[2px] bg-[#E0D7CC]"></aside>
      </div>
    </section>
  );
};

export default ProfileLeft;