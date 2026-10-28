import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Languages as LangIcon, Plus, Trash2 } from 'lucide-react';

export default function LanguagesForm() {
  const { resumeData, addLanguage, updateLanguage, deleteLanguage } = useResume();
  const languages = resumeData.languages || [];

  const inputClass = "w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all";

  const proficiencies = [
    { label: 'Native / Bilingual', level: 100 },
    { label: 'Fluent / Full Professional', level: 85 },
    { label: 'Professional Working', level: 70 },
    { label: 'Intermediate / Conversational', level: 50 },
    { label: 'Elementary / Basic', level: 25 },
  ];

  const normalizeProficiency = (val) => {
    if (!val) return 'Intermediate / Conversational';
    if (val === 'Conversational') return 'Intermediate / Conversational';
    if (val === 'Elementary') return 'Elementary / Basic';
    return val;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <LangIcon className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Languages</h2>
        </div>
        <button
          onClick={addLanguage}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Language
        </button>
      </div>

      {languages.length === 0 ? (
        <p className="text-sm text-slate-500 italic text-center py-4">
          No languages added yet. Click &quot;Add Language&quot; to showcase multilingual skills.
        </p>
      ) : (
        <div className="space-y-4">
          {languages.map((lang, index) => (
            <div
              key={lang.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 relative space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Language #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => deleteLanguage(lang.id)}
                  className="text-rose-500 hover:text-rose-700 p-1 rounded transition-colors cursor-pointer"
                  title="Remove Language"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Language
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. English, Spanish, German, Hindi"
                    value={lang.name || ''}
                    onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Proficiency Level
                  </label>
                  <select
                    className={inputClass}
                    value={normalizeProficiency(lang.proficiency)}
                    onChange={(e) => {
                      const selected = proficiencies.find(p => p.label === e.target.value);
                      updateLanguage(lang.id, 'proficiency', e.target.value);
                      if (selected) updateLanguage(lang.id, 'level', selected.level);
                    }}
                  >
                    {proficiencies.map((p) => (
                      <option key={p.label} value={p.label}>
                        {p.label} ({p.level}%)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live progress preview bar */}
              <div className="pt-1">
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${lang.level || 50}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
