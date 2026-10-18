import React from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Plus, FileText, Clock, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';

export default function Dashboard() {
  const { resumeData } = useResume();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-800 font-jakarta p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Resumes
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage, duplicate, and download your customized resume versions.
            </p>
          </div>

          <Link to="/builder">
            <Button icon={Plus}>
              Create New Resume
            </Button>
          </Link>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Working Resume Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500/50 transition-all shadow-sm flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {resumeData.personalInfo.fullName
                    ? `${resumeData.personalInfo.fullName}'s Resume`
                    : 'My Primary Resume'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {resumeData.personalInfo.jobTitle || 'No target title specified'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <Clock className="w-3.5 h-3.5" />
                <span>Template: <strong className="text-slate-700 capitalize">{resumeData.theme.template}</strong></span>
              </div>
            </div>

            <div className="pt-6">
              <Link to="/builder">
                <Button size="sm" variant="primary" className="w-full" icon={ArrowRight}>
                  Open in Studio
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Create Card */}
          <Link
            to="/builder"
            className="p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group bg-white"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-indigo-100 text-slate-500 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Start from Blank / Template</h3>
              <p className="text-xs text-slate-500 mt-0.5">Jump directly into the split-screen editor</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
