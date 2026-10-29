import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Sparkles, AlertCircle, ShieldCheck, Zap, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, Pencil, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';

export default function Register() {
  const navigate = useNavigate();
  const { register, verifyOTP, resendOTP } = useAuth();

  const [step, setStep] = useState('details'); // 'details' | 'otp'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 6 separate digits for OTP
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

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

  // Focus first input box when step changes to 'otp'
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
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
        setDigits(['', '', '', '', '', '']);
        setSuccessMsg(res.message || 'Verification code sent to your inbox.');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(res.error || 'Failed to create account. Please check your information.');
    }
  };

  const handleDigitChange = (index, value) => {
    // Only accept numeric inputs
    const cleanVal = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleanVal;
    setDigits(newDigits);
    setError('');

    // If typed a digit, auto-focus next box
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits are filled
    const fullCode = newDigits.join('');
    if (fullCode.length === 6) {
      submitOtpCode(fullCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // If current is empty, focus previous and clear it
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || '';
    }
    setDigits(newDigits);

    // Focus last filled index or the 6th
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();

    if (pasted.length === 6) {
      submitOtpCode(pasted);
    }
  };

  const submitOtpCode = async (codeToVerify) => {
    setError('');
    setLoading(true);

    const res = await verifyOTP(email, codeToVerify);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Invalid or expired code. Please try again.');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const fullCode = digits.join('');
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits of your verification code.');
      return;
    }
    submitOtpCode(fullCode);
  };

  const handleResend = async () => {
    if (!canResend || loading) return;
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const res = await resendOTP(email);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('A new 6-digit code has been delivered to your email.');
      setCountdown(60);
      setCanResend(false);
      setDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } else {
      setError(res.error || 'Failed to resend code. Please try again.');
    }
  };

  const fullCodeLength = digits.join('').length;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[#f8faff] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] text-slate-900 font-jakarta overflow-hidden">

      {/* Ambient background glows */}
      <div className="w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl pointer-events-none absolute -top-32 -right-32 -z-10" />
      <div className="w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-3xl pointer-events-none absolute top-1/3 -left-24 -z-10" />
      <div className="w-[500px] h-[300px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none absolute -bottom-16 right-1/3 -z-10" />

      <div className="w-full max-w-md space-y-4 relative z-10">

        {/* Eyebrow badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Join Thousands of Professionals</span>
          </span>
        </div>

        {/* Main Card */}
        <div className="p-8 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/8 space-y-6">

          {step === 'details' ? (
            /* STEP 1: REGISTRATION DETAILS */
            <>
              <div className="text-center space-y-1">
                <div className="inline-flex p-3 bg-gradient-to-tr from-indigo-50 to-purple-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-xs mb-1">
                  <img src="/logo.png" alt="ResumeCraft" className="w-7 h-7 object-contain" />
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
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-60 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer active:scale-[0.98]"
                >
                  <UserPlus className="w-4 h-4 shrink-0" />
                  <span>{loading ? 'Sending Code...' : 'Create Account'}</span>
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
            /* STEP 2: PROFESSIONAL 6-BOX OTP VERIFICATION */
            <>
              {/* Header with Official Logo & Subtle Glow */}
              <div className="text-center space-y-2">
                <div className="relative inline-block mb-1">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-md" />
                  <div className="relative inline-flex p-3 bg-white border border-indigo-100/90 rounded-2xl shadow-sm">
                    <img src="/logo.png" alt="ResumeCraft" className="w-9 h-9 object-contain" />
                  </div>
                </div>

                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Verify Your Email</h1>
                
                {/* Email Pill with Edit Button */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-full py-1 px-3 max-w-fit mx-auto">
                  <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">{email}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('details');
                      setError('');
                      setSuccessMsg('');
                    }}
                    title="Change email"
                    className="ml-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2.5 p-3 text-xs rounded-xl bg-rose-50 border border-rose-200 text-rose-700 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Notification */}
              {successMsg && !error && (
                <div className="flex items-center gap-2.5 p-2.5 text-xs rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* 6 Individual Code Boxes */}
              <form onSubmit={handleVerifyOtp} className="space-y-6 pt-1">
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Security Code
                    </span>
                    <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-md px-2 py-0.5">
                      6 Digits
                    </span>
                  </div>

                  {/* 3-3 PIN Boxes with Center Divider */}
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
                    {digits.map((digit, idx) => (
                      <React.Fragment key={idx}>
                        {idx === 3 && (
                          <span className="text-slate-300 font-bold select-none text-lg px-0.5">—</span>
                        )}
                        <input
                          ref={(el) => (inputRefs.current[idx] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-2xl font-mono font-extrabold rounded-xl border-2 transition-all outline-none select-all ${
                            digit
                              ? 'border-indigo-600 bg-indigo-50/30 text-indigo-950 shadow-xs'
                              : 'border-slate-200 bg-slate-50/70 text-slate-900 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/15'
                          }`}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || fullCodeLength !== 6}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                      <span>Verifying with Studio...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify &amp; Launch Studio</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>
              </form>

              {/* Resend & Help Footer */}
              <div className="pt-1 flex flex-col items-center gap-2.5 text-xs">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resend verification code</span>
                  </button>
                ) : (
                  <p className="text-slate-500 font-medium">
                    Resend code in <b className="text-indigo-600 font-mono font-bold">{countdown}s</b>
                  </p>
                )}

                <p className="text-[11px] text-slate-400">
                  Didn't receive it? Check your spam folder or Promotions tab.
                </p>
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
