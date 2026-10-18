import React from 'react';
import { Mail, Phone, MapPin, Globe, Link2, Code, ExternalLink, Award, Languages as LangIcon } from 'lucide-react';

export default function GenZCreativeTemplate({ resumeData }) {
  const { personalInfo, skills, experiences, education, projects, certifications, languages, theme, sectionVisibility } = resumeData;
  const accentColor = theme.accentColor || '#6366f1';

  return (
    <div className="bg-transparent text-slate-900 p-8 min-h-[1056px] w-full font-jakarta text-xs leading-relaxed shadow-sm">
      {/* Top Banner Card with Avatar */}
      {sectionVisibility?.personalInfo && (
        <div 
          className="rounded-2xl p-6 mb-6 text-white relative overflow-hidden shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${accentColor} 0%, #0f172a 100%)` 
          }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
            {personalInfo.avatar && personalInfo.showAvatar && (
              <img
                src={personalInfo.avatar}
                alt={personalInfo.fullName}
                className="w-20 h-20 rounded-full object-cover shrink-0 border-2 border-white/80 shadow-md ring-4 ring-white/20"
              />
            )}

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {personalInfo.fullName || 'Alex Morgan'}
                </h1>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-semibold tracking-wide uppercase">
                  {personalInfo.jobTitle || 'Product Designer & Full Stack'}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-[11px] text-white/90 justify-center sm:justify-start">
                {personalInfo.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> {personalInfo.email}
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {personalInfo.location}
                  </span>
                )}
                {personalInfo.website && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> {personalInfo.website.replace(/^https?:\/\//, '')}
                  </span>
                )}
                {personalInfo.linkedin && (
                  <span className="flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5" /> {personalInfo.linkedin}
                  </span>
                )}
                {personalInfo.github && (
                  <span className="flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" /> {personalInfo.github}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Subtle design element */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>
      )}

      {/* Summary */}
      {sectionVisibility?.summary && personalInfo.summary && (
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            About Me
          </h2>
          <p className="text-slate-700 leading-relaxed text-xs">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Grid: Main Experience (Left) & Sidebar (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Experience & Projects (2 Columns) */}
        <div className="md:col-span-2 space-y-5">
          {/* Experience */}
          {sectionVisibility?.experiences && experiences && experiences.length > 0 && (
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 pl-3 relative" style={{ borderColor: accentColor }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-xs">{exp.jobTitle}</h3>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium mb-1">
                      {exp.company} <span className="text-slate-400">· {exp.location}</span>
                    </div>
                    <p className="text-slate-600 whitespace-pre-line text-[11px] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {sectionVisibility?.projects && projects && projects.length > 0 && (
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Featured Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                        {proj.title}
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-600">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </span>
                    </div>
                    {proj.technologies && (
                      <p className="text-[10px] font-semibold text-slate-500 mb-1">
                        Stack: {proj.technologies}
                      </p>
                    )}
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Skills, Certifications, Languages & Education */}
        <div className="space-y-5">
          {/* Skills Pill Cloud */}
          {sectionVisibility?.skills && skills && skills.length > 0 && (
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Skills & Tech
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[10.5px] font-semibold rounded-lg transition-colors"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {sectionVisibility?.certifications && certifications && certifications.length > 0 && (
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-[11px]">
                    <div className="font-bold text-slate-900">{cert.name}</div>
                    <div className="text-slate-500 text-[10px]">{cert.issuer} {cert.date && `(${cert.date})`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {sectionVisibility?.languages && languages && languages.length > 0 && (
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-[11px]">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{lang.name}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{lang.proficiency}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${lang.level || 50}%`, backgroundColor: accentColor }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {sectionVisibility?.education && education && education.length > 0 && (
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11px]">
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.institution}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">
                      {edu.startDate} – {edu.endDate} {edu.score && `• ${edu.score}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
