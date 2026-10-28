import React from 'react';
import { Layers, Sliders, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ThreeDPipelineSection({ onStartBuilding }) {
  const steps = [
    {
      num: '01',
      title: 'Choose ATS Architecture',
      subtitle: 'Universal Recruiter Tested',
      desc: 'Pick from 6 proven architectural layouts designed for Stanford, Harvard, and Silicon Valley tech standards.',
      icon: Layers,
      color: 'from-indigo-500 to-indigo-600',
      shadowColor: 'rgba(99, 102, 241, 0.25)',
      badge: 'Step 01',
      tag: '6 Blueprint Layouts',
    },
    {
      num: '02',
      title: 'Dual-Sync Live Studio',
      subtitle: 'Real-Time DOM Synchronization',
      desc: 'Type your career milestones on the left while the vector document formats synchronously with zero lag.',
      icon: Sliders,
      color: 'from-purple-500 to-purple-600',
      shadowColor: 'rgba(168, 85, 247, 0.25)',
      badge: 'Step 02',
      tag: 'Instant Live Mirror',
    },
    {
      num: '03',
      title: 'Vector PDF & Print',
      subtitle: '100% Free & Lossless',
      desc: 'Export high-fidelity 300 DPI vector PDFs with standard A4 margins that pass all ATS parsing filters.',
      icon: Download,
      color: 'from-emerald-500 to-teal-500',
      shadowColor: 'rgba(16, 185, 129, 0.25)',
      badge: 'Step 03',
      tag: 'Taleo & Workday Ready',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
          <span>⚡ 3-Step Workflow</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Engineered for effortless resume creation
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          From blank slate to recruiter-ready resume in three fluid, interactive steps.
        </p>
      </div>

      {/* Pipeline Cards Grid - Solid Opaque White Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="relative rounded-2xl bg-white border border-slate-200/90 p-7 shadow-md hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group z-10"
            >
              <div className="space-y-5">
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between">
                  <div 
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300`}
                    style={{
                      boxShadow: `0 12px 24px -5px ${step.shadowColor}`,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-3xl font-black text-slate-200 font-mono select-none">
                    {step.num}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1">
                    {step.tag}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {step.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Feature Pill */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" /> Zero friction
                </span>
                <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
