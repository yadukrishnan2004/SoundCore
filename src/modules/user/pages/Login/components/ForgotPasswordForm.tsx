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
        <h3 className="text-2xl font-heading font-black text-text-main">Reset Password</h3>
        <p className="text-xs text-text-muted mt-1">Enter your email and we'll send a password recovery code</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-bg-base text-sm text-text-main pl-11 pr-4 py-3 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
          />
          <FaEnvelope className="absolute left-4 top-4 text-text-muted text-sm" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-brand-primary hover:bg-brand-hover text-black font-extrabold rounded-xl transition cursor-pointer disabled:opacity-50"
      >
        {loading ? "Sending..." : "SEND RECOVERY CODE"}
      </button>

      <button
        type="button"
        onClick={() => switchMode('login')}
        className="w-full py-2.5 bg-bg-card text-xs text-text-muted rounded-xl hover:bg-bg-base flex items-center justify-center gap-2 border border-border-subtle"
      >
        <FaArrowLeft /> Back to Sign In
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
