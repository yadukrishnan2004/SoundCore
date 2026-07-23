import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface VerifySignupFormProps {
  email: string;
  otp: string;
  setOtp: (val: string) => void;
  loading: boolean;
  handleVerifySignupSubmit: (e: React.FormEvent) => void;
  switchMode: (mode: string) => void;
}

export const VerifySignupForm: React.FC<VerifySignupFormProps> = ({
  email,
  otp,
  setOtp,
  loading,
  handleVerifySignupSubmit,
  switchMode
}) => {
  return (
    <form onSubmit={handleVerifySignupSubmit} className="space-y-6">
      <div>
        <h3 className="text-2xl font-heading font-black text-text-main">Verify Email</h3>
        <p className="text-xs text-text-muted mt-1">We sent a 6-digit OTP verification code to {email}</p>
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
            className="w-full bg-bg-base text-center tracking-[1em] text-lg text-text-main font-extrabold py-3 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-brand-primary hover:bg-brand-hover text-black font-extrabold rounded-xl transition cursor-pointer disabled:opacity-50"
      >
        {loading ? "Verifying..." : "VERIFY CODE"}
      </button>

      <button
        type="button"
        onClick={() => switchMode('register')}
        className="w-full py-2.5 bg-bg-card text-xs text-text-muted rounded-xl hover:bg-bg-base flex items-center justify-center gap-2 border border-border-subtle"
      >
        <FaArrowLeft /> Back to Signup
      </button>
    </form>
  );
};

export default VerifySignupForm;
