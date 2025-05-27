import React from 'react'
import { FaCaretRight } from "react-icons/fa";
import { assets } from '../../assets/assets';
import { Link } from "react-router";

const LeftHome = () => {
  return (
    <aside className='p-5 mb-5 max-xl:p-3 rounded-[15px] shadow1 bg-white'>
      <div className='flex flex-col gap-[30px]'>
        <section className='flex flex-col Gap'>
          <div className='w-full flex flex-col Gap'>
            <h1 className='text1 text-[26px] font-medium'>Categories</h1>
            <span className='h-[2px] w-full rounded-full bg3'></span>
          </div>
          <ul className='flex flex-col no-underline Gap mb15'>
            <li className='categoryBox text3 flex items-center justify-between'><p className='text-[16px] max-md:text-[14px] font-medium'>Seasonal collection</p><FaCaretRight /></li>
            <li className='categoryBox text3 flex items-center justify-between'><p className='text-[16px] max-md:text-[14px] font-medium'>Occasion based</p><FaCaretRight /></li>
            <li className='categoryBox text3 flex items-center justify-between'><p className='text-[16px] max-md:text-[14px] font-medium'>Style based</p><FaCaretRight /></li>
            <li className='categoryBox text3 flex items-center justify-between'><p className='text-[16px] max-md:text-[14px] font-medium'>Special collection</p><FaCaretRight /></li>
            <li className='categoryBox text3 flex items-center justify-between'><p className='text-[16px] max-md:text-[14px] font-medium'>Casual wares</p><FaCaretRight /></li>
            <li className='categoryBox text3 flex items-center justify-between'><p className='text-[16px] max-md:text-[14px] font-medium'>Sports & Activewear</p><FaCaretRight /></li>
            <li className='categoryBox text3 flex items-center justify-between'><p className='text-[16px] max-md:text-[14px] font-medium'>Traditional Wear</p><FaCaretRight /></li>
          </ul>

          <Link to="/shop"><button className='button1 w-full max-md:text-[16px]'>Shop Now</button></Link>
        </section>

        <section className='flex flex-col Gap'>
          <div className='w-full flex flex-col Gap'>
            <h1 className='text1 text-[26px] font-medium'>Help & Support</h1>
            <span className='h-[2px] w-full rounded-full bg3'></span>
          </div>
          <ul className='flex flex-col items-start justify-center no-underline Gap mb10'>
            <li className='footerList'>Help</li>
            <li className='footerList'>About</li>
            <li className='footerList'>FAQ Questions</li>
            <li className='footerList'>Terms & Conditions</li>
            <li className='footerList'>Privacy Policy</li>
            <li className='footerList'>Contact Us</li>
          </ul>
          <div className='flex Gap items-center'>
            <Link to={'/profile'} >
              <img src={assets.user} className=' w-[60px]' alt="user..." loading='lazy' />
              <ul>
                {/* <h6 className='text1 text-base text2 font-semibold text-nowrap'>{user.name && <p>{user.name}</p>}</h6> */}
                <h6 className='text1 text-base text2 font-semibold text-nowrap'>Nicholas Swatz</h6>
                <li className='text3 text-[11px] font-medium text-nowrap'>#579412</li>
              </ul>
            </Link>
          </div>
        </section>
      </div>
    </aside>
  )
}

export default LeftHome
