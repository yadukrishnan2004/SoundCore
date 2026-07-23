import React from 'react';
import { FaKey, FaLock, FaArrowLeft } from 'react-icons/fa';

interface VerifyResetFormProps {
  otp: string;
  setOtp: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  loading: boolean;
  handleResetSubmit: (e: React.FormEvent) => void;
  switchMode: (mode: string) => void;
}

export const VerifyResetForm: React.FC<VerifyResetFormProps> = ({
  otp,
  setOtp,
  newPassword,
  setNewPassword,
  loading,
  handleResetSubmit,
  switchMode
}) => {
  return (
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
        onClick={() => switchMode('forgot')}
        className="w-full py-2.5 bg-white/5 text-xs text-gray-400 rounded-xl hover:bg-white/10 flex items-center justify-center gap-2"
      >
        <FaArrowLeft /> Change Email
      </button>
    </form>
  );
};

export default VerifyResetForm;
