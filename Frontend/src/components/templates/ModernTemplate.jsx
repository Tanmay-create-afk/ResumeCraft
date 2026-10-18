import React from 'react';
import { Mail, Phone, MapPin, Globe, Link2, Code, ExternalLink, Award, Languages as LangIcon } from 'lucide-react';

export default function ModernTemplate({ resumeData }) {
  const { personalInfo, skills, experiences, education, projects, certifications, languages, theme, sectionVisibility } = resumeData;
  const accentColor = theme.accentColor || '#2563eb';

  return (
    <div className="bg-transparent text-slate-800 p-8 min-h-[1056px] w-full text-sm leading-relaxed shadow-sm">
      {/* Header with Photo support */}
      {sectionVisibility?.personalInfo && (
        <header className="border-b-2 pb-6 flex items-start gap-5" style={{ borderColor: accentColor }}>
          {personalInfo.avatar && personalInfo.showAvatar && (
            <img
              src={personalInfo.avatar}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-md border-2 border-white ring-2"
              style={{ ringColor: accentColor }}
            />
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900" style={{ color: accentColor }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-lg font-medium text-slate-600 mt-1">
              {personalInfo.jobTitle || 'Your Target Job Title'}
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-slate-600">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> {personalInfo.website.replace(/^https?:\/\//, '')}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Link2 className="w-3.5 h-3.5" /> {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> {personalInfo.github}
                </span>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Summary */}
      {sectionVisibility?.summary && personalInfo.summary && (
        <section className="mt-5">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: accentColor }}>
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-700">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {sectionVisibility?.experiences && experiences && experiences.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-2 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline font-semibold text-slate-900">
                  <span className="text-sm font-bold">{exp.jobTitle}</span>
                  <span className="text-slate-500 font-normal">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700 font-medium mb-1">
                  <span>{exp.company}</span>
                  <span className="text-slate-500 italic">{exp.location}</span>
                </div>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {sectionVisibility?.projects && projects && projects.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-2 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span className="font-bold flex items-center gap-1">
                    {proj.title}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-600 inline-flex items-center">
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </span>
                </div>
                {proj.technologies && (
                  <p className="text-slate-500 font-mono text-[11px] mb-1">
                    Technologies: {proj.technologies}
                  </p>
                )}
                <p className="text-slate-600 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {sectionVisibility?.skills && skills && skills.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-2 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-slate-100 text-slate-800 rounded font-medium border border-slate-200/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {sectionVisibility?.certifications && certifications && certifications.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-2 border-b border-slate-200 pb-1 flex items-center gap-1.5" style={{ color: accentColor }}>
            <Award className="w-3.5 h-3.5" /> Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-2 rounded-lg bg-slate-50/80 border border-slate-200">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>{cert.name}</span>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noreferrer" className="text-indigo-600">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {cert.issuer} {cert.date && `• ${cert.date}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {/* Education */}
        {sectionVisibility?.education && education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold tracking-widest uppercase mb-2 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-slate-500 text-[11px]">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700 text-[11px]">
                    <span>{edu.institution} {edu.score && `• ${edu.score}`}</span>
                    <span className="text-slate-500 italic">{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {sectionVisibility?.languages && languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold tracking-widest uppercase mb-2 border-b border-slate-200 pb-1 flex items-center gap-1.5" style={{ color: accentColor }}>
              <LangIcon className="w-3.5 h-3.5" /> Languages
            </h2>
            <div className="space-y-2 text-xs">
              {languages.map((lang) => (
                <div key={lang.id} className="space-y-1">
                  <div className="flex justify-between font-semibold text-slate-800 text-[11px]">
                    <span>{lang.name}</span>
                    <span className="text-slate-500 font-normal">{lang.proficiency}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${lang.level || 60}%`, backgroundColor: accentColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
