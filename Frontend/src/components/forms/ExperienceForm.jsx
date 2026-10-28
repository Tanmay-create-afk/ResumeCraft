import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building, Sparkles, Loader2, Wand2 } from 'lucide-react';
import api from '../../services/api';

const ACTION_VERBS = [
  'Spearheaded', 'Architected', 'Engineered', 'Orchestrated',
  'Accelerated', 'Streamlined', 'Delivered', 'Automated'
];

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, deleteExperience } = useResume();
  const { experiences } = resumeData;
  const [enhancingId, setEnhancingId] = useState(null);

  const handleEnhanceWithAI = async (id, currentText, jobTitle) => {
    if (!currentText || !currentText.trim()) return;
    setEnhancingId(id);
    try {
      const res = await api.ai.enhanceBullet(currentText, jobTitle);
      if (res && res.enhancedText) {
        updateExperience(id, 'description', res.enhancedText);
      }
    } catch (e) {
      console.warn('AI enhancement error:', e);
    } finally {
      setEnhancingId(null);
    }
  };

  const insertActionVerb = (id, verb, currentText) => {
    const updated = currentText ? `${currentText}\n• ${verb} ` : `• ${verb} `;
    updateExperience(id, 'description', updated);
  };

  const inputClass = "w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Work Experience</h2>
        </div>
        <button
          onClick={addExperience}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Position
        </button>
      </div>

      {experiences.length === 0 ? (
        <p className="text-sm text-slate-500 italic text-center py-4">
          No experience added yet. Click &quot;Add Position&quot; to begin.
        </p>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 relative space-y-4 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Position #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => deleteExperience(exp.id)}
                  className="text-rose-500 hover:text-rose-700 p-1 rounded transition-colors cursor-pointer"
                  title="Remove Experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Frontend Developer"
                    value={exp.jobTitle || ''}
                    onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-500" /> Company Name
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Google"
                    value={exp.company || ''}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. New York, NY or Remote"
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> Start Date
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="e.g. May 2021"
                      value={exp.startDate || ''}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      disabled={exp.current}
                      className={`${inputClass} ${
                        exp.current ? 'opacity-50 cursor-not-allowed bg-slate-200' : ''
                      }`}
                      placeholder={exp.current ? 'Present' : 'e.g. Present or Dec 2023'}
                      value={exp.current ? 'Present' : exp.endDate || ''}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current || false}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor={`current-${exp.id}`} className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                  I currently work here
                </label>
              </div>

              {/* Action Verbs Quick Inserter */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Key Responsibilities & Impact
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEnhanceWithAI(exp.id, exp.description, exp.jobTitle)}
                      disabled={enhancingId === exp.id || !exp.description?.trim()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-md transition-all cursor-pointer disabled:opacity-40 shadow-2xs"
                      title="AI transforms rough text into quantified, high-impact bullet points"
                    >
                      {enhancingId === exp.id ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-indigo-600" />
                          <span>Optimizing...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-3 h-3 text-indigo-600" />
                          <span>Improve with AI</span>
                        </>
                      )}
                    </button>
                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <Sparkles className="w-3 h-3 text-amber-500" /> Quick Verbs:
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  {ACTION_VERBS.map((verb) => (
                    <button
                      key={verb}
                      type="button"
                      onClick={() => insertActionVerb(exp.id, verb, exp.description || '')}
                      className="px-2 py-0.5 text-[10.5px] font-semibold bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-300 rounded text-slate-700 transition-colors cursor-pointer"
                    >
                      + {verb}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={4}
                  className={`${inputClass} leading-relaxed font-sans`}
                  placeholder="• Spearheaded feature development...&#10;• Improved latency by 30%..."
                  value={exp.description || ''}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
