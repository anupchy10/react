import React from 'react'

const ProfileMiddle = () => {
  return (
    <section className='flex w-full items-start justify-start'>
      <div className='flex flex-col gap-8 w-full p-3'>
        <h2 className='text-2xl text1 font-medium max-xl:text-[22px] max-md:text-xl max-sm:text-[18px]'>Shipping & Billing Info</h2>
        <div className='w-full'>
          <div className='w-full'>
            <div className='flex flex-col gap-2 justify-center'>
              <h4 className='text3 text-[16px] max-sm:text-[10px]'>Name</h4>
              <p className='text2 max-sm:text-[14px] font-medium hover:underline'>Nicholas Swatz</p>
            </div>
            <div className='h-[2px] w-full bg-[#E0D7CC]  my-4'></div>
          </div>
          
          <div>
            <div className='flex flex-col gap-2 justify-center'>
              <h4 className='text3 text-[16px] max-sm:text-[10px]'>Email Address</h4>
              <p className='text2 max-sm:text-[14px] font-medium hover:underline'>nicholasswatz@gmail.com</p>
            </div>
            <div className='h-[2px] w-full bg-[#E0D7CC]  my-4'></div>
          </div>
          <div>
            <div className='flex flex-col gap-2 justify-center'>
              <h4 className='text3 text-[16px] max-sm:text-[10px]'>Phone Number</h4>
              <p className='text2 max-sm:text-[14px] font-medium hover:underline'>(+977) 9865546524</p>
            </div>
            <div className='h-[2px] w-full bg-[#E0D7CC]  my-4'></div>
          </div>
          <div>
            <div className='flex flex-col gap-2 justify-center'>
              <h4 className='text3 text-[16px] max-sm:text-[10px]'>Shipping Address</h4>
              <p className='text2 max-sm:text-[14px] font-medium hover:underline'>390 Market street, Suite 200 NE 94102</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProfileMiddle
