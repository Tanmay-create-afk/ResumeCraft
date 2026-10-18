import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Sparkles, LayoutDashboard, Compass, LogIn, X, ZoomIn } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [showLogoModal, setShowLogoModal] = useState(false);

  const navLinks = [
    { name: 'Templates', path: '/#templates', icon: Compass },
    { name: 'Studio Builder', path: '/builder', icon: Sparkles },
    { name: 'My Resumes', path: '/dashboard', icon: LayoutDashboard },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLogoModal(true);
  };

  return (
    <>
      <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shrink-0 z-40 sticky top-0 shadow-2xs">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-2.5">
          {/* Clickable Logo Icon with Zoom Tooltip */}
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
            {/* Fallback gradient icon if logo.png not found */}
            <div className="p-1.5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg text-white shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform hidden">
              <FileText className="w-4 h-4" />
            </div>

            {/* Subtle Zoom-in badge on hover */}
            <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-0.5 rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-2.5 h-2.5" />
            </span>
          </button>

          {/* Brand Name Link */}
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">
              ResumeCraft
            </span>
          </Link>
        </div>

        {/* Nav Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" /> Sign In
          </Link>
          <Link
            to="/builder"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> Start Free
          </Link>
        </div>
      </header>

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
            {/* Close button */}
            <button
              onClick={() => setShowLogoModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* High-res zoomed Logo Image */}
            <div className="w-56 h-56 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-2 shadow-inner flex items-center justify-center">
              <img
                src="/logo.png"
                alt="ResumeCraft Full Logo"
                className="w-full h-full object-contain"
              />
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
