import React from 'react';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (val: string) => void;
  loading: boolean;
  handleForgotSubmit: (e: React.FormEvent) => void;
  switchMode: (mode: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  setEmail,
  loading,
  handleForgotSubmit,
  switchMode
}) => {
  return (
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
        onClick={() => switchMode('login')}
        className="w-full py-2.5 bg-white/5 text-xs text-gray-400 rounded-xl hover:bg-white/10 flex items-center justify-center gap-2"
      >
        <FaArrowLeft /> Back to Sign In
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
