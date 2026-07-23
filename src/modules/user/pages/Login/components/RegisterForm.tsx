import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

interface RegisterFormProps {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  loading: boolean;
  handleRegisterSubmit: (e: React.FormEvent) => void;
  switchMode: (mode: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleRegisterSubmit,
  switchMode
}) => {
  return (
    <form onSubmit={handleRegisterSubmit} className="space-y-6">
      <div>
        <h3 className="text-2xl font-black text-white">Create Account</h3>
        <p className="text-xs text-gray-500 mt-1">Join SoundCore for exclusive rewards and faster checkout</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Full Name"
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
          onClick={() => switchMode('login')}
          className="text-amber-500 font-bold hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
