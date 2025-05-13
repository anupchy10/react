import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import { FaUserAlt } from "react-icons/fa";
import { CgMail } from 'react-icons/cg';
import { FaMobile } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [middleNameFocused, setMiddleNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/react-auth-backend/signup.php', {
        firstName, middleName, lastName, email, phone, password
      });

      if (response.data.success) {
        setIsSuccess(true);
        setError('');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Signup error:', err);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost/react-auth-backend/social-auth.php?provider=${provider}`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#FDEDD9] to-[#f8cfa0] flex items-center justify-center p-4">
      {/* Inline CSS for the progress bar animation */}
      <style>
        {`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>

      {/* Success Popup */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-green-600 mb-2">Success!</h3>
            <p className="mb-4">Registration successful! Redirecting to login in 5 seconds...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ animation: 'progress 5s linear forwards' }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Left Image */}
        <section className="hidden lg:flex items-center justify-center">
          <img
            src={assets.signup}
            alt="signup banner"
            loading="lazy"
            className="w-full h-auto max-h-[600px] object-contain animate-fade-in"
          />
        </section>

        {/* Right Form */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 w-full transition-all duration-500">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#6f4e37] mb-6">Create Account</h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Fields */}
            {[
              { label: 'First Name*', value: firstName, setValue: setFirstName, focused: firstNameFocused, setFocused: setFirstNameFocused, Icon: FaUserAlt },
              { label: 'Middle Name', value: middleName, setValue: setMiddleName, focused: middleNameFocused, setFocused: setMiddleNameFocused, Icon: FaUserAlt },
              { label: 'Last Name*', value: lastName, setValue: setLastName, focused: lastNameFocused, setFocused: setLastNameFocused, Icon: FaUserAlt },
              { label: 'Email Address*', value: email, setValue: setEmail, focused: emailFocused, setFocused: setEmailFocused, Icon: CgMail, type: "email" },
              { label: 'Phone Number*', value: phone, setValue: setPhone, focused: phoneFocused, setFocused: setPhoneFocused, Icon: FaMobile, type: "tel" }
            ].map((field, idx) => (
              <div className="relative" key={idx}>
                <label className={`absolute left-2 transition-all duration-300 ${
                  (field.focused || field.value)
                    ? 'text-xs text-[#6f4e37] -translate-y-5'
                    : 'text-gray-500 top-1/2 -translate-y-1/2'
                }`}>
                  {field.label}
                </label>
                <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                  (field.focused || field.value) ? 'text-[#6f4e37]' : 'text-gray-400'
                }`}>
                  <field.Icon className="text-lg" />
                </div>
                <input
                  type={field.type || 'text'}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  onFocus={() => field.setFocused(true)}
                  onBlur={() => !field.value && field.setFocused(false)}
                  required={field.label.includes('*')}
                  className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none bg-transparent"
                />
              </div>
            ))}

            {/* Password Field */}
            <div className="relative">
              <label className={`absolute left-2 transition-all duration-300 ${
                (passwordFocused || password) ? 'text-xs text-[#6f4e37] -translate-y-5' : 'text-gray-500 top-1/2 -translate-y-1/2'
              }`}>
                Password*
              </label>
              {password && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#6f4e37]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOff className="text-lg" /> : <IoEye className="text-lg" />}
                </button>
              )}
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => !password && setPasswordFocused(false)}
                required
                className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none bg-transparent"
              />
            </div>

            {/* Button and Link */}
            <div className="pt-2">
              <p className="text-sm text-center mb-4">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 underline">Login</Link>
              </p>
              <button
                type="submit"
                className="w-full bg-[#6f4e37] text-white py-2 px-4 rounded-full hover:bg-[#5a3c2e] shadow-lg transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Social Icons */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-center mb-4 text-[#6f4e37]">Sign Up With</h2>
            <div className="flex justify-center gap-5">
              <button 
                onClick={() => handleSocialLogin('google')}
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-300"
              >
                <img src={assets.google} alt="google" loading="lazy" />
              </button>
              <button 
                onClick={() => handleSocialLogin('facebook')}
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-300"
              >
                <img src={assets.facebook} alt="facebook" loading="lazy" />
              </button>
              <button 
                onClick={() => handleSocialLogin('instagram')}
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-300"
              >
                <img src={assets.instagram} alt="instagram" loading="lazy" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signup;