import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { 
  Sparkles, CheckCircle2, ArrowRight, Zap, Shield, 
  FileCheck, Download, Layers, Star, Eye, X, Check,
  Briefcase, GraduationCap, Award, Palette, ExternalLink
} from 'lucide-react';
import Button from '../components/common/Button';

// Miniature interactive previews of the templates
function MiniTemplateMockup({ id, accentColor }) {
  if (id === 'genz') {
    return (
      <div className="w-full h-full bg-slate-50 p-2.5 flex flex-col gap-1.5 text-[6px] select-none pointer-events-none">
        {/* Banner with avatar */}
        <div 
          className="rounded-lg p-2 text-white flex items-center gap-2 shadow-xs"
          style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #1e1b4b 100%)` }}
        >
          <div className="w-5 h-5 rounded-full bg-white/30 border border-white shrink-0" />
          <div className="flex-1 space-y-0.5">
            <div className="h-1.5 bg-white rounded-full w-14" />
            <div className="h-1 bg-white/70 rounded-full w-20" />
          </div>
        </div>
        {/* Grid cards */}
        <div className="grid grid-cols-3 gap-1.5 flex-1">
          <div className="col-span-2 space-y-1 bg-white p-1.5 rounded-md border border-slate-200">
            <div className="h-1 rounded w-10" style={{ backgroundColor: accentColor }} />
            <div className="h-1 bg-slate-200 rounded w-full" />
            <div className="h-1 bg-slate-200 rounded w-4/5" />
            <div className="h-1 rounded w-8 mt-1" style={{ backgroundColor: accentColor }} />
            <div className="h-1 bg-slate-200 rounded w-full" />
          </div>
          <div className="space-y-1 bg-white p-1.5 rounded-md border border-slate-200">
            <div className="h-1 rounded w-6" style={{ backgroundColor: accentColor }} />
            <div className="flex flex-wrap gap-0.5">
              <span className="w-4 h-1.5 rounded-sm" style={{ backgroundColor: `${accentColor}25` }} />
              <span className="w-5 h-1.5 rounded-sm" style={{ backgroundColor: `${accentColor}25` }} />
              <span className="w-3 h-1.5 rounded-sm" style={{ backgroundColor: `${accentColor}25` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'modern') {
    return (
      <div className="w-full h-full bg-white p-3 flex flex-col gap-2 text-[6px] select-none pointer-events-none">
        <div className="border-b pb-1.5" style={{ borderColor: accentColor }}>
          <div className="h-2 rounded w-16" style={{ backgroundColor: accentColor }} />
          <div className="h-1 bg-slate-400 rounded w-24 mt-0.5" />
          <div className="flex gap-1 mt-1">
            <div className="h-0.5 bg-slate-300 rounded w-8" />
            <div className="h-0.5 bg-slate-300 rounded w-8" />
            <div className="h-0.5 bg-slate-300 rounded w-8" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-1 rounded w-12" style={{ backgroundColor: accentColor }} />
          <div className="h-0.5 bg-slate-200 rounded w-full" />
          <div className="h-0.5 bg-slate-200 rounded w-11/12" />
        </div>
        <div className="space-y-1">
          <div className="h-1 rounded w-12" style={{ backgroundColor: accentColor }} />
          <div className="h-0.5 bg-slate-200 rounded w-full" />
          <div className="h-0.5 bg-slate-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (id === 'executive') {
    return (
      <div className="w-full h-full bg-white flex text-[6px] select-none pointer-events-none">
        {/* Left Dark Sidebar */}
        <div className="w-1/3 p-2 text-white flex flex-col gap-1.5" style={{ backgroundColor: accentColor }}>
          <div className="w-5 h-5 rounded-full bg-white/20 border border-white/50 mb-0.5" />
          <div className="h-1.5 bg-white rounded w-12" />
          <div className="h-1 bg-white/70 rounded w-14" />
          <div className="h-px bg-white/20 my-0.5" />
          <div className="space-y-0.5">
            <div className="h-0.5 bg-white/60 rounded w-8" />
            <div className="h-0.5 bg-white/60 rounded w-10" />
          </div>
          <div className="h-px bg-white/20 my-0.5" />
          <div className="flex flex-wrap gap-0.5">
            <span className="w-3 h-1 bg-white/30 rounded-xs" />
            <span className="w-4 h-1 bg-white/30 rounded-xs" />
          </div>
        </div>
        {/* Right Content */}
        <div className="w-2/3 p-2.5 space-y-1.5">
          <div className="h-1 rounded w-14" style={{ backgroundColor: accentColor }} />
          <div className="h-0.5 bg-slate-200 rounded w-full" />
          <div className="h-0.5 bg-slate-200 rounded w-4/5" />
          <div className="h-1 rounded w-14 mt-1" style={{ backgroundColor: accentColor }} />
          <div className="h-0.5 bg-slate-200 rounded w-full" />
          <div className="h-0.5 bg-slate-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  // Harvard Classic
  return (
    <div className="w-full h-full bg-white p-3 flex flex-col gap-1.5 text-[6px] font-serif select-none pointer-events-none">
      <div className="text-center border-b border-slate-900 pb-1.5 space-y-0.5">
        <div className="h-1.5 bg-slate-900 rounded mx-auto w-20" />
        <div className="h-1 bg-slate-500 rounded mx-auto w-16" />
        <div className="h-0.5 bg-slate-400 rounded mx-auto w-28" />
      </div>
      <div className="space-y-1">
        <div className="h-1 bg-slate-800 rounded w-16 border-b border-slate-300 pb-0.5" />
        <div className="h-0.5 bg-slate-300 rounded w-full" />
        <div className="h-0.5 bg-slate-300 rounded w-5/6" />
      </div>
      <div className="space-y-1">
        <div className="h-1 bg-slate-800 rounded w-16 border-b border-slate-300 pb-0.5" />
        <div className="h-0.5 bg-slate-300 rounded w-full" />
        <div className="h-0.5 bg-slate-300 rounded w-4/5" />
      </div>
    </div>
  );
}

// Detailed high-fidelity visual sheet for the alternating showcase
function ShowcaseMockupSheet({ id, accentColor }) {
  if (id === 'genz') {
    return (
      <div className="w-full bg-white rounded-xl shadow-md border border-slate-200/90 p-3.5 sm:p-4 space-y-3 transition-transform duration-500 group-hover:scale-[1.01]">
        {/* Banner with avatar & gradient */}
        <div 
          className="rounded-xl p-3 sm:p-3.5 text-white flex items-center justify-between shadow-xs"
          style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #1e1b4b 100%)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center font-bold text-sm shadow-inner text-white">
              AR
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-white">Alex Rivera</div>
              <div className="text-[11px] text-indigo-200 font-medium">Senior Frontend Architect</div>
            </div>
          </div>
          <span className="hidden sm:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-white">
            Available for hire
          </span>
        </div>

        {/* 2-column cards layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Experience Column (2 cols) */}
          <div className="sm:col-span-2 space-y-2">
            <div className="bg-slate-50/90 rounded-lg p-2.5 border border-slate-200/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Lead Design Technologist</span>
                <span className="text-[9.5px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">2022 - Present</span>
              </div>
              <div className="text-[10.5px] text-slate-500 font-medium">Vercel Inc. • San Francisco, CA</div>
              <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                Architected design token engine adopted across 40+ apps, reducing UI shipping cycles by 65%.
              </p>
            </div>

            <div className="bg-slate-50/90 rounded-lg p-2.5 border border-slate-200/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Senior UI Engineer</span>
                <span className="text-[9.5px] font-medium text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded">2020 - 2022</span>
              </div>
              <div className="text-[10.5px] text-slate-500 font-medium">Figma • Remote</div>
              <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                Spearheaded micro-frontend dashboard migration to React 18, enhancing Core Web Vitals to 99th percentile.
              </p>
            </div>
          </div>

          {/* Skills Column (1 col) */}
          <div className="space-y-2 bg-slate-50/90 rounded-lg p-2.5 border border-slate-200/70 flex flex-col justify-between">
            <div>
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1">
                {['React 19', 'Next.js', 'TypeScript', 'Tailwind', 'GraphQL', 'Node.js', 'Figma'].map(tag => (
                  <span key={tag} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/70">
              <span className="text-[9.5px] font-bold text-slate-700 block">Education</span>
              <span className="text-[9.5px] text-slate-500">B.S. CS, UC Berkeley</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'modern') {
    return (
      <div className="w-full bg-white rounded-xl shadow-md border border-slate-200/90 p-4 sm:p-5 space-y-3 transition-transform duration-500 group-hover:scale-[1.01]">
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-2.5">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">SARAH JENKINS</h4>
              <p className="text-[11px] font-semibold text-blue-600 mt-0.5">Principal Product Manager • Enterprise Platforms</p>
            </div>
            <span className="hidden sm:inline-flex text-[9.5px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Corporate Standard
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] text-slate-500 mt-1.5">
            <span>✉ s.jenkins@example.com</span>
            <span>•</span>
            <span>📍 New York, NY</span>
            <span>•</span>
            <span>🔗 linkedin.com/in/sarahjenkins</span>
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Professional Experience</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-900">Principal Product Manager — Stripe</span>
              <span className="text-slate-500 font-medium text-[10px]">2021 – Present</span>
            </div>
            <ul className="list-disc list-inside text-[10px] text-slate-600 space-y-0.5 pl-1 leading-snug">
              <li>Scaled Global Billing engine from $80M to $320M ARR across 40+ countries.</li>
              <li>Spearheaded zero-touch merchant onboarding, reducing drop-off rates by 28%.</li>
            </ul>
          </div>

          <div className="space-y-0.5 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-900">Senior Product Manager — Salesforce</span>
              <span className="text-slate-500 font-medium text-[10px]">2018 – 2021</span>
            </div>
            <ul className="list-disc list-inside text-[10px] text-slate-600 space-y-0.5 pl-1 leading-snug">
              <li>Delivered AI lead-scoring platform deployed across 150k enterprise sales teams.</li>
            </ul>
          </div>
        </div>

        {/* Core Competencies */}
        <div className="pt-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Core Competencies</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <p className="text-[10px] text-slate-600">
            Product Strategy • GTM Execution • Enterprise SaaS • SQL & Mixpanel • Cross-functional Leadership
          </p>
        </div>
      </div>
    );
  }

  if (id === 'executive') {
    return (
      <div className="w-full bg-white rounded-xl shadow-md border border-slate-200/90 overflow-hidden flex transition-transform duration-500 group-hover:scale-[1.01]">
        {/* Left Dark Sidebar */}
        <div className="w-2/5 sm:w-1/3 bg-slate-900 text-white p-3.5 flex flex-col justify-between space-y-3 shrink-0">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-indigo-400 flex items-center justify-center font-bold text-sm text-indigo-300">
              DS
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white leading-tight">DAVID STERLING</h4>
              <p className="text-[10px] text-indigo-300 font-medium mt-0.5">VP of Engineering</p>
            </div>

            <div className="pt-1.5 border-t border-slate-800 text-[9.5px] space-y-1 text-slate-400">
              <div>📍 Austin, TX</div>
              <div>✉ d.sterling@exec.io</div>
              <div>🌐 sterling-tech.com</div>
            </div>

            <div className="pt-1.5 border-t border-slate-800">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                Core Skills
              </span>
              <div className="flex flex-wrap gap-1">
                {['Org Scaling', 'P&L Strategy', 'Cloud Arch', 'SOC2 / ISO', 'M&A Tech Due Diligence'].map(s => (
                  <span key={s} className="text-[8.5px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[8.5px] text-slate-400 border-t border-slate-800 pt-1.5">
            <span className="font-bold text-slate-300 block">Education</span>
            M.S. Computer Science — Stanford
          </div>
        </div>

        {/* Right Main Content */}
        <div className="w-3/5 sm:w-2/3 p-3.5 space-y-2.5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-0.5">
              Executive Profile
            </span>
            <p className="text-[10px] text-slate-600 leading-snug">
              Engineering executive with 15+ years delivering hyper-scale platforms. Scaled 140+ engineer org across 3 continents with $45M operating budget.
            </p>
          </div>

          <div className="space-y-1.5 border-t border-slate-100 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
              Leadership Milestones
            </span>

            <div className="space-y-0.5">
              <div className="flex justify-between items-baseline text-[10.5px]">
                <span className="font-bold text-slate-900">VP of Engineering — Datadog</span>
                <span className="text-[9px] text-slate-500">2020 – Present</span>
              </div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                Scaled engineering team from 40 to 140+ across US and EMEA; lowered infrastructure COGS by 31%.
              </p>
            </div>

            <div className="space-y-0.5 pt-0.5">
              <div className="flex justify-between items-baseline text-[10.5px]">
                <span className="font-bold text-slate-900">Director of Infrastructure — Box</span>
                <span className="text-[9px] text-slate-500">2016 – 2020</span>
              </div>
              <p className="text-[9.5px] text-slate-600 leading-tight">
                Directed multi-cloud migration achieving 99.999% SLA uptime for Fortune 500 customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Harvard Classic
  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-slate-200/90 p-4 sm:p-5 space-y-2.5 font-serif transition-transform duration-500 group-hover:scale-[1.01]">
      {/* Header */}
      <div className="text-center pb-2 border-b border-slate-900 space-y-0.5">
        <h4 className="text-base sm:text-lg font-bold tracking-widest text-slate-900 uppercase">ELEANOR VANCE</h4>
        <div className="text-[9.5px] text-slate-600">
          Cambridge, MA • (617) 495-3100 • eleanor.vance@law.harvard.edu
        </div>
      </div>

      {/* Education */}
      <div className="space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 flex justify-between">
          <span>EDUCATION</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <div>
            <strong className="text-slate-900">HARVARD LAW SCHOOL</strong>, Cambridge, MA
            <div className="italic text-slate-600">Juris Doctor, Magna Cum Laude</div>
          </div>
          <span className="text-slate-500 text-[9.5px]">May 2021</span>
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-1 pt-0.5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
          <span>PROFESSIONAL EXPERIENCE</span>
        </div>

        <div className="space-y-0.5">
          <div className="flex justify-between text-[10px]">
            <div>
              <strong className="text-slate-900">SULLIVAN & CROMWELL LLP</strong>, New York, NY
              <div className="italic text-slate-600">Corporate & M&A Associate</div>
            </div>
            <span className="text-slate-500 text-[9.5px]">2021 – Present</span>
          </div>
          <ul className="list-disc list-inside text-[9.5px] text-slate-700 space-y-0.5 pl-1 leading-snug font-sans">
            <li>Represented strategic acquirers in domestic and cross-border M&A transactions exceeding $3.4B aggregate value.</li>
            <li>Structured definitive asset purchase agreements, disclosures, and debt financing covenants.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { updateTheme } = useResume();
  const [selectedTemplateForModal, setSelectedTemplateForModal] = useState(null);

  const templates = [
    {
      id: 'genz',
      name: 'Gen-Z Modern',
      tag: 'Trending',
      accentColor: '#6366f1',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      floatingBadge: '✨ Gradient Banner & Skill Cloud',
      previewFileName: 'alex-rivera-frontend.pdf',
      shortDesc: 'Card layout, gradient banner, photo frame & skill tags.',
      fullDesc: 'Crafted for tech creators, UI/UX designers, developers, and product managers. Breaks away from monotonous black-and-white resumes with dynamic cards, vibrant gradients, and clean rounded tag clouds that pop on screen and in portfolio submissions.',
      bestFor: ['Tech Startups', 'Frontend & Fullstack Devs', 'UI/UX & Product Designers', 'Creative Technologists'],
      keyFeatures: [
        'Vibrant gradient banner header with profile avatar',
        'Pill-tag skills cloud for rapid recruiter scanning',
        'Modular card-based section layout for projects',
        'High visual engagement for modern tech portfolios'
      ],
    },
    {
      id: 'modern',
      name: 'Professional Modern',
      tag: 'Most Popular',
      accentColor: '#2563eb',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      floatingBadge: '🎯 99% ATS Pass Rate',
      previewFileName: 'sarah-jenkins-product.pdf',
      shortDesc: 'Balanced corporate standard with customizable accents.',
      fullDesc: 'The gold standard across mid-level to senior roles. Clean typography with subtle colored rule lines gives hiring managers an immediate, effortless scanning experience without any visual clutter.',
      bestFor: ['Corporate Roles', 'Mid & Senior Engineers', 'Project Managers', 'Sales & Operations'],
      keyFeatures: [
        'Clean single-column visual hierarchy preferred by corporate HR',
        'Subtle color accent dividers matching your industry tone',
        'Balanced typography scaling with ATS-certified parsing',
        'Optimized line spacing for maximum readability'
      ],
    },
    {
      id: 'executive',
      name: 'Executive Sidebar',
      tag: 'Leadership',
      accentColor: '#1e3a8a',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      floatingBadge: '💼 Executive Tier Authority',
      previewFileName: 'david-sterling-vp.pdf',
      shortDesc: 'Two-column layout highlighting career milestones.',
      fullDesc: 'Engineered for team leads, directors, and VPs who need to present extensive work histories alongside key competencies and education in a structured, high-density two-column layout.',
      bestFor: ['Executive & Director Roles', 'Management Consultants', 'Team Leads & Dept Heads'],
      keyFeatures: [
        'Left colored sidebar for contacts, competencies & credentials',
        'Expansive main column for chronological leadership milestones',
        'Distinguished executive profile summary commanding authority',
        'High information density without feeling cramped'
      ],
    },
    {
      id: 'classic',
      name: 'Harvard Classic',
      tag: 'ATS-Tested',
      accentColor: '#0f172a',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      floatingBadge: '🏛️ Ivy League Editorial Standard',
      previewFileName: 'eleanor-vance-law.pdf',
      shortDesc: 'Strict Ivy League single-column for Finance & Law.',
      fullDesc: 'Modeled after Harvard and Wharton career office guidelines. Pure editorial serif typography, zero graphics, and traditional margins built to guarantee flawless parsing through Taleo, Workday, and enterprise ATS screening engines.',
      bestFor: ['Investment Banking & Finance', 'Corporate Law & Legal', 'Healthcare & Academia'],
      keyFeatures: [
        '100% Taleo, Workday, and Greenhouse ATS parsing compatibility',
        'Prestigious Newsreader editorial serif typography',
        'Ivy League standard header, dates, and margin geometry',
        'Universally respected by conservative hiring committees'
      ],
    },
  ];

  const handleUseTemplate = (tplId) => {
    updateTheme('template', tplId);
    navigate('/builder');
  };

  const features = [
    {
      id: 'preview',
      tabLabel: 'Dual-Pane Studio',
      icon: Zap,
      accentColor: '#6366f1',
      metric: '< 5ms',
      metricLabel: 'Real-Time Sync Latency',
      badge: 'Live Rendering',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      title: 'Instant Dual-Screen Editing with Zero Wait',
      tagline: 'Type on the left, watch your resume update character-by-character on the right.',
      desc: 'Traditional resume builders force you to constantly reload or download test PDFs to verify formatting. ResumeCraft’s reactive dual-pane studio renders every change synchronously with sub-5ms latency, giving you an effortless editing flow.',
      bullets: [
        'Sub-5ms dual-screen DOM synchronization',
        'Smart auto-pagination & dynamic line flow',
        'Instant 1-click template switching with preserved data'
      ],
    },
    {
      id: 'ats',
      tabLabel: 'ATS Compatibility',
      icon: FileCheck,
      accentColor: '#2563eb',
      metric: '99/100',
      metricLabel: 'Taleo & Workday Parser Score',
      badge: 'Enterprise Tested',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Engineered to Pass Taleo, Workday & Greenhouse',
      tagline: 'Single-stream semantic hierarchy designed for automated recruitment scanners.',
      desc: 'Over 75% of resumes get rejected by Applicant Tracking Systems due to complex graphics or unreadable columns. Our templates enforce strict semantic standards ensuring hiring algorithms extract your skills, titles, and dates with 100% accuracy.',
      bullets: [
        'Standard section identifiers recognized by enterprise ATS',
        'Clean single-stream parseable typography',
        'Validated against Taleo, Workday, Greenhouse & Lever'
      ],
    },
    {
      id: 'pdf',
      tabLabel: 'Vector PDF Engine',
      icon: Download,
      accentColor: '#059669',
      metric: '300 DPI',
      metricLabel: 'Lossless Vector Print Quality',
      badge: 'Print & Screen',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Pixel-Perfect Vector PDFs with Exact A4 Margins',
      tagline: 'Crisp, selectable text that never blurs on retina displays or physical prints.',
      desc: 'Unlike web tools that rasterize resumes into blurry images, ResumeCraft exports true vector PDFs with embedded font curves and standardized ISO 216 margins. Your resume stays razor-sharp whether viewed on a 4K monitor or printed on physical paper.',
      bullets: [
        'True vector text paths — zero pixelation or blur',
        'Standardized ISO A4 & US Letter geometric margins',
        '1-click direct browser download with zero server wait'
      ],
    },
    {
      id: 'privacy',
      tabLabel: 'Device-Local Privacy',
      icon: Shield,
      accentColor: '#7c3aed',
      metric: '0 KB',
      metricLabel: 'Data Sent to External Servers',
      badge: 'Zero Telemetry',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      title: '100% Private, Client-Side & Device-Local Storage',
      tagline: 'Your career history and contact details belong only to you.',
      desc: 'We believe job search data should never be collected, profiled, or stored in remote databases. ResumeCraft operates completely inside your browser sandbox. All changes auto-save instantly to your device’s local storage with zero cloud tracking and zero accounts required.',
      bullets: [
        '0 KB of personal data transmitted to external servers',
        'Auto-saved continuously to browser local storage',
        'No account, no passwords, and no hidden tracking cookies'
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-jakarta selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-200/50 via-purple-100/40 to-pink-100/30 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Free Modern Resume Studio
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Build Resumes That <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Actually Get Interviews
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Crafted for <strong className="text-slate-900">tech builders</strong> and <strong className="text-slate-900">career professionals</strong>. Real-time split-screen editing, ATS compliance, and 1-click vector PDF export.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button size="lg" icon={ArrowRight} onClick={() => navigate('/builder')}>
              Open Free Studio
            </Button>
            <Button variant="secondary" size="lg" icon={Layers} className="bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs" onClick={() => navigate('/dashboard')}>
              My Resumes
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free to use
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No signup required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant PDF download
            </span>
          </div>
        </div>
      </section>

      {/* Alternating Zigzag Templates Showcase */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16 lg:space-y-24">

          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Interactive Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Designed for every industry & career stage
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Explore how each layout is engineered for ATS compliance, visual elegance, and maximum recruiter engagement.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {templates.map((tpl, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={tpl.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Text & Explanation Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                    <div className="space-y-4 sm:space-y-5">
                      {/* Top Badge & Tag */}
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tpl.badgeClass}`}>
                          {tpl.tag}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Top Rated
                        </span>
                      </div>

                      {/* Title & Short Catchphrase */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                          {tpl.name}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-indigo-600 mt-1">
                          {tpl.shortDesc}
                        </p>
                      </div>

                      {/* In-depth Explanation */}
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {tpl.fullDesc}
                      </p>

                      {/* Key Architecture Highlights */}
                      <div className="space-y-2 pt-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Key Architecture Highlights:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {tpl.keyFeatures.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommended For Pills */}
                      <div className="pt-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                          Recommended For:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {tpl.bestFor.map((item, bIdx) => (
                            <span 
                              key={bIdx} 
                              className="px-2.5 py-1 bg-white text-slate-700 rounded-lg text-xs font-medium border border-slate-200 shadow-2xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <Button 
                          variant="primary" 
                          size="md" 
                          icon={ArrowRight}
                          onClick={() => handleUseTemplate(tpl.id)}
                        >
                          Use {tpl.name}
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="md" 
                          icon={Eye}
                          className="bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs cursor-pointer"
                          onClick={() => setSelectedTemplateForModal(tpl)}
                        >
                          Quick Look
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Visual Animation / Mockup Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                    <div className="relative group">
                      {/* Subtle Ambient Glow Behind Mockup */}
                      <div 
                        className="absolute -inset-2 rounded-3xl opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:blur-2xl pointer-events-none"
                        style={{ backgroundColor: tpl.accentColor }}
                      />

                      {/* Window Card Frame */}
                      <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-md group-hover:shadow-2xl group-hover:border-slate-300 transition-all duration-300 overflow-hidden">
                        {/* Title Bar */}
                        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            <span className="ml-2 text-[11px] font-mono text-slate-400 font-medium">
                              {tpl.previewFileName}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded-full bg-white border border-slate-200 shadow-2xs">
                            {tpl.floatingBadge}
                          </span>
                        </div>

                        {/* Interactive Visual Canvas Area */}
                        <div className="p-3 sm:p-5 bg-slate-100/70 relative">
                          <ShowcaseMockupSheet id={tpl.id} accentColor={tpl.accentColor} />

                          {/* Hover Action Overlay */}
                          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4">
                            <Button
                              variant="primary"
                              size="sm"
                              icon={ArrowRight}
                              onClick={() => handleUseTemplate(tpl.id)}
                              className="shadow-xl cursor-pointer"
                            >
                              Use {tpl.name}
                            </Button>
                            <button
                              type="button"
                              onClick={() => setSelectedTemplateForModal(tpl)}
                              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-lg shadow-xl flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-indigo-600" /> Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Template Deep-Dive Info & Preview Modal */}
      {selectedTemplateForModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedTemplateForModal(null)}
        >
          <div 
            className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 flex flex-col md:flex-row gap-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedTemplateForModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Visual Preview Side */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div className="w-full h-72 rounded-2xl border-2 border-slate-200 overflow-hidden shadow-md bg-slate-50">
                <MiniTemplateMockup 
                  id={selectedTemplateForModal.id} 
                  accentColor={selectedTemplateForModal.accentColor} 
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-2">
                Live interactive A4 structure
              </span>
            </div>

            {/* Information Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${selectedTemplateForModal.badgeClass}`}>
                    {selectedTemplateForModal.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900">
                  {selectedTemplateForModal.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {selectedTemplateForModal.fullDesc}
                </p>

                {/* Key Features */}
                <div className="mt-4 space-y-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                    Layout Highlights:
                  </h4>
                  {selectedTemplateForModal.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Best For Tags */}
                <div className="mt-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Recommended For:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedTemplateForModal.bestFor.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10.5px] font-medium border border-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  size="md" 
                  className="w-full" 
                  icon={ArrowRight}
                  onClick={() => handleUseTemplate(selectedTemplateForModal.id)}
                >
                  Start with {selectedTemplateForModal.name}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Light Professional Features & Advantages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Platform Advantages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for speed. Optimized for interviews.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Everything you need to craft high-impact, ATS-approved resumes in minutes with zero signup friction.
          </p>
        </div>

        {/* 4 Clean Light Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Live Preview */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-500/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Real-Time
                </span>
              </div>

              {/* Micro Visual Pill */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Dual-Sync
                </span>
                <span className="text-[10px] font-mono text-indigo-600 font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  &lt; 5ms
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">Instant Live Preview</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Type on the left and watch your resume format synchronously on the right with zero reload lag.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Sub-5ms DOM sync</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Auto-flowing A4 margins</span>
              </div>
            </div>
          </div>

          {/* Card 2: ATS Friendly */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  ATS Verified
                </span>
              </div>

              {/* Micro Visual Pill */}
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Taleo & Workday
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                  99% Pass
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">ATS-Optimized Layouts</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clean semantic hierarchies guaranteed to parse through enterprise HR applicant screening engines.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Fortune 500 compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Machine-readable text</span>
              </div>
            </div>
          </div>

          {/* Card 3: Vector PDF */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Lossless
                </span>
              </div>

              {/* Micro Visual Pill */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-700 font-semibold text-[11px]">
                  📄 Vector Typography
                </span>
                <span className="text-[10px] font-mono text-slate-600 font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  300 DPI
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">Vector PDF & Print</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Download crisp vector PDFs with standard A4 margins that never blur on retina screens or prints.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Selectable font curves</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Unbranded & Free</span>
              </div>
            </div>
          </div>

          {/* Card 4: 100% Private */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-500/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  100% Private
                </span>
              </div>

              {/* Micro Visual Pill */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-purple-700 font-semibold text-[11px] flex items-center gap-1">
                  🔒 On-Device Sandbox
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  0 KB Cloud
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">100% Client-Side Privacy</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your career history never leaves your device. Auto-saved safely to your browser local storage.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>No signup or accounts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Offline capable memory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Light Elegant CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-pink-50/60 border border-indigo-100 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Ready to create your interview-winning resume?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Free to use, zero signup required. Pick a template and start building.
            </p>
          </div>
          <Button
            size="lg"
            icon={ArrowRight}
            onClick={() => navigate('/builder')}
            className="shrink-0 w-full sm:w-auto shadow-md cursor-pointer"
          >
            Start Building Now — Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-xs text-slate-500 bg-transparent">
        ResumeCraft — Build, customize, and export career-ready resumes in seconds.
      </footer>

    </div>
  );
}
