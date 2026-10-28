import React from 'react';

/**
 * Modern Clean Chronological Template
 * Modern corporate and technology standard.
 * Features left accent color indicators, clean typography hierarchy, and flawless ATS parsing.
 */
export default function ModernCleanTemplate({ resumeData }) {
  const { 
    personalInfo = {}, 
    skills = [], 
    experiences = [], 
    education = [], 
    projects = [], 
    certifications = [], 
    languages = [], 
    theme = {}, 
    sectionVisibility = {} 
  } = resumeData || {};

  const accentColor = theme.accentColor || '#4f46e5'; // Modern Indigo

  return (
    <div className="bg-transparent text-slate-800 p-8 sm:p-10 min-h-[1123px] w-[794px] font-sans text-[12px] leading-relaxed selection:bg-indigo-100">
      
      {/* Header */}
      {sectionVisibility?.personalInfo !== false && (
        <header className="border-b-2 pb-4 mb-4" style={{ borderColor: accentColor }}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900" style={{ color: accentColor }}>
                {personalInfo.fullName || 'Candidate Name'}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-sm font-semibold text-slate-700 mt-0.5">
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>
            
            {personalInfo.avatar && personalInfo.showAvatar && (
              <img
                src={personalInfo.avatar}
                alt={personalInfo.fullName}
                className="w-16 h-16 rounded-xl object-cover border-2 shadow-xs"
                style={{ borderColor: accentColor }}
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <span>✉</span>
                <a href={`mailto:${personalInfo.email}`} className="text-slate-800 hover:underline">
                  {personalInfo.email}
                </a>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <span>☎</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <span>📍</span> {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <span>🔗</span>
                <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <span>⚡</span>
                <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </span>
            )}
          </div>
        </header>
      )}

      {/* Professional Summary */}
      {sectionVisibility?.summary !== false && personalInfo.summary && (
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Professional Summary
            </h2>
          </div>
          <p className="text-slate-700 text-[11.5px] leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {sectionVisibility?.experiences !== false && experiences && experiences.length > 0 && (
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Work Experience
            </h2>
          </div>

          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <div>
                    <strong className="text-[12.5px] font-bold text-slate-900">
                      {exp.position}
                    </strong>
                    <span className="text-slate-600 text-xs font-medium"> — {exp.company}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                {exp.location && (
                  <div className="text-[10.5px] text-slate-500 italic">{exp.location}</div>
                )}

                {exp.highlights && exp.highlights.length > 0 ? (
                  <ul className="list-disc list-outside ml-4 text-[11.5px] text-slate-700 space-y-0.5 leading-snug">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx} className="pl-0.5">{bullet}</li>
                    ))}
                  </ul>
                ) : exp.description ? (
                  <p className="text-[11.5px] text-slate-700 leading-snug pl-0.5">
                    {exp.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Competencies / Skills */}
      {sectionVisibility?.skills !== false && skills && skills.length > 0 && (
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Skills &amp; Technologies
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-800 text-[11px] font-medium border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {sectionVisibility?.projects !== false && projects && projects.length > 0 && (
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Key Projects
            </h2>
          </div>

          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-2">
                    <strong className="text-[12px] font-bold text-slate-900">{proj.name}</strong>
                    {proj.technologies && (
                      <span className="text-[10.5px] text-slate-500 italic">
                        ({Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies})
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline">
                      Project Link ↗
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-[11.5px] text-slate-700 leading-snug">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sectionVisibility?.education !== false && education && education.length > 0 && (
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Education
            </h2>
          </div>

          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-[11.5px]">
                <div>
                  <strong className="text-slate-900">{edu.institution}</strong>
                  <span className="text-slate-600"> — {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                  {edu.gpa && <span className="text-slate-500 text-xs"> (GPA: {edu.gpa})</span>}
                </div>
                <span className="text-xs text-slate-500">{edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {sectionVisibility?.certifications !== false && certifications && certifications.length > 0 && (
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Certifications
            </h2>
          </div>
          <div className="space-y-1 text-[11.5px]">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between">
                <span><strong className="text-slate-900">{c.name}</strong> {c.issuer ? `— ${c.issuer}` : ''}</span>
                {c.date && <span className="text-slate-500 text-xs">{c.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
