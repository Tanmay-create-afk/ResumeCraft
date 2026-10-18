import React, { useState } from 'react';
import ResumeEditor from '../components/ResumeEditor';
import ResumePreview from '../components/ResumePreview';
import { Eye, Edit3 } from 'lucide-react';

export default function Builder() {
  const [mobileView, setMobileView] = useState('editor');

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-100 text-slate-800 font-jakarta">
      {/* Mobile subheader toggle */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-2 flex justify-center shadow-2xs">
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-full max-w-xs">
          <button
            onClick={() => setMobileView('editor')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              mobileView === 'editor' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Resume
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              mobileView === 'preview' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Live Preview
          </button>
        </div>
      </div>

      {/* Main Split Screen Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor Side (Left) */}
        <section
          className={`w-full lg:w-1/2 h-full ${
            mobileView === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ResumeEditor />
        </section>

        {/* Live Preview Side (Right) */}
        <section
          className={`w-full lg:w-1/2 h-full ${
            mobileView === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ResumePreview />
        </section>
      </main>
    </div>
  );
}
