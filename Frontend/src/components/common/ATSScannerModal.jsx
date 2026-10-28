import React, { useState } from 'react';
import { 
  Target, Sparkles, CheckCircle2, AlertCircle, X, 
  ArrowRight, Loader2, Check, Copy, ListFilter
} from 'lucide-react';
import api from '../../services/api';

export default function ATSScannerModal({ isOpen, onClose, resumeData }) {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleScan = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description first.');
      return;
    }
    setError('');
    setAnalyzing(true);
    try {
      const data = await api.ai.scanATSJobMatch(resumeData, jobDescription);
      setResult(data);
    } catch (err) {
      console.error('ATS Scan error:', err);
      setError('Failed to complete ATS scan. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const sampleJD = `Looking for a Senior Full Stack Engineer with strong experience in React, TypeScript, Node.js, and PostgreSQL. Must have hands-on experience with Docker, Kubernetes, AWS cloud architectures, and CI/CD pipelines. Strong problem-solving, microservices design, and leadership skills required.`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto font-jakarta"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                ATS Job Description Scanner
              </h2>
              <p className="text-xs text-slate-500">
                Compare your resume keywords against any LinkedIn or Indeed job posting
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Job Description Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Paste Target Job Description</span>
            <button
              type="button"
              onClick={() => setJobDescription(sampleJD)}
              className="text-indigo-600 hover:underline cursor-pointer font-semibold text-[11px]"
            >
              + Use Sample Tech JD
            </button>
          </div>

          <textarea
            rows={5}
            value={jobDescription}
            onChange={(e) => { setJobDescription(e.target.value); setError(''); }}
            placeholder="Paste the employer's full job description or requirements section here..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all leading-relaxed"
          />

          {error && (
            <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleScan}
              disabled={analyzing}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning ATS Filters...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run ATS Match Scan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        {result && (
          <div className="space-y-4 pt-3 border-t border-slate-100 animate-in fade-in duration-300">
            {/* Score Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-emerald-50 border border-indigo-100/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  ATS Match Score
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Based on required keyword density & employer qualifications
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl sm:text-4xl font-black ${
                  result.matchScore >= 80 ? 'text-emerald-600' : result.matchScore >= 50 ? 'text-indigo-600' : 'text-amber-600'
                }`}>
                  {result.matchScore}%
                </span>
              </div>
            </div>

            {/* Matched & Missing Keywords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Matched Keywords */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Matched Keywords ({result.matchedKeywords?.length || 0})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {result.matchedKeywords?.length > 0 ? (
                    result.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[10.5px] font-semibold bg-emerald-100/80 text-emerald-800 uppercase tracking-wider">
                        ✓ {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No exact matches found yet.</span>
                  )}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Missing High-Impact ({result.missingKeywords?.length || 0})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {result.missingKeywords?.length > 0 ? (
                    result.missingKeywords.slice(0, 10).map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[10.5px] font-semibold bg-amber-100 text-amber-900 uppercase tracking-wider">
                        + {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-emerald-600 font-semibold">All target keywords found!</span>
                  )}
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ListFilter className="w-3.5 h-3.5 text-indigo-600" />
                Actionable Optimization Steps
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {result.recommendations?.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
