import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Sparkles, LayoutDashboard, Compass, LogIn, LogOut, X, ZoomIn, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navLinks = [
    { name: 'Templates', path: '/', icon: Compass },
    { name: 'Studio Builder', path: '/builder', icon: Sparkles },
    { name: 'My Resumes', path: '/dashboard', icon: LayoutDashboard },
  ];

  const isLinkActive = (link) => {
    return location.pathname === link.path;
  };

  const handleNavLinkClick = (link, e) => {
    if (link.name === 'Templates' && location.pathname === '/') {
      e.preventDefault();
    }
    setShowMobileMenu(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLogoModal(true);
  };

  return (
    <>
      <header className="relative h-16 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between shrink-0 z-40 sticky top-0 shadow-[0_4px_25px_-5px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] no-print">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-2.5 z-10">
          <button
            type="button"
            onClick={handleLogoClick}
            title="Click to view logo"
            className="relative flex items-center justify-center p-1 rounded-xl hover:bg-slate-100 hover:ring-2 hover:ring-indigo-500/30 transition-all cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="ResumeCraft Logo"
              className="w-8 h-8 object-contain rounded-lg drop-shadow-xs group-hover:scale-110 transition-transform"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }
              }}
            />
            <div className="p-1.5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg text-white shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform hidden">
              <FileText className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-0.5 rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-2.5 h-2.5" />
            </span>
          </button>

          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">
              ResumeCraft
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links (centered absolutely) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 absolute left-1/2 -translate-x-1/2 z-10">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = isLinkActive(link);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavLinkClick(link, e)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5 transition-colors" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 z-10">
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {(user.name || user.email || 'U')[0].toUpperCase()}
                </span>
                <span className="max-w-[100px] truncate hidden sm:inline">
                  {user.name || user.email.split('@')[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Sign Out"
                className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </Link>
          )}

          <Link
            to="/builder"
            className="hidden sm:flex btn-3d-primary items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Studio Builder
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            title="Open menu"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed top-16 inset-x-0 z-50 bg-white/97 backdrop-blur-xl border-b border-slate-200/80 shadow-xl animate-in slide-in-from-top-2 duration-200 no-print">
          <nav className="flex flex-col p-3 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isLinkActive(link);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavLinkClick(link, e)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {isActive && <span className="ml-auto w-2 h-2 rounded-full bg-indigo-500" />}
                </Link>
              );
            })}

            <div className="h-px bg-slate-100 my-1" />

            {/* Auth row */}
            {user ? (
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    {(user.name || user.email || 'U')[0].toUpperCase()}
                  </span>
                  <span>{user.name || user.email.split('@')[0]}</span>
                </div>
                <button
                  type="button"
                  onClick={() => { logout(); setShowMobileMenu(false); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg cursor-pointer border border-rose-200/80"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <LogIn className="w-4 h-4 text-slate-400" /> Sign In
                </Link>
                <Link
                  to="/builder"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer transition-colors shadow-md shadow-indigo-600/20"
                >
                  <Sparkles className="w-4 h-4" /> Open Studio Builder
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Zoomed-Out Logo Lightbox Modal */}
      {showLogoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowLogoModal(false)}
        >
          <div
            className="relative bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full flex flex-col items-center space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogoModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-56 h-56 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-2 shadow-inner flex items-center justify-center">
              <img src="/logo.png" alt="ResumeCraft Full Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-center">
              <h3 className="font-extrabold text-slate-900 text-lg">ResumeCraft</h3>
              <p className="text-xs text-slate-500 mt-0.5">Professional Resume Studio</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
