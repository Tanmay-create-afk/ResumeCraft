import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Sparkles, Cpu } from 'lucide-react';

/**
 * Hero3DWidgets
 * Floating stereoscopic widgets positioned in 3D space around the Hero Studio Preview.
 * Adds genuine spatial depth, parallax elevation, and tech-grade telemetry.
 */
export default function Hero3DWidgets() {
  return (
    <>
      {/* 3D Floating Widget: Top-Left (ATS Health Gauge) */}
      <div 
        className="absolute -top-10 -left-6 lg:-left-12 hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.18)] animate-float-3d z-30"
        style={{
          transform: 'translateZ(55px) rotateY(-8deg) rotateX(6deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md shadow-emerald-500/25">
          <Cpu className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 ring-2 ring-white animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
            <span>ATS Semantic Match</span>
            <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
              99.4%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            Workday &amp; Taleo Parsable
          </p>
        </div>
      </div>

      {/* 3D Floating Widget: Top-Right (Recruiter Verified) */}
      <div 
        className="absolute -top-8 -right-6 lg:-right-12 hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 text-white backdrop-blur-xl border border-white/20 shadow-[0_25px_45px_-10px_rgba(15,23,42,0.4)] animate-float-3d-reverse z-30"
        style={{
          transform: 'translateZ(58px) rotateY(10deg) rotateX(6deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
          <ShieldCheck className="w-5 h-5 text-indigo-200" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-white">
            <span>Recruiter Approved</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            Silicon Valley Gold Standard
          </p>
        </div>
      </div>

      {/* 3D Floating Chip: Bottom-Left (Vector Typography) */}
      <div 
        className="absolute -bottom-6 -left-4 lg:-left-8 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_15px_30px_-8px_rgba(15,23,42,0.15)] animate-float-3d z-30"
        style={{
          transform: 'translateZ(44px) rotateY(-6deg) rotateX(-4deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-indigo-50 text-indigo-600 text-[11px] font-bold">
          ⚡
        </span>
        <div className="text-[10.5px]">
          <span className="font-bold text-slate-800">Vector A4 PDF</span>
          <span className="text-slate-400 mx-1">•</span>
          <span className="text-slate-500 font-medium">Lossless Print</span>
        </div>
      </div>

      {/* 3D Floating Chip: Bottom-Right (Sync Engine) */}
      <div 
        className="absolute -bottom-6 -right-4 lg:-right-8 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_15px_30px_-8px_rgba(15,23,42,0.15)] animate-float-3d-reverse z-30"
        style={{
          transform: 'translateZ(46px) rotateY(6deg) rotateX(-4deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10.5px] font-bold text-slate-800">Dual-Sync DOM</span>
        <span className="text-slate-400 text-[10px]">(&lt; 5ms)</span>
      </div>
    </>
  );
}
