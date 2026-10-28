import React from 'react';

/**
 * Classic Single-Column ATS Template (Standard Chronological)
 * The #1 universal ATS layout engineered for 100% pass rate in Workday, Taleo, Greenhouse & Lever.
 */
export default function ClassicAtsTemplate({ resumeData }) {
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

  const accentColor = theme.accentColor || '#0f172a';

  return (
    <div className="bg-transparent text-slate-900 p-8 sm:p-10 min-h-[1123px] w-[794px] text-[12px] leading-normal selection:bg-slate-200">
      
      {/* Centered ATS Clean Header */}
      {sectionVisibility?.personalInfo !== false && (
        <header className="text-center pb-3 mb-4 border-b-2 border-slate-900">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-slate-900">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          
          {personalInfo.jobTitle && (
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mt-1">
              {personalInfo.jobTitle}
            </p>
          )}

          <div className="flex justify-center flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-[11px] text-slate-700">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.location && personalInfo.phone && <span className="text-slate-400">•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span className="text-slate-400">•</span>}
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="text-slate-900 underline underline-offset-2">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.linkedin && <span className="text-slate-400">•</span>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-900 underline underline-offset-2">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
            {personalInfo.github && <span className="text-slate-400">•</span>}
            {personalInfo.github && (
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="text-slate-900 underline underline-offset-2">
                {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
            {personalInfo.website && <span className="text-slate-400">•</span>}
            {personalInfo.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="text-slate-900 underline underline-offset-2">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
          </div>
        </header>
      )}

      {/* Professional Summary */}
      {sectionVisibility?.summary !== false && personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5">
            Professional Summary
          </h2>
          <p className="text-slate-800 text-[11.5px] leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {sectionVisibility?.experiences !== false && experiences && experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                {/* Line 1: Job Title & Dates */}
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12.5px] text-slate-900">
                    {exp.position}
                  </span>
                  <span className="text-[11px] font-medium text-slate-700">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                {/* Line 2: Company & Location */}
                <div className="flex justify-between items-baseline text-[11px] text-slate-700 italic">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>

                {/* Bullet Points */}
                {exp.highlights && exp.highlights.length > 0 ? (
                  <ul className="list-disc list-outside ml-4 text-[11.5px] text-slate-800 space-y-0.5 leading-snug">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx} className="pl-0.5">{bullet}</li>
                    ))}
                  </ul>
                ) : exp.description ? (
                  <p className="text-[11.5px] text-slate-800 leading-snug pl-0.5">
                    {exp.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sectionVisibility?.education !== false && education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2.5">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12px] text-slate-900">
                    {edu.institution}
                  </span>
                  <span className="text-[11px] text-slate-700">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-[11.5px] text-slate-700 italic">
                  <span>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
                {edu.honors && (
                  <p className="text-[10.5px] text-slate-600">Honors: {edu.honors}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical & Professional Skills */}
      {sectionVisibility?.skills !== false && skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5">
            Skills &amp; Competencies
          </h2>
          <p className="text-[11.5px] text-slate-800 leading-relaxed">
            {skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {sectionVisibility?.projects !== false && projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
            Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[12px] text-slate-900">{proj.name}</span>
                    {proj.technologies && (
                      <span className="text-[10.5px] text-slate-600 italic">
                        | {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[10.5px] text-slate-800 underline">
                      {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-[11.5px] text-slate-800 leading-snug">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {sectionVisibility?.certifications !== false && certifications && certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between text-[11.5px]">
                <div>
                  <strong className="text-slate-900">{cert.name}</strong>
                  {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                </div>
                {cert.date && <span className="text-slate-600 text-[11px]">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {sectionVisibility?.languages !== false && languages && languages.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5">
            Languages
          </h2>
          <p className="text-[11.5px] text-slate-800">
            {languages.map(l => `${l.name}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' • ')}
          </p>
        </section>
      )}

    </div>
  );
}
