import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import { FaUserAlt } from "react-icons/fa";
import { CgMail } from 'react-icons/cg';
import { FaMobile } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/react-auth-backend/signup.php', {
        name,
        email,
        phone,
        password
      });

      
      
      if (response.data.success) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className='allCenter h-screen w-full bg-[#FDEDD9]'>
      <span className='grid grid-cols-2 gap-[30px] max-lg:gap-[20px] max-w-[1640px] p-[90px] items-center max-lg:p-[40px] max-md:w-full max-md:grid-cols-1 max-md:p-[20px] max-sm:p-[15px]'>
        <section className='max-md:hidden'>
          <img src={assets.signup} alt="signup banner" loading="lazy" />
        </section>
        <section className='p-9 boxShado max-lg:p-[25px] bg-white rounded-[15px] flex flex-col gap-[40px]'>
          <h1 className='text-center text-[35px] font-semibold max-xl:text-[28px] max-lg:text-[25px] max-md:text-[22px]'>Sign Up</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className='flex gap-[20px] flex-col w-full'>
              <div className='relative mb-6'>
                <div className='absolute left-2 text-[#2a2a2a]'>
                  <h6 className={`max-lg:text-[14px] transition-all duration-300 ${(nameFocused || name) ? 'transform -translate-y-5 text-sm text-[#B8A38A]' : 'top-1/2 -translate-y-0 text3'}`}>Full name</h6>
                </div>
                <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${(nameFocused || name) ? 'text-[#B8A38A]' : '-translate-y-0 text3'}`}>
                  <FaUserAlt className='text-[20px]' />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => !name && setNameFocused(false)}
                  required
                  className='w-full pt-6 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#B8A38A] outline-none'
                />
              </div>

              <div className='relative mb-6'>
                <div className='absolute left-2 text-[#2a2a2a]'>
                  <h6 className={`max-lg:text-[14px] transition-all duration-300 ${(emailFocused || email) ? 'transform -translate-y-5 text-sm text-[#B8A38A]' : 'top-1/2 -translate-y-0 text3'}`}>Email address</h6>
                </div>
                <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${(emailFocused || email) ? 'text-[#B8A38A]' : '-translate-y-0 text3'}`}>
                  <CgMail className='text-[23px]' />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => !email && setEmailFocused(false)}
                  required
                  className='w-full pt-6 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#B8A38A] outline-none'
                />
              </div>

              <div className='relative mb-6'>
                <div className='absolute left-2 text-[#2a2a2a]'>
                  <h6 className={`max-lg:text-[14px] transition-all duration-300 ${(phoneFocused || phone) ? 'transform -translate-y-5 text-sm text-[#B8A38A]' : 'top-1/2 -translate-y-0 text3'}`}>Phone number</h6>
                </div>
                <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${(phoneFocused || phone) ? 'text-[#B8A38A]' : '-translate-y-0 text3'}`}>
                  <FaMobile className='text-[20px]' />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => !phone && setPhoneFocused(false)}
                  className='w-full pt-6 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#B8A38A] outline-none'
                />
              </div>

              <div className='relative mb-6'>
                <div className='absolute left-2 text-[#2a2a2a]'>
                  <h6 className={`max-lg:text-[14px] transition-all duration-300 ${(passwordFocused || password) ? 'transform -translate-y-5 text-sm text-[#B8A38A]' : 'top-1/2 -translate-y-0 text3'}`}>Password</h6>
                </div>
                {password && (
                  <div 
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-colors duration-300 text-[#B8A38A] cursor-pointer select-none`}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <IoEyeOff className='text-[23px]' /> : <IoEye className='text-[23px]' />}
                  </div>
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => !password && setPasswordFocused(false)}
                  required
                  className='w-full pt-6 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#B8A38A] outline-none select-none'
                />
              </div>

              <div>
                <p className='para mb10 max-lg:text-[14px]'>Already have an account? <Link to="/login" className='underline text-blue-500 hover:text-blue-700'>Login</Link></p>
                <button className='button1 w-full' type="submit">Sign Up</button>
              </div>

            </div>
          </form>
          <div className='flex flex-col gap-[20px]'>
            <h1 className='text-center text-[25px] font-semibold max-xl:text-[23px] max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]'>Sign Up With</h1>
            <ul className="allCenter gap-[25px]">
              <li><Link to={'https://accounts.google.com'} target='_blank' rel="noopener noreferrer"><img className='w-[55px] h-[55px] cursor-pointer max-lg:h-[45px] max-md:h-[40px] max-lg:w-[45px] max-md:w-[40px]' src={assets.google} alt="google" loading="lazy" /></Link></li>
              <li><Link to={'https://www.facebook.com/'} target='_blank' rel="noopener noreferrer"><img className='w-[55px] h-[55px] cursor-pointer max-lg:h-[45px] max-md:h-[40px] max-lg:w-[45px] max-md:w-[40px]' src={assets.facebook} alt="facebook" loading="lazy" /></Link></li>
              <li><Link to={'https://www.instagram.com/'} target='_blank' rel="noopener noreferrer"><img className='w-[55px] h-[55px] cursor-pointer max-lg:h-[45px] max-md:h-[40px] max-lg:w-[45px] max-md:w-[40px]' src={assets.instagram} alt="instagram" loading="lazy" /></Link></li>
            </ul>
          </div>
        </section>
      </span>
    </div>
  );
}

export default Signup;