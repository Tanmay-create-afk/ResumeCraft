import React, { useRef, useState } from 'react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import CompactTemplate from './templates/CompactTemplate';
import GenZCreativeTemplate from './templates/GenZCreativeTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { 
  Download, Palette, Layout, Loader2, Type, Printer, 
  Upload, FileDown, Check, Droplet, ZoomIn, ZoomOut, Maximize2,
  ChevronUp, ChevronDown, Sliders
} from 'lucide-react';


export default function ResumePreview() {
  const { resumeData, updateTheme, importData } = useResume();
  const resumeRef = useRef(null);
  const fileInputRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(true);


  const colors = [
    { name: 'Indigo Gradient', value: '#6366f1' },
    { name: 'Electric Violet', value: '#8b5cf6' },
    { name: 'Cyber Blue', value: '#2563eb' },
    { name: 'Emerald Forest', value: '#059669' },
    { name: 'Dark Slate', value: '#1e293b' },
    { name: 'Hot Coral', value: '#f43f5e' },
    { name: 'Warm Amber', value: '#d97706' },
  ];

  const paperBackgrounds = [
    { id: 'white', name: 'Pure White', bgClass: 'bg-white', previewColor: '#ffffff' },
    { id: 'cream', name: 'Warm Ivory / Cream', bgClass: 'bg-[#faf8f5]', previewColor: '#faf8f5' },
    { id: 'cool-grey', name: 'Modern Cool Slate', bgClass: 'bg-[#f8fafc]', previewColor: '#f8fafc' },
    { id: 'soft-blue', name: 'Nordic Soft Sky', bgClass: 'bg-[#f0f9ff]', previewColor: '#f0f9ff' },
    { id: 'soft-emerald', name: 'Subtle Sage Green', bgClass: 'bg-[#f0fdf4]', previewColor: '#f0fdf4' },
    { id: 'soft-rose', name: 'Blush Velvet', bgClass: 'bg-[#fff1f2]', previewColor: '#fff1f2' },
  ];

  const templates = [
    { id: 'genz', name: '✨ Gen-Z Modern (Card Grid)', target: 'Creative & Tech' },
    { id: 'modern', name: '💼 Professional Modern', target: 'Corporate & Mid-level' },
    { id: 'executive', name: '👔 Executive Sidebar', target: 'Senior & Leadership' },
    { id: 'classic', name: '🏛️ Harvard Classic (Editorial)', target: 'Law, Finance & Academia' },
    { id: 'minimal', name: '📄 Clean ATS Minimalist', target: 'Universal ATS' },
    { id: 'compact', name: '⚡ Tech Terminal', target: 'Developers & Engineers' },
  ];

  const zoomLevels = [75, 90, 100, 110, 125];
  const currentZoom = resumeData.theme.zoom || 100;

  const handleZoomChange = (delta) => {
    const idx = zoomLevels.indexOf(currentZoom);
    if (delta > 0 && idx < zoomLevels.length - 1) {
      updateTheme('zoom', zoomLevels[idx + 1]);
    } else if (delta < 0 && idx > 0) {
      updateTheme('zoom', zoomLevels[idx - 1]);
    }
  };

  const fireCelebratoryConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981'],
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    try {
      setDownloading(true);
      const element = resumeRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const fileName = `${(resumeData.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(fileName);
      fireCelebratoryConfetti();
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Check console for details.');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    fireCelebratoryConfetti();
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${(resumeData.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (importData(parsed)) {
          alert('Resume data imported successfully!');
        } else {
          alert('Invalid resume file format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const getFontFamilyClass = () => {
    switch (resumeData.theme.fontFamily) {
      case 'serif':
        return 'font-editorial';
      case 'mono':
        return 'font-jetbrains';
      default:
        return 'font-jakarta';
    }
  };

  const getPaperBgClass = () => {
    const bg = paperBackgrounds.find(b => b.id === resumeData.theme.paperBg);
    return bg ? bg.bgClass : 'bg-white';
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/70 p-3 lg:p-6 overflow-y-auto">
      {/* Top Collapsible Studio Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 transition-all duration-300">
        {/* Collapsible Header Strip */}
        <div 
          onClick={() => setIsControlsOpen(!isControlsOpen)}
          className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 rounded-2xl transition-colors select-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sliders className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-slate-800">
              Style & Export Controls
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              ({templates.find(t => t.id === resumeData.theme.template)?.name.replace(/^[^\w]+/, '')} • {resumeData.theme.fontFamily})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-indigo-600">
              {isControlsOpen ? 'Collapse (More space)' : 'Customize & Export'}
            </span>
            <button
              type="button"
              className="p-1 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {isControlsOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Body */}
        {isControlsOpen && (
          <div className="p-4 pt-1 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Template Selector with Categories */}
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-slate-700">Style:</span>
                <select
                  value={resumeData.theme.template}
                  onChange={(e) => updateTheme('template', e.target.value)}
                  className="text-xs bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Typography Selector */}
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-slate-700">Font:</span>
                <select
                  value={resumeData.theme.fontFamily}
                  onChange={(e) => updateTheme('fontFamily', e.target.value)}
                  className="text-xs bg-slate-50 text-slate-900 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium"
                >
                  <option value="sans">✨ Plus Jakarta (Modern Sans)</option>
                  <option value="serif">🏛️ Newsreader (Editorial Serif)</option>
                  <option value="mono">⚡ JetBrains (Tech Monospace)</option>
                </select>
              </div>

              {/* Paper Background Color Selector */}
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-slate-700">Tone:</span>
                <div className="flex items-center gap-1.5">
                  {paperBackgrounds.map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      title={bg.name}
                      onClick={() => updateTheme('paperBg', bg.id)}
                      className={`w-5 h-5 rounded-md border transition-all cursor-pointer flex items-center justify-center ${
                        (resumeData.theme.paperBg || 'white') === bg.id
                          ? 'ring-2 ring-indigo-600 border-indigo-600 scale-110 shadow-xs'
                          : 'border-slate-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: bg.previewColor }}
                    >
                      {(resumeData.theme.paperBg || 'white') === bg.id && (
                        <Check className="w-3 h-3 text-indigo-600 stroke-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color Theme Selector */}
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-slate-700">Accent:</span>
                <div className="flex items-center gap-1.5">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      title={c.name}
                      onClick={() => updateTheme('accentColor', c.value)}
                      className={`w-5 h-5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                        resumeData.theme.accentColor === c.value 
                          ? 'ring-2 ring-indigo-600 ring-offset-2 ring-offset-white scale-110 shadow-xs' 
                          : 'hover:scale-105 opacity-85 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.value }}
                    >
                      {resumeData.theme.accentColor === c.value && (
                        <Check className="w-3 h-3 text-white drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom Canvas Controls */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button
                  onClick={() => handleZoomChange(-1)}
                  type="button"
                  className="p-1 hover:bg-white text-slate-600 hover:text-indigo-600 rounded cursor-pointer transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-bold text-slate-700 px-1.5">
                  {currentZoom}%
                </span>
                <button
                  onClick={() => handleZoomChange(1)}
                  type="button"
                  className="p-1 hover:bg-white text-slate-600 hover:text-indigo-600 rounded cursor-pointer transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* JSON Export & Import */}
              <button
                onClick={handleExportJSON}
                type="button"
                title="Download JSON Backup"
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer border border-slate-200"
              >
                <FileDown className="w-3.5 h-3.5" /> Backup
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                type="button"
                title="Import Resume JSON"
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer border border-slate-200"
              >
                <Upload className="w-3.5 h-3.5" /> Restore
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportJSON}
                accept=".json"
                className="hidden"
              />

              {/* Native Print */}
              <button
                onClick={handlePrint}
                type="button"
                title="Print or Save as Vector PDF"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-slate-200"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>

              {/* Instant PDF Export with Confetti celebration */}
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Rendering...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Export PDF
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>


      {/* Interactive Zoomable Resume Canvas (A4 ratio) */}
      <div className="flex-1 flex justify-center items-start overflow-auto pb-12">
        <div 
          className={`w-full max-w-[800px] shadow-2xl rounded-sm overflow-hidden ${getPaperBgClass()} text-slate-900 ${getFontFamilyClass()} print-area transition-all duration-300 origin-top`}
          style={{ transform: `scale(${currentZoom / 100})` }}
        >
          <div ref={resumeRef} className="w-full">
            {resumeData.theme.template === 'genz' && <GenZCreativeTemplate resumeData={resumeData} />}
            {resumeData.theme.template === 'classic' && <ClassicTemplate resumeData={resumeData} />}
            {resumeData.theme.template === 'minimal' && <MinimalTemplate resumeData={resumeData} />}
            {resumeData.theme.template === 'executive' && <ExecutiveTemplate resumeData={resumeData} />}
            {resumeData.theme.template === 'compact' && <CompactTemplate resumeData={resumeData} />}
            {resumeData.theme.template === 'modern' && <ModernTemplate resumeData={resumeData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
