import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { FolderGit2, Plus, Trash2, Link, Code2 } from 'lucide-react';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, deleteProject } = useResume();
  const { projects } = resumeData;

  const inputClass = "w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <FolderGit2 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Key Projects</h2>
        </div>
        <button
          onClick={addProject}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-slate-500 italic text-center py-4">
          No projects added yet. Click &quot;Add Project&quot; to show off your work.
        </p>
      ) : (
        <div className="space-y-6">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 relative space-y-4 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Project #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => deleteProject(proj.id)}
                  className="text-rose-500 hover:text-rose-700 p-1 rounded transition-colors cursor-pointer"
                  title="Remove Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. AI Content Generator"
                    value={proj.title || ''}
                    onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Link className="w-3.5 h-3.5 text-slate-500" /> Project Link / Demo URL
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. https://github.com/user/project"
                    value={proj.link || ''}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-slate-500" /> Technologies Used
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. React, Node.js, Socket.IO, Tailwind CSS"
                    value={proj.technologies || ''}
                    onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Description & Impact
                </label>
                <textarea
                  rows={2}
                  className={`${inputClass} leading-relaxed font-sans`}
                  placeholder="Describe what the project does and key engineering highlights..."
                  value={proj.description || ''}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
