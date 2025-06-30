import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { CgMail } from 'react-icons/cg';
import { FaPhone } from 'react-icons/fa';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [phoneFocused, setPhoneFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Email and phone validation
    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{10,15}$/;
        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!phoneRegex.test(phone.trim())) {
            setError('Please enter a valid phone number (10-15 digits)');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!email.trim() || !phone.trim()) {
                setError('Please enter both email and phone number');
                setIsLoading(false);
                return;
            }
            if (!validateInputs()) {
                setIsLoading(false);
                return;
            }

            const response = await axios.post('http://localhost/react-auth-backend/reset/forget_password.php', {
                email: email.trim(),
                phone: phone.trim(),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Forgot password response:', response.data);

            if (response.data.success) {
                navigate('/reset-password', {
                    state: {
                        email: email.trim(),
                        userId: response.data.data.userId,
                        name: response.data.data.name,
                        token: response.data.data.token,
                    },
                });
            } else {
                setError(response.data.message || 'Password reset request failed');
            }
        } catch (err) {
            let errorMessage = 'Request failed. Please try again.';
            if (err.response) {
                console.error('Forgot password error response:', err.response.data);
                switch (err.response.status) {
                    case 400:
                        errorMessage = err.response.data.message || 'Invalid email or phone number';
                        break;
                    case 404:
                        errorMessage = err.response.data.message || 'No account found with this email and phone number';
                        break;
                    case 429:
                        errorMessage = err.response.data.message || 'Too many attempts';
                        break;
                    case 500:
                        errorMessage = err.response.data.message || 'Server error';
                        break;
                    default:
                        errorMessage = err.response.data.message || 'Unexpected error';
                }
            } else if (err.request) {
                errorMessage = 'No response from server. Check your connection.';
            }
            setError(errorMessage);
            console.error('Forgot password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-[#FDEDD9] to-[#f8cfa0] flex items-center justify-center p-4 animate-fade-in">
            <style>
                {`
                    @keyframes fade-in {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                    .hiking {
                        animation: fade-in 0.5s ease-in;
                    }
                `}
            </style>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
                <div className="hidden lg:flex items-center justify-center">
                    <img
                        src={assets.forgot}
                        alt="Forgot password banner"
                        loading="lazy"
                        className="w-full h-auto max-h-[600px] object-contain hiking"
                    />
                </div>
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 w-full transition-all duration-500 hiking">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#6f4e37] mb-6">Reset Your Password</h1>
                    <p className="text-center text-gray-600 mb-8">Enter your email and phone number to receive a password reset link</p>

                    {error && (
                        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <label className={`absolute left-2 transition-all duration-300 ${
                                emailFocused || email ? 'text-xs text-[#6f4e37] -translate-y-5' : 'text-gray-500 top-1/2 -translate-y-1/2'
                            }`}>
                                Email*
                            </label>
                            <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                                emailFocused || email ? 'text-[#5957b5]' : 'text-gray-400'
                            }`}>
                                <CgMail className="text-lg" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => !email && setEmailFocused(false)}
                                className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none bg-transparent"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="relative">
                            <label className={`absolute left-2 transition-all duration-300 ${
                                phoneFocused || phone ? 'text-xs text-[#6f4e37] -translate-y-5' : 'text-gray-500 top-1/2 -translate-y-1/2'
                            }`}>
                                Phone Number*
                            </label>
                            <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                                phoneFocused || phone ? 'text-[#5957b5]' : 'text-gray-400'
                            }`}>
                                <FaPhone className="text-lg" />
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onFocus={() => setPhoneFocused(true)}
                                onBlur={() => !phone && setPhoneFocused(false)}
                                className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none bg-transparent"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                                Remembered your password?{' '}
                                <Link to="/login" className="text-[#6f4e37] hover:underline font-medium">
                                    Login
                                </Link>
                            </span>
                            <span className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-[#6f4e37] hover:underline font-medium">
                                    Sign up
                                </Link>
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#6f4e37] text-white py-3 px-4 rounded-full hover:bg-[#5a3c2e] shadow-lg transition duration-300 disabled:opacity-70"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;