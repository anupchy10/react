import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import { CgMail } from "react-icons/cg";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost/react-auth-backend/login.php',
        {
          emailOrPhone,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.user_id);
        navigate('/home');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      let errorMessage = 'An error occurred. Please try again.';
      if (err.response) {
        errorMessage = err.response.data?.message || 
                      err.response.statusText || 
                      'Server error occurred';
      } else if (err.request) {
        errorMessage = 'No response from server. Check your connection.';
      }
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='allCenter h-screen w-full bg-[#FCF3E8]'>
      <span className='grid grid-cols-2 gap-[30px] max-lg:gap-[20px] max-w-[1640px] p-[90px] items-center max-lg:p-[60px] max-md:w-full max-md:grid-cols-1 max-md:p-[40px] max-sm:p-[20px]'>
        <section className='max-md:hidden'>
          <img className='w-full' src={assets.login} alt="login image banner" loading="lazy" />
        </section>
        <section className='p-9 boxShado max-lg:p-[25px] bg-white rounded-[15px] flex flex-col gap-[40px]'>
          <div>
            <h1 className='text-center text-[35px] font-semibold max-xl:text-[28px] max-lg:text-[25px] max-md:text-[22px]'>Login</h1>
            {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
          </div>
          <form onSubmit={handleSubmit} className='relative'>
            <div className='flex gap-[20px] flex-col w-full'>
              <div className='relative mb-6'>
                <div className='absolute left-2'>
                  <h6 className={`max-lg:text-[14px] transition-all duration-300 ${(emailFocused || emailOrPhone) ? 'transform -translate-y-5 text-sm text-[#B8A38A]' : 'top-1/2 -translate-y-0 text3'}`}>
                    Email address or phone...
                  </h6>
                </div>
                <div className={`absolute right-2 text-[23px] top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${(emailFocused || emailOrPhone) ? 'text-[#B8A38A]' : '-translate-y-0 text3'}`}>
                  <CgMail className='text-[23px]' />
                </div>
                <input 
                  type="text" 
                  value={emailOrPhone} 
                  onChange={(e) => setEmailOrPhone(e.target.value)} 
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => !emailOrPhone && setEmailFocused(false)}
                  required 
                  className='w-full pt-6 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#B8A38A] outline-none'
                  disabled={isLoading}
                />
              </div>

              <div className='relative mb-6'>
                <div className='absolute left-2 text-[#2a2a2a]'>
                  <h6 className={`max-lg:text-[14px] transition-all duration-300 ${(passwordFocused || password) ? 'transform -translate-y-5 text-sm text-[#B8A38A]' : 'top-1/2 -translate-y-0 text3'}`}>
                    Password
                  </h6>
                </div>
                {password && (
                  <div 
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[#B8A38A] cursor-pointer select-none'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()} // This prevents text selection
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
                  className='w-full pt-6 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#B8A38A] outline-none'
                  disabled={isLoading}
                />
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <p className='para mb10 max-lg:text-[14px]'>Don't have an account? <Link to="/signup" className='underline text-blue-500 hover:text-blue-700'>Sign up</Link></p>
                  <p className='para mb10 max-lg:text-[14px] hover:underline text-blue-500 hover:text-blue-700'>forgot password</p>
                </div>
                <button 
                  className='button1 w-full max-md:text-[16px]' 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </div>
          </form>
          <div className='flex flex-col gap-[20px]'>
            <h1 className='text-center text-[25px] font-semibold max-xl:text-[23px] max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]'>Login With</h1>
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

export default Login;