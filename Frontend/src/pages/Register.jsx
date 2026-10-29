import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Sparkles, AlertCircle, ShieldCheck, Zap, CheckCircle2, KeyRound, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';

export default function Register() {
  const navigate = useNavigate();
  const { register, verifyOTP, resendOTP } = useAuth();

  const [step, setStep] = useState('details'); // 'details' | 'otp'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const otpInputRef = useRef(null);

  // Timer countdown for resend button
  useEffect(() => {
    let timer;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Focus OTP input when step changes to 'otp'
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 100);
    }
  }, [step]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const res = await register(name, email, password);
    setLoading(false);

    if (res.success) {
      if (res.requireOtp) {
        setStep('otp');
        setCountdown(60);
        setCanResend(false);
        setSuccessMsg(res.message || 'Verification code sent to your email.');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(res.error || 'Failed to create account. Please check your information.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (otp.trim().length !== 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);
    const res = await verifyOTP(email, otp.trim());
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Invalid or expired code. Please try again.');
    }
  };

  const handleResend = async () => {
    if (!canResend || loading) return;
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const res = await resendOTP(email);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('A new 6-digit code has been sent to your email.');
      setCountdown(60);
      setCanResend(false);
      setOtp('');
    } else {
      setError(res.error || 'Failed to resend code. Please try again.');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[#f8faff] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] text-slate-900 font-jakarta overflow-hidden">

      {/* Aurora ambient glows */}
      <div className="w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl pointer-events-none absolute -top-32 -right-32 -z-10" />
      <div className="w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-3xl pointer-events-none absolute top-1/3 -left-24 -z-10" />
      <div className="w-[500px] h-[300px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none absolute -bottom-16 right-1/3 -z-10" />

      <div className="w-full max-w-md space-y-4 relative z-10">

        {/* Eyebrow badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Join Thousands of Professionals</span>
          </span>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/8 space-y-6">

          {step === 'details' ? (
            <>
              <div className="text-center space-y-1">
                <div className="inline-flex p-3.5 bg-gradient-to-tr from-indigo-50 to-purple-50 text-indigo-600 rounded-2xl border border-indigo-100/80 shadow-sm mb-1">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
                <p className="text-xs text-slate-500">
                  Build ATS-perfect resumes and land your dream interview
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-rose-50 border border-rose-200 text-rose-700 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  icon={User}
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  icon={Mail}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  icon={Lock}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold rounded-xl shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer active:scale-[0.98]"
                >
                  <UserPlus className="w-4 h-4 shrink-0" />
                  <span>{loading ? 'Sending Verification Code...' : 'Create Account'}</span>
                </button>
              </form>

              <p className="text-center text-xs text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold underline">
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            /* STEP 2: OTP VERIFICATION */
            <>
              <div className="text-center space-y-1">
                <div className="inline-flex p-3.5 bg-gradient-to-tr from-indigo-50 to-blue-50 text-indigo-600 rounded-2xl border border-indigo-100/80 shadow-sm mb-1">
                  <KeyRound className="w-6 h-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Verify Your Email</h1>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  We sent a 6-digit verification code to <b className="text-slate-800">{email}</b>
                </p>
              </div>

              {successMsg && (
                <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-rose-50 border border-rose-200 text-rose-700 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2 text-center uppercase tracking-wider">
                    Enter 6-Digit Code
                  </label>
                  <div className="flex justify-center">
                    <input
                      ref={otpInputRef}
                      type="text"
                      maxLength={6}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      placeholder="••••••"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-64 text-center tracking-[12px] text-2xl font-mono font-bold py-3 px-4 rounded-2xl bg-slate-50 border-2 border-indigo-200 focus:border-indigo-600 focus:bg-white focus:outline-none transition-all shadow-inner text-slate-900"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{loading ? 'Verifying Code...' : 'Verify & Launch Studio'}</span>
                </button>
              </form>

              <div className="pt-2 flex flex-col items-center gap-3 text-xs">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-700 underline cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resend verification code</span>
                  </button>
                ) : (
                  <p className="text-slate-500">
                    Resend code in <b className="text-slate-700 font-mono">{countdown}s</b>
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStep('details');
                    setError('');
                    setSuccessMsg('');
                  }}
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit email address</span>
                </button>
              </div>
            </>
          )}

        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Free forever — no card needed</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>6 ATS-verified templates</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Cloud sync across devices</span>
          </span>
        </div>
      </div>
    </div>
  );
}
