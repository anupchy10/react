import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CgLock } from 'react-icons/cg';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email, userId, name, token } = location.state || {};

    // Redirect if no email, userId, name, or token
    useEffect(() => {
        if (!email || !userId || !name || !token) {
            setError('Invalid or expired reset request. Redirecting to forgot password page...');
            setTimeout(() => navigate('/forgot-password'), 3000);
        }
    }, [email, userId, name, token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate passwords
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost/react-auth-backend/reset/reset_password.php', {
                userId,
                email,
                name,
                newPassword,
                token,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setSuccess('Password reset successfully. Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError(response.data.message || 'Password reset failed');
            }
        } catch (err) {
            let errorMessage = 'Request failed. Please try again.';
            if (err.response) {
                errorMessage = err.response.data.message || 'Server error';
            }
            setError(errorMessage);
            console.error('Reset password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-[#FDEDD9] to-[#f8cfa0] flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-md transition-all duration-500 animate-fade-in">
                <h1 className="text-3xl font-bold text-center text-[#6f4e37] mb-6">Set New Password</h1>
                <p className="text-center text-gray-600 mb-8">Enter your new password for {email}</p>

                {error && (
                    <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="network error: getaddrinfo ENOTFOUND localhost localhost:80relative">
                        <label className="absolute left-2 text-xs text-[#6f4e37] -translate-y-5">
                            New Password*
                        </label>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5957b5]">
                            <CgLock className="text-lg" />
                        </div>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none bg-transparent"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="absolute left-2 text-xs text-[#6f4e37] -translate-y-5">
                            Confirm Password*
                        </label>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5957b5]">
                            <CgLock className="text-lg" />
                        </div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pt-5 px-2 pb-2 border-b-2 border-gray-300 focus:border-[#6f4e37] outline-none bg-transparent"
                            disabled={isLoading}
                            required
                        />
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
                            'Reset Password'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;