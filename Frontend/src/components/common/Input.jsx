import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  error,
  type = 'text',
  icon: Icon,
  className = '',
  id,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || props.name || Math.random().toString(36).substring(7);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
        >
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-500" />}
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={inputId}
          type={effectiveType}
          className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
            isPassword ? 'pr-11' : ''
          } ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
          } ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 focus:outline-none cursor-pointer rounded transition-colors"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-rose-500 font-medium">{error}</p>
      )}
    </div>
  );
}
