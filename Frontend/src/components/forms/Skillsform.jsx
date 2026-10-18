import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Wrench, Plus, X } from 'lucide-react';

export default function SkillsForm() {
  const { resumeData, setSkills } = useResume();
  const { skills } = resumeData;
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
        <Wrench className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-800">Skills & Competencies</h2>
      </div>

      <form onSubmit={handleAddSkill} className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
          placeholder="e.g. React.js, Python, System Design (Press Enter)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-900 text-xs font-semibold rounded-lg border border-slate-300 shadow-2xs"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-slate-400 hover:text-rose-600 rounded-full p-0.5 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
      {skills.length === 0 && (
        <p className="text-xs text-slate-500 italic">No skills added yet.</p>
      )}
    </div>
  );
}
