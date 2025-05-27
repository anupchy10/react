import React from 'react'
import { assets } from '../../assets/assets'

const ProfileLeft = () => {
  return (
    <section className='grid grid-cols-12 gap-1 py-4 max-md:py-0'>
      <div className='col-span-11 max-lg:col-span-full'>
        <div className='p-4 max-sm:p-3 flex flex-col gap-6'>
          <div>
            <div className='grid grid-cols-3 gap-4 max-lg:flex max-lg:items-center'>
              <img src={assets.user} className='cursor-pointer col-span-1 max-sm:w-20' alt="" loading='lazy' />
              <div className='col-span-2'>
                <h5 className='text1 text-[18px] max-sm:text-[16px] font-medium'>Nicholas Swatz</h5>
                <p className='text3 text-[12px] max-md:text-[10px] max-sm:text-[8px]'>#579412</p>
              </div>
            </div>
            <div></div>
          </div>

          <div>
            <div className='flex flex-col gap-4 justify-center'>
              <h4 className='text1 text-2xl max-md:text-xl max-sm:text-[18px] font-medium'>About</h4>
              <ul className='flex flex-col gap-3'>
                <li className='flex gap-2 text3 max-md:text-[14px] max-sm:text-[12px] truncate'>Phone: <p>(+977) 9865546524</p></li>
                <li className='flex gap-2 text3 max-md:text-[14px] max-sm:text-[12px] truncate'>Email: <p>nicholasswtz@gmail.com</p></li>
              </ul>
            </div>
            <div className='h-[2px] w-full bg-[#E0D7CC] mt-6'></div>
          </div>

          <div>
            <div className='flex flex-col gap-4 justify-center'>
              <h4 className='text1 text-2xl max-md:text-xl max-sm:text-[18px] font-medium'>Address</h4>
              <ul className='flex flex-col gap-3'>
                <li className='flex gap-2 text3 max-md:text-[14px] max-sm:text-[12px] truncate'>Address: <p>390 Market street, Suite 200</p></li>
                <li className='flex gap-2 text3 max-md:text-[14px] max-sm:text-[12px] truncate'>City state: <p>3Jadibuti, Kathmandu</p></li>
                <li className='flex gap-2 text3 max-md:text-[14px] max-sm:text-[12px] truncate'>Postcode: <p>94102</p></li>
              </ul>
            </div>
            <div className='h-[2px] w-full bg-[#E0D7CC] mt-6'></div>
          </div>

          <div>
            <div className='flex flex-col gap-4 justify-center'>
              <h4 className='text1 text-2xl max-md:text-xl max-sm:text-[18px] font-medium'>User details</h4>
              <ul className='flex flex-col gap-3'>
                <li className='flex gap-2 text3 max-md:text-[14px] max-sm:text-[12px] truncate'>Date of birth: <p>Sep 26, 1997</p></li>
                <li className='flex gap-2 text3 max-md:text-[14px] max-sm:text-[12px] truncate'>National ID: <p>31766 1324 6758</p></li>
                <li className='flex gap-2 text3 max-md:text-[14px] max-sm:text-[12px] truncate'>Gender: <p>Male</p></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <div className='col-span-1 w-full relative max-lg:hidden'>
        <aside className='h-full w-[2px] bg-[#E0D7CC]'></aside>
      </div>
    </section>
  )
}

export default ProfileLeft
