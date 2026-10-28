import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Download, CheckCircle2, ArrowLeft, Loader2, FileText } from 'lucide-react';
import api from '../services/api';
import ClassicAtsTemplate from '../components/templates/ClassicAtsTemplate';
import HarvardTemplate from '../components/templates/HarvardTemplate';
import JakesTemplate from '../components/templates/JakesTemplate';
import DeedyTemplate from '../components/templates/DeedyTemplate';
import TechMinimalTemplate from '../components/templates/TechMinimalTemplate';
import ModernCleanTemplate from '../components/templates/ModernCleanTemplate';

export default function PublicPortfolio() {
  const { shareSlug } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicDoc = async () => {
      try {
        setLoading(true);
        const data = await api.resumes.getPublic(shareSlug);
        setResume(data);
      } catch (err) {
        console.warn('Public fetch error:', err.message);
        // Fallback for local preview / demo link
        const local = localStorage.getItem('resumecraft_resumes_list_v1');
        if (local) {
          try {
            const list = JSON.parse(local);
            if (list.length > 0) {
              setResume(list[0]);
              return;
            }
          } catch (_) {}
        }
        setError('This shared resume is either private or does not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicDoc();
  }, [shareSlug]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#f8faff] text-slate-600 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs font-semibold">Loading Verified ATS Resume Portfolio...</p>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-[#f8faff] text-center font-jakarta">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <FileText className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Resume Not Available</h2>
        <p className="text-xs text-slate-500 max-w-sm mb-5">{error || 'This link is currently inactive.'}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/20"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to ResumeCraft
        </Link>
      </div>
    );
  }

  const resumeData = resume.data || {};
  const template = resumeData.theme?.template || 'modern-clean';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8faff] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] py-6 px-4 flex flex-col items-center font-jakarta">
      {/* Top Portfolio HUD */}
      <div className="w-full max-w-3xl mb-4 flex items-center justify-between p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-900 truncate">
            {resumeData.personalInfo?.fullName || 'Verified Candidate'}
          </span>
          <span className="hidden sm:inline text-xs text-slate-400">•</span>
          <span className="hidden sm:inline text-xs text-slate-500">
            {resumeData.personalInfo?.jobTitle || 'Executive Profile'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10.5px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>ATS 100% Parsable</span>
          </span>
          <Link
            to="/builder"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> Build Similar
          </Link>
        </div>
      </div>

      {/* Render Document Paper */}
      <div className="w-[794px] min-w-[794px] max-w-[794px] min-h-[1123px] bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.06)] rounded-sm overflow-hidden mb-12 transform scale-[0.9] sm:scale-100 origin-top">
        {(template === 'classic-ats' || template === 'executive') && (
          <ClassicAtsTemplate resumeData={resumeData} />
        )}
        {(template === 'harvard' || template === 'classic') && (
          <HarvardTemplate resumeData={resumeData} />
        )}
        {(template === 'jakes' || template === 'compact') && (
          <JakesTemplate resumeData={resumeData} />
        )}
        {(template === 'deedy' || template === 'genz') && (
          <DeedyTemplate resumeData={resumeData} />
        )}
        {(template === 'tech-minimal' || template === 'minimal') && (
          <TechMinimalTemplate resumeData={resumeData} />
        )}
        {(template === 'modern-clean' || template === 'modern' || !template) && (
          <ModernCleanTemplate resumeData={resumeData} />
        )}
      </div>
    </div>
  );
}
