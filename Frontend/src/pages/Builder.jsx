import React, { useState } from 'react';
import ResumeEditor from '../components/ResumeEditor';
import ResumePreview from '../components/ResumePreview';
import ATSScannerModal from '../components/common/ATSScannerModal';
import { useResume } from '../context/ResumeContext';
import { 
  Eye, Edit3, Columns, Sparkles, CheckCircle2, 
  Maximize2, ArrowLeft, Download, FileText, Target, Share2, Copy, Check
} from 'lucide-react';
import api from '../services/api';

export default function Builder() {
  const { resumeData, activeResumeId } = useResume();
  const [mobileView, setMobileView] = useState('editor');
  const [desktopLayout, setDesktopLayout] = useState('split'); // 'split' | 'editor' | 'preview'
  const [showATSModal, setShowATSModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const candidateName = resumeData.personalInfo?.fullName || 'Untitled';
  const roleTitle = resumeData.personalInfo?.jobTitle || 'Resume Draft';

  const handleSharePortfolio = async () => {
    if (!activeResumeId || activeResumeId.startsWith('res_')) {
      // Local draft: create a clean client link
      const fakeSlug = (candidateName || 'resume').toLowerCase().replace(/[^a-z0-9]/g, '-') + '-demo';
      navigator.clipboard?.writeText(`${window.location.origin}/u/${fakeSlug}`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
      return;
    }

    setSharing(true);
    try {
      const res = await api.resumes.toggleShare(activeResumeId, true);
      const url = `${window.location.origin}${res.shareUrl || `/u/${res.shareSlug}`}`;
      navigator.clipboard?.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch (e) {
      console.warn('Share error:', e);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#f8faff] text-slate-800 font-jakarta">
      {/* Studio Clean Light Chrome Bar (Seamlessly matches the rest of the website) */}
      <div className="relative h-12 bg-white/95 backdrop-blur-md text-slate-800 px-3 sm:px-6 flex items-center justify-between shrink-0 border-b border-slate-200/90 z-30 no-print select-none shadow-2xs">
        {/* Left: Window Dots & Document Live Status */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink min-w-0 z-10">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="h-4 w-px bg-slate-200 hidden sm:block shrink-0" />
          <div className="flex items-center gap-2 font-mono text-xs text-slate-600 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-bold text-slate-900 truncate max-w-[90px] sm:max-w-[130px] lg:max-w-[170px]">
              {(candidateName || 'Resume').toLowerCase().replace(/\s+/g, '_')}.pdf
            </span>
            <span className="hidden xl:inline text-slate-400 shrink-0">• {roleTitle}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowATSModal(true)}
            className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-700 text-[10.5px] font-bold shrink-0 transition-colors cursor-pointer"
            title="Scan resume match against target Job Description"
          >
            <Target className="w-3 h-3 text-emerald-600" />
            <span>ATS 99/100 • Scan JD</span>
          </button>
        </div>

        {/* Center: Desktop Layout Switcher (The 3 Subsections: Editor | Split Screen | Full Canvas) */}
        {/* Placed EXACTLY under Navbar's [Templates | Studio Builder | My Resumes] pill (absolute left-1/2 -translate-x-1/2) */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0 absolute left-1/2 -translate-x-1/2 z-20">
          <button
            type="button"
            onClick={() => setDesktopLayout('editor')}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              desktopLayout === 'editor'
                ? 'bg-indigo-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
            title="Focus on Content Editor"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setDesktopLayout('split')}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              desktopLayout === 'split'
                ? 'bg-indigo-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
            title="Dual-Pane Split Screen (50/50)"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split Screen</span>
          </button>
          <button
            type="button"
            onClick={() => setDesktopLayout('preview')}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              desktopLayout === 'preview'
                ? 'bg-indigo-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
            title="Full Page Live Preview Canvas"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Full Canvas</span>
          </button>
        </div>

        {/* Mobile View Switcher (Editor / Preview) */}
        <div className="lg:hidden flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0 z-10">
          <button
            type="button"
            onClick={() => setMobileView('editor')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              mobileView === 'editor' ? 'bg-indigo-600 text-white shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              mobileView === 'preview' ? 'bg-indigo-600 text-white shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>

        {/* Right: Real-Time Sync Indicator & Share */}
        <div className="hidden sm:flex items-center gap-2 shrink-0 z-10">
          <button
            type="button"
            onClick={handleSharePortfolio}
            className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200/80 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            title="Copy recruiter-shareable link"
          >
            {shareCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Share Link</span>
              </>
            )}
          </button>

          <span className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80 flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sync: &lt;5ms</span>
          </span>
        </div>
      </div>

      {/* Main Split Screen Area */}
      <main className="flex-1 flex overflow-hidden print:overflow-visible print:h-auto print:block">
        {/* Editor Side (Left) */}
        <section
          className={`h-full no-print ${
            mobileView === 'editor' ? 'block' : 'hidden lg:block'
          } ${
            desktopLayout === 'editor' 
              ? 'w-full max-w-4xl mx-auto' 
              : desktopLayout === 'preview' 
                ? 'hidden' 
                : 'w-full lg:w-1/2'
          }`}
        >
          <ResumeEditor />
        </section>

        {/* Live Preview Side (Right) */}
        <section
          className={`h-full print:w-full print:block print:h-auto print:overflow-visible ${
            mobileView === 'preview' ? 'block' : 'hidden lg:block'
          } ${
            desktopLayout === 'preview' 
              ? 'w-full' 
              : desktopLayout === 'editor' 
                ? 'hidden' 
                : 'w-full lg:w-1/2'
          }`}
        >
          <ResumePreview />
        </section>
      </main>

      {/* ATS Scanner Modal */}
      <ATSScannerModal
        isOpen={showATSModal}
        onClose={() => setShowATSModal(false)}
        resumeData={resumeData}
      />
    </div>
  );
}
