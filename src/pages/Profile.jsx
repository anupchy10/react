import React from 'react'
import ProfileLeft from '../components/profile/ProfileLeft'
import ProfileRight from '../components/profile/ProfileRight'
import ProfileMiddle from '../components/profile/ProfileMiddle'
import LeftHome from '../components/home/LeftHome'

const Profile = () => {
  return (
    <section className='mt-[120px]'>
      <div className='grid grid-cols-12 gap-4 mb20'>
        <div className='col-span-3 max-lg:col-span-5 max-md:hidden'>
          <LeftHome />
        </div>
        <div className='col-span-9 max-lg:col-span-7 max-md:col-span-full'>
          <div className='flex max-lg:flex-col gap-4 max-lg:gap-6'>
            <div className='w-[31%] max-lg:w-full'>
              <ProfileLeft />
            </div>
            <div className='w-[34.5%] max-lg:w-full'>
              <ProfileMiddle />
            </div>
            <div className='w-[34.5%] max-lg:w-full'>
              <ProfileRight />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
