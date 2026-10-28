import React from 'react';

/**
 * Harvard / Ivy League Resume Template
 * Modeled after the official Harvard Office of Career Services (OCS) and Ivy League standards.
 * Premium editorial serif typography, high intellectual authority for Law, Finance, Consulting & Academia.
 */
export default function HarvardTemplate({ resumeData }) {
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

  const accentColor = theme.accentColor || '#881337'; // Classic Harvard Crimson

  return (
    <div className="bg-transparent text-slate-900 p-8 sm:p-11 min-h-[1123px] w-[794px] font-editorial text-[12.5px] leading-relaxed selection:bg-rose-100">
      
      {/* Harvard Classic Centered Header */}
      {sectionVisibility?.personalInfo !== false && (
        <header className="text-center pb-2.5 mb-3.5 border-b-2" style={{ borderColor: accentColor }}>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-slate-900 font-editorial">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          
          <div className="flex justify-center flex-wrap items-center gap-x-2.5 gap-y-1 mt-1.5 text-[11px] text-slate-700 font-sans">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.location && personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span>•</span>}
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="text-slate-900 hover:underline">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.linkedin && <span>•</span>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
            {personalInfo.website && <span>•</span>}
            {personalInfo.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
          </div>
        </header>
      )}

      {/* Summary (if present) */}
      {sectionVisibility?.summary !== false && personalInfo.summary && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-0.5 mb-1.5 font-sans" style={{ borderColor: `${accentColor}80` }}>
            Executive Summary
          </h2>
          <p className="text-slate-800 text-[12px] leading-relaxed text-justify font-editorial">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Education (Harvard Standard: Education at Top) */}
      {sectionVisibility?.education !== false && education && education.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-0.5 mb-2 font-sans" style={{ borderColor: `${accentColor}80` }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <strong className="text-slate-900 text-[13px] font-bold font-editorial">
                      {edu.institution}
                    </strong>
                    {edu.location && <span className="text-slate-600 text-xs italic">, {edu.location}</span>}
                  </div>
                  <span className="text-xs text-slate-600 font-sans">
                    {edu.endDate || edu.startDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-slate-700 italic">
                  <span>
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </span>
                  {edu.gpa && <span className="font-sans not-italic text-[11px]">GPA: {edu.gpa}</span>}
                </div>
                {edu.honors && (
                  <p className="text-[11.5px] text-slate-700 italic">
                    Honors &amp; Awards: {edu.honors}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {sectionVisibility?.experiences !== false && experiences && experiences.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-0.5 mb-2 font-sans" style={{ borderColor: `${accentColor}80` }}>
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-0.5">
                {/* Organization & Location on Right */}
                <div className="flex justify-between items-baseline">
                  <div>
                    <strong className="text-slate-900 text-[13px] font-bold font-editorial uppercase tracking-tight">
                      {exp.company}
                    </strong>
                    {exp.location && <span className="text-slate-600 text-xs italic">, {exp.location}</span>}
                  </div>
                  <span className="text-xs text-slate-600 font-sans">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                {/* Role / Title */}
                <div className="text-xs italic text-slate-800">
                  {exp.position}
                </div>

                {/* Bullets */}
                {exp.highlights && exp.highlights.length > 0 ? (
                  <ul className="list-disc list-outside ml-4 text-[12px] text-slate-800 space-y-0.5 leading-snug">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx} className="pl-0.5 font-editorial">{bullet}</li>
                    ))}
                  </ul>
                ) : exp.description ? (
                  <p className="text-[12px] text-slate-800 leading-snug pl-0.5 font-editorial">
                    {exp.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects / Leadership */}
      {sectionVisibility?.projects !== false && projects && projects.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-0.5 mb-2 font-sans" style={{ borderColor: `${accentColor}80` }}>
            Leadership, Projects &amp; Initiatives
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <strong className="text-slate-900 text-[12.5px] font-bold">{proj.name}</strong>
                    {proj.technologies && (
                      <span className="text-slate-600 text-xs italic"> — {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}</span>
                    )}
                  </div>
                  {proj.link && (
                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-slate-700 underline font-sans">
                      {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-[12px] text-slate-800 leading-snug font-editorial">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Additional Interests */}
      {sectionVisibility?.skills !== false && skills && skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-0.5 mb-1.5 font-sans" style={{ borderColor: `${accentColor}80` }}>
            Skills &amp; Interests
          </h2>
          <div className="text-[12px] text-slate-800 space-y-0.5 font-editorial">
            <div>
              <strong className="font-sans text-[11px] uppercase tracking-wider text-slate-700">Competencies: </strong>
              <span>{skills.join(', ')}</span>
            </div>
            {languages && languages.length > 0 && (
              <div>
                <strong className="font-sans text-[11px] uppercase tracking-wider text-slate-700">Languages: </strong>
                <span>{languages.map(l => `${l.name}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Certifications */}
      {sectionVisibility?.certifications !== false && certifications && certifications.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-0.5 mb-1.5 font-sans" style={{ borderColor: `${accentColor}80` }}>
            Credentials &amp; Honors
          </h2>
          <div className="space-y-1 text-[12px]">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <div>
                  <strong className="text-slate-900">{cert.name}</strong>
                  {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                </div>
                {cert.date && <span className="text-slate-600 text-xs font-sans">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
