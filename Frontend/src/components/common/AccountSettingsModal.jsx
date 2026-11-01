import React, { useState } from 'react';
import { 
  X, User, Mail, Lock, ShieldCheck, CheckCircle2, AlertCircle, 
  KeyRound, RefreshCw, LogOut, Check 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function AccountSettingsModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  const [changingPass, setChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  if (!isOpen || !user) return null;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setSavingProfile(true);

    try {
      await api.auth.updateProfile(name);
      setProfileSuccess('Profile name updated successfully.');
      setTimeout(() => setProfileSuccess(''), 3000);
    } catch (err) {
      setProfileError(err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');
    setChangingPass(true);

    try {
      await api.auth.changePassword(currentPassword, newPassword);
      setPassSuccess('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setPassSuccess(''), 3000);
    } catch (err) {
      setPassError(err.message || 'Failed to change password');
    } finally {
      setChangingPass(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-indigo-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-600/20">
              {(user.name || user.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Account &amp; Security Settings
              </h2>
              <p className="text-xs text-slate-500 truncate max-w-[240px] sm:max-w-none">
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Security Status Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-200/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <span>Brevo Verified Account</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </p>
                <p className="text-[11px] text-emerald-700">
                  Email authentication &amp; 256-bit encryption active
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-800">
              SECURE
            </span>
          </div>

          {/* Form 1: Edit Name */}
          <form onSubmit={handleUpdateProfile} className="space-y-3">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Display Name
            </label>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-600 rounded-xl text-xs sm:text-sm font-semibold outline-none transition-all shadow-2xs"
              />
              <button
                type="submit"
                disabled={savingProfile || !name.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {savingProfile ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save</span>
              </button>
            </div>

            {profileSuccess && (
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {profileSuccess}
              </p>
            )}
            {profileError && (
              <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {profileError}
              </p>
            )}
          </form>

          {/* Form 2: Change Password */}
          <form onSubmit={handleChangePassword} className="space-y-3 border-t border-slate-100 pt-5">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
              <span>Change Password</span>
            </label>

            <div className="space-y-2.5">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-600 rounded-xl text-xs sm:text-sm font-medium outline-none transition-all shadow-2xs"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password (min 6 characters)"
                required
                minLength={6}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-600 rounded-xl text-xs sm:text-sm font-medium outline-none transition-all shadow-2xs"
              />
            </div>

            <button
              type="submit"
              disabled={changingPass || !currentPassword || !newPassword}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {changingPass ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>

            {passSuccess && (
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {passSuccess}
              </p>
            )}
            {passError && (
              <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {passError}
              </p>
            )}
          </form>

        </div>

        {/* Footer with Sign Out */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
          <span className="text-[11px] text-slate-400">
            ResumeCraft Studio v2.0
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
            }}
            className="px-3.5 py-2 rounded-xl text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </div>
  );
}
