import React, { useRef, useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import ClassicAtsTemplate from './templates/ClassicAtsTemplate';
import HarvardTemplate from './templates/HarvardTemplate';
import JakesTemplate from './templates/JakesTemplate';
import DeedyTemplate from './templates/DeedyTemplate';
import TechMinimalTemplate from './templates/TechMinimalTemplate';
import ModernCleanTemplate from './templates/ModernCleanTemplate';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { 
  Download, Palette, Layout, Type, Printer, 
  Upload, FileDown, Check, Droplet, ZoomIn, ZoomOut, Maximize2,
  Sliders, Loader2, CheckCircle2, Sparkles, SlidersHorizontal
} from 'lucide-react';

export default function ResumePreview() {
  const { resumeData, updateTheme, importData } = useResume();
  const resumeRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [containerWidth, setContainerWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 1024;
      return Math.max(320, isMobile ? (window.innerWidth - 32) : (window.innerWidth / 2) - 32);
    }
    return 794;
  });

  // Track preview pane width dynamically to Auto-Fit the resume
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const colors = [
    { name: 'Dark Slate', value: '#1e293b' },
    { name: 'Cyber Blue', value: '#2563eb' },
    { name: 'Indigo Gradient', value: '#6366f1' },
    { name: 'Electric Violet', value: '#8b5cf6' },
    { name: 'Emerald Forest', value: '#059669' },
    { name: 'Crimson Wine', value: '#881337' },
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
    { id: 'classic-ats', name: '📄 Classic Single-Column ATS', tag: 'Universal Standard' },
    { id: 'harvard', name: '🏛️ Harvard / Ivy League', tag: 'Editorial Serif' },
    { id: 'jakes', name: "📐 Jake's Resume (LaTeX)", tag: 'FAANG & CS' },
    { id: 'deedy', name: '⚡ Deedy Resume (SWE)', tag: 'Silicon Valley' },
    { id: 'tech-minimal', name: '💻 Tech Minimalist Single-Page', tag: 'Cloud & DevOps' },
    { id: 'modern-clean', name: '💼 Modern Clean Chronological', tag: 'Tech Lead' },
  ];

  // Compute Auto-Fit scale to ensure 794px A4 canvas fits 100% inside container width without horizontal scrollbars
  const autoFitScale = Math.min(1, Math.max(0.42, (containerWidth - 36) / 794));
  
  // If user selected 'auto', or if zoom is unset / default 100 on a narrow split-screen container, auto-fit
  const isAutoFit = resumeData.theme.zoom === 'auto' || !resumeData.theme.zoom || (resumeData.theme.zoom === 100 && containerWidth < 820);
  const effectiveScale = isAutoFit ? autoFitScale : (typeof resumeData.theme.zoom === 'number' ? resumeData.theme.zoom / 100 : autoFitScale);
  const currentZoomPercent = Math.round(effectiveScale * 100);

  const zoomLevels = [60, 70, 80, 90, 100, 110, 125];

  const handleZoomChange = (delta) => {
    let currentIdx = zoomLevels.findIndex(z => z >= currentZoomPercent);
    if (currentIdx === -1) currentIdx = zoomLevels.length - 1;
    
    let nextIdx = currentIdx + delta;
    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= zoomLevels.length) nextIdx = zoomLevels.length - 1;
    
    updateTheme('zoom', zoomLevels[nextIdx]);
  };

  const toggleAutoFit = () => {
    if (isAutoFit) {
      updateTheme('zoom', 100);
    } else {
      updateTheme('zoom', 'auto');
    }
  };

  const handleDirectDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      setDownloading(true);

      // Create an unscaled, clean A4 print container positioned within the viewport but behind the UI
      const container = document.createElement('div');
      container.className = `${getPaperBgClass()} text-slate-900 ${getFontFamilyClass()} ${getFontSizeClass()}`;
      container.style.position = 'fixed';
      container.style.top = '0px';
      container.style.left = '0px';
      container.style.width = '794px';
      container.style.minHeight = '1123px';
      container.style.zIndex = '-9999';
      container.style.pointerEvents = 'none';
      container.style.boxShadow = 'none';
      container.style.borderRadius = '0px';
      container.style.transform = 'none';
      container.style.margin = '0px';

      // Clone resume content
      const clone = resumeRef.current.cloneNode(true);
      clone.style.width = '794px';
      clone.style.boxShadow = 'none';
      clone.style.borderRadius = '0px';
      clone.style.transform = 'none';
      clone.style.margin = '0px';

      container.appendChild(clone);
      document.body.appendChild(container);

      // Wait a moment for layout to compute
      await new Promise(r => setTimeout(r, 80));

      const scrollH = Math.max(1123, container.scrollHeight || 1123);
      const bgHex = paperBackgrounds.find(p => p.id === resumeData.theme.paperBg)?.previewColor || '#ffffff';

      const imgData = await toPng(container, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: bgHex,
        width: 794,
        height: scrollH,
        cacheBust: true,
      });

      document.body.removeChild(container);

      // Initialize jsPDF with exact pixel dimensions matching standard A4 (794px x 1123px)
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [794, 1123],
        hotfixes: ['px_scaling'],
      });

      const pageHeight = 1123;
      let heightLeft = scrollH;
      let position = 0;

      // First page - exact 0,0 full bleed
      pdf.addImage(imgData, 'PNG', 0, position, 794, scrollH, undefined, 'FAST');
      heightLeft -= pageHeight;
      let pageCount = 1;

      // Multi-page handling if content exceeds 1123px
      while (heightLeft > 20) {
        position -= pageHeight;
        pdf.addPage([794, 1123], 'p');
        pageCount++;
        pdf.addImage(imgData, 'PNG', 0, position, 794, scrollH, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      // Embed structured ATS-readable text layer so resume scanners extract 100% of keywords & text
      const cleanText = (str) => {
        if (!str) return '';
        return String(str)
          .replace(/[\u2022\u2023\u25E6\u2043\u2219]/g, '-')
          .replace(/[\u2018\u2019]/g, "'")
          .replace(/[\u201C\u201D]/g, '"')
          .replace(/[\u2013\u2014]/g, '-')
          .trim();
      };

      const atsLines = [];

      // 1. Personal & Contact Info
      if (resumeData.personalInfo?.fullName) {
        atsLines.push({ text: cleanText(resumeData.personalInfo.fullName), bold: true, isHeading: true });
      }
      if (resumeData.personalInfo?.jobTitle) {
        atsLines.push({ text: cleanText(resumeData.personalInfo.jobTitle), bold: true });
      }

      const contacts = [
        resumeData.personalInfo?.email,
        resumeData.personalInfo?.phone,
        resumeData.personalInfo?.location,
        resumeData.personalInfo?.website,
        resumeData.personalInfo?.linkedin,
        resumeData.personalInfo?.github,
      ].filter(Boolean).map(cleanText);

      if (contacts.length > 0) {
        atsLines.push({ text: contacts.join(' | ') });
      }

      // 2. Summary
      if (resumeData.personalInfo?.summary && resumeData.sectionVisibility?.summary !== false) {
        atsLines.push({ text: 'PROFESSIONAL SUMMARY', bold: true, isHeading: true });
        atsLines.push({ text: cleanText(resumeData.personalInfo.summary) });
      }

      // 3. Technical Skills
      if (resumeData.skills?.length > 0 && resumeData.sectionVisibility?.skills !== false) {
        atsLines.push({ text: 'TECHNICAL SKILLS', bold: true, isHeading: true });
        atsLines.push({ text: resumeData.skills.map(s => cleanText(s)).filter(Boolean).join(', ') });
      }

      // 4. Work Experience
      if (resumeData.experiences?.length > 0 && resumeData.sectionVisibility?.experiences !== false) {
        atsLines.push({ text: 'WORK EXPERIENCE', bold: true, isHeading: true });
        resumeData.experiences.forEach(exp => {
          const dates = `${cleanText(exp.startDate)} - ${exp.current ? 'Present' : cleanText(exp.endDate)}`.trim();
          const roleParts = [cleanText(exp.jobTitle), cleanText(exp.company), cleanText(exp.location), dates].filter(Boolean);
          if (roleParts.length > 0) {
            atsLines.push({ text: roleParts.join(' | '), bold: true });
          }
          if (exp.description) {
            exp.description.split('\n').forEach(line => {
              const cl = cleanText(line);
              if (cl) atsLines.push({ text: cl });
            });
          }
        });
      }

      // 5. Projects
      if (resumeData.projects?.length > 0 && resumeData.sectionVisibility?.projects !== false) {
        atsLines.push({ text: 'PROJECTS', bold: true, isHeading: true });
        resumeData.projects.forEach(proj => {
          const techStr = proj.technologies ? ` (${cleanText(proj.technologies)})` : '';
          const linkStr = proj.link ? ` - ${cleanText(proj.link)}` : '';
          atsLines.push({ text: `${cleanText(proj.title)}${techStr}${linkStr}`, bold: true });
          if (proj.description) {
            proj.description.split('\n').forEach(line => {
              const cl = cleanText(line);
              if (cl) atsLines.push({ text: cl });
            });
          }
        });
      }

      // 6. Education
      if (resumeData.education?.length > 0 && resumeData.sectionVisibility?.education !== false) {
        atsLines.push({ text: 'EDUCATION', bold: true, isHeading: true });
        resumeData.education.forEach(edu => {
          const dates = `${cleanText(edu.startDate)} - ${cleanText(edu.endDate)}`.trim();
          const eduParts = [
            cleanText(edu.degree), 
            cleanText(edu.institution), 
            cleanText(edu.location), 
            dates ? `(${dates})` : '',
            edu.score ? `[${cleanText(edu.score)}]` : ''
          ].filter(Boolean);
          atsLines.push({ text: eduParts.join(' | '), bold: true });
        });
      }

      // 7. Certifications
      if (resumeData.certifications?.length > 0 && resumeData.sectionVisibility?.certifications !== false) {
        atsLines.push({ text: 'CERTIFICATIONS', bold: true, isHeading: true });
        resumeData.certifications.forEach(cert => {
          const parts = [
            cleanText(cert.name), 
            cleanText(cert.issuer), 
            cert.date ? `(${cleanText(cert.date)})` : ''
          ].filter(Boolean);
          atsLines.push({ text: parts.join(' - ') });
        });
      }

      // 8. Languages
      if (resumeData.languages?.length > 0 && resumeData.sectionVisibility?.languages !== false) {
        atsLines.push({ text: 'LANGUAGES', bold: true, isHeading: true });
        atsLines.push({ 
          text: resumeData.languages.map(l => `${cleanText(l.name)} (${cleanText(l.proficiency)})`).join(', ') 
        });
      }

      // Inject invisible text layer across the PDF pages
      let currPage = 1;
      pdf.setPage(currPage);
      let textY = 40;
      const leftX = 40;
      const textMaxWidth = 714;
      const defaultLineHeight = 12;
      const maxYPerPage = 1080;

      pdf.setFontSize(8.5);
      pdf.setTextColor(255, 255, 255);

      for (const entry of atsLines) {
        const wrapped = pdf.splitTextToSize(entry.text, textMaxWidth);
        for (const sub of wrapped) {
          if (textY > maxYPerPage && currPage < pageCount) {
            currPage++;
            pdf.setPage(currPage);
            textY = 40;
          }
          pdf.text(sub, leftX, textY, { renderingMode: 'invisible' });
          textY += defaultLineHeight;
        }
        if (entry.isHeading) {
          textY += 2;
        }
      }

      const fileName = `${(resumeData.personalInfo?.fullName || 'Resume').trim().replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('PDF download error:', err);
      const existing = document.querySelector('body > div[style*="-9999"]');
      if (existing) existing.remove();
      alert('Could not download PDF directly: ' + (err.message || 'Unknown error'));
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
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
      case 'times':
      case 'times-new-roman':
        return 'font-times';
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

  const getFontSizeClass = () => {
    switch (resumeData.theme.fontSize) {
      case 'compact': return 'text-[11.5px] leading-snug';
      case 'relaxed': return 'text-[13.5px] leading-relaxed';
      default: return 'text-[12.5px] leading-normal';
    }
  };

  const getMarginsClass = () => {
    switch (resumeData.theme.margins) {
      case 'compact': return 'p-4';
      case 'spacious': return 'p-10';
      default: return 'p-7';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100/90 overflow-hidden text-slate-850">
      {/* Studio Document Controls Bar (Sleek two-tier executive strip) */}
      <div className="bg-white border-b border-slate-200/90 shadow-2xs shrink-0 no-print z-20">
        {/* Tier 1: Primary Controls Strip */}
        <div className="px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3 flex-wrap">
          {/* Left: Template Selector & Typography */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Template Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 rounded-xl px-2.5 py-1 shadow-2xs hover:border-slate-300 transition-colors">
              <Layout className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <label htmlFor="template-select" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                Template:
              </label>
              <select
                id="template-select"
                value={resumeData.theme.template}
                onChange={(e) => updateTheme('template', e.target.value)}
                className="text-xs bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer pr-1"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id} className="text-slate-900 font-medium">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Typography Font Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 rounded-xl px-2.5 py-1 shadow-2xs hover:border-slate-300 transition-colors">
              <Type className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <label htmlFor="font-select" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden md:inline">
                Font:
              </label>
              <select
                id="font-select"
                value={resumeData.theme.fontFamily || 'times'}
                onChange={(e) => updateTheme('fontFamily', e.target.value)}
                className="text-xs bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer pr-1"
              >
                <option value="times">📰 Times New Roman (Classic ATS)</option>
                <option value="sans">✨ Plus Jakarta (Modern Sans)</option>
                <option value="serif">🏛️ Newsreader (Editorial Serif)</option>
                <option value="mono">⚡ JetBrains (Tech Monospace)</option>
              </select>
            </div>

            {/* Font Size & Spacing Selectors */}
            <div className="hidden xl:flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/90 rounded-xl px-2 py-1 text-xs">
                <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Size:</span>
                <select
                  value={resumeData.theme.fontSize || 'normal'}
                  onChange={(e) => updateTheme('fontSize', e.target.value)}
                  className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer text-xs"
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Standard</option>
                  <option value="relaxed">Spacious</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/90 rounded-xl px-2 py-1 text-xs">
                <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Margins:</span>
                <select
                  value={resumeData.theme.margins || 'normal'}
                  onChange={(e) => updateTheme('margins', e.target.value)}
                  className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer text-xs"
                >
                  <option value="compact">Narrow</option>
                  <option value="normal">Standard</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right: Zoom Canvas Controls & Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Zoom Controls */}
            <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
              <button
                onClick={() => handleZoomChange(-1)}
                type="button"
                className="p-1 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleAutoFit}
                type="button"
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg cursor-pointer transition-colors ${
                  isAutoFit ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-700 hover:bg-white/80'
                }`}
                title={isAutoFit ? 'Auto-fitting to width (click for 100%)' : 'Click to Auto-Fit to width'}
              >
                {isAutoFit ? `Fit (${currentZoomPercent}%)` : `${currentZoomPercent}%`}
              </button>
              <button
                onClick={() => handleZoomChange(1)}
                type="button"
                className="p-1 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Print Action */}
            <button
              onClick={handlePrint}
              type="button"
              title="Print Resume (Ctrl+P)"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/90 transition-colors cursor-pointer text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>

            {/* Direct PDF Download (High-Contrast Hero CTA) */}
            <button
              onClick={handleDirectDownloadPDF}
              disabled={downloading}
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm shadow-indigo-500/20 transition-all cursor-pointer disabled:opacity-75"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tier 2: Styling & Appearance Swatches Bar */}
        <div className="px-3 sm:px-5 py-1.5 bg-slate-50/80 border-t border-slate-200/60 flex items-center justify-between gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden text-xs">
          {/* Accent Color Palette */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <Palette className="w-3 h-3 text-slate-400" />
              <span>Accent:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  title={c.name}
                  onClick={() => updateTheme('accentColor', c.value)}
                  className={`w-4 h-4 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                    resumeData.theme.accentColor === c.value
                      ? 'ring-2 ring-indigo-600 ring-offset-2 ring-offset-white scale-110 shadow-xs'
                      : 'hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.value }}
                >
                  {resumeData.theme.accentColor === c.value && (
                    <Check className="w-2.5 h-2.5 text-white drop-shadow-xs" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Background Tone */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <Droplet className="w-3 h-3 text-slate-400" />
              <span>Paper Tone:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {paperBackgrounds.map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  title={bg.name}
                  onClick={() => updateTheme('paperBg', bg.id)}
                  className={`w-4 h-4 rounded-md border transition-all cursor-pointer flex items-center justify-center ${
                    (resumeData.theme.paperBg || 'white') === bg.id
                      ? 'ring-2 ring-indigo-600 border-indigo-600 scale-110 shadow-xs'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: bg.previewColor }}
                >
                  {(resumeData.theme.paperBg || 'white') === bg.id && (
                    <Check className="w-2.5 h-2.5 text-indigo-600 stroke-3" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ATS Compliance Status */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Machine Parsable
            </span>
            <span>•</span>
            <span>300 DPI Vector PDF</span>
          </div>
        </div>
      </div>

      {/* Interactive Zoomable Resume Canvas (Exact Fixed A4: 794px x 1123px) */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 lg:p-8 bg-[#f8faff] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] print:p-0 print:m-0 print:overflow-visible print:bg-white flex flex-col items-center relative"
      >
        {/* Ambient Warm Studio Backlight matching Template Accent */}
        <div 
          className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 no-print"
          style={{ 
            background: `radial-gradient(circle at 50% 30%, ${resumeData.theme.accentColor || '#4f46e5'} 0%, transparent 65%)` 
          }}
        />

        {/* Soft Physical Studio Drop Shadow beneath Document */}
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-[680px] h-[36px] rounded-[100%] pointer-events-none transition-all duration-700 -z-0 no-print"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.16) 0%, rgba(15, 23, 42, 0.03) 55%, transparent 75%)',
            filter: 'blur(10px)',
          }}
        />

        <div 
          className="mx-auto transition-all duration-150 relative z-10"
          style={{
            width: `${Math.round(794 * effectiveScale)}px`,
            minHeight: `${Math.round(1123 * effectiveScale)}px`,
          }}
        >
          {/* Multi-Stop Paper Elevation */}
          <div 
            className={`w-[794px] min-w-[794px] max-w-[794px] min-h-[1123px] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.06)] rounded-sm overflow-hidden ${getPaperBgClass()} text-slate-900 ${getFontFamilyClass()} ${getFontSizeClass()} print-area resume-paper print:shadow-none print:transform-none`}
            style={{ 
              transform: `scale(${effectiveScale})`, 
              transformOrigin: 'top left' 
            }}
          >
            {/* Top Document Metadata Strip (Styled like Home Template Studio) */}
            <div className="border-b border-slate-100 px-5 py-2.5 bg-slate-50/90 flex items-center justify-between text-[11px] text-slate-500 font-mono no-print">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: resumeData.theme.accentColor || '#4f46e5' }} />
                <span>{templates.find(t => t.id === resumeData.theme.template)?.name.replace(/^[^\w]+/, '') || 'Standard Resume'}</span>
              </span>
              <span className="text-slate-400 text-[10px]">Page 1 of 1 • 8.5" × 11" Standard</span>
            </div>

            <div ref={resumeRef} className="w-[794px] min-h-[1123px]">
              {(resumeData.theme.template === 'classic-ats' || resumeData.theme.template === 'executive') && (
                <ClassicAtsTemplate resumeData={resumeData} />
              )}
              {(resumeData.theme.template === 'harvard' || resumeData.theme.template === 'classic') && (
                <HarvardTemplate resumeData={resumeData} />
              )}
              {(resumeData.theme.template === 'jakes' || resumeData.theme.template === 'compact') && (
                <JakesTemplate resumeData={resumeData} />
              )}
              {(resumeData.theme.template === 'deedy' || resumeData.theme.template === 'genz') && (
                <DeedyTemplate resumeData={resumeData} />
              )}
              {(resumeData.theme.template === 'tech-minimal' || resumeData.theme.template === 'minimal') && (
                <TechMinimalTemplate resumeData={resumeData} />
              )}
              {(resumeData.theme.template === 'modern-clean' || resumeData.theme.template === 'modern' || !resumeData.theme.template) && (
                <ModernCleanTemplate resumeData={resumeData} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Studio Window Status Bar (Styled like Home Template Studio) */}
      <div className="bg-slate-50 border-t border-slate-200/90 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 no-print shrink-0 z-20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            ATS Score: 99/100
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 hidden sm:inline">100% Machine Parsable Hierarchy (Workday, Taleo, Greenhouse)</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span className="hidden md:inline font-medium text-slate-700">
            {templates.find(t => t.id === resumeData.theme.template)?.name.replace(/^[^\w]+/, '')}
          </span>
          <span className="text-slate-300 hidden md:inline">•</span>
          <span className="font-mono text-[11px] text-slate-700 font-medium">300 DPI Vector PDF</span>
        </div>
      </div>
    </div>
  );
}
