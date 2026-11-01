import React, { useState, useRef } from 'react';
import { 
  X, FileText, Download, Copy, Check, Upload, Database, 
  FileCode, CheckCircle2, AlertCircle, RefreshCw 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export default function SmartExportModal({ isOpen, onClose }) {
  const { resumeData, importData } = useResume();
  const [activeTab, setActiveTab] = useState('plaintext'); // 'plaintext' | 'json'
  const [copiedText, setCopiedCopied] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Convert full resume to standard ATS plain text
  const generateAtsPlainText = () => {
    const p = resumeData.personalInfo || {};
    const lines = [];

    // Header
    lines.push('================================================================================');
    lines.push((p.fullName || 'UNTITLED RESUME').toUpperCase());
    if (p.jobTitle) lines.push(p.jobTitle);
    
    const contactRow = [p.email, p.phone, p.location].filter(Boolean).join(' | ');
    if (contactRow) lines.push(contactRow);

    const linksRow = [p.website, p.linkedin, p.github].filter(Boolean).join(' | ');
    if (linksRow) lines.push(linksRow);
    lines.push('================================================================================\n');

    // Summary
    if (p.summary) {
      lines.push('PROFESSIONAL SUMMARY');
      lines.push('----------------------------------------');
      lines.push(p.summary + '\n');
    }

    // Skills
    if (resumeData.skills?.length > 0) {
      lines.push('CORE SKILLS & TECHNOLOGIES');
      lines.push('----------------------------------------');
      lines.push(resumeData.skills.join(', ') + '\n');
    }

    // Experience
    if (resumeData.experiences?.length > 0) {
      lines.push('PROFESSIONAL EXPERIENCE');
      lines.push('----------------------------------------');
      resumeData.experiences.forEach((exp) => {
        const titleLine = `${exp.jobTitle || 'Role'} | ${exp.company || 'Company'}`;
        const dateLoc = [
          `${exp.startDate || ''} – ${exp.current ? 'Present' : exp.endDate || ''}`,
          exp.location
        ].filter(Boolean).join(' | ');
        
        lines.push(titleLine);
        if (dateLoc) lines.push(dateLoc);
        if (exp.description) {
          lines.push(exp.description);
        }
        lines.push('');
      });
    }

    // Education
    if (resumeData.education?.length > 0) {
      lines.push('EDUCATION');
      lines.push('----------------------------------------');
      resumeData.education.forEach((edu) => {
        lines.push(`${edu.degree || 'Degree'} | ${edu.institution || 'Institution'}`);
        const eduMeta = [
          `${edu.startDate || ''} – ${edu.endDate || ''}`,
          edu.location,
          edu.score
        ].filter(Boolean).join(' | ');
        if (eduMeta) lines.push(eduMeta);
        lines.push('');
      });
    }

    // Projects
    if (resumeData.projects?.length > 0) {
      lines.push('KEY PROJECTS');
      lines.push('----------------------------------------');
      resumeData.projects.forEach((proj) => {
        lines.push(`${proj.title || 'Project'}${proj.technologies ? ` (${proj.technologies})` : ''}`);
        if (proj.link) lines.push(`Link: ${proj.link}`);
        if (proj.description) lines.push(proj.description);
        lines.push('');
      });
    }

    // Certifications
    if (resumeData.certifications?.length > 0) {
      lines.push('CERTIFICATIONS');
      lines.push('----------------------------------------');
      resumeData.certifications.forEach((cert) => {
        lines.push(`${cert.name || 'Certificate'} – ${cert.issuer || ''} (${cert.date || ''})`);
      });
      lines.push('');
    }

    return lines.join('\n');
  };

  const plainText = generateAtsPlainText();

  const handleCopyPlainText = () => {
    navigator.clipboard?.writeText(plainText);
    setCopiedCopied(true);
    setTimeout(() => setCopiedCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const candidateName = (resumeData.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_');
    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${candidateName}_ATS_PlainText.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const candidateName = (resumeData.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_');
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ResumeCraft_Backup_${candidateName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError('');
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const success = importData(parsed);
        if (success) {
          setImportSuccess(true);
          setTimeout(() => {
            setImportSuccess(false);
            onClose();
          }, 1000);
        } else {
          setImportError('Invalid resume JSON structure. Please upload a valid ResumeCraft backup file.');
        }
      } catch (err) {
        setImportError('Failed to parse JSON file. Please ensure it is a valid .json file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-indigo-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/20">
              <FileCode className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>Smart Export &amp; Backup Studio</span>
              </h2>
              <p className="text-xs text-slate-500">
                Copy ATS plain text for job portals or download full JSON backup
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3 pb-0 border-b border-slate-200 bg-slate-50/50 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('plaintext')}
            className={`pb-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'plaintext'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plain Text (ATS Portal)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`pb-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'json'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>JSON Backup &amp; Restore</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {activeTab === 'plaintext' ? (
            /* TAB 1: PLAIN TEXT ATS FORMAT */
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  Many enterprise applicant tracking systems (Workday, Taleo, Greenhouse) have a <b>"Paste Plain Text Resume"</b> box. This view strips formatting to ensure 100% parsing accuracy with zero distorted characters.
                </span>
              </div>

              <textarea
                readOnly
                rows={13}
                value={plainText}
                className="w-full p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl leading-relaxed outline-none border border-slate-800 selection:bg-emerald-500 selection:text-slate-950 resize-y"
              />
            </div>
          ) : (
            /* TAB 2: JSON BACKUP & RESTORE */
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Export Card */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Download className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Export JSON Backup</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Download a complete, offline-compatible JSON file containing all your experiences, skills, education, and custom themes.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Upload className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Restore from Backup</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Upload a previously exported ResumeCraft JSON file to restore your entire resume across any browser or device.
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Upload JSON Backup</span>
                  </button>
                </div>

              </div>

              {/* Status alerts */}
              {importSuccess && (
                <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Resume data restored successfully! Closing modal...</span>
                </div>
              )}

              {importError && (
                <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-rose-50 border border-rose-200 text-rose-700 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        {activeTab === 'plaintext' && (
          <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Char count: {plainText.length} characters
            </span>
            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={handleDownloadTxt}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download .txt</span>
              </button>
              <button
                type="button"
                onClick={handleCopyPlainText}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                    <span>Copied All Plain Text!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All Plain Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
