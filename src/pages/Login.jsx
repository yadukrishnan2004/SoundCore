import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/Footer';
import { FaLock, FaEnvelope, FaUser, FaKey, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { AppContext } from './context';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, verifyOtp, forgotPassword, resetPassword } = useContext(AppContext);

  // Determine redirection
  const from = location.state?.from?.pathname || '/';

  // Auth Modes: 'login' | 'register' | 'forgot' | 'verify_signup' | 'verify_reset'
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.status === 200) {
        navigate(from, { replace: true });
      } else {
        setError(res.message || "Failed to log in");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await signup(name, email, password);
      if (res.status === 200) {
        setMessage("Verification code sent to your email!");
        setMode('verify_signup');
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await verifyOtp(email, otp);
      if (res.status === 200) {
        alert("Registration verified successfully! Welcome to SoundCore.");
        navigate(from, { replace: true });
      } else {
        setError(res.message || "Verification failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await forgotPassword(email);
      if (res.status === 200) {
        setMessage(res.message || "Reset OTP sent to your email!");
        setMode('verify_reset');
      } else {
        setError(res.message || "Password reset request failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to initiate password reset");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await resetPassword(otp, newPassword);
      if (res.status === 200) {
        alert("Password updated successfully! Please log in.");
        setPassword('');
        setMode('login');
      } else {
        setError(res.message || "Failed to reset password");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b0c10] text-gray-200 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 flex-grow flex items-center justify-center">
        <div className="w-full bg-[#15161b] border border-white/5 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl min-h-[500px]">
          
          {/* Left Column: Graphics (Branding) */}
          <div className="md:col-span-5 bg-gradient-to-br from-amber-500 to-orange-600 p-8 flex flex-col justify-between text-black text-center md:text-left">
            <div>
              <span className="font-extrabold tracking-widest text-xs uppercase border-b border-black/20 pb-1">SoundCore Hub</span>
              <h2 className="text-3xl font-black tracking-tight mt-6 leading-tight">THE ULTIMATE ACOUSTIC IMMERSION</h2>
              <p className="text-sm font-medium mt-4 opacity-90 leading-relaxed">
                Log in to sync your cart, save premium speakers to your wishlist, and track your active deliveries.
              </p>
            </div>
            
            <div className="mt-8 md:mt-0 text-xs font-bold opacity-75">
              © SoundCore Ltd. All rights reserved.
            </div>
          </div>

          {/* Right Column: Dynamic Form Panel */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-[#131419]">
            
            {/* Display Messages */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs px-4 py-3 rounded-xl mb-6">
                ⚠️ {error}
              </div>
            )}
            {message && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                <FaCheckCircle /> {message}
              </div>
            )}

            {/* LOGIN MODE */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Welcome Back</h3>
                  <p className="text-xs text-gray-500 mt-1">Sign in to your SoundCore account</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#0b0c10] text-sm text-gray-200 pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <FaEnvelope className="absolute left-4 top-4 text-gray-600 text-sm" />
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-[#0b0c10] text-sm text-gray-200 pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <FaLock className="absolute left-4 top-4 text-gray-600 text-sm" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => { setError(''); setMessage(''); setMode('forgot'); }}
                    className="text-xs text-amber-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold rounded-xl transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Signing In..." : "SIGN IN"}
                </button>

                <p className="text-xs text-center text-gray-500">
                  New to SoundCore?{" "}
                  <button
                    type="button"
                    onClick={() => { setError(''); setMessage(''); setMode('register'); }}
                    className="text-amber-500 font-bold hover:underline"
                  >
                    Create account
                  </button>
                </p>
              </form>
            )}

            {/* REGISTER MODE */}
            {mode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Create Account</h3>
                  <p className="text-xs text-gray-500 mt-1">Register for a premium account</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Full Name (No Spaces)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#0b0c10] text-sm text-gray-200 pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <FaUser className="absolute left-4 top-4 text-gray-600 text-sm" />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#0b0c10] text-sm text-gray-200 pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <FaEnvelope className="absolute left-4 top-4 text-gray-600 text-sm" />
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password (Min 8 chars, no space)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-[#0b0c10] text-sm text-gray-200 pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <FaLock className="absolute left-4 top-4 text-gray-600 text-sm" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold rounded-xl transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Registering..." : "REGISTER"}
                </button>

                <p className="text-xs text-center text-gray-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setError(''); setMessage(''); setMode('login'); }}
                    className="text-amber-500 font-bold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            )}

            {/* VERIFY SIGNUP MODE */}
            {mode === 'verify_signup' && (
              <form onSubmit={handleVerifySignupSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Verify Email</h3>
                  <p className="text-xs text-gray-500 mt-1">We sent a 6-digit OTP verification code to {email}</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6-Digit OTP Code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="w-full bg-[#0b0c10] text-center tracking-[1em] text-lg text-white font-extrabold py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold rounded-xl transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "VERIFY CODE"}
                </button>

                <button
                  type="button"
                  onClick={() => { setError(''); setMessage(''); setMode('register'); }}
                  className="w-full py-2.5 bg-white/5 text-xs text-gray-400 rounded-xl hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft /> Back to Signup
                </button>
              </form>
            )}

            {/* FORGOT PASSWORD MODE */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Reset Password</h3>
                  <p className="text-xs text-gray-500 mt-1">Enter your email and we'll send a password recovery code</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Registered Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#0b0c10] text-sm text-gray-200 pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <FaEnvelope className="absolute left-4 top-4 text-gray-600 text-sm" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold rounded-xl transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Sending..." : "SEND RECOVERY CODE"}
                </button>

                <button
                  type="button"
                  onClick={() => { setError(''); setMessage(''); setMode('login'); }}
                  className="w-full py-2.5 bg-white/5 text-xs text-gray-400 rounded-xl hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft /> Back to Sign In
                </button>
              </form>
            )}

            {/* VERIFY RESET MODE */}
            {mode === 'verify_reset' && (
              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Enter New Password</h3>
                  <p className="text-xs text-gray-500 mt-1">Please enter the recovery OTP code and your new password</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6-Digit Reset Code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="w-full bg-[#0b0c10] text-center tracking-[0.5em] text-sm text-white font-extrabold py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <FaKey className="absolute left-4 top-4 text-gray-600 text-sm" />
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      placeholder="New Password (Min 8 chars, no space)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full bg-[#0b0c10] text-sm text-gray-200 pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
                    />
                    <FaLock className="absolute left-4 top-4 text-gray-600 text-sm" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold rounded-xl transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Updating..." : "RESET PASSWORD"}
                </button>

                <button
                  type="button"
                  onClick={() => { setError(''); setMessage(''); setMode('forgot'); }}
                  className="w-full py-2.5 bg-white/5 text-xs text-gray-400 rounded-xl hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft /> Change Email
                </button>
              </form>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;