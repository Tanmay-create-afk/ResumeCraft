import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, AlertCircle, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[#f8faff] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] text-slate-900 font-jakarta overflow-hidden">

      {/* Aurora ambient glows (matching Home / Dashboard) */}
      <div className="w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-3xl pointer-events-none absolute -top-32 -left-32 -z-10" />
      <div className="w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none absolute top-1/4 -right-24 -z-10" />
      <div className="w-[500px] h-[300px] bg-purple-400/10 rounded-full blur-3xl pointer-events-none absolute -bottom-16 left-1/3 -z-10" />

      <div className="w-full max-w-md space-y-4 relative z-10">

        {/* Eyebrow badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>ResumeCraft Studio</span>
          </span>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/8 space-y-6">

          <div className="text-center space-y-1">
            <div className="inline-flex p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100/80 shadow-sm mb-1">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-xs text-slate-500">
              Sign in to sync and manage your career documents
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-rose-50 border border-rose-200 text-rose-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold rounded-xl shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer active:scale-[0.98]"
            >
              <LogIn className="w-4 h-4 shrink-0" />
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/builder')}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200/90 hover:border-slate-300 shadow-2xs flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Continue as Guest (No Account Needed)</span>
            </button>
          </form>

          <p className="text-center text-xs text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-bold underline">
              Create account
            </Link>
          </p>
        </div>

        {/* Trust Badges row */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>No credit card required</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>ATS-verified templates</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Export as 300 DPI PDF</span>
          </span>
        </div>
      </div>
    </div>
  );
}
