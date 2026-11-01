import React from 'react';
import { 
  X, Palette, Layout, Type, Droplet, Check, SlidersHorizontal, 
  Sparkles, FileText, Minimize2, Maximize2 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

const ACCENT_COLORS = [
  { name: 'Dark Slate', value: '#1e293b' },
  { name: 'Cyber Blue', value: '#2563eb' },
  { name: 'Indigo Royal', value: '#4f46e5' },
  { name: 'Electric Violet', value: '#7c3aed' },
  { name: 'Emerald Forest', value: '#059669' },
  { name: 'Crimson Wine', value: '#881337' },
  { name: 'Hot Coral', value: '#f43f5e' },
  { name: 'Warm Amber', value: '#d97706' },
  { name: 'Nordic Teal', value: '#0d9488' }
];

const PAPER_BACKGROUNDS = [
  { id: 'white', name: 'Pure White', previewColor: '#ffffff' },
  { id: 'cream', name: 'Warm Ivory', previewColor: '#faf8f5' },
  { id: 'cool-grey', name: 'Cool Slate', previewColor: '#f8fafc' },
  { id: 'soft-blue', name: 'Soft Sky', previewColor: '#f0f9ff' },
  { id: 'soft-emerald', name: 'Sage Green', previewColor: '#f0fdf4' },
  { id: 'soft-rose', name: 'Blush Velvet', previewColor: '#fff1f2' }
];

const FONT_FAMILIES = [
  { id: 'sans', name: 'Modern Sans', preview: 'Plus Jakarta Sans', tag: 'Executive Standard' },
  { id: 'serif', name: 'Classic Serif', preview: 'Newsreader / Times', tag: 'Ivy League & Law' },
  { id: 'mono', name: 'Tech Monospace', preview: 'JetBrains Mono', tag: 'Dev & Engineering' }
];

export default function StylingStudioModal({ isOpen, onClose }) {
  const { resumeData, updateTheme } = useResume();
  const theme = resumeData.theme || {};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-indigo-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>Styling &amp; Typography Studio</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
                  Live Preview
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Customize colors, page spacing density, paper tones, and typography
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Section 1: Accent Colors */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-indigo-600" />
                <span>Primary Accent Color</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 font-normal">
                {theme.accentColor || '#4f46e5'}
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-2.5">
              {ACCENT_COLORS.map((col) => {
                const isSelected = theme.accentColor === col.value;
                return (
                  <button
                    key={col.value}
                    type="button"
                    onClick={() => updateTheme('accentColor', col.value)}
                    title={col.name}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'ring-3 ring-indigo-600 ring-offset-2 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.value }}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                  </button>
                );
              })}

              {/* Custom Hex Color Picker */}
              <label 
                className="w-9 h-9 rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                title="Choose custom hex color"
              >
                <input
                  type="color"
                  value={theme.accentColor || '#4f46e5'}
                  onChange={(e) => updateTheme('accentColor', e.target.value)}
                  className="opacity-0 w-0 h-0"
                />
                <span className="text-xs font-bold text-slate-500">+</span>
              </label>
            </div>
          </div>

          {/* Section 2: Page Spacing Density */}
          <div className="space-y-3 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-indigo-600" />
                <span>Page Spacing Density</span>
              </label>
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {theme.margins === 'compact' ? '⚡ 1-Page Compact Fit' : theme.margins === 'spacious' ? 'Spacious' : 'Standard'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'compact', label: 'Compact', desc: 'Fits 1-page', icon: Minimize2 },
                { id: 'normal', label: 'Standard', desc: 'Balanced', icon: Layout },
                { id: 'spacious', label: 'Spacious', desc: 'Breathable', icon: Maximize2 }
              ].map((sp) => {
                const isSelected = (theme.margins || 'normal') === sp.id;
                const Icon = sp.icon;
                return (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => updateTheme('margins', sp.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <p className={`text-xs font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                      {sp.label}
                    </p>
                    <p className="text-[10px] text-slate-400">{sp.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Typography / Font Pair */}
          <div className="space-y-3 border-t border-slate-100 pt-5">
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-indigo-600" />
              <span>Font Typography</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {FONT_FAMILIES.map((font) => {
                const isSelected = (theme.fontFamily || 'sans') === font.id;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => updateTheme('fontFamily', font.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {font.tag}
                    </span>
                    <p className={`text-xs font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                      {font.name}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">{font.preview}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Paper Texture & Tones */}
          <div className="space-y-3 border-t border-slate-100 pt-5">
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Paper Background Tone</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PAPER_BACKGROUNDS.map((paper) => {
                const isSelected = (theme.paperBg || 'white') === paper.id;
                return (
                  <button
                    key={paper.id}
                    type="button"
                    onClick={() => updateTheme('paperBg', paper.id)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span 
                      className="w-5 h-5 rounded-md border border-slate-300 shadow-2xs shrink-0" 
                      style={{ backgroundColor: paper.previewColor }}
                    />
                    <span className={`text-xs font-bold truncate ${isSelected ? 'text-indigo-950' : 'text-slate-700'}`}>
                      {paper.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
          <span className="text-xs text-slate-500">
            All style modifications update live in the preview pane.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-[0.98]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
