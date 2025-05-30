import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import { FaUserAlt } from "react-icons/fa";
import { CgMail } from 'react-icons/cg';
import { FaMobile } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineBadge } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";

function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    dateOfBirth: '',
    nationalId: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [middleNameFocused, setMiddleNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [stateFocused, setStateFocused] = useState(false);
  const [postcodeFocused, setPostcodeFocused] = useState(false);
  const [dateOfBirthFocused, setDateOfBirthFocused] = useState(false);
  const [nationalIdFocused, setNationalIdFocused] = useState(false);
  const [genderFocused, setGenderFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password'];
    const isValid = requiredFields.every((field) => formData[field].trim() !== '');
    if (isValid) {
      setError('');
      setStep(2);
    } else {
      setError('Please fill in all required fields.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/react-auth-backend/signup.php', formData);
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

  const stepOneFields = [
    { label: 'First Name*', name: 'firstName', value: formData.firstName, focused: firstNameFocused, setFocused: setFirstNameFocused, Icon: FaUserAlt },
    { label: 'Middle Name', name: 'middleName', value: formData.middleName, focused: middleNameFocused, setFocused: setMiddleNameFocused, Icon: FaUserAlt },
    { label: 'Last Name*', name: 'lastName', value: formData.lastName, focused: lastNameFocused, setFocused: setLastNameFocused, Icon: FaUserAlt },
    { label: 'Email Address*', name: 'email', value: formData.email, focused: emailFocused, setFocused: setEmailFocused, Icon: CgMail, type: 'email' },
    { label: 'Phone Number*', name: 'phone', value: formData.phone, focused: phoneFocused, setFocused: setPhoneFocused, Icon: FaMobile, type: 'tel' }
  ];

  const stepTwoFields = [
    { label: 'Address*', name: 'address', value: formData.address, focused: addressFocused, setFocused: setAddressFocused, Icon: FaMapMarkerAlt },
    { label: 'City*', name: 'city', value: formData.city, focused: cityFocused, setFocused: setCityFocused, Icon: FaMapMarkerAlt },
    { label: 'State*', name: 'state', value: formData.state, focused: stateFocused, setFocused: setStateFocused, Icon: FaMapMarkerAlt },
    { label: 'Postcode*', name: 'postcode', value: formData.postcode, focused: postcodeFocused, setFocused: setPostcodeFocused, Icon: FaMapMarkerAlt },
    { label: 'Date of Birth*', name: 'dateOfBirth', value: formData.dateOfBirth, focused: dateOfBirthFocused, setFocused: setDateOfBirthFocused, Icon: BsCalendarDate, type: 'date' },
    { label: 'National ID*', name: 'nationalId', value: formData.nationalId, focused: nationalIdFocused, setFocused: setNationalIdFocused, Icon: MdOutlineBadge },
    { label: 'Gender*', name: 'gender', value: formData.gender, focused: genderFocused, setFocused: setGenderFocused, Icon: FaTransgender, type: 'select', options: ['Male', 'Female', 'Other'] }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#FDEDD9] to-[#f8cfa0] flex items-center justify-center p-4">
      <style>
        {`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>

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
        <section className="hidden lg:flex items-center justify-center">
          <img
            src={assets.signup}
            alt="signup banner"
            loading="lazy"
            className="w-full h-auto max-h-[600px] object-contain animate-fade-in"
          />
        </section>

        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 w-full transition-all duration-500">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#6f4e37] mb-6">
            Create Account - Step {step} of 2
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                {stepOneFields.map((field, idx) => (
                  <div className="relative" key={idx}>
                    <label className={`absolute left-2 transition-all duration-300 ${
                      (field.focused || field.value) ? 'text-xs text-[#6f4e37] -translate-y-5' : 'text-gray-500 top-1/2 -translate-y-1/2'
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
                      name={field.name}
                      value={field.value}
                      onChange={handleInputChange}
                      onFocus={() => field.setFocused(true)}
                      onBlur={() => !field.value && field.setFocused(false)}
                      required={field.label.includes('*')}
                      className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none bg-transparent"
                    />
                  </div>
                ))}
                <div className="relative">
                  <label className={`absolute left-2 transition-all duration-300 ${
                    (passwordFocused || formData.password) ? 'text-xs text-[#6f4e37] -translate-y-5' : 'text-gray-500 top-1/2 -translate-y-1/2'
                  }`}>
                    Password*
                  </label>
                  {formData.password && (
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
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => !formData.password && setPasswordFocused(false)}
                    required
                    className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none bg-transparent"
                  />
                </div>
                <div className="pt-2">
                  <p className="text-sm text-center mb-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 underline">Login</Link>
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-[#6f4e37] text-white py-2 px-4 rounded-full hover:bg-[#5a3c2e] shadow-lg transition duration-300"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                {stepTwoFields.map((field, idx) => (
  <div className="relative" key={idx}>
    <label className={`absolute left-2 transition-all duration-300 ${
      (field.focused || field.value) ? 'text-xs text4 -translate-y-5' : 'text3 top-1/2 -translate-y-1/2'
    }`}>
      {field.label}
    </label>
    <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
      (field.focused || field.value) ? 'text4' : 'text3'
    }`}>
      <field.Icon className="text-lg" />
    </div>
    {field.type === 'select' ? (
      <select
        name={field.name}
        value={field.value}
        onChange={handleInputChange}
        onFocus={() => field.setFocused(true)}
        onBlur={() => field.setFocused(false)}
        required={field.label.includes('*')}
        className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border4 outline-none bg-transparent appearance-none"
        style={{ color: field.focused || field.value ? 'inherit' : 'transparent' }}
      >
        <option value="" disabled style={{ color: field.focused || field.value ? 'inherit' : 'transparent' }}>Select Gender</option>
        {field.options.map((option) => (
          <option key={option} value={option} style={{ color: 'black' }}>{option}</option>
        ))}
      </select>
    ) : field.name === 'dateOfBirth' ? (
      <input
        type={field.type || 'text'}
        name={field.name}
        value={field.value}
        onChange={handleInputChange}
        onFocus={() => field.setFocused(true)}
        onBlur={() => !field.value && field.setFocused(false)}
        required={field.label.includes('*')}
        max={field.max || undefined}
        placeholder={field.focused ? '(mm/dd/yyyy)' : ''}
        className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border4 outline-none bg-transparent"
      />
) : (
  <input
    type={field.type || 'text'}
    name={field.name}
    value={field.value}
    onChange={handleInputChange}
    onFocus={() => field.setFocused(true)}
    onBlur={() => !field.value && field.setFocused(false)}
    required={field.label.includes('*')}
    max={field.max || undefined}
        className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border4 outline-none bg-transparent"
      />
    )}
  </div>
))}
                
                <div className="pt-2 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full bg-gray-300 text-[#6f4e37] py-2 px-4 rounded-full hover:bg-gray-400 shadow-lg transition duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-[#6f4e37] text-white py-2 px-4 rounded-full hover:bg-[#5a3c2e] shadow-lg transition duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </form>

          {step === 1 && (
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
          )}
        </section>
      </div>
    </div>
  );
}

export default Signup;