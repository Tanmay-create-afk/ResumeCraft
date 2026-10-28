import React, { useRef, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { User, Mail, Phone, MapPin, Globe, Link2, Code, Camera, Trash2, Eye, EyeOff, Sparkles, Loader2 } from 'lucide-react';
import api from '../../services/api';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;
  const fileInputRef = useRef(null);
  const [generatingSummary, setGeneratingSummary] = useState(false);

  const handleGenerateSummary = async () => {
    setGeneratingSummary(true);
    try {
      const res = await api.ai.generateSummary(
        personalInfo.jobTitle,
        resumeData.skills || [],
        '4+'
      );
      if (res && res.summary) {
        updatePersonalInfo('summary', res.summary);
      }
    } catch (e) {
      console.warn('AI summary generation error:', e);
    } finally {
      setGeneratingSummary(false);
    }
  };

  const inputClass = "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all";

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const MAX_DIM = 300;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_DIM) {
                height = Math.round((height * MAX_DIM) / width);
                width = MAX_DIM;
              }
            } else {
              if (height > MAX_DIM) {
                width = Math.round((width * MAX_DIM) / height);
                height = MAX_DIM;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Compress to lightweight JPEG under ~30KB
            const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.85);
            updatePersonalInfo('avatar', optimizedBase64);
            updatePersonalInfo('showAvatar', true);
          } catch (err) {
            console.warn('Canvas resizing failed, falling back:', err);
            updatePersonalInfo('avatar', event.target.result);
            updatePersonalInfo('showAvatar', true);
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Failed to read image file:', err);
    }
  };

  const removeAvatar = () => {
    updatePersonalInfo('avatar', '');
    updatePersonalInfo('showAvatar', false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Personal Information</h2>
        </div>
      </div>

      {/* Avatar / Photo Upload Widget */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4">
        <div className="relative group">
          {personalInfo.avatar ? (
            <img
              src={personalInfo.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600 shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 border border-dashed border-slate-300">
              <Camera className="w-6 h-6" />
            </div>
          )}
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Profile Photo
            </span>
            <button
              type="button"
              onClick={() => updatePersonalInfo('showAvatar', !personalInfo.showAvatar)}
              className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold cursor-pointer border ${
                personalInfo.showAvatar
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-200 text-slate-600 border-slate-300'
              }`}
            >
              {personalInfo.showAvatar ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {personalInfo.showAvatar ? 'Visible on resume' : 'Hidden'}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Professional headshot recommended (PNG, JPG, or WebP)
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              Upload Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
            />
            {personalInfo.avatar && (
              <button
                type="button"
                onClick={removeAvatar}
                className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Alex Morgan"
            value={personalInfo.fullName || ''}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Job Title
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Senior Software Engineer"
            value={personalInfo.jobTitle || ''}
            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-500" /> Email
          </label>
          <input
            type="email"
            className={inputClass}
            placeholder="e.g. alex@example.com"
            value={personalInfo.email || ''}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-500" /> Phone Number
          </label>
          <input
            type="tel"
            className={inputClass}
            placeholder="e.g. +1 (555) 019-2834"
            value={personalInfo.phone || ''}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. San Francisco, CA"
            value={personalInfo.location || ''}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-500" /> Portfolio / Website
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. https://alexmorgan.dev"
            value={personalInfo.website || ''}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
            <Link2 className="w-3.5 h-3.5 text-slate-500" /> LinkedIn
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. linkedin.com/in/alexmorgan"
            value={personalInfo.linkedin || ''}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
            <Code className="w-3.5 h-3.5 text-slate-500" /> GitHub
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. github.com/alexmorgan"
            value={personalInfo.github || ''}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Professional Summary
          </label>
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={generatingSummary}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/80 rounded-lg transition-all cursor-pointer shadow-2xs disabled:opacity-50"
            title="Generate tailored professional bio based on your job title & skills"
          >
            {generatingSummary ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Writing Bio...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-indigo-600" />
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>
        <textarea
          rows={4}
          className={`${inputClass} leading-relaxed font-sans`}
          placeholder="Brief overview of your professional background, key achievements, and strengths..."
          value={personalInfo.summary || ''}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
        />
      </div>
    </div>
  );
}
