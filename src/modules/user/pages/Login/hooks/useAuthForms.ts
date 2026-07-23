import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../../../store/useAuthStore';

export function useAuthForms() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, verifyOtp, forgotPassword, resetPassword } = useAuthStore();

  const from = location.state?.from?.pathname || '/';

  // Auth Modes: 'login' | 'register' | 'forgot' | 'verify_signup' | 'verify_reset'
  const [mode, setMode] = useState<string>('login');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Form Fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const switchMode = (newMode: string) => {
    setError('');
    setMessage('');
    setMode(newMode);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySignupSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to initiate password reset");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
