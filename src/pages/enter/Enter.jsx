import React from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Enter = () => {

  const navigate = useNavigate();

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex items-center justify-center">
        <img className='h-full w-full absolute' src={assets.enter} alt="Welcome to our fashion store" loading="lazy" />
        <div className="absolute bg-[#00000066] w-full h-full flex flex-col items-center justify-center gap-[100px] px-[150px]">
          <div>
            <h1 className="text-[#fffbf9] text-[55px] font-extrabold text-center leading-[1.5]">Dress to Express</h1>
            <h3 className='text-[#fffbf9] text-[30px] font-bold text-center mb-[50px]'>Appeals to Identity and Individuality</h3>
            <p className='text-[15px] text-[#dfe0ff] text-center font-light tracking-[1.5px]'>Welcome to <time>Jivorix</time> – your destination for effortless style! Discover curated collections designed to inspire your perfect look. Sign up now for exclusive early access to new arrivals, members-only deals, and personalized recommendations. Just 30 seconds stands between you and your new favorite outfits. Already part of our style community? Log in to explore fresh picks waiting just for you. Your wardrobe upgrade starts here!</p>
          </div>
          <div className='flex gap-[20px]'>
            <button onClick={() => navigate('/login')} className="w-[200px] button2">Login</button>
            <button onClick={() => navigate('/signup')} className='w-[200px] button1'>Sigh Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enter;