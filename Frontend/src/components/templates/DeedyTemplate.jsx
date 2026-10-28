import React from 'react';

/**
 * Deedy Resume Template (Software Engineering standard)
 * Designed after Debarghya Das's iconic Cornell / Silicon Valley two-column LaTeX layout.
 * Features an asymmetric 32/68 split separating academic / technical credentials from high-impact engineering accomplishments.
 */
export default function DeedyTemplate({ resumeData }) {
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

  const accentColor = theme.accentColor || '#2563eb';

  // Split full name into first and last name for Deedy's signature dual-weight typography
  const nameParts = (personalInfo.fullName || 'Alex Rivera').trim().split(' ');
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

  return (
    <div className="bg-transparent text-slate-900 p-7 sm:p-8 min-h-[1123px] w-[794px] font-sans text-[11px] leading-snug selection:bg-blue-100">
      
      {/* 2-Column Asymmetric Grid Layout */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT COLUMN (33% / 4 cols): Credentials & Stack ================= */}
        <aside className="col-span-4 space-y-4 border-r border-slate-200 pr-5">
          
          {/* Education */}
          {sectionVisibility?.education !== false && education && education.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 border-b-2 pb-0.5" style={{ borderColor: accentColor }}>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5 text-[10.5px]">
                  <div className="font-bold text-slate-900 text-[11px]">{edu.institution}</div>
                  <div className="text-slate-700 italic">
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}
                  </div>
                  {edu.gpa && (
                    <div className="text-slate-600 font-medium">Cum. GPA: {edu.gpa}</div>
                  )}
                  {edu.honors && (
                    <div className="text-[9.5px] text-slate-500 mt-0.5 italic">{edu.honors}</div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Links & Socials */}
          {sectionVisibility?.personalInfo !== false && (
            <section className="space-y-1.5">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 border-b-2 pb-0.5" style={{ borderColor: accentColor }}>
                Links
              </h2>
              <div className="space-y-1 text-[10.5px] text-slate-700">
                {personalInfo.github && (
                  <div>
                    <span className="font-bold text-slate-900">GitHub:// </span>
                    <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                    </a>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div>
                    <span className="font-bold text-slate-900">LinkedIn:// </span>
                    <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                    </a>
                  </div>
                )}
                {personalInfo.website && (
                  <div>
                    <span className="font-bold text-slate-900">Web:// </span>
                    <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Skills (Deedy bullet format) */}
          {sectionVisibility?.skills !== false && skills && skills.length > 0 && (
            <section className="space-y-1.5">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 border-b-2 pb-0.5" style={{ borderColor: accentColor }}>
                Skills
              </h2>
              <div className="space-y-1 text-[10.5px] text-slate-700 leading-snug">
                <div className="font-bold text-slate-800 text-[10px] uppercase tracking-wider">
                  Proficiencies &amp; Stack:
                </div>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Certifications */}
          {sectionVisibility?.certifications !== false && certifications && certifications.length > 0 && (
            <section className="space-y-1.5">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 border-b-2 pb-0.5" style={{ borderColor: accentColor }}>
                Certifications
              </h2>
              <div className="space-y-1 text-[10px] text-slate-700">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <strong className="text-slate-900 block">{c.name}</strong>
                    <span className="text-slate-500">{c.issuer} {c.date ? `(${c.date})` : ''}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {sectionVisibility?.languages !== false && languages && languages.length > 0 && (
            <section className="space-y-1">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 border-b-2 pb-0.5" style={{ borderColor: accentColor }}>
                Languages
              </h2>
              <div className="text-[10px] text-slate-700 space-y-0.5">
                {languages.map((l) => (
                  <div key={l.name} className="flex justify-between">
                    <span className="font-medium text-slate-900">{l.name}</span>
                    <span className="text-slate-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </aside>

        {/* ================= RIGHT COLUMN (67% / 8 cols): Experience & Impact ================= */}
        <main className="col-span-8 space-y-4">
          
          {/* Deedy's Signature Dual-Weight Header */}
          {sectionVisibility?.personalInfo !== false && (
            <header className="border-b border-slate-200 pb-2">
              <div className="text-3xl font-light tracking-tight text-slate-500 uppercase">
                {firstName}{' '}
                <span className="font-extrabold text-slate-900 tracking-tight" style={{ color: accentColor }}>
                  {lastName}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 mt-1 text-[10.5px] text-slate-600">
                {personalInfo.location && <span>{personalInfo.location}</span>}
                {personalInfo.location && personalInfo.phone && <span>•</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.phone && personalInfo.email && <span>•</span>}
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="text-slate-800 underline">
                    {personalInfo.email}
                  </a>
                )}
              </div>
            </header>
          )}

          {/* Summary / Objective */}
          {sectionVisibility?.summary !== false && personalInfo.summary && (
            <section className="space-y-1">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 border-b pb-0.5" style={{ borderColor: accentColor }}>
                Profile
              </h2>
              <p className="text-[11px] text-slate-700 leading-normal text-justify">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {sectionVisibility?.experiences !== false && experiences && experiences.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 border-b pb-0.5" style={{ borderColor: accentColor }}>
                Experience
              </h2>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-baseline gap-1.5">
                        <strong className="text-[12px] font-bold text-slate-900 uppercase">
                          {exp.company}
                        </strong>
                        <span className="text-[11px] font-semibold text-slate-700">
                          | {exp.position}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.location && (
                      <div className="text-[10px] text-slate-500 italic">{exp.location}</div>
                    )}
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
            <section className="space-y-2">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 border-b pb-0.5" style={{ borderColor: accentColor }}>
                Selected Projects
              </h2>
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-baseline gap-1.5">
                        <strong className="text-[11.5px] font-bold text-slate-900">
                          {proj.name}
                        </strong>
                        {proj.technologies && (
                          <span className="text-[10px] text-slate-500 italic">
                            | {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                          </span>
                        )}
                      </div>
                      {proj.link && (
                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline">
                          View Project ↗
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

        </main>

      </div>
    </div>
  );
}
