import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Award, Plus, Trash2, Calendar, Link as LinkIcon, Building } from 'lucide-react';

export default function CertificationsForm() {
  const { resumeData, addCertification, updateCertification, deleteCertification } = useResume();
  const certifications = resumeData.certifications || [];

  const inputClass = "w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Certifications & Licenses</h2>
        </div>
        <button
          onClick={addCertification}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      {certifications.length === 0 ? (
        <p className="text-sm text-slate-500 italic text-center py-4">
          No certifications added yet. Click &quot;Add Certificate&quot; to show professional credentials.
        </p>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 relative space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Certificate #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => deleteCertification(cert.id)}
                  className="text-rose-500 hover:text-rose-700 p-1 rounded transition-colors cursor-pointer"
                  title="Remove Certification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Certification Title
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. AWS Certified Solutions Architect – Associate"
                    value={cert.name || ''}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-500" /> Issuing Organization
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Amazon Web Services, Google, Meta"
                    value={cert.issuer || ''}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> Issue Date / Year
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Nov 2023 or Valid until 2026"
                    value={cert.date || ''}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-500" /> Credential URL / Verification Link
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. https://www.credly.com/badges/..."
                    value={cert.link || ''}
                    onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
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
