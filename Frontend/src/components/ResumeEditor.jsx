import React, { useState } from 'react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import LanguagesForm from './forms/LanguagesForm';
import RolePresetsModal from './common/RolePresetsModal';
import CoverLetterModal from './common/CoverLetterModal';
import SmartExportModal from './common/SmartExportModal';
import ActionVerbModal from './common/ActionVerbModal';
import StylingStudioModal from './common/StylingStudioModal';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { 
  RotateCcw, Trash2, User, Briefcase, GraduationCap, Wrench, FolderGit2, 
  Eye, EyeOff, SlidersHorizontal, Award, Languages as LangIcon, Sparkles,
  Cloud, CloudOff, CheckCircle2, Palette, FileText, Zap, Mail, Database, 
  FileCode, Layers
} from 'lucide-react';

export default function ResumeEditor() {
  const { resumeData, resetToSample, clearAllData, toggleSectionVisibility, syncStatus } = useResume();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [showVisibilityPanel, setShowVisibilityPanel] = useState(false);

  // New powerhouse feature modals
  const [showRolePresets, setShowRolePresets] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [showSmartExport, setShowSmartExport] = useState(false);
  const [showActionVerbs, setShowActionVerbs] = useState(false);
  const [showStylingStudio, setShowStylingStudio] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Sections' },
    { id: 'personal', label: 'Personal & Photo', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'languages', label: 'Languages', icon: LangIcon },
  ];

  const sections = [
    { key: 'personalInfo', label: 'Header Profile' },
    { key: 'summary', label: 'Summary / Bio' },
    { key: 'experiences', label: 'Work History' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills & Tech' },
    { key: 'projects', label: 'Projects' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'languages', label: 'Languages' },
  ];

  const calculateScore = () => {
    let score = 0;
    if (resumeData.personalInfo.fullName) score += 10;
    if (resumeData.personalInfo.email && resumeData.personalInfo.phone) score += 10;
    if (resumeData.personalInfo.avatar && resumeData.personalInfo.showAvatar) score += 10;
    if (resumeData.personalInfo.summary) score += 15;
    if (resumeData.experiences.length > 0) score += 20;
    if (resumeData.skills.length >= 4) score += 15;
    if (resumeData.education.length > 0) score += 10;
    if (resumeData.certifications?.length > 0) score += 5;
    if (resumeData.languages?.length > 0) score += 5;
    return Math.min(100, score);
  };

  const score = calculateScore();

  const getTabCount = (tabId) => {
    switch (tabId) {
      case 'experience': return resumeData.experiences?.length || 0;
      case 'education': return resumeData.education?.length || 0;
      case 'skills': return resumeData.skills?.length || 0;
      case 'projects': return resumeData.projects?.length || 0;
      case 'certifications': return resumeData.certifications?.length || 0;
      case 'languages': return resumeData.languages?.length || 0;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 overflow-hidden text-slate-800">
      
      {/* Top Header Bar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-200/90 flex items-center justify-between flex-wrap gap-2.5 shrink-0 shadow-2xs">
        {/* Left: Brand / Title + Strength Meter + Cloud Sync */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span>Content Studio</span>
          </h1>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Interactive Strength Score with Micro Circular Ring */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-2xs"
            title={`Resume Completeness Score: ${score}%`}
          >
            <div className="relative w-3.5 h-3.5 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={score >= 80 ? "text-emerald-500" : score >= 50 ? "text-indigo-600" : "text-amber-500"}
                  strokeDasharray={`${score}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-slate-800">
              {score}% <span className="font-normal text-slate-400 hidden sm:inline">Strength</span>
            </span>
          </div>

          {/* Cloud Sync Status */}
          {isAuthenticated ? (
            syncStatus === 'saving' ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200/60 animate-in fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Saving...</span>
              </span>
            ) : syncStatus === 'saved' ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 animate-in fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Saved</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Offline</span>
              </span>
            )
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200" title="Log in to enable cloud auto-backup">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>Draft</span>
            </span>
          )}
        </div>

        {/* Right: Sleek Action Buttons Group */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Toggle Sections Button */}
          <button
            onClick={() => setShowVisibilityPanel(!showVisibilityPanel)}
            type="button"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${
              showVisibilityPanel 
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-2xs font-bold' 
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Sections</span>
          </button>

          {/* Sample Data Button */}
          <button
            onClick={resetToSample}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50/50 rounded-lg transition-colors cursor-pointer border border-slate-200 hover:border-indigo-200 shadow-2xs"
            title="Populate with complete sample data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Sample</span>
          </button>

          {/* Clear All Button */}
          <button
            onClick={() => {
              if (window.confirm('Clear all resume fields to start with a blank template?')) {
                clearAllData();
              }
            }}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-slate-200 hover:border-rose-200 shadow-2xs"
            title="Clear all fields"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-rose-500" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Powerhouse Studio Quick Tools Strip */}
      <div className="px-4 py-2 bg-gradient-to-r from-slate-50 via-indigo-50/30 to-purple-50/30 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shrink-0">
        <div className="flex items-center gap-1.5 shrink-0">
          
          {/* 1-Click Role Presets */}
          <button
            type="button"
            onClick={() => setShowRolePresets(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-indigo-50/80 text-indigo-700 border border-indigo-200/90 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
            title="1-Click Role Presets (Software Engineer, Data Scientist, Product Designer, PM)"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>🎯 1-Click Roles</span>
          </button>

          {/* Style & Typography Studio */}
          <button
            type="button"
            onClick={() => setShowStylingStudio(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
            title="Colors, margins, spacing density, and typography"
          >
            <Palette className="w-3.5 h-3.5 text-indigo-500" />
            <span>🎨 Style &amp; Density</span>
          </button>

          {/* Action Verbs & Bullet Assistant */}
          <button
            type="button"
            onClick={() => setShowActionVerbs(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-amber-50/80 text-amber-800 border border-amber-200/90 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
            title="Action verbs catalog & formula bullet enhancer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>⚡ Action Verbs</span>
          </button>

          {/* AI Cover Letter Studio */}
          <button
            type="button"
            onClick={() => setShowCoverLetter(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-purple-50/80 text-purple-700 border border-purple-200/90 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
            title="Generate matching executive cover letter"
          >
            <Mail className="w-3.5 h-3.5 text-purple-600" />
            <span>✉️ Cover Letter</span>
          </button>

          {/* Smart Export & JSON Backup */}
          <button
            type="button"
            onClick={() => setShowSmartExport(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
            title="Copy plain text for ATS portals or download JSON backup"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-600" />
            <span>💾 ATS Plain Text / Backup</span>
          </button>
        </div>
      </div>

      {/* Section Visibility Accordion Panel */}
      {showVisibilityPanel && (
        <div className="bg-indigo-50/60 border-b border-indigo-100 p-4">
          <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2.5">
            Active Resume Sections
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sections.map((sec) => {
              const isVisible = resumeData.sectionVisibility?.[sec.key] !== false;
              return (
                <button
                  key={sec.key}
                  type="button"
                  onClick={() => toggleSectionVisibility(sec.key)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all ${
                    isVisible
                      ? 'bg-white border-indigo-200 text-indigo-950 shadow-2xs font-bold'
                      : 'bg-slate-100/70 border-slate-200 text-slate-400 line-through'
                  }`}
                >
                  <span>{sec.label}</span>
                  {isVisible ? (
                    <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Horizontal Tabs Bar */}
      <div className="px-4 bg-white border-b border-slate-200/90 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const count = getTabCount(tab.id);

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                isActive
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {Icon && (
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              )}
              <span>{tab.label}</span>
              {count !== null && count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                      : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Form sections container */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
        <div className="max-w-3xl mx-auto w-full space-y-6">
          {(activeTab === 'all' || activeTab === 'personal') && <PersonalInfoForm />}
          {(activeTab === 'all' || activeTab === 'experience') && <ExperienceForm />}
          {(activeTab === 'all' || activeTab === 'education') && <EducationForm />}
          {(activeTab === 'all' || activeTab === 'skills') && <SkillsForm />}
          {(activeTab === 'all' || activeTab === 'projects') && <ProjectsForm />}
          {(activeTab === 'all' || activeTab === 'certifications') && <CertificationsForm />}
          {(activeTab === 'all' || activeTab === 'languages') && <LanguagesForm />}
        </div>
      </div>

      {/* Feature Modals */}
      <RolePresetsModal
        isOpen={showRolePresets}
        onClose={() => setShowRolePresets(false)}
      />

      <CoverLetterModal
        isOpen={showCoverLetter}
        onClose={() => setShowCoverLetter(false)}
      />

      <SmartExportModal
        isOpen={showSmartExport}
        onClose={() => setShowSmartExport(false)}
      />

      <ActionVerbModal
        isOpen={showActionVerbs}
        onClose={() => setShowActionVerbs(false)}
      />

      <StylingStudioModal
        isOpen={showStylingStudio}
        onClose={() => setShowStylingStudio(false)}
      />

    </div>
  );
}
