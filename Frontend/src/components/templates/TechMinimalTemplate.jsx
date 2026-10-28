import React from 'react';

/**
 * Tech Minimalist Single-Page Template
 * Engineered for software developers, cloud architects, and tech innovators.
 * Ultra-crisp typography, monospace technical callouts, and dense single-page space efficiency.
 */
export default function TechMinimalTemplate({ resumeData }) {
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

  const accentColor = theme.accentColor || '#0d9488'; // Clean Tech Teal

  return (
    <div className="bg-transparent text-slate-800 p-8 sm:p-9 min-h-[1123px] w-[794px] font-sans text-[11px] leading-snug selection:bg-teal-100">
      
      {/* Centered Minimalist Header */}
      {sectionVisibility?.personalInfo !== false && (
        <header className="text-center pb-3 mb-3 border-b-2" style={{ borderColor: accentColor }}>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          
          {personalInfo.jobTitle && (
            <p className="text-xs font-semibold mt-0.5 tracking-wide" style={{ color: accentColor }}>
              {personalInfo.jobTitle}
            </p>
          )}

          <div className="flex justify-center flex-wrap items-center gap-x-2.5 gap-y-1 mt-1.5 text-[10.5px] text-slate-600 font-mono">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.location && personalInfo.phone && <span className="text-slate-300">/</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span className="text-slate-300">/</span>}
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="text-slate-800 hover:text-teal-700">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.linkedin && <span className="text-slate-300">/</span>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-800 hover:text-teal-700">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
            {personalInfo.github && <span className="text-slate-300">/</span>}
            {personalInfo.github && (
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="text-slate-800 hover:text-teal-700">
                {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
          </div>
        </header>
      )}

      {/* Summary */}
      {sectionVisibility?.summary !== false && personalInfo.summary && (
        <section className="mb-3">
          <p className="text-slate-700 text-[11px] leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Technical Skills - High Density Pill Cloud */}
      {sectionVisibility?.skills !== false && skills && skills.length > 0 && (
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Technical Stack
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="flex flex-wrap gap-1 font-mono text-[10px]">
            {skills.map((skill, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200/80 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {sectionVisibility?.experiences !== false && experiences && experiences.length > 0 && (
        <section className="mb-3.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Work Experience
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-2.5">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-baseline gap-1.5">
                    <strong className="text-[11.5px] font-bold text-slate-900">
                      {exp.position}
                    </strong>
                    <span className="text-slate-600 text-[11px]">
                      @ {exp.company}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                {exp.highlights && exp.highlights.length > 0 ? (
                  <ul className="list-disc list-outside ml-3.5 text-[10.5px] text-slate-700 space-y-0.5 leading-snug">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx} className="pl-0.5">{bullet}</li>
                    ))}
                  </ul>
                ) : exp.description ? (
                  <p className="text-[10.5px] text-slate-700 leading-snug pl-0.5">
                    {exp.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {sectionVisibility?.projects !== false && projects && projects.length > 0 && (
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Key Projects
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-baseline gap-1.5">
                    <strong className="text-[11px] font-bold text-slate-900">{proj.name}</strong>
                    {proj.technologies && (
                      <span className="text-[9.5px] font-mono text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200/50">
                        {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[9.5px] font-mono text-slate-600 hover:text-teal-700 underline">
                      {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-[10.5px] text-slate-700 leading-snug">
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
        <section className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Education
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="space-y-1">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-[10.5px]">
                <div>
                  <strong className="text-slate-900">{edu.institution}</strong>
                  <span className="text-slate-600"> — {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</span>
                  {edu.gpa && <span className="text-slate-500 font-mono text-[10px]"> (GPA: {edu.gpa})</span>}
                </div>
                <span className="text-slate-500 font-mono text-[10px]">{edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages in compact row */}
      {((sectionVisibility?.certifications !== false && certifications.length > 0) || (sectionVisibility?.languages !== false && languages.length > 0)) && (
        <section className="pt-1 border-t border-slate-200 flex justify-between gap-4 text-[10.5px]">
          {certifications.length > 0 && (
            <div>
              <span className="font-bold font-mono text-slate-900">Certifications: </span>
              <span className="text-slate-700">{certifications.map(c => c.name).join(' • ')}</span>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <span className="font-bold font-mono text-slate-900">Languages: </span>
              <span className="text-slate-700">{languages.map(l => l.name).join(' • ')}</span>
            </div>
          )}
        </section>
      )}

    </div>
  );
}
