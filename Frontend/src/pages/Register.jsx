import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  UserPlus, 
  Sparkles, 
  AlertCircle, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Pencil, 
  Clock, 
  Check, 
  KeyRound,
  Shield,
  CheckCheck
} from 'lucide-react';
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

        {/* Main Card with Subtle Gradient Rim */}
        <div className="p-7 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl shadow-indigo-950/5 space-y-6">

          {/* Interactive Multi-Step Indicator Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            {/* Step 1 Pill */}
            <div 
              onClick={() => {
                if (step === 'otp') {
                  setStep('details');
                  setError('');
                  setSuccessMsg('');
                }
              }}
              className={`flex items-center gap-2.5 ${step === 'otp' ? 'cursor-pointer group' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === 'otp'
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30 group-hover:scale-105'
                  : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-4 ring-indigo-500/15'
              }`}>
                {step === 'otp' ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 1</p>
                <p className={`text-xs font-semibold ${step === 'otp' ? 'text-slate-700 group-hover:text-indigo-600' : 'text-slate-900 font-bold'}`}>
                  Account Details
                </p>
              </div>
            </div>

            {/* Connecting Progress Track */}
            <div className="flex-1 mx-3 h-1 bg-slate-100 rounded-full overflow-hidden relative">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  step === 'otp' ? 'w-full bg-gradient-to-r from-emerald-500 to-indigo-600' : 'w-1/2 bg-indigo-600'
                }`} 
              />
            </div>

            {/* Step 2 Pill */}
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === 'otp'
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}>
                {step === 'otp' ? (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                ) : (
                  '2'
                )}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 2</p>
                <p className={`text-xs font-semibold ${step === 'otp' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
                  Verification
                </p>
              </div>
            </div>
          </div>

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
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-60 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer active:scale-[0.98]"
                >
                  <UserPlus className="w-4 h-4 shrink-0" />
                  <span>{loading ? 'Sending Code...' : 'Create Account & Continue'}</span>
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
              {/* Executive Hero Graphic & Security Icon */}
              <div className="text-center space-y-2.5">
                <div className="relative inline-flex items-center justify-center mb-1">
                  {/* Subtle soft ambient aura */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-md" />
                  
                  {/* Badge Container */}
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-white to-indigo-50/50 border border-indigo-100 shadow-md shadow-indigo-900/5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    {/* Live active beacon */}
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Verify Your Email</h1>
                  <p className="text-xs text-slate-500">
                    We've sent a 6-digit one-time passcode to:
                  </p>
                </div>
                
                {/* Interactive User Email Pill with Edit Button */}
                <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 rounded-full text-xs transition-colors shadow-2xs mx-auto">
                  <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="font-semibold text-slate-800 tracking-tight truncate max-w-[210px]">{email}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('details');
                      setError('');
                      setSuccessMsg('');
                    }}
                    title="Edit email address"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer pl-1.5 border-l border-slate-200"
                  >
                    <Pencil className="w-2.5 h-2.5" />
                    <span>Change</span>
                  </button>
                </div>
              </div>

              {/* Error Alert */}
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

              {/* 6 Individual Digits Code Box Form */}
              <form onSubmit={handleVerifyOtp} className="space-y-6 pt-1">
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Security PIN</span>
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-md px-2 py-0.5">
                      10 Min Expiry
                    </span>
                  </div>

                  {/* 3-3 PIN Boxes with Center Divider */}
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
                    {digits.map((digit, idx) => (
                      <React.Fragment key={idx}>
                        {idx === 3 && (
                          <div className="flex items-center px-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                          </div>
                        )}
                        <input
                          ref={(el) => (inputRefs.current[idx] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className={`w-11 h-14 sm:w-12 sm:h-15 text-center text-2xl font-mono font-black rounded-xl border-2 transition-all outline-none select-all ${
                            digit
                              ? 'border-indigo-600 bg-indigo-50/40 text-indigo-950 shadow-sm shadow-indigo-600/10 scale-[1.02]'
                              : 'border-slate-200 bg-slate-50/70 text-slate-900 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:scale-[1.03]'
                          }`}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading || fullCodeLength !== 6}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer active:scale-[0.98] group"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                      <span>Verifying Security Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify &amp; Launch Studio</span>
                      <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Resend Cooldown with Visual Dynamic Bar */}
              <div className="pt-2 border-t border-slate-100 flex flex-col items-center gap-3 text-xs">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/80 text-indigo-700 font-bold transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>Resend Security Code</span>
                  </button>
                ) : (
                  <div className="w-full max-w-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Resend available in</span>
                      </span>
                      <span className="font-mono font-bold text-indigo-600">{countdown}s</span>
                    </div>
                    {/* Visual countdown progress line */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${(countdown / 60) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-slate-400">
                  Didn't receive it? Check spam folder or promotions tab.
                </p>
              </div>

              {/* Bottom Security Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-[11px] font-medium text-slate-400 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-Bit SSL</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant Auth</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Brevo Verified</span>
                </span>
              </div>
            </>
          )}

        </div>

        {/* Global Footer Trust Badges */}
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
