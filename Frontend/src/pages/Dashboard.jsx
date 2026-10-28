import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { 
  Plus, FileText, Clock, ArrowRight, Copy, Trash2, Edit3, Download, 
  Sparkles, CheckCircle2, Search, Filter, Layers, Briefcase, 
  ShieldCheck, Check, X, ChevronRight, Eye, RefreshCw, Upload, Loader2
} from 'lucide-react';
import Button from '../components/common/Button';
import api from '../services/api';

// Available templates matching Studio Builder & Home
const AVAILABLE_TEMPLATES = [
  { id: 'modern-clean', name: 'Modern Clean', tag: 'Top ATS Pick', desc: 'Sleek executive header with structured skills grid', color: '#4f46e5' },
  { id: 'classic-ats', name: 'Classic ATS', tag: '99% Match', desc: 'Standard single-column corporate executive format', color: '#0284c7' },
  { id: 'harvard', name: 'Harvard Classic', tag: 'Ivy League', desc: 'Traditional academic serif layout with clean hierarchy', color: '#9333ea' },
  { id: 'jakes', name: "Jake's Compact", tag: 'FAANG Favorite', desc: 'Ultra-compact high-density engineering format', color: '#059669' },
  { id: 'deedy', name: 'Deedy Modern', tag: 'Two-Column', desc: 'Sidebar skills + high-impact bullet points', color: '#ea580c' },
  { id: 'tech-minimal', name: 'Tech Minimal', tag: 'Silicon Valley', desc: 'Clean monospace accents for software engineers', color: '#0d9488' },
];

// Aesthetic Realistic Miniature Visual Resume Paper Component
function MiniResumePaper({ resume, isActive }) {
  const theme = resume.data?.theme || {};
  const personal = resume.data?.personalInfo || {};
  const skills = resume.data?.skills || ['React', 'TypeScript', 'Node.js', 'Tailwind'];
  const templateId = theme.template || 'modern-clean';
  const accentColor = theme.accentColor || '#4f46e5';

  const candidateName = personal.fullName || 'Alex Morgan';
  const jobTitle = personal.jobTitle || 'Senior Full Stack Technologist';

  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-xs flex flex-col select-none transition-all duration-300 group-hover:shadow-md">
      {/* Top Document Header Accent Strip */}
      <div 
        className="h-2 w-full transition-colors"
        style={{ backgroundColor: accentColor }}
      />

      {/* Miniature Document Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between bg-white text-slate-800">
        {/* Header Preview */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-extrabold text-xs text-slate-900 truncate tracking-tight">
              {candidateName}
            </span>
            <span 
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              ATS 99
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
            {jobTitle}
          </p>
          <div className="h-px bg-slate-100 my-1.5" />
        </div>

        {/* Simulated Document Sections (Realistic Micro Layout Lines) */}
        <div className="space-y-1.5 my-auto">
          {/* Section: Experience */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <span className="text-[8.5px] font-bold text-slate-700 uppercase tracking-wider">Experience</span>
            </div>
            <div className="space-y-1 pl-3 border-l border-slate-100">
              <div className="flex justify-between items-center text-[8px] text-slate-600 font-semibold">
                <span className="truncate max-w-[130px]">Staff Design Technologist</span>
                <span className="text-slate-400 text-[7.5px]">2022 – Pres</span>
              </div>
              <div className="w-11/12 h-1 bg-slate-200/70 rounded-full" />
              <div className="w-4/5 h-1 bg-slate-200/50 rounded-full" />
            </div>
          </div>

          {/* Section: Skills Preview */}
          <div className="pt-1">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <span className="text-[8.5px] font-bold text-slate-700 uppercase tracking-wider">Skills</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 4).map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-1.5 py-px rounded text-[7.5px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="text-[7.5px] text-slate-400 font-medium self-center">
                  +{skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Paper Bottom Meta Strip */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-400 font-mono">
          <span>8.5" × 11" Standard</span>
          <span className="capitalize font-semibold text-slate-600">
            {templateId.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Ambient hover overlay with quick-open badge */}
      <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
        <span className="px-3 py-1.5 rounded-lg bg-white/95 text-indigo-600 shadow-md border border-indigo-100 text-xs font-bold flex items-center gap-1 backdrop-blur-xs">
          <Eye className="w-3.5 h-3.5" /> Open in Studio
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    resumes, 
    activeResumeId, 
    createResume, 
    duplicateResume, 
    deleteResume, 
    switchResume, 
    renameResume 
  } = useResume();

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'active' | templateId
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [importing, setImporting] = useState(false);
  const pdfInputRef = useRef(null);

  const handleUploadResumePdf = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const res = await api.ai.parseResumePdf(file);
      if (res && res.extractedData) {
        const title = res.extractedData.personalInfo?.fullName 
          ? `${res.extractedData.personalInfo.fullName}'s Resume` 
          : 'Imported Resume';
        
        await createResume(title, 'modern-clean');
        // Resume created, navigate to builder
        navigate('/builder');
      }
    } catch (err) {
      console.warn('PDF import failed, continuing manually:', err);
      await createResume('Imported Resume', 'modern-clean');
      navigate('/builder');
    } finally {
      setImporting(false);
      if (pdfInputRef.current) pdfInputRef.current.value = '';
    }
  };

  // Switch to resume and open in builder
  const handleOpenStudio = (id) => {
    switchResume(id);
    navigate('/builder');
  };

  // Create new resume with specific template
  const handleCreateWithTemplate = async (templateId = 'modern-clean', templateTitle = 'New Professional Resume') => {
    setCreating(true);
    try {
      await createResume(templateTitle, templateId);
      setShowTemplateModal(false);
      navigate('/builder');
    } catch (e) {
      console.error('Error creating resume:', e);
    } finally {
      setCreating(false);
    }
  };

  const handleStartRename = (r) => {
    setEditingId(r.id);
    setEditingTitle(r.title);
  };

  const handleSaveRename = (id) => {
    if (editingTitle.trim()) {
      renameResume(id, editingTitle.trim());
    }
    setEditingId(null);
  };

  const handleDownloadBackup = (resume) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${(resume.title || 'Resume').replace(/\s+/g, '_')}_Backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered and searched list
  const filteredResumes = useMemo(() => {
    return resumes.filter((r) => {
      const title = (r.title || '').toLowerCase();
      const candidate = (r.data?.personalInfo?.fullName || '').toLowerCase();
      const role = (r.data?.personalInfo?.jobTitle || '').toLowerCase();
      const template = (r.data?.theme?.template || '').toLowerCase();
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch = !search || title.includes(search) || candidate.includes(search) || role.includes(search) || template.includes(search);

      if (!matchesSearch) return false;

      if (selectedFilter === 'active') {
        return r.id === activeResumeId;
      }
      if (selectedFilter !== 'all') {
        return (r.data?.theme?.template || 'modern') === selectedFilter;
      }
      return true;
    });
  }, [resumes, activeResumeId, searchTerm, selectedFilter]);

  const activeDoc = resumes.find(r => r.id === activeResumeId) || resumes[0];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#f8faff] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] text-slate-800 font-jakarta p-4 sm:p-8 lg:p-12 overflow-hidden">
      
      {/* Dynamic Aurora Ambient Studio Glows matching Home & Builder */}
      <div className="w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none absolute -top-24 -left-24 -z-10" />
      <div className="w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none absolute top-1/4 -right-24 -z-10" />
      <div className="w-[600px] h-[350px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none absolute -bottom-10 left-1/3 -z-10" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Top Executive Header Hub */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Career Document Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Resumes
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Organize, duplicate, and tailor target-specific ATS versions for every role, company, and seniority level.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <input
              type="file"
              ref={pdfInputRef}
              onChange={handleUploadResumePdf}
              accept=".pdf"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              disabled={importing}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-bold rounded-xl shadow-2xs transition-all cursor-pointer disabled:opacity-50"
              title="Upload an existing PDF resume to auto-fill sections"
            >
              {importing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  <span>Parsing PDF...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span>Import PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowTemplateModal(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Resume</span>
            </button>
          </div>
        </div>

        {/* Executive Stats & Readiness Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Versions</p>
              <p className="text-lg font-extrabold text-slate-900 mt-0.5">{resumes.length} {resumes.length === 1 ? 'Document' : 'Documents'}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">ATS Readiness</p>
              <p className="text-lg font-extrabold text-emerald-600 mt-0.5">99/100 Average</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Target Role</p>
              <p className="text-sm font-extrabold text-slate-900 truncate mt-0.5">
                {activeDoc?.data?.personalInfo?.jobTitle || 'Senior Technologist'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Export Standard</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">300 DPI Vector PDF</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resumes by title, role, or template style..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl border border-slate-200/80 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Segmented Pills */}
          <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all whitespace-nowrap ${
                selectedFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All ({resumes.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('active')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedFilter === 'active'
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active in Studio</span>
            </button>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((r) => {
            const isActive = r.id === activeResumeId;
            const templateName = r.data?.theme?.template || 'modern-clean';
            const accentColor = r.data?.theme?.accentColor || '#4f46e5';
            const candidateName = r.data?.personalInfo?.fullName || 'Untitled';
            const jobTitle = r.data?.personalInfo?.jobTitle || 'Target Role Pending';

            return (
              <div
                key={r.id}
                className={`p-5 rounded-2xl bg-white/95 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl ${
                  isActive 
                    ? 'border-indigo-500/90 ring-2 ring-indigo-500/25 shadow-indigo-500/10' 
                    : 'border-slate-200/90 hover:border-slate-300 hover:-translate-y-1'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Active Status & Action Toolbar */}
                  <div className="flex items-center justify-between gap-2">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/90 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active in Studio</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Draft Version</span>
                      </span>
                    )}

                    {/* Toolbar icons */}
                    <div className="flex items-center gap-1 text-slate-400">
                      <button
                        type="button"
                        onClick={() => duplicateResume(r.id)}
                        title="Duplicate this resume"
                        className="p-1.5 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadBackup(r)}
                        title="Download JSON Backup"
                        className="p-1.5 rounded-lg hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {resumes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${r.title}"?`)) {
                              deleteResume(r.id);
                            }
                          }}
                          title="Delete resume"
                          className="p-1.5 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Miniature Visual Resume Preview Paper */}
                  <div 
                    onClick={() => handleOpenStudio(r.id)}
                    className="cursor-pointer"
                    title="Click to edit in Studio Builder"
                  >
                    <MiniResumePaper resume={r} isActive={isActive} />
                  </div>

                  {/* Title and Job Description */}
                  <div>
                    {editingId === r.id ? (
                      <div className="flex items-center gap-1.5 mt-1">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="w-full px-2.5 py-1 text-xs sm:text-sm font-semibold border-2 border-indigo-500 rounded-lg focus:outline-none"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveRename(r.id);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(r.id)}
                          className="px-2.5 py-1 text-xs font-bold bg-indigo-600 text-white rounded-lg cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group/title">
                        <h3 
                          onClick={() => handleOpenStudio(r.id)}
                          className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors truncate cursor-pointer"
                          title={r.title}
                        >
                          {r.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleStartRename(r)}
                          title="Rename resume"
                          className="opacity-0 group-hover/title:opacity-100 p-1 text-slate-400 hover:text-slate-700 transition-opacity cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-1 font-medium truncate">
                      {candidateName} • <span className="text-slate-700">{jobTitle}</span>
                    </p>
                  </div>

                  {/* Document Metadata Bar */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(r.updatedAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </span>
                    <span className="font-semibold text-slate-700 capitalize flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span>{templateName.replace('-', ' ')}</span>
                    </span>
                  </div>
                </div>

                {/* Primary Card Open Button */}
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={() => handleOpenStudio(r.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 active:scale-[0.98]'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:text-indigo-600'
                    }`}
                  >
                    <span>{isActive ? 'Continue in Studio' : 'Switch & Open'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Quick Create Studio Card */}
          <div
            onClick={() => setShowTemplateModal(true)}
            className="p-8 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer group bg-white/70 backdrop-blur-sm min-h-[360px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
              <Plus className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                Create Another Version
              </h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Tailor a new targeted copy for a specific company, executive role, or ATS format.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10.5px] font-semibold border border-slate-200/80">
                + Software Engineer
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10.5px] font-semibold border border-slate-200/80">
                + Product Lead
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10.5px] font-semibold border border-slate-200/80">
                + Harvard Classic
              </span>
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredResumes.length === 0 && (
          <div className="text-center py-12 bg-white/80 rounded-2xl border border-slate-200 p-8 space-y-3">
            <p className="text-sm font-semibold text-slate-600">No resumes match your filter "{searchTerm}".</p>
            <button
              type="button"
              onClick={() => { setSearchTerm(''); setSelectedFilter('all'); }}
              className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Template Picker Modal for Creating New Resume */}
      {showTemplateModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowTemplateModal(false)}
        >
          <div 
            className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Select a Resume Style
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Choose a high-converting ATS template to begin your new customized draft.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Template Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {AVAILABLE_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => handleCreateWithTemplate(tmpl.id, `Resume - ${tmpl.name}`)}
                  className="p-4 rounded-2xl border border-slate-200/90 hover:border-indigo-500 hover:bg-indigo-50/20 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-2 bg-slate-50/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tmpl.color }} />
                      <span>{tmpl.name}</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                      {tmpl.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {tmpl.desc}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>Use this style</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer / Fast Default */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>All templates 100% ATS Verified</span>
              </span>
              <button
                type="button"
                onClick={() => handleCreateWithTemplate('modern-clean', 'Primary Executive Resume')}
                disabled={creating}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Instant Create (Modern Clean)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
