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
      <section className='grid grid-cols-12 gap-1 py-4 max-md:py-0'>
        <div className='col-span-11 max-lg:col-span-full'>
          <div className='p-4 max-sm:p-3 flex justify-center items-center'>
            <p className="text-[#6f4e37] text-sm sm:text-base">Loading...</p>
          </div>
        </div>
        <div className='col-span-1 w-full relative max-lg:hidden'>
          <aside className='h-full w-[2px] bg-[#E0D7CC]'></aside>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='grid grid-cols-12 gap-1 py-4 max-md:py-0'>
        <div className='col-span-11 max-lg:col-span-full'>
          <div className='p-4 max-sm:p-3 flex justify-center items-center'>
            <p className='text-red-500 text-sm sm:text-base'>{error}</p>
          </div>
        </div>
        <div className='col-span-1 w-full relative max-lg:hidden'>
          <aside className='h-full w-[2px] bg-[#E0D7CC]'></aside>
        </div>
      </section>
    );
  }

  return (
    <section className='grid grid-cols-12 gap-1 py-4 max-md:py-0'>
      <div className='col-span-11 max-lg:col-span-full'>
        <div className='p-4 max-sm:p-3 flex flex-col gap-6'>
          <div>
            <div className='grid grid-cols-3 gap-4 max-lg:flex max-lg:items-center'>
              <div className="relative cursor-pointer col-span-1 max-sm:w-20" onClick={triggerFileInput}>
                <img
                  src={userData?.profileImage || assets.user}
                  alt="User Profile"
                  loading="lazy"
                  className='w-full'
                />
                <div className="absolute inset-0 bg-[#6f4e37]/50 rounded-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <FaCamera className="text-white text-lg" />
                </div>
                {uploadLoading && (
                  <div className="absolute inset-0 bg-[#6f4e37]/70 rounded-md flex items-center justify-center">
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

              <div className='col-span-2'>
                <h5 className='text1 text-[18px] max-sm:text-[16px] font-medium'>
                  {userData?.firstName || 'Guest'}
                </h5>
                <p className='text3 text-[12px] max-md:text-[10px] max-sm:text-[8px]'>
                  #{userData?.id || 'N/A'}
                </p>
                {uploadError && (
                  <p className="text-red-500 text-xs mt-1">{uploadError}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col gap-4 justify-center'>
              <h4 className='profileHead'>Contact info</h4>
              <ul className='flex flex-col gap-3'>
                <li className='profileText'>
                  Phone: <p>{userData?.phone || 'N/A'}</p>
                </li>
                <li className='profileText'>
                  Email: <p>{userData?.email || 'N/A'}</p>
                </li>
              </ul>
            </div>
            <div className='h-[2px] w-full bg-[#E0D7CC] mt-6'></div>
          </div>

                    <div>
            <div className='flex flex-col gap-4 justify-center'>
              <h4 className='profileHead'>Address</h4>
              <ul className='flex flex-col gap-3'>
                <li className='profileText'>Address: <p>390 Market street, Suite 200</p></li>
                <li className='profileText'>City state: <p>3Jadibuti, Kathmandu</p></li>
                <li className='profileText'>Postcode: <p>94102</p></li>
              </ul>
            </div>
            <div className='h-[2px] w-full bg-[#E0D7CC] mt-6'></div>
          </div>
          <div>
            <div className='flex flex-col gap-4 justify-center'>
              <h4 className='profileHead'>User details</h4>
              <ul className='flex flex-col gap-3'>
                <li className='profileText'>Date of birth: <p>Sep 26, 1997</p></li>
                <li className='profileText'>National ID: <p>31766 1324 6758</p></li>
                <li className='profileText'>Gender: <p>Male</p></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <div className='col-span-1 w-full relative max-lg:hidden'>
        <aside className='h-full w-[2px] bg-[#E0D7CC]'></aside>
      </div>
    </section>
  );
};

export default ProfileLeft;
