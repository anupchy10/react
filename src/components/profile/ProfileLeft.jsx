import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { FaCamera } from 'react-icons/fa';

const ProfileLeft = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);
    setUploadError('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('profile_image', file);

      const response = await axios.post('http://localhost/react-auth-backend/upload_profile_image.php', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setUserData(response.data.data);
        setUploadError('');
      } else {
        setUploadError(response.data.message || 'Failed to upload image');
      }
    } catch (err) {
      setUploadError(err.response?.data?.message || 'An error occurred while uploading the image');
      console.error('Image upload error:', err);
    } finally {
      setUploadLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

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
              <div className="col-span-1 relative group cursor-pointer" onClick={triggerFileInput}>
                <img
                  src={userData?.profileImage || assets.user}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover"
                  alt="user profile"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#6f4e37]/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaCamera className="text-white text-sm sm:text-base md:text-lg" />
                </div>
                {uploadLoading && (
                  <div className="absolute inset-0 bg-[#6f4e37]/70 rounded-full flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <h6 className="text-[#6f4e37] text-sm sm:text-base md:text-lg font-semibold group-hover:underline transition-all duration-300">
                  {userData?.firstName || 'Guest'}
                </h6>
                <p className="text-[#6f4e37] text-[10px] sm:text-xs md:text-sm">#{userData?.id || 'N/A'}</p>
                {uploadError && (
                  <p className="text-red-500 text-[10px] sm:text-xs md:text-sm mt-1">{uploadError}</p>
                )}
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