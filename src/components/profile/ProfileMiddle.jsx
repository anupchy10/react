import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileMiddle = () => {
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
      <section className="flex w-full items-start justify-start">
        <div className="flex flex-col gap-6 w-full p-3 sm:p-4">
          <p className="text-[#6f4e37] text-sm sm:text-base">Loading...</p>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="flex w-full items-start justify-start">
        <div className="flex flex-col gap-6 w-full p-3 sm:p-4">
          <p className="text-red-500 text-sm sm:text-base">{error}</p>
        </div>
      </section>
    );
  }
  const fullName = [userData?.firstName, userData?.middleName, userData?.lastName]
    .filter(name => name)
    .join(' ') || 'Guest';
  return (
    <section className="flex w-full items-start justify-start">
      <div className="flex flex-col gap-6 sm:gap-8 w-full p-3 sm:p-4">
        <h2 className="text-[#6f4e37] text-xl sm:text-2xl md:text-[26px] font-medium max-xl:text-[22px] max-md:text-xl max-sm:text-lg">
          User Information
        </h2>
        <div className="w-full">
          <div className="w-full">
            <div className="flex flex-col gap-2 justify-center">
              <h4 className="text-[#6f4e37] text-sm sm:text-base md:text-lg max-sm:text-xs">Name</h4>
              <p className="text-[#6f4e37] text-base sm:text-lg md:text-xl font-medium hover:underline max-sm:text-sm truncate">
                {fullName}
              </p>
            </div>
            <div className="h-[2px] w-full bg-[#E0D7CC] my-3 sm:my-4"></div>
          </div>
          <div>
            <div className="flex flex-col gap-2 justify-center">
              <h4 className="text-[#6f4e37] text-sm sm:text-base md:text-lg max-sm:text-xs">Email Address</h4>
              <p className="text-[#6f4e37] text-base sm:text-lg md:text-xl font-medium hover:underline max-sm:text-sm truncate">
                {userData?.email || 'N/A'}
              </p>
            </div>
            <div className="h-[2px] w-full bg-[#E0D7CC] my-3 sm:my-4"></div>
          </div>
          <div>
            <div className="flex flex-col gap-2 justify-center">
              <h4 className="text-[#6f4e37] text-sm sm:text-base md:text-lg max-sm:text-xs">Phone Number</h4>
              <p className="text-[#6f4e37] text-base sm:text-lg md:text-xl font-medium hover:underline max-sm:text-sm truncate">
                {userData?.phone || 'N/A'}
              </p>
            </div>
            <div className="h-[2px] w-full bg-[#E0D7CC] my-3 sm:my-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileMiddle;