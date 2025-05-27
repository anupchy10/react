import React from 'react'
import { assets } from '../../assets/assets'

const ContactInfo = () => {
  return (
    <section className='p-4 max-md:p-2'>
      <div className='flex flex-col gap-8 max-lg:gap-6 max-md:gap-5 max-sm:gap-4'>
        <h1 className='text1 font-bold text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-[17px]'>Contact Us</h1>
        <div className='flex gap-5 items-center'>
          <img src={assets.landline} className='w-24 max-md:w-16' alt="" loading='lazy' />
          <p className='text-xl font-medium text3'>01-54654963</p>
        </div>
        <div>
          <li className='flex items-center justify-between'>
          <p className='text2 text-[16px] max-lg:text-[14px] max-md:text-[12px] font-semibold'>Support:</p>
          <p className='text2 text-[16px] max-lg:text-[14px] max-md:text-[12px] font-semibold'>166646468658</p>
          </li>
          <li className='flex items-center justify-between'>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>Toll Free (NTC) :</p>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>01-54654963</p>
          </li>
          <li className='flex items-center justify-between'>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>Inside Valley and Banepa :</p>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>01-54654963</p>
          </li>
          <li className='flex items-center justify-between'>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>Bagmati (Outside Valley) and Gandaki :</p>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>01-54654963</p>
          </li>
          <li className='flex items-center justify-between'>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>Province 1 and Madhesh Pradesh :</p>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>01-54654963</p>
          </li>
          <li className='flex items-center justify-between'>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>Lumbini, Karnali and Sudurpashchim :</p>
          <p className='text3 text-[16px max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]'>01-54654963</p>
          </li>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
