import React from 'react'

const ProfileRight = () => {
  return (
    <section>
      <div className='flex flex-col gap-8 mb35 p-3'>
        <h2 className='text-2xl text1 font-medium max-xl:text-[22px] max-md:text-xl max-sm:text-[18px]'>Payment Method</h2>
        <div>
          <div>
            <div className='flex flex-col gap-2 justify-center'>
              <h4 className='text3 text-[16px] max-md:text-[12px] max-sm:text-[10px]'>Payment</h4>
              <p className='text2 max-md:text-[14px] font-medium hover:underline'>Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5 p-3'>
        <h2 className='text-2xl text1 font-medium max-xl:text-[22px] max-md:text-xl max-sm:text-[18px]'>Payment Method</h2>
        <div>
          <div>
            <div className='flex flex-col gap-2 justify-center'>
              <h4 className='text3 text-[16px] max-md:text-[12px] max-sm:text-[10px]'>Shipping</h4>
              <p className='text2 max-md:text-[14px] font-medium hover:underline'>Post Service (1-3 Work Days)</p>
            </div>
            <div className='h-[2px] w-full bg-[#E0D7CC] my-6'></div>
          </div>
          
          <div>
            <div className='flex flex-col gap-2 justify-center'>
              <h4 className='text1 text-[16px] max-sm:text-[14px] font-medium'>Note</h4>
              <p className='text3 text-[14px] max-md:text-[12px] max-sm:text-[10px]'>Please Notify me once the order has been shipped, and provide the tracking information for my reference. Use the order summary component to show belling information such as address, phone number, email, and shipping details.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileRight
