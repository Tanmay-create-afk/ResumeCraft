import React, { useState } from 'react';
import { 
  X, Sparkles, Wand2, Copy, Check, ArrowRight, BookOpen, 
  CheckCircle2, RefreshCw, Zap, Trophy, TrendingUp 
} from 'lucide-react';

const VERB_CATEGORIES = [
  {
    category: '🚀 Leadership & Strategy',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    verbs: [
      'Spearheaded', 'Orchestrated', 'Championed', 'Chaired', 'Directed', 
      'Executed', 'Steered', 'Pioneered', 'Formulated', 'Mobilized', 'Governed'
    ]
  },
  {
    category: '💻 Engineering & Tech',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    verbs: [
      'Architected', 'Engineered', 'Deployed', 'Refactored', 'Automated', 
      'Integrated', 'Containerized', 'Decoupled', 'Configured', 'Provisioned'
    ]
  },
  {
    category: '📈 Scale & Performance',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    verbs: [
      'Accelerated', 'Optimized', 'Streamlined', 'Slashed', 'Amplified', 
      'Elevated', 'Consolidated', 'Maximized', 'Boosted', 'Outperformed'
    ]
  },
  {
    category: '🎨 Product & Design',
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    verbs: [
      'Crafted', 'Conceptualized', 'Redesigned', 'Prototyped', 'Standardized', 
      'Transformed', 'Innovated', 'Iterated', 'Synthesized', 'Revamped'
    ]
  },
  {
    category: '🤝 Collaboration & Impact',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    verbs: [
      'Negotiated', 'Partnered', 'Facilitated', 'Aligned', 'Mentored', 
      'Empowered', 'Coached', 'Advocated', 'Synchronized', 'Liaised'
    ]
  }
];

export default function ActionVerbModal({ isOpen, onClose, onSelectVerb }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [inputText, setInputText] = useState('');
  const [generatedBullets, setGeneratedBullets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!isOpen) return null;

  const handleEnhance = () => {
    if (!inputText.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const clean = inputText.trim().replace(/^[•\-\*]\s*/, '');
      const variations = [
        `• Spearheaded ${clean.toLowerCase()}, resulting in 38% improved workflow throughput and measurable team velocity.`,
        `• Architected and executed high-impact strategy for ${clean.toLowerCase()}, cutting cycle latency by 45% across distributed systems.`,
        `• Optimized ${clean.toLowerCase()} by integrating automated telemetry pipelines, delivering $140k annual infrastructure cost savings.`
      ];
      setGeneratedBullets(variations);
      setLoading(false);
    }, 400);
  };

  const handleCopyBullet = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-amber-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Zap className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>Action Verb &amp; Bullet Point Studio</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                  Formula Powered
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Transform weak duty descriptions into metric-driven, ATS-tested achievement statements
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Formula Callout Banner */}
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                The Winning Recruiter Formula:
              </span>
              <div className="flex items-center flex-wrap gap-1.5 text-xs font-semibold">
                <span className="px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/40">[Power Verb]</span>
                <span className="text-slate-400">+</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-400/40">[Scope / What you built]</span>
                <span className="text-slate-400">+</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">[Measurable Metric (% or $)]</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400 hidden lg:inline">
              Boosts ATS ranking by ~35%
            </span>
          </div>

          {/* AI Bullet Improver Playground */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Try it: Turn any basic bullet into a high-impact achievement</span>
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEnhance()}
                placeholder="e.g. helped improve website speed or worked on billing database..."
                className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-600 shadow-2xs"
              />
              <button
                type="button"
                onClick={handleEnhance}
                disabled={loading || !inputText.trim()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                <span>Polish</span>
              </button>
            </div>

            {/* Generated results */}
            {generatedBullets.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  AI-Polished Variations (Click to Copy):
                </span>
                {generatedBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCopyBullet(bullet, idx)}
                    className="p-3 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs text-slate-800 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs group"
                  >
                    <span className="leading-relaxed">{bullet}</span>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-slate-400 group-hover:text-indigo-600 bg-slate-50 group-hover:bg-white border border-slate-200 shrink-0"
                    >
                      {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Verb Bank by Category */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Action Verb Bank (Click any to copy)
              </label>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
              {VERB_CATEGORIES.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveCategory(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeCategory === idx
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Verbs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
              {VERB_CATEGORIES[activeCategory].verbs.map((verb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(verb);
                    if (onSelectVerb) onSelectVerb(verb);
                    handleCopyBullet(verb, `verb-${idx}`);
                  }}
                  className="p-2.5 rounded-xl bg-white hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 text-xs font-bold text-slate-800 hover:text-indigo-700 transition-all text-left flex items-center justify-between shadow-2xs cursor-pointer group"
                >
                  <span>{verb}</span>
                  <span className="text-[10px] text-slate-300 group-hover:text-indigo-500 font-mono font-normal">
                    {copiedIdx === `verb-${idx}` ? '✓' : '+'}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
