import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2, Calendar, MapPin } from 'lucide-react';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, deleteEducation } = useResume();
  const { education } = resumeData;

  const inputClass = "w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Education</h2>
        </div>
        <button
          onClick={addEducation}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Degree / School
        </button>
      </div>

      {education.length === 0 ? (
        <p className="text-sm text-slate-500 italic text-center py-4">
          No education added yet. Click &quot;Add Degree / School&quot; to begin.
        </p>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 relative space-y-4 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Education #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => deleteEducation(edu.id)}
                  className="text-rose-500 hover:text-rose-700 p-1 rounded transition-colors cursor-pointer"
                  title="Remove Education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Degree / Certificate
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. B.Tech in Computer Science"
                    value={edu.degree || ''}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Stanford University"
                    value={edu.institution || ''}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Stanford, CA"
                    value={edu.location || ''}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Grade / GPA / Percentage (Optional)
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. GPA: 3.9 / 4.0 or 85%"
                    value={edu.score || ''}
                    onChange={(e) => updateEducation(edu.id, 'score', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 md:col-span-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> Start Year
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="e.g. 2018"
                      value={edu.startDate || ''}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="e.g. 2022"
                      value={edu.endDate || ''}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
