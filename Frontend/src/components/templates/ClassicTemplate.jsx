import React from 'react';
import { ExternalLink, Award, Languages as LangIcon } from 'lucide-react';

export default function ClassicTemplate({ resumeData }) {
  const { personalInfo, skills, experiences, education, projects, certifications, languages, theme, sectionVisibility } = resumeData;
  const accentColor = theme.accentColor || '#1e293b';

  return (
    <div className="bg-transparent text-slate-900 p-10 min-h-[1123px] w-[794px] font-editorial text-[13px] leading-relaxed">

      {/* Wall Street Ivy League Classic Header */}
      {sectionVisibility?.personalInfo && (
        <header className="text-center border-b-2 pb-4 mb-4" style={{ borderColor: accentColor }}>
          {personalInfo.avatar && personalInfo.showAvatar && (
            <div className="flex justify-center mb-3">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.fullName}
                className="w-16 h-16 rounded-full object-cover shadow-sm border-2"
                style={{ borderColor: accentColor }}
              />
            </div>
          )}
          <h1 className="text-3xl font-bold uppercase tracking-wider text-slate-900 font-editorial">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          <p className="text-sm italic text-slate-700 mt-1" style={{ color: accentColor }}>
            {personalInfo.jobTitle || 'Professional Title'}
          </p>

          <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-slate-700 font-sans">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.location && personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span>•</span>}
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.linkedin && <span>•</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>•</span>}
            {personalInfo.website && <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          </div>
        </header>
      )}

      {/* Summary */}
      {sectionVisibility?.summary && personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-2 font-sans" style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Executive Summary
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed text-[12.5px]">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {sectionVisibility?.experiences && experiences && experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-2 font-sans" style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span className="text-[13.5px]">{exp.company}</span>
                  <span className="font-normal italic text-slate-600 text-xs">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700 italic text-xs mb-1">
                  <span>{exp.jobTitle}</span>
                  <span>{exp.location}</span>
                </div>
                <p className="text-slate-800 whitespace-pre-line leading-relaxed text-[12px]">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sectionVisibility?.education && education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-2 font-sans" style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.institution}</span>, {edu.location}
                  <div className="italic text-slate-700 text-xs">
                    {edu.degree} {edu.score && `— ${edu.score}`}
                  </div>
                </div>
                <div className="text-xs italic text-slate-600">
                  {edu.startDate} – {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {sectionVisibility?.projects && projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-2 font-sans" style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Select Projects & Publications
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-slate-900 text-xs">
                  <span className="flex items-center gap-1">
                    {proj.title}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-800 inline-flex">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </span>
                  {proj.technologies && (
                    <span className="italic font-normal text-slate-600 text-[11px]">
                      {proj.technologies}
                    </span>
                  )}
                </div>
                <p className="text-slate-800 leading-relaxed text-[12px]">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {sectionVisibility?.skills && skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-1.5 font-sans" style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Skills & Competencies
          </h2>
          <p className="text-slate-800 leading-relaxed text-xs">
            {skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {sectionVisibility?.certifications && certifications && certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-2 font-sans" style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Certifications & Honors
          </h2>
          <div className="space-y-1 text-xs">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span><strong>{cert.name}</strong> — {cert.issuer}</span>
                {cert.date && <span className="text-slate-500 italic text-[11px]">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {sectionVisibility?.languages && languages && languages.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-1.5 font-sans" style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Languages
          </h2>
          <p className="text-slate-800 leading-relaxed text-xs">
            {languages.map(l => `${l.name} (${l.proficiency})`).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
}
