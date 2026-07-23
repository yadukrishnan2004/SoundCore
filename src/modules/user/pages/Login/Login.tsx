import React from 'react';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import { FaCheckCircle } from 'react-icons/fa';
import { useAuthForms } from './hooks/useAuthForms';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { VerifySignupForm } from './components/VerifySignupForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { VerifyResetForm } from './components/VerifyResetForm';

function Login() {
  const {
    mode,
    switchMode,
    error,
    message,
    loading,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    otp,
    setOtp,
    newPassword,
    setNewPassword,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleVerifySignupSubmit,
    handleForgotSubmit,
    handleResetSubmit
  } = useAuthForms();

  return (
    <div className="bg-[#0b0c10] text-gray-200 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 flex-grow flex items-center justify-center">
        <div className="w-full bg-[#15161b] border border-white/5 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl min-h-[500px]">
          
          {/* Left Column: Branding */}
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

            {mode === 'login' && (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                handleLoginSubmit={handleLoginSubmit}
                switchMode={switchMode}
              />
            )}

            {mode === 'register' && (
              <RegisterForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                handleRegisterSubmit={handleRegisterSubmit}
                switchMode={switchMode}
              />
            )}

            {mode === 'verify_signup' && (
              <VerifySignupForm
                email={email}
                otp={otp}
                setOtp={setOtp}
                loading={loading}
                handleVerifySignupSubmit={handleVerifySignupSubmit}
                switchMode={switchMode}
              />
            )}

            {mode === 'forgot' && (
              <ForgotPasswordForm
                email={email}
                setEmail={setEmail}
                loading={loading}
                handleForgotSubmit={handleForgotSubmit}
                switchMode={switchMode}
              />
            )}

            {mode === 'verify_reset' && (
              <VerifyResetForm
                otp={otp}
                setOtp={setOtp}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                loading={loading}
                handleResetSubmit={handleResetSubmit}
                switchMode={switchMode}
              />
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;