import React from 'react';
import { Mail, Phone, MapPin, Globe, Link2, Code, ExternalLink, Award, Languages as LangIcon } from 'lucide-react';

export default function CompactTemplate({ resumeData }) {
  const { personalInfo, skills, experiences, education, projects, certifications, languages, theme, sectionVisibility } = resumeData;
  const accentColor = theme.accentColor || '#047857';

  return (
    <div className="bg-transparent text-slate-900 p-6 min-h-[1123px] w-[794px] font-mono text-[11px] leading-snug">
      {/* Tech Top Header */}
      {sectionVisibility?.personalInfo && (
        <header className="border-b pb-3 mb-3 flex items-start gap-4" style={{ borderColor: accentColor }}>
          {personalInfo.avatar && personalInfo.showAvatar && (
            <img
              src={personalInfo.avatar}
              alt={personalInfo.fullName}
              className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-300 shadow-xs"
            />
          )}

          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <h1 className="text-xl font-bold tracking-tight uppercase" style={{ color: accentColor }}>
                {personalInfo.fullName || 'YOUR NAME'}
              </h1>
              <span className="text-xs text-slate-600 font-sans font-medium">
                {personalInfo.jobTitle || 'TECH ROLE'}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-slate-600">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>| {personalInfo.phone}</span>}
              {personalInfo.location && <span>| {personalInfo.location}</span>}
              {personalInfo.website && <span>| {personalInfo.website}</span>}
              {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
              {personalInfo.github && <span>| {personalInfo.github}</span>}
            </div>
          </div>
        </header>
      )}

      {/* Summary */}
      {sectionVisibility?.summary && personalInfo.summary && (
        <section className="mb-3">
          <p className="text-slate-700 font-sans text-xs leading-normal">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {sectionVisibility?.skills && skills && skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
            // TECHNICAL_SKILLS
          </h2>
          <div className="text-[10.5px] text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
            {skills.join(' • ')}
          </div>
        </section>
      )}

      {/* Experience */}
      {sectionVisibility?.experiences && experiences && experiences.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
            // WORK_EXPERIENCE
          </h2>
          <div className="space-y-2.5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.jobTitle} @ {exp.company}</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 italic mb-1">{exp.location}</div>
                <p className="text-slate-700 whitespace-pre-line font-sans text-[11px] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {sectionVisibility?.projects && projects && projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
            // PROJECTS
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold">
                  <span className="flex items-center gap-1">
                    {proj.title}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-emerald-700">
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </span>
                  {proj.technologies && (
                    <span className="text-[10px] text-slate-500 font-normal">
                      [{proj.technologies}]
                    </span>
                  )}
                </div>
                <p className="text-slate-700 font-sans text-[11px] leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sectionVisibility?.education && education && education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
            // EDUCATION
          </h2>
          <div className="space-y-1">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{edu.degree}</span>, {edu.institution}
                  {edu.score && <span className="text-slate-500 text-[10px]"> ({edu.score})</span>}
                </div>
                <div className="text-slate-500 text-[10px]">
                  {edu.startDate} – {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {sectionVisibility?.certifications && certifications && certifications.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
            // CERTIFICATIONS
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span>{cert.name} [{cert.issuer}]</span>
                {cert.date && <span className="text-slate-500 text-[10px]">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {sectionVisibility?.languages && languages && languages.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
            // LANGUAGES
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-700">
            {languages.map((lang) => (
              <span key={lang.id}>
                {lang.name}: <span className="text-slate-500">{lang.proficiency}</span>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
