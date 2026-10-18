import React, { useState } from 'react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import LanguagesForm from './forms/LanguagesForm';
import { useResume } from '../context/ResumeContext';
import { 
  RotateCcw, Trash, User, Briefcase, GraduationCap, Wrench, FolderGit2, 
  Eye, EyeOff, SlidersHorizontal, Award, Languages as LangIcon, Sparkles 
} from 'lucide-react';

export default function ResumeEditor() {
  const { resumeData, resetToSample, clearAllData, toggleSectionVisibility } = useResume();
  const [activeTab, setActiveTab] = useState('all');
  const [showVisibilityPanel, setShowVisibilityPanel] = useState(false);

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

  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 overflow-hidden text-slate-800">
      {/* Header bar */}
      <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between flex-wrap gap-3 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Content Studio</h1>
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              Strength: {score}%
            </span>
          </div>
          {/* Animated Progress bar */}
          <div className="w-36 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden border border-slate-200/80">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowVisibilityPanel(!showVisibilityPanel)}
            type="button"
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${
              showVisibilityPanel 
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-2xs' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" /> Toggle Sections
          </button>

          <button
            onClick={resetToSample}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-slate-200 shadow-2xs"
            title="Load sample data"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Sample
          </button>

          <button
            onClick={() => {
              if (window.confirm('Clear all resume fields?')) {
                clearAllData();
              }
            }}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer border border-rose-200"
            title="Clear all fields"
          >
            <Trash className="w-3.5 h-3.5" /> Clear
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
                      ? 'bg-white border-indigo-300 text-indigo-700 shadow-2xs'
                      : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                  }`}
                >
                  <span>{sec.label}</span>
                  {isVisible ? <Eye className="w-3.5 h-3.5 text-indigo-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 bg-white px-4 overflow-x-auto shadow-2xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form sections container */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
        {(activeTab === 'all' || activeTab === 'personal') && <PersonalInfoForm />}
        {(activeTab === 'all' || activeTab === 'experience') && <ExperienceForm />}
        {(activeTab === 'all' || activeTab === 'education') && <EducationForm />}
        {(activeTab === 'all' || activeTab === 'skills') && <SkillsForm />}
        {(activeTab === 'all' || activeTab === 'projects') && <ProjectsForm />}
        {(activeTab === 'all' || activeTab === 'certifications') && <CertificationsForm />}
        {(activeTab === 'all' || activeTab === 'languages') && <LanguagesForm />}
      </div>
    </div>
  );
}
