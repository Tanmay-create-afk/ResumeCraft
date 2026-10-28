import React from 'react';
import { ExternalLink, Award, Languages as LangIcon } from 'lucide-react';

export default function MinimalTemplate({ resumeData }) {
  const { personalInfo, skills, experiences, education, projects, certifications, languages, theme, sectionVisibility } = resumeData;
  const accentColor = theme.accentColor || '#0d9488';

  return (
    <div className="bg-transparent text-slate-900 p-8 min-h-[1123px] w-[794px] text-xs leading-relaxed">

      {/* Centered Minimal Header */}
      {sectionVisibility?.personalInfo && (
        <div className="text-center pb-4 border-b-2" style={{ borderColor: accentColor }}>
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
          <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm font-medium mt-0.5" style={{ color: accentColor }}>
            {personalInfo.jobTitle || 'Professional Title'}
          </p>

          <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-slate-600">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span>•</span>}
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.location && <span>•</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>•</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>•</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {sectionVisibility?.summary && personalInfo.summary && (
        <section className="mt-4">
          <p className="text-[12px] leading-relaxed text-slate-700 text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {sectionVisibility?.experiences && experiences && experiences.length > 0 && (
        <section className="mt-4">
          <h2
            className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-2"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{exp.jobTitle}, {exp.company}</span>
                  <span className="font-normal italic text-slate-600">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] italic text-slate-600 mb-0.5">{exp.location}</div>
                <p className="text-slate-700 whitespace-pre-line leading-normal">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {sectionVisibility?.projects && projects && projects.length > 0 && (
        <section className="mt-4">
          <h2
            className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-2"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold">
                  <span>{proj.title}</span>
                  {proj.link && <span className="font-normal text-slate-500 text-[11px]">{proj.link}</span>}
                </div>
                {proj.technologies && (
                  <p className="italic text-slate-600 text-[11px]">
                    Technologies: {proj.technologies}
                  </p>
                )}
                <p className="text-slate-700 leading-normal">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sectionVisibility?.education && education && education.length > 0 && (
        <section className="mt-4">
          <h2
            className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-2"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{edu.degree}</span> – {edu.institution}
                  {edu.score && <span className="text-slate-600 italic"> ({edu.score})</span>}
                </div>
                <div className="text-slate-600 italic">
                  {edu.startDate} – {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {sectionVisibility?.skills && skills && skills.length > 0 && (
        <section className="mt-4">
          <h2
            className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-1.5"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Skills
          </h2>
          <p className="text-slate-700 leading-normal">
            {skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {sectionVisibility?.certifications && certifications && certifications.length > 0 && (
        <section className="mt-4">
          <h2
            className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-2"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-800">{cert.name}</span> – {cert.issuer}
                </div>
                {cert.date && <span className="text-slate-500 italic text-[11px]">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {sectionVisibility?.languages && languages && languages.length > 0 && (
        <section className="mt-4">
          <h2
            className="text-xs font-bold uppercase tracking-widest border-b pb-0.5 mb-1.5"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-700">
            {languages.map((lang) => (
              <span key={lang.id}>
                <strong>{lang.name}</strong> ({lang.proficiency})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
