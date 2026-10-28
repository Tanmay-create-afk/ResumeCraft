import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { 
  Sparkles, CheckCircle2, ArrowRight, Zap, Shield, 
  FileCheck, Download, Layers, Star, Eye, X, Check,
  Briefcase, GraduationCap, Award, Palette, ExternalLink, Type, Box
} from 'lucide-react';
import Button from '../components/common/Button';
import ThreeDTiltCard from '../components/common/ThreeDTiltCard';
import ThreeDHeroAnimation from '../components/common/ThreeDHeroAnimation';
import ThreeDPipelineSection from '../components/common/ThreeDPipelineSection';

// Miniature interactive previews of the templates
function MiniTemplateMockup({ id, accentColor }) {
  // 1. Classic Single-Column ATS Template
  if (id === 'classic-ats' || id === 'executive') {
    return (
      <div className="w-full h-full bg-white p-2.5 flex flex-col gap-1.5 text-[6px] select-none pointer-events-none">
        <div className="text-center border-b-2 border-slate-900 pb-1 space-y-0.5">
          <div className="h-1.5 bg-slate-900 rounded mx-auto w-20" />
          <div className="h-0.5 bg-slate-500 rounded mx-auto w-16" />
          <div className="h-0.5 bg-slate-400 rounded mx-auto w-24" />
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-slate-800 rounded w-16 border-b border-slate-900 pb-0.5" />
          <div className="flex justify-between">
            <div className="h-1 bg-slate-700 rounded w-14" />
            <div className="h-0.5 bg-slate-400 rounded w-8" />
          </div>
          <div className="h-0.5 bg-slate-400 rounded w-full" />
          <div className="h-0.5 bg-slate-400 rounded w-4/5" />
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-slate-800 rounded w-14 border-b border-slate-900 pb-0.5" />
          <div className="h-0.5 bg-slate-400 rounded w-full" />
        </div>
      </div>
    );
  }

  // 2. Harvard / Ivy League Resume Template
  if (id === 'harvard' || id === 'classic') {
    return (
      <div className="w-full h-full bg-white p-3 flex flex-col gap-1.5 text-[6px] font-serif select-none pointer-events-none">
        <div className="text-center border-b-2 pb-1 space-y-0.5" style={{ borderColor: accentColor || '#881337' }}>
          <div className="h-1.5 bg-slate-900 rounded mx-auto w-24" />
          <div className="h-0.5 bg-slate-500 rounded mx-auto w-28" />
        </div>
        <div className="space-y-1">
          <div className="h-1 font-bold uppercase tracking-wider rounded w-16 border-b pb-0.5" style={{ color: accentColor || '#881337', borderColor: accentColor || '#881337' }} />
          <div className="flex justify-between">
            <div className="h-1 bg-slate-800 rounded w-16" />
            <div className="h-0.5 bg-slate-400 rounded w-10" />
          </div>
          <div className="h-0.5 bg-slate-400 rounded w-full" />
          <div className="h-0.5 bg-slate-400 rounded w-5/6" />
        </div>
        <div className="space-y-1">
          <div className="h-1 font-bold uppercase tracking-wider rounded w-14 border-b pb-0.5" style={{ color: accentColor || '#881337', borderColor: accentColor || '#881337' }} />
          <div className="h-0.5 bg-slate-400 rounded w-full" />
        </div>
      </div>
    );
  }

  // 3. Jake's Resume Template (Overleaf / LaTeX)
  if (id === 'jakes' || id === 'compact') {
    return (
      <div className="w-full h-full bg-white p-2.5 flex flex-col gap-1.5 text-[6px] select-none pointer-events-none font-sans">
        <div className="text-center pb-1 border-b border-black space-y-0.5">
          <div className="h-1.5 bg-black rounded mx-auto w-20" />
          <div className="h-0.5 bg-neutral-600 rounded mx-auto w-28" />
        </div>
        <div className="space-y-0.5">
          <div className="h-1 bg-black rounded w-14 border-b border-black pb-0.5" />
          <div className="flex justify-between">
            <div className="h-1 bg-black rounded w-12 font-bold" />
            <div className="h-0.5 bg-neutral-600 rounded w-8" />
          </div>
          <div className="flex justify-between">
            <div className="h-0.5 bg-neutral-600 rounded w-14 italic" />
            <div className="h-0.5 bg-neutral-600 rounded w-6" />
          </div>
          <div className="h-0.5 bg-neutral-700 rounded w-full" />
          <div className="h-0.5 bg-neutral-700 rounded w-11/12" />
        </div>
        <div className="space-y-0.5">
          <div className="h-1 bg-black rounded w-16 border-b border-black pb-0.5" />
          <div className="h-0.5 bg-neutral-700 rounded w-full" />
        </div>
      </div>
    );
  }

  // 4. Deedy Resume Template (Software Engineering 2-Column)
  if (id === 'deedy' || id === 'genz') {
    return (
      <div className="w-full h-full bg-white p-2 flex gap-1.5 text-[6px] select-none pointer-events-none">
        {/* Left Column (33%) */}
        <div className="w-1/3 border-r border-slate-200 pr-1 space-y-1">
          <div className="h-1 bg-blue-600 rounded w-10 border-b border-blue-600 pb-0.5" />
          <div className="h-0.5 bg-slate-700 rounded w-full" />
          <div className="h-0.5 bg-slate-400 rounded w-4/5" />
          <div className="h-1 bg-blue-600 rounded w-8 border-b border-blue-600 pb-0.5 mt-1" />
          <div className="flex flex-wrap gap-0.5">
            <span className="w-3 h-1 bg-slate-200 rounded-xs" />
            <span className="w-4 h-1 bg-slate-200 rounded-xs" />
            <span className="w-3 h-1 bg-slate-200 rounded-xs" />
          </div>
        </div>
        {/* Right Column (67%) */}
        <div className="w-2/3 space-y-1">
          <div className="border-b border-slate-200 pb-0.5">
            <div className="flex gap-1 items-center">
              <span className="h-1.5 bg-slate-400 rounded w-8" />
              <span className="h-1.5 bg-blue-600 rounded w-10 font-bold" />
            </div>
            <div className="h-0.5 bg-slate-400 rounded w-20 mt-0.5" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 bg-blue-600 rounded w-12 border-b border-blue-600 pb-0.5" />
            <div className="h-0.5 bg-slate-700 rounded w-full" />
            <div className="h-0.5 bg-slate-500 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  // 5. Tech Minimalist Single-Page Template
  if (id === 'tech-minimal' || id === 'minimal') {
    return (
      <div className="w-full h-full bg-white p-2.5 flex flex-col gap-1.5 text-[6px] font-mono select-none pointer-events-none">
        <div className="text-center pb-1 border-b-2" style={{ borderColor: accentColor || '#0d9488' }}>
          <div className="h-1.5 rounded w-18 mx-auto" style={{ backgroundColor: accentColor || '#0d9488' }} />
          <div className="h-0.5 bg-slate-400 rounded w-24 mx-auto mt-0.5" />
        </div>
        <div className="space-y-0.5">
          <div className="h-1 bg-slate-800 rounded w-12 font-bold" />
          <div className="flex flex-wrap gap-0.5">
            <span className="w-4 h-1 rounded-xs bg-slate-200" />
            <span className="w-5 h-1 rounded-xs bg-slate-200" />
            <span className="w-4 h-1 rounded-xs bg-slate-200" />
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="h-1 bg-slate-800 rounded w-14 font-bold" />
          <div className="h-0.5 bg-slate-400 rounded w-full" />
          <div className="h-0.5 bg-slate-400 rounded w-5/6" />
        </div>
      </div>
    );
  }

  // 6. Modern Clean Chronological Template
  return (
    <div className="w-full h-full bg-white p-2.5 flex flex-col gap-1.5 text-[6px] select-none pointer-events-none">
      <div className="border-b-2 pb-1" style={{ borderColor: accentColor || '#4f46e5' }}>
        <div className="h-1.5 rounded w-20" style={{ backgroundColor: accentColor || '#4f46e5' }} />
        <div className="h-0.5 bg-slate-400 rounded w-28 mt-0.5" />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-1">
          <span className="w-1 h-1.5 rounded-full" style={{ backgroundColor: accentColor || '#4f46e5' }} />
          <div className="h-1 rounded w-14" style={{ backgroundColor: accentColor || '#4f46e5' }} />
        </div>
        <div className="h-0.5 bg-slate-400 rounded w-full" />
        <div className="h-0.5 bg-slate-400 rounded w-4/5" />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-1">
          <span className="w-1 h-1.5 rounded-full" style={{ backgroundColor: accentColor || '#4f46e5' }} />
          <div className="h-1 rounded w-12" style={{ backgroundColor: accentColor || '#4f46e5' }} />
        </div>
        <div className="h-0.5 bg-slate-400 rounded w-full" />
      </div>
    </div>
  );
}

// Detailed high-fidelity visual sheet for the alternating showcase & hero preview
function ShowcaseMockupSheet({ id, accentColor, embedded = false }) {
  const containerClass = embedded
    ? "w-full text-left"
    : "w-full bg-white rounded-xl shadow-md border border-slate-200/90 p-4 sm:p-6 transition-transform duration-500 group-hover:scale-[1.01] text-left";

  // 1. Classic Single-Column ATS Template (Universal Standard Chronological)
  if (id === 'classic-ats' || id === 'executive') {
    return (
      <div className={`${containerClass} font-sans space-y-3 sm:space-y-3.5 text-slate-800`}>
        {/* Header */}
        <div className="text-center pb-2.5 border-b-2 border-slate-900 space-y-1">
          <h4 className="text-base sm:text-xl font-extrabold tracking-wide text-slate-900 uppercase">
            MARCUS VANCE
          </h4>
          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-700 tracking-tight">
            Staff Enterprise Cloud Architect &amp; Distributed Systems Lead
          </p>
          <div className="text-[9.5px] sm:text-[10px] text-slate-600 flex flex-wrap items-center justify-center gap-2">
            <span>New York, NY</span>
            <span>•</span>
            <span>(212) 555-0199</span>
            <span>•</span>
            <span className="text-slate-800 font-medium">marcus.vance@example.com</span>
            <span>•</span>
            <span>linkedin.com/in/marcusvance</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-1">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
            PROFESSIONAL SUMMARY
          </div>
          <p className="text-[9.5px] sm:text-[10px] text-slate-700 leading-relaxed">
            Enterprise cloud architect with 9+ years scaling mission-critical distributed systems. Specialist in zero-trust architectures, multi-region Kubernetes deployments, and high-throughput financial clearance backends processing multi-billion dollar daily volumes.
          </p>
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
            WORK EXPERIENCE
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-baseline text-[10.5px] sm:text-[11px]">
              <div>
                <strong className="text-slate-900">Lead Enterprise Architect</strong>
                <span className="text-slate-600 font-medium text-[10px] sm:text-[10.5px]"> — J.P. Morgan Chase &amp; Co.</span>
              </div>
              <span className="text-slate-700 font-medium text-[9.5px] sm:text-[10px]">2021 – Present</span>
            </div>
            <div className="text-[9.5px] text-slate-500 italic">New York, NY</div>
            <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-slate-700 space-y-0.5 pl-1 leading-snug">
              <li>Modernized core clearing transaction pipeline processing <strong className="text-slate-900 font-semibold">$42B daily throughput</strong> with 99.999% SLA across 4 redundant regions.</li>
              <li>Consolidated hybrid Kubernetes cluster topology, lowering multi-cloud compute expenditure by <strong className="text-slate-900 font-semibold">$3.8M annually</strong>.</li>
              <li>Directed architectural committee of 24 principal engineers defining enterprise-wide zero-trust security standards.</li>
            </ul>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-baseline text-[10.5px] sm:text-[11px]">
              <div>
                <strong className="text-slate-900">Senior Systems Engineer</strong>
                <span className="text-slate-600 font-medium text-[10px] sm:text-[10.5px]"> — Bloomberg LP</span>
              </div>
              <span className="text-slate-700 font-medium text-[9.5px] sm:text-[10px]">2018 – 2021</span>
            </div>
            <div className="text-[9.5px] text-slate-500 italic">New York, NY</div>
            <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-slate-700 space-y-0.5 pl-1 leading-snug">
              <li>Architected real-time market data feed distribution engine in C++ and Go, achieving <strong className="text-slate-900 font-semibold">sub-millisecond query latency</strong>.</li>
              <li>Automated CI/CD deployment across 1,200+ bare-metal nodes, reducing release cycle lead time from 14 days to 4 hours.</li>
            </ul>
          </div>
        </div>

        {/* Education & Credentials */}
        <div className="space-y-1 pt-0.5">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
            EDUCATION &amp; CREDENTIALS
          </div>
          <div className="flex justify-between text-[10px] sm:text-[10.5px]">
            <div>
              <strong className="text-slate-900">COLUMBIA UNIVERSITY</strong> — B.S. in Computer Science
            </div>
            <span className="text-slate-600 text-[9.5px]">Magna Cum Laude (GPA 3.92)</span>
          </div>
          <div className="text-[9.5px] text-slate-700">
            <span className="font-semibold text-slate-900">Certifications: </span>
            AWS Certified Solutions Architect Professional • Certified Kubernetes Administrator (CKA)
          </div>
        </div>

        {/* Core Competencies */}
        <div className="space-y-1 pt-0.5">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
            TECHNICAL COMPETENCIES
          </div>
          <div className="text-[9px] sm:text-[9.5px] text-slate-700 space-y-0.5">
            <div><strong className="text-slate-900">Cloud &amp; Infrastructure:</strong> Kubernetes, Docker, AWS (EKS, IAM, RDS), Terraform, Helm, Prometheus, Linux</div>
            <div><strong className="text-slate-900">Languages &amp; Data:</strong> Go, Python, Java, C++, PostgreSQL, Redis, Apache Kafka, Distributed Architecture</div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Harvard / Ivy League Resume Template
  if (id === 'harvard' || id === 'classic') {
    return (
      <div className={`${containerClass} font-serif space-y-3 sm:space-y-3.5 text-slate-800`}>
        {/* Header */}
        <div className="text-center pb-2.5 border-b-2 space-y-1" style={{ borderColor: accentColor || '#881337' }}>
          <h4 className="text-base sm:text-xl font-bold tracking-widest text-slate-900 uppercase">
            ELEANOR VANCE
          </h4>
          <p className="text-[10px] sm:text-[10.5px] font-sans font-medium text-slate-700 tracking-wide">
            Corporate Transactions &amp; Cross-Border M&amp;A Counsel
          </p>
          <div className="text-[9.5px] sm:text-[10px] text-slate-600 font-sans flex flex-wrap items-center justify-center gap-2">
            <span>Cambridge, MA</span>
            <span>•</span>
            <span>(617) 495-3100</span>
            <span>•</span>
            <span className="text-slate-800 font-medium">eleanor.vance@law.harvard.edu</span>
            <span>•</span>
            <span>linkedin.com/in/eleanorvance</span>
          </div>
        </div>

        {/* Education (Harvard Standard: Education First) */}
        <div className="space-y-1.5">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-widest text-slate-900 border-b pb-0.5 font-sans flex justify-between" style={{ borderColor: `${accentColor || '#881337'}60` }}>
            <span>EDUCATION</span>
          </div>
          <div className="space-y-0.5">
            <div className="flex justify-between items-baseline text-[10px] sm:text-[10.5px]">
              <div>
                <strong className="text-slate-900">HARVARD LAW SCHOOL</strong>, Cambridge, MA
                <div className="italic text-slate-700 text-[9.5px]">Juris Doctor, Magna Cum Laude • Harvard Law Review, Executive Editor</div>
              </div>
              <span className="text-slate-600 text-[9.5px] font-sans">May 2021</span>
            </div>
            <div className="text-[9px] text-slate-600 italic">Ames Moot Court Competition Quarterfinalist • Dean's Scholar Prize in Corporations</div>
          </div>
          <div className="space-y-0.5 pt-0.5">
            <div className="flex justify-between items-baseline text-[10px] sm:text-[10.5px]">
              <div>
                <strong className="text-slate-900">HARVARD COLLEGE</strong>, Cambridge, MA
                <div className="italic text-slate-700 text-[9.5px]">A.B. in Economics &amp; Government, Summa Cum Laude, Phi Beta Kappa</div>
              </div>
              <span className="text-slate-600 text-[9.5px] font-sans">May 2018</span>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-1.5 pt-0.5">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-widest text-slate-900 border-b pb-0.5 font-sans" style={{ borderColor: `${accentColor || '#881337'}60` }}>
            <span>PROFESSIONAL EXPERIENCE</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-baseline text-[10px] sm:text-[10.5px]">
              <div>
                <strong className="text-slate-900">SULLIVAN &amp; CROMWELL LLP</strong>, New York, NY
                <div className="italic text-slate-700 text-[9.5px]">Corporate &amp; Cross-Border M&amp;A Associate</div>
              </div>
              <span className="text-slate-600 text-[9.5px] font-sans">2021 – Present</span>
            </div>
            <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-slate-700 space-y-0.5 pl-1 leading-snug">
              <li>Represented strategic acquirers in 14 cross-border M&amp;A transactions valued in aggregate over <strong className="text-slate-900 font-semibold">$6.2 Billion</strong>.</li>
              <li>Structured definitive asset purchase agreements, joint venture operating pacts, and FTC regulatory disclosures.</li>
              <li>Advised board committees on activist investor defenses, corporate governance restructuring, and fiduciary obligations.</li>
            </ul>
          </div>

          <div className="space-y-0.5 pt-1">
            <div className="flex justify-between items-baseline text-[10px] sm:text-[10.5px]">
              <div>
                <strong className="text-slate-900">SUPREME JUDICIAL COURT OF MASSACHUSETTS</strong>, Boston, MA
                <div className="italic text-slate-700 text-[9.5px]">Judicial Honors Intern to the Associate Justice</div>
              </div>
              <span className="text-slate-600 text-[9.5px] font-sans">2020 – 2021</span>
            </div>
            <p className="text-[9px] sm:text-[9.5px] text-slate-700 pl-1 leading-snug">
              Drafted bench memoranda on complex corporate governance, civil procedure, and securities litigation disputes.
            </p>
          </div>
        </div>

        {/* Publications & Bar Admissions */}
        <div className="space-y-1 pt-0.5">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-widest text-slate-900 border-b pb-0.5 font-sans" style={{ borderColor: `${accentColor || '#881337'}60` }}>
            <span>PUBLICATIONS &amp; ADMISSIONS</span>
          </div>
          <div className="text-[9px] sm:text-[9.5px] text-slate-700 space-y-0.5">
            <div><strong className="text-slate-900">Bar Admissions:</strong> Admitted to New York State Bar (2021) and Massachusetts Bar (2022)</div>
            <div><strong className="text-slate-900">Publication:</strong> <em>Antitrust Scrutiny in Multi-Sided Digital Platforms</em>, 134 Harv. L. Rev. 882 (2021)</div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Jake's Resume Template (Overleaf / LaTeX standard)
  if (id === 'jakes' || id === 'compact') {
    return (
      <div className={`${containerClass} font-sans space-y-2.5 sm:space-y-3 text-neutral-900`}>
        {/* Jake's Centered LaTeX Header */}
        <div className="text-center pb-1.5 border-b border-black space-y-0.5">
          <h4 className="text-base sm:text-xl font-bold tracking-tight text-black">
            JAKE GUTIERREZ
          </h4>
          <div className="text-[9.5px] sm:text-[10px] text-neutral-800">
            (555) 123-4567 <span className="text-neutral-400">|</span> jake@example.com <span className="text-neutral-400">|</span> linkedin.com/in/jake <span className="text-neutral-400">|</span> github.com/jake
          </div>
        </div>

        {/* Education */}
        <div className="space-y-1">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5">
            EDUCATION
          </div>
          <div className="flex justify-between text-[10px] sm:text-[10.5px]">
            <div>
              <strong className="text-black">Southwestern University</strong> — B.S. in Computer Science, Minor in Mathematics
            </div>
            <span className="text-neutral-700 text-[9.5px]">Aug 2018 – May 2022</span>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-1.5">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5">
            EXPERIENCE
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-between text-[10.5px] sm:text-[11px]">
              <strong className="text-black">Full Stack Software Engineer</strong>
              <span className="text-neutral-800 text-[9.5px]">June 2022 – Present</span>
            </div>
            <div className="flex justify-between text-[9.5px] text-neutral-700 italic">
              <span>Amazon Web Services (AWS)</span>
              <span>Seattle, WA</span>
            </div>
            <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-neutral-900 space-y-0.5 pl-1 leading-snug">
              <li>Developed REST APIs in Java &amp; Spring Boot processing over <strong className="text-black font-semibold">120,000 requests/min</strong> with 99.99% availability.</li>
              <li>Built real-time operational dashboard in React &amp; TypeScript adopted by 3,500+ internal developers.</li>
              <li>Automated CI/CD deployment pipelines using AWS CDK, Docker, and GitHub Actions, cutting release cycles by 40%.</li>
            </ul>
          </div>

          <div className="space-y-0.5 pt-0.5">
            <div className="flex justify-between text-[10.5px] sm:text-[11px]">
              <strong className="text-black">Software Engineering Intern</strong>
              <span className="text-neutral-800 text-[9.5px]">May 2021 – Aug 2021</span>
            </div>
            <div className="flex justify-between text-[9.5px] text-neutral-700 italic">
              <span>Microsoft</span>
              <span>Redmond, WA</span>
            </div>
            <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-neutral-900 space-y-0.5 pl-1 leading-snug">
              <li>Designed and shipped internal developer telemetry dashboard in React and TypeScript used by 4,000+ engineers daily.</li>
              <li>Implemented automated testing suite with Jest and Cypress, elevating unit test coverage from 64% to 92%.</li>
            </ul>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-1">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5">
            PROJECTS
          </div>
          <div className="space-y-0.5">
            <div className="flex justify-between text-[10px] sm:text-[10.5px]">
              <div><strong className="text-black">GitDistributed</strong> <span className="text-neutral-600 italic">| Rust, Tokio, Raft, gRPC</span></div>
              <span className="text-neutral-700 text-[9.5px]">Jan 2023</span>
            </div>
            <p className="text-[9px] sm:text-[9.5px] text-neutral-900 pl-1 leading-snug">
              Authored fault-tolerant distributed key-value store based on Raft consensus with linearizable reads and atomic partition recovery.
            </p>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="space-y-1 pt-0.5">
          <div className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5">
            TECHNICAL SKILLS
          </div>
          <div className="space-y-0.5 text-[9px] sm:text-[9.5px] text-neutral-900">
            <div><strong className="text-black">Languages:</strong> Java, Python, C/C++, TypeScript, JavaScript, SQL, Go, Rust, Bash</div>
            <div><strong className="text-black">Frameworks:</strong> React, Node.js, Spring Boot, Next.js, Express, TailwindCSS</div>
            <div><strong className="text-black">Developer Tools:</strong> Git, Docker, Kubernetes, AWS, Terraform, Linux, CI/CD, Jest</div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Deedy Resume Template (Software Engineering standard)
  if (id === 'deedy' || id === 'genz') {
    return (
      <div className={`${containerClass} font-sans text-slate-800`}>
        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          {/* Left Column (4 cols / 33%) */}
          <div className="col-span-4 border-r border-slate-200 pr-2.5 space-y-2.5">
            <div>
              <div className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-900 border-b-2 border-blue-600 pb-0.5 mb-1">
                EDUCATION
              </div>
              <div className="text-[9px] text-slate-700 space-y-0.5">
                <strong className="text-slate-900 block text-[9.5px]">Cornell University</strong>
                <div className="italic">B.S. in Computer Science</div>
                <div className="text-slate-500">Grad. May 2022</div>
                <div className="font-semibold text-slate-800">Cum. GPA: 3.91</div>
                <div className="text-slate-500 text-[8.5px]">Dean's List (All Sem.)</div>
              </div>
            </div>

            <div>
              <div className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-900 border-b-2 border-blue-600 pb-0.5 mb-1">
                LINKS
              </div>
              <div className="text-[9px] text-slate-600 space-y-0.5 font-mono">
                <div>github://<span className="text-blue-600">alexrivera</span></div>
                <div>linkedin://<span className="text-blue-600">arivera</span></div>
                <div>web://<span className="text-blue-600">arivera.io</span></div>
              </div>
            </div>

            <div>
              <div className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-900 border-b-2 border-blue-600 pb-0.5 mb-1">
                COURSEWORK
              </div>
              <div className="text-[8.5px] text-slate-600 space-y-0.5">
                <div>• Distributed Systems</div>
                <div>• Operating Systems</div>
                <div>• Compilers &amp; Lang.</div>
                <div>• Machine Learning</div>
              </div>
            </div>

            <div>
              <div className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-900 border-b-2 border-blue-600 pb-0.5 mb-1">
                SKILLS
              </div>
              <div className="flex flex-wrap gap-1 text-[8px]">
                {['Go', 'Rust', 'Python', 'React', 'TypeScript', 'Docker', 'K8s', 'Kafka', 'PostgreSQL', 'Redis'].map(s => (
                  <span key={s} className="bg-slate-100 text-slate-800 px-1 py-0.2 rounded border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (8 cols / 67%) */}
          <div className="col-span-8 space-y-2.5">
            <div className="border-b border-slate-200 pb-1.5">
              <div className="text-lg sm:text-2xl font-light tracking-tight text-slate-400 uppercase">
                ALEX <span className="font-extrabold text-blue-600">RIVERA</span>
              </div>
              <div className="text-[9px] sm:text-[9.5px] text-slate-500 mt-0.5">
                San Francisco, CA • (415) 890-1234 • alex@rivera.dev
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-900 border-b border-blue-600 pb-0.5">
                EXPERIENCE
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between items-baseline text-[10px] sm:text-[10.5px]">
                  <div><strong className="text-slate-900 uppercase">Google</strong> | Software Engineer III</div>
                  <span className="text-slate-500 text-[8.5px]">2022 – Present</span>
                </div>
                <ul className="list-disc list-inside text-[8.5px] sm:text-[9px] text-slate-700 space-y-0.5 leading-snug">
                  <li>Built high-throughput indexing ingestion microservice in Go handling <strong className="text-slate-900 font-semibold">850k QPS</strong> across 6 global data centers.</li>
                  <li>Reduced P99 query latency by 28% via lock-free cache algorithms and eBPF network telemetry.</li>
                </ul>
              </div>

              <div className="space-y-0.5 pt-0.5">
                <div className="flex justify-between items-baseline text-[10px] sm:text-[10.5px]">
                  <div><strong className="text-slate-900 uppercase">Meta</strong> | Software Engineering Intern</div>
                  <span className="text-slate-500 text-[8.5px]">Summer 2021</span>
                </div>
                <ul className="list-disc list-inside text-[8.5px] sm:text-[9px] text-slate-700 space-y-0.5 leading-snug">
                  <li>Implemented real-time telemetry streaming pipelines with Kafka and GraphQL for Instagram Feed ranking.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-1 pt-0.5">
              <div className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-900 border-b border-blue-600 pb-0.5">
                SELECTED PROJECTS
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between items-baseline text-[10px]">
                  <div><strong className="text-slate-900">KubeMesh Telemetry</strong> <span className="text-slate-500 text-[8.5px]">| Go, eBPF, Prometheus</span></div>
                  <span className="text-blue-600 font-semibold text-[8.5px]">1.4k Stars</span>
                </div>
                <p className="text-[8.5px] sm:text-[9px] text-slate-700 leading-snug">
                  Open-source kernel observability agent profiling container network jitter at microsecond intervals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. Tech Minimalist Single-Page Template
  if (id === 'tech-minimal' || id === 'minimal') {
    return (
      <div className={`${containerClass} font-sans space-y-2.5 sm:space-y-3 text-slate-800`}>
        {/* Header */}
        <div className="text-center pb-2 border-b-2" style={{ borderColor: accentColor || '#0d9488' }}>
          <h4 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 uppercase">
            MARCUS CHEN
          </h4>
          <p className="text-[10px] sm:text-[11px] font-medium" style={{ color: accentColor || '#0d9488' }}>
            Staff Infrastructure &amp; Cloud Systems Architect
          </p>
          <div className="flex justify-center flex-wrap items-center gap-2 text-[9px] sm:text-[9.5px] text-slate-500 mt-1 font-mono">
            <span>Seattle, WA</span>
            <span>/</span>
            <span>m.chen@example.com</span>
            <span>/</span>
            <span>github.com/mchen</span>
          </div>
        </div>

        {/* Stack */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider font-mono text-slate-900">
              TECHNICAL STACK
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="flex flex-wrap gap-1 font-mono text-[8.5px] sm:text-[9px]">
            {['Golang', 'Rust', 'Kubernetes', 'Terraform', 'AWS', 'Prometheus', 'eBPF', 'Docker', 'PostgreSQL', 'CI/CD'].map(t => (
              <span key={t} className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider font-mono text-slate-900">
              EXPERIENCE
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-baseline text-[10px] sm:text-[10.5px]">
              <div><strong className="text-slate-900">Staff Cloud Architect</strong> @ Stripe</div>
              <span className="text-[9px] text-slate-500 font-mono">2021 – Present</span>
            </div>
            <p className="text-[9px] sm:text-[9.5px] text-slate-700 leading-snug">
              Orchestrated multi-region Kubernetes migration across 18 clusters, cutting multi-cloud infrastructure run rate by <strong className="text-slate-900 font-semibold">$4.2M annually</strong> while achieving zero unplanned downtime.
            </p>
          </div>

          <div className="space-y-1 pt-0.5">
            <div className="flex justify-between items-baseline text-[10px] sm:text-[10.5px]">
              <div><strong className="text-slate-900">Senior Infrastructure Engineer</strong> @ Datadog</div>
              <span className="text-[9px] text-slate-500 font-mono">2018 – 2021</span>
            </div>
            <p className="text-[9px] sm:text-[9.5px] text-slate-700 leading-snug">
              Scaled real-time metrics intake pipeline to ingest <strong className="text-slate-900 font-semibold">15TB telemetry daily</strong> with sub-second distributed query rendering.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-1 pt-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider font-mono text-slate-900">
              EDUCATION
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="flex justify-between text-[9.5px] sm:text-[10px]">
            <div><strong className="text-slate-900">University of Washington</strong> — B.S. in Computer Engineering</div>
            <span className="text-slate-500 font-mono">Magna Cum Laude</span>
          </div>
        </div>
      </div>
    );
  }

  // 6. Modern Clean Chronological Template
  return (
    <div className={`${containerClass} font-sans space-y-3 sm:space-y-3.5 text-slate-800`}>
      {/* Header */}
      <div className="border-b-2 pb-2.5" style={{ borderColor: accentColor || '#4f46e5' }}>
        <h4 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
          SARAH JENKINS
        </h4>
        <p className="text-[10.5px] sm:text-[11px] font-semibold mt-0.5" style={{ color: accentColor || '#4f46e5' }}>
          Principal Product Manager • Enterprise Platforms
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[9.5px] text-slate-500 mt-1">
          <span>✉ s.jenkins@example.com</span>
          <span>•</span>
          <span>📍 New York, NY</span>
          <span>•</span>
          <span>🔗 linkedin.com/in/sarahjenkins</span>
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: accentColor || '#4f46e5' }} />
          <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-900">
            Work Experience
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10.5px] sm:text-[11px]">
            <span className="font-bold text-slate-900">Principal Product Manager — Stripe</span>
            <span className="text-slate-500 font-medium text-[9px] sm:text-[9.5px]">2021 – Present</span>
          </div>
          <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-slate-700 space-y-0.5 pl-1 leading-snug">
            <li>Scaled Global Billing engine from $80M to <strong className="text-slate-900 font-semibold">$320M ARR</strong> across 40+ countries.</li>
            <li>Spearheaded zero-touch merchant onboarding, reducing drop-off rates by 28% and increasing funnel conversion by 14%.</li>
          </ul>
        </div>

        <div className="space-y-1 pt-0.5">
          <div className="flex items-center justify-between text-[10.5px] sm:text-[11px]">
            <span className="font-bold text-slate-900">Senior Product Manager — Shopify</span>
            <span className="text-slate-500 font-medium text-[9px] sm:text-[9.5px]">2018 – 2021</span>
          </div>
          <ul className="list-disc list-inside text-[9px] sm:text-[9.5px] text-slate-700 space-y-0.5 pl-1 leading-snug">
            <li>Led Checkout API platform processing <strong className="text-slate-900 font-semibold">$14B GMV</strong> during BFCM with 100% platform availability.</li>
          </ul>
        </div>
      </div>

      {/* Core Competencies */}
      <div className="pt-0.5">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: accentColor || '#4f46e5' }} />
          <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-700">
            Core Competencies
          </span>
        </div>
        <p className="text-[9px] sm:text-[9.5px] text-slate-600 leading-relaxed">
          Product Strategy • GTM Execution • Enterprise SaaS • SQL &amp; Mixpanel • Cross-functional Leadership • OKR Management
        </p>
      </div>
    </div>
  );
}

// Interactive Live Studio Preview for the Hero Section
function HeroStudioPreview({ onOpenStudio }) {
  const [selectedStyle, setSelectedStyle] = useState('classic-ats');
  const [cameraMode, setCameraMode] = useState('isometric'); // 'isometric' | 'dynamic' | 'flat'

  const styles = [
    { 
      id: 'classic-ats', 
      name: 'Classic ATS', 
      fullName: 'Classic Single-Column ATS Template', 
      color: '#0f172a', 
      badge: 'Universal ATS',
      fileName: 'marcus_vance_classic_ats.pdf',
      highlightBadge: '100% Machine Parsable',
      tag: 'Taleo & Workday Ready'
    },
    { 
      id: 'harvard', 
      name: 'Harvard', 
      fullName: 'Harvard / Ivy League Resume Template', 
      color: '#881337', 
      badge: 'Ivy League',
      fileName: 'eleanor_vance_harvard.pdf',
      highlightBadge: 'Newsreader Editorial Serif',
      tag: 'Law & Finance Standard'
    },
    { 
      id: 'jakes', 
      name: "Jake's (LaTeX)", 
      fullName: "Jake's Resume Template (Overleaf / LaTeX)", 
      color: '#0f172a', 
      badge: 'LaTeX Standard',
      fileName: 'jake_gutierrez_latex.pdf',
      highlightBadge: '2-Tier LaTeX Subheadings',
      tag: 'FAANG & CS Standard'
    },
    { 
      id: 'deedy', 
      name: 'Deedy', 
      fullName: 'Deedy Resume Template (Software Engineering)', 
      color: '#2563eb', 
      badge: 'SWE Standard',
      fileName: 'alex_rivera_deedy.pdf',
      highlightBadge: 'Asymmetric 33/67 Split',
      tag: 'Silicon Valley Standard'
    },
    { 
      id: 'tech-minimal', 
      name: 'Tech Minimal', 
      fullName: 'Tech Minimalist Single-Page Template', 
      color: '#0d9488', 
      badge: 'Developer',
      fileName: 'marcus_chen_minimal.pdf',
      highlightBadge: 'Single-Page High Density',
      tag: 'Cloud & DevOps Pure'
    },
    { 
      id: 'modern-clean', 
      name: 'Modern Clean', 
      fullName: 'Modern Clean Chronological Template', 
      color: '#4f46e5', 
      badge: 'Corporate Tech',
      fileName: 'sarah_jenkins_modern.pdf',
      highlightBadge: 'Clean Left-Accent Polish',
      tag: 'Product & Tech Lead'
    },
  ];

  const currentStyle = styles.find(s => s.id === selectedStyle) || styles[0];

  return (
    <div className="relative">
      {/* Subtle outer glow backdrop */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-indigo-600/10 to-slate-500/10 rounded-3xl blur-2xl -z-10" />

      {/* Main Studio Frame */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 overflow-hidden text-left">
        {/* Top Studio Chrome Bar (Light Executive Style Matching Website) */}
        <div className="bg-white/95 backdrop-blur-md text-slate-800 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 border-b border-slate-200/90 shadow-2xs">
          {/* Left: Window Controls & Live Status */}
          <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block shrink-0" />
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-bold text-slate-900 truncate max-w-[120px] sm:max-w-none">{currentStyle.fileName}</span>
              <span className="hidden md:inline text-slate-400 shrink-0">• {currentStyle.tag}</span>
            </div>
          </div>

          {/* Right: 3D Camera Mode Selector & Studio CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200/90 text-xs">
              <button
                type="button"
                onClick={() => setCameraMode('isometric')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  cameraMode === 'isometric'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
                title="3D Physical Desk View"
              >
                <Box className="w-3.5 h-3.5 text-indigo-200 shrink-0" />
                <span className="text-xs">3D Desk</span>
              </button>
              <button
                type="button"
                onClick={() => setCameraMode('dynamic')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  cameraMode === 'dynamic'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
                title="Free 3D Interactive Dynamic Tilt"
              >
                <span className="text-amber-500 text-xs shrink-0">⚡</span>
                <span className="text-xs">Dynamic Tilt</span>
              </button>
              <button
                type="button"
                onClick={() => setCameraMode('flat')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  cameraMode === 'flat'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
                title="Flat Focus View"
              >
                <span className="text-xs shrink-0">📄</span>
                <span className="text-xs">Flat</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onOpenStudio(selectedStyle)}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-indigo-600/20 cursor-pointer shrink-0"
            >
              <span className="hidden sm:inline">Open in Studio</span>
              <span className="sm:hidden">Studio</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>

        {/* Template Selector Segmented Control Bar */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-3 sm:px-6 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Templates:</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {styles.map(s => {
              const isActive = selectedStyle === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedStyle(s.id)}
                  title={s.fullName}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs font-bold'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <span>{s.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-medium text-slate-500 shrink-0 ml-auto">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> ATS 100% Parsable
            </span>
            <span>•</span>
            <span>A4 Vector PDF</span>
          </div>
        </div>

        {/* Studio Body: Executive Studio Desk Canvas */}
        <div className="p-4 sm:p-8 lg:p-14 bg-slate-100/70 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] flex justify-center items-center relative overflow-visible">
          
          {/* Ambient Warm Studio Backlight */}
          <div 
            className="absolute -inset-10 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
            style={{ 
              background: `radial-gradient(circle, ${currentStyle.color || '#4f46e5'} 0%, transparent 70%)` 
            }}
          />

          {/* Soft Physical Studio Drop Shadow beneath Document */}
          <div 
            className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[420px] sm:w-[620px] h-[36px] rounded-[100%] pointer-events-none transition-all duration-700 -z-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.16) 0%, rgba(15, 23, 42, 0.03) 55%, transparent 75%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Centered Document Paper Container with Refined Executive 3D Desk Tilt */}
          <ThreeDTiltCard
            cameraMode={cameraMode}
            maxTilt={cameraMode === 'dynamic' ? 32 : cameraMode === 'isometric' ? 12 : 0}
            scale={cameraMode === 'flat' ? 1 : 1.04}
            glare={cameraMode !== 'flat'}
            stackedPaper={cameraMode === 'isometric'}
            trackParent={true}
            atsScanBeam={false}
            onClick={() => onOpenStudio(selectedStyle)}
            className="w-full max-w-[620px] cursor-pointer group relative z-10"
          >
            {/* Top Document Metadata Strip */}
            <div className="border-b border-slate-100 px-5 py-2.5 bg-slate-50/70 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentStyle.color }} />
                {currentStyle.fullName}
              </span>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-sans font-bold tracking-wide bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                  {cameraMode === 'isometric' && '📐 3D Physical Desk'}
                  {cameraMode === 'dynamic' && '⚡ Dynamic Tilt (Move Cursor)'}
                  {cameraMode === 'flat' && '📄 Flat Frontal View'}
                </span>
                <span className="text-slate-400 text-[10px] hidden sm:inline">Page 1 of 1 • 8.5" × 11"</span>
              </div>
            </div>

            {/* The Resume Document Itself */}
            <div className="p-5 sm:p-7 relative">
              <ShowcaseMockupSheet id={selectedStyle} accentColor={currentStyle.color} embedded={true} />
              {/* Subtle hover prompt */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900/90 text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                <span>Click to open in Studio</span>
                <ArrowRight className="w-3 h-3 text-indigo-400" />
              </div>
            </div>
          </ThreeDTiltCard>

        </div>

        {/* Integrated Studio Window Status Bar */}
        <div className="bg-slate-50 border-t border-slate-200/90 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ATS Score: 99/100
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 hidden sm:inline">100% Machine Parsable Hierarchy (Workday, Taleo, Greenhouse)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="hidden md:inline">
              Typography: {currentStyle.id === 'harvard' ? 'Editorial Garamond Serif' : currentStyle.id === 'jakes' ? 'LaTeX Computer Modern' : 'Inter Sans'}
            </span>
            <span className="text-slate-300 hidden md:inline">•</span>
            <span className="font-mono text-[11px] text-slate-700 font-medium">300 DPI Vector PDF</span>
          </div>
        </div>

      </div>

      {/* Trust & Social Proof Strip */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-1.5">
          <div className="flex text-amber-400">
            {'★'.repeat(5)}
          </div>
          <span className="font-semibold text-slate-800">4.9/5 Rating</span>
          <span>from 10,000+ builders</span>
        </div>
        <div className="h-4 w-px bg-slate-300 hidden sm:block" />
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-600" />
          <span className="font-semibold text-slate-800">100% Client-Side Privacy</span>
        </div>
        <div className="h-4 w-px bg-slate-300 hidden sm:block" />
        <div className="flex items-center gap-2">
          <Download className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-slate-800">Direct Vector PDF Export</span>
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
      id: 'classic-ats',
      name: 'Classic Single-Column ATS Template',
      subName: '(Standard Chronological)',
      tag: 'Universal ATS',
      accentColor: '#0f172a',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
      floatingBadge: '🎯 100% Machine Parsable',
      previewFileName: 'marcus-vance-architect.pdf',
      shortDesc: 'Standard chronological single-column layout engineered for 100% ATS score.',
      fullDesc: 'The #1 universally accepted resume layout worldwide. Recommended by career coaches and recruiters across Fortune 500 corporations, this strict single-column chronological format guarantees 100% keyword extraction in Workday, Taleo, Greenhouse, and Lever.',
      bestFor: ['Fortune 500 Companies', 'Enterprise Corporate Roles', 'Engineering & Operations', 'Universal Job Portals'],
      keyFeatures: [
        '100% machine-parsable linear single-column architecture',
        'Industry-standard section ordering: Experience, Education, Skills',
        'Standard bold headers and bullet hierarchy with zero layout risk',
        'Passes all enterprise Applicant Tracking Systems without text dropping'
      ],
    },
    {
      id: 'harvard',
      name: 'Harvard / Ivy League Resume Template',
      subName: '(Official Ivy League Standard)',
      tag: 'Ivy League',
      accentColor: '#881337',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
      floatingBadge: '🏛️ Ivy League Editorial Standard',
      previewFileName: 'eleanor-vance-law.pdf',
      shortDesc: 'Prestigious editorial serif hierarchy for Law, Finance, Consulting & Academia.',
      fullDesc: 'Designed in accordance with official Harvard Office of Career Services (OCS) and Ivy League standards. Featuring Newsreader editorial serif typography and traditional margins, this layout commands intellectual authority in management consulting, investment banking, corporate law, and academic positions.',
      bestFor: ['Investment Banking & Private Equity', 'Management Consulting (MBB)', 'Corporate Law & Legal', 'Executive Leadership & Academia'],
      keyFeatures: [
        'Prestigious Harvard OCS centered header with tracking-wide small-caps',
        'Academic & professional section hierarchy placing Education & Milestones upfront',
        'Crisp full-width line dividers commanding immediate visual authority',
        'Universally respected by conservative hiring committees & partners'
      ],
    },
    {
      id: 'jakes',
      name: "Jake's Resume Template",
      subName: '(Overleaf / LaTeX standard)',
      tag: '#1 Overleaf Standard',
      accentColor: '#0f172a',
      badgeClass: 'bg-slate-100 text-slate-900 border-slate-400 font-mono',
      floatingBadge: '📐 Authentic LaTeX Standard',
      previewFileName: 'jake-gutierrez-swe.pdf',
      shortDesc: 'The world-famous software engineering resume template from Overleaf and Reddit.',
      fullDesc: "The legendary Jake's Resume (jake-resume), starred by tens of thousands of developers on Overleaf and r/EngineeringResumes. Known for its iconic 2-tier subheadings (Role on left, Dates on right; Company on left, Location on right) and quantified impact bullets.",
      bestFor: ['Software Engineers & CS Graduates', 'Big Tech (FAANG / MANGA)', 'High-Growth Tech Startups', 'Quantitative Developers'],
      keyFeatures: [
        'Authentic Overleaf / LaTeX typography with full-width section rules',
        'Signature 2-tier subheadings maximizing vertical space and readability',
        'Categorized Technical Skills layout (Languages, Frameworks, Developer Tools)',
        'Optimized for impact-driven bullet points: Action Verb + Metric + Result'
      ],
    },
    {
      id: 'deedy',
      name: 'Deedy Resume Template',
      subName: '(Software Engineering standard)',
      tag: 'Silicon Valley Standard',
      accentColor: '#2563eb',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      floatingBadge: '⚡ Iconic 2-Column Asymmetric',
      previewFileName: 'alex-rivera-systems.pdf',
      shortDesc: "Debarghya Das's iconic Cornell & Silicon Valley asymmetric two-column layout.",
      fullDesc: 'Created by Cornell CS alumnus Debarghya Das and battle-tested across Silicon Valley giants like Google, Meta, and Apple. Features an asymmetric 32/68 split that separates links, coursework, and technical skills on the left from extensive engineering projects and professional experience on the right.',
      bestFor: ['Fullstack & Backend Engineers', 'Cornell / Stanford / MIT CS Students', 'Silicon Valley Startups', 'Open Source Maintainers'],
      keyFeatures: [
        'Iconic dual-weight name header (Light First Name + Bold Last Name)',
        'Asymmetric 32% left sidebar for quick stack scanning & educational background',
        'Wide 68% right column for deep technical experience & architecture wins',
        'Distinctive visual identity recognized instantly by top engineering managers'
      ],
    },
    {
      id: 'tech-minimal',
      name: 'Tech Minimalist Single-Page Template',
      subName: '(Dense Single-Page Developer)',
      tag: 'High Density',
      accentColor: '#0d9488',
      badgeClass: 'bg-teal-50 text-teal-700 border-teal-200 font-mono',
      floatingBadge: '💻 Single-Page Space Efficiency',
      previewFileName: 'marcus-chen-cloud.pdf',
      shortDesc: 'Distraction-free high-density single page engineered for modern tech contributors.',
      fullDesc: 'Engineered specifically for developers, cloud/DevOps engineers, and data scientists who need to fit extensive technical projects, contributions, and certifications onto exactly one pristine, clutter-free page with zero wasted margins.',
      bestFor: ['DevOps & Cloud Engineers', 'Data Scientists & ML Engineers', 'Technical Leads', 'Single-Page Advocates'],
      keyFeatures: [
        'Monospace tech badges and repository links for rapid scanning',
        'Ultra-compact padding engineered to fit 100% on a single printed A4 page',
        'Inline technology callouts embedded directly into project milestones',
        'Clean teal accent dividers for modern tech aesthetic without clutter'
      ],
    },
    {
      id: 'modern-clean',
      name: 'Modern Clean Chronological Template',
      subName: '(Contemporary Corporate Standard)',
      tag: 'Corporate & Tech',
      accentColor: '#4f46e5',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      floatingBadge: '✨ Clean Left-Accent Polish',
      previewFileName: 'sarah-jenkins-product.pdf',
      shortDesc: 'Balanced contemporary layout with colored accent markers and clear typography.',
      fullDesc: 'The perfect balance between modern design and strict chronological ATS parsing. Features left-aligned accent pill indicators, Plus Jakarta Sans typography, and clear modular sections suitable for both high-growth startups and established enterprise organizations.',
      bestFor: ['Product Managers', 'Senior Software Engineers', 'Marketing & Sales Leaders', 'Operations Directors'],
      keyFeatures: [
        'Left accent colored indicators for effortless recruiter section navigation',
        'Plus Jakarta Sans contemporary typography with generous readability',
        'Comprehensive support for profile avatar, skills grid, and project highlights',
        'Strictly chronological flow validated across all top enterprise ATS platforms'
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
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-jakarta selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Dynamic Atmospheric Studio Mesh Gradients (Matching the Indigo/Violet/Cyan UI) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Subtle Tech Blueprint Dot Matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.22] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_25%,#000_70%,transparent_100%)]" />

        {/* Primary Top Center Aurora: Soft Indigo & Violet Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[580px] bg-gradient-to-b from-indigo-500/14 via-purple-500/8 to-transparent rounded-full blur-[130px] -translate-y-1/3" />

        {/* Left Side Aurora (Behind Left 3D Torus Knot): Vibrant Cyan / Sky Glow */}
        <div className="absolute top-16 -left-32 w-[680px] h-[680px] bg-gradient-to-tr from-cyan-400/16 via-sky-500/10 to-indigo-500/5 rounded-full blur-[140px]" />

        {/* Right Side Aurora (Behind Right 3D Diamond Icosahedron): Vibrant Violet / Purple Glow */}
        <div className="absolute top-16 -right-32 w-[680px] h-[680px] bg-gradient-to-tl from-purple-500/16 via-violet-500/10 to-indigo-500/5 rounded-full blur-[140px]" />

        {/* Mid-Page Subtle Warm Light (Behind Pipeline & Features) */}
        <div className="absolute top-[1100px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-cyan-400/8 via-indigo-500/8 to-violet-500/8 rounded-full blur-[150px]" />
      </div>

      {/* Whole-Page 3D Spatial Universe (Background layer at z-0) */}
      <ThreeDHeroAnimation />

      {/* Main Page Content (Elevated strictly above 3D WebGL Canvas at z-10) */}
      <div className="relative z-10">
        {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8">
        {/* Ambient Studio Backlight Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-indigo-200/35 via-indigo-100/25 to-slate-200/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5 sm:space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
            Build Resumes That <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 bg-clip-text text-transparent">
              Actually Get Interviews
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Crafted for <strong className="text-slate-900 font-semibold">tech builders</strong> and <strong className="text-slate-900 font-semibold">career professionals</strong>. Real-time split-screen editing, ATS compliance, and 1-click vector PDF export.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-3">
            <button 
              type="button"
              onClick={() => navigate('/builder')}
              className="btn-3d-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm sm:text-base px-7 py-3.5 font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer shadow-lg shadow-indigo-600/25"
            >
              <span>Open Free Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-3d-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm sm:text-base px-7 py-3.5 font-semibold rounded-xl text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>My Saved Resumes</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> No signup required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Instant PDF download
            </span>
          </div>
        </div>

        {/* Live Studio Interactive 3D Workstation Stage */}
        <div className="max-w-6xl mx-auto mt-12 sm:mt-16 relative z-10">
          <HeroStudioPreview onOpenStudio={(tplId) => handleUseTemplate(tplId)} />
        </div>
      </section>

      {/* 3D 3-Step Architectural Pipeline Section */}
      <ThreeDPipelineSection onStartBuilding={() => navigate('/builder')} />

      {/* Alternating Zigzag Templates Showcase */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16 lg:space-y-24">

          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Architectural Template Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Designed for every industry &amp; career stage
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Every layout is engineered to pass enterprise ATS algorithms (Workday, Taleo, Greenhouse) while commanding immediate recruiter engagement.
            </p>

            {/* Quick-Jump Template Switcher Dock */}
            <div className="flex items-center justify-center flex-wrap gap-2 pt-4">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`template-${tpl.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200/90 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 shadow-xs transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 rounded-full transition-transform group-hover:scale-125" style={{ backgroundColor: tpl.accentColor || '#4f46e5' }} />
                  <span>{tpl.name.split(' ')[0]} {tpl.name.split(' ')[1] || ''}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {templates.map((tpl, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  id={`template-${tpl.id}`}
                  key={tpl.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Left Column: High-Impact Executive Storytelling */}
                  <div className={`lg:col-span-6 ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                    <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-[0_12px_35px_-8px_rgba(15,23,42,0.08)] space-y-5 relative">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tpl.badgeClass}`}>
                          {tpl.tag}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>Recruiter Verified</span>
                        </span>
                      </div>

                      {/* Title & Short Catchphrase */}
                      <div className="space-y-1">
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          {tpl.name}
                        </h3>
                        <p className="text-sm sm:text-base font-bold text-indigo-600">
                          {tpl.shortDesc}
                        </p>
                      </div>

                      {/* Detailed narrative */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {tpl.fullDesc}
                      </p>

                      {/* Key Architecture Highlights (4 Structured Micro-Cards) */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Key Architecture Highlights:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {tpl.keyFeatures.map((feat, fIdx) => (
                            <div key={fIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommended For Pills */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                          Recommended For:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {tpl.bestFor.map((item, bIdx) => (
                            <span 
                              key={bIdx} 
                              className="px-2.5 py-1 bg-slate-100/80 hover:bg-slate-200/70 text-slate-700 rounded-lg text-xs font-medium border border-slate-200/80 transition-colors"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <button 
                          type="button"
                          onClick={() => handleUseTemplate(tpl.id)}
                          className="btn-3d-primary px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 text-sm cursor-pointer transition-all hover:gap-3"
                        >
                          <span>Use This Template</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => setSelectedTemplateForModal(tpl)}
                          className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 text-sm cursor-pointer transition-all"
                        >
                          <Eye className="w-4 h-4 text-slate-500" />
                          <span>Quick Look</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Museum-Grade Document Presentation */}
                  <div className={`lg:col-span-6 relative ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                    {/* Ambient Glow */}
                    <div 
                      className="absolute -inset-4 rounded-3xl opacity-25 blur-2xl pointer-events-none transition-all duration-500"
                      style={{ background: `radial-gradient(circle, ${tpl.accentColor || '#6366f1'} 0%, transparent 70%)` }}
                    />

                    {/* Document Presentation Card */}
                    <div 
                      onClick={() => setSelectedTemplateForModal(tpl)}
                      className="relative rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.14),0_0_0_1px_rgba(15,23,42,0.05)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_65px_-12px_rgba(15,23,42,0.22)] hover:-translate-y-1 cursor-pointer group"
                    >
                      {/* Document Top Strip */}
                      <div className="px-5 py-3 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tpl.accentColor || '#4f46e5' }} />
                          <span className="font-mono text-[11px] text-slate-700 font-medium">{tpl.previewFileName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>100% ATS Parsable</span>
                        </div>
                      </div>

                      {/* The Resume Sheet Area with Interactive Hover Layer */}
                      <div className="p-5 sm:p-7 relative bg-white">
                        <ShowcaseMockupSheet id={tpl.id} accentColor={tpl.accentColor} embedded={true} />

                        {/* Hover Overlay with Action Buttons */}
                        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 p-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUseTemplate(tpl.id);
                            }}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xl flex items-center gap-2 text-xs transition-all hover:scale-105 cursor-pointer"
                          >
                            <span>Use Template</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTemplateForModal(tpl);
                            }}
                            className="px-4 py-2.5 bg-white/95 hover:bg-white text-slate-800 font-bold rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-1.5 text-xs transition-all hover:scale-105 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Quick Look</span>
                          </button>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 relative z-10">
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

        {/* 4 Crisp Feature Highlights (Solid, Opaque White with 0% Background Bleed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md hover:border-indigo-300 hover:shadow-xl transition-all flex flex-col justify-between group relative z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs group-hover:scale-110 transition-transform">
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

            <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
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

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group relative z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs group-hover:scale-110 transition-transform">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  ATS Verified
                </span>
              </div>

              {/* Micro Visual Pill */}
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Taleo &amp; Workday
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

            <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
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

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col justify-between group relative z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs group-hover:scale-110 transition-transform">
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
                <h3 className="font-extrabold text-slate-900 text-base mb-1">Vector PDF &amp; Print</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Download crisp vector PDFs with standard A4 margins that never blur on retina screens or prints.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Selectable font curves</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Unbranded &amp; Free</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md hover:border-purple-300 hover:shadow-xl transition-all flex flex-col justify-between group relative z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-xs group-hover:scale-110 transition-transform">
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

            <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
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

        {/* 3D Cosmic Spatial CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 text-center sm:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-300 text-xs font-bold">
              <span>🚀 100% Free Lifetime Studio</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to create your interview-winning resume?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Free to use, zero signup required. Pick a 3D architectural blueprint and start building.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/builder')}
            className="btn-3d-primary relative z-10 shrink-0 w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Building Now — Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-xs text-slate-500 bg-transparent">
        ResumeCraft — Build, customize, and export career-ready resumes in seconds.
        Prefect for tech builders, product managers, and career professionals.&copy; 2026 ResumeCraft. All rights reserved.  
      </footer>
      </div>

    </div>
  );
}
