import React from 'react';
import { Mail, Phone, MapPin, Globe, Link2, Code, ExternalLink, Award, Languages as LangIcon } from 'lucide-react';

export default function ExecutiveTemplate({ resumeData }) {
  const { personalInfo, skills, experiences, education, projects, certifications, languages, theme, sectionVisibility } = resumeData;
  const accentColor = theme.accentColor || '#1e3a8a';

  return (
    <div className="bg-transparent text-slate-800 min-h-[1123px] w-[794px] flex flex-row text-xs">
      {/* Left Column / Sidebar */}
      <aside 
        className="w-64 shrink-0 p-6 text-white flex flex-col justify-between"
        style={{ backgroundColor: accentColor }}
      >
        <div className="space-y-5">
          {/* User info & Avatar */}
          {sectionVisibility?.personalInfo && (
            <div className="space-y-3">
              {personalInfo.avatar && personalInfo.showAvatar && (
                <div className="flex justify-center sm:justify-start">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.fullName}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white/80 shadow-md ring-2 ring-white/30"
                  />
                </div>
              )}
              <div>
                <h1 className="text-xl font-black uppercase tracking-tight text-white leading-tight">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-white/80 font-medium text-xs mt-1 uppercase tracking-wider">
                  {personalInfo.jobTitle || 'Job Title'}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-2 text-[10.5px] text-white/90 border-t border-white/20 pt-3">
                <h3 className="font-bold uppercase tracking-widest text-[11px] text-white/70">Contact</h3>
                {personalInfo.email && (
                  <div className="flex items-center gap-1.5 break-all">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-1.5 break-all">
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-1.5 break-all">
                    <Link2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-1.5 break-all">
                    <Code className="w-3.5 h-3.5 shrink-0" />
                    <span>{personalInfo.github}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Education Sidebar */}
          {sectionVisibility?.education && education && education.length > 0 && (
            <div className="border-t border-white/20 pt-3 space-y-2.5">
              <h3 className="font-bold uppercase tracking-widest text-[11px] text-white/70">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="text-[10.5px]">
                  <p className="font-bold text-white">{edu.degree}</p>
                  <p className="text-white/80">{edu.institution}</p>
                  <p className="text-white/60 text-[9.5px]">{edu.startDate} – {edu.endDate} {edu.score && `• ${edu.score}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills Sidebar */}
          {sectionVisibility?.skills && skills && skills.length > 0 && (
            <div className="border-t border-white/20 pt-3">
              <h3 className="font-bold uppercase tracking-widest text-[11px] text-white/70 mb-2">Core Skills</h3>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-white/15 text-white rounded text-[9.5px] font-medium backdrop-blur-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Sidebar */}
          {sectionVisibility?.languages && languages && languages.length > 0 && (
            <div className="border-t border-white/20 pt-3 space-y-1.5">
              <h3 className="font-bold uppercase tracking-widest text-[11px] text-white/70 flex items-center gap-1">
                <LangIcon className="w-3 h-3" /> Languages
              </h3>
              {languages.map((lang) => (
                <div key={lang.id} className="text-[10px]">
                  <div className="flex justify-between text-white/90">
                    <span className="font-bold">{lang.name}</span>
                    <span className="text-white/70">{lang.proficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Right Column / Main Body */}
      <main className="flex-1 p-6 space-y-5 bg-transparent">
        {/* Summary */}
        {sectionVisibility?.summary && personalInfo.summary && (
          <section>
            <h2 className="font-bold uppercase tracking-widest text-xs border-b border-slate-200 pb-1 mb-2" style={{ color: accentColor }}>
              Executive Profile
            </h2>
            <p className="text-slate-600 leading-relaxed text-justify text-[11.5px]">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {sectionVisibility?.experiences && experiences && experiences.length > 0 && (
          <section>
            <h2 className="font-bold uppercase tracking-widest text-xs border-b border-slate-200 pb-1 mb-3" style={{ color: accentColor }}>
              Work History
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-slate-800">
                    <span className="text-xs">{exp.jobTitle}</span>
                    <span className="text-slate-400 font-normal text-[10px]">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-[11px] font-medium">
                    <span>{exp.company}</span>
                    <span className="text-slate-400 italic text-[10px]">{exp.location}</span>
                  </div>
                  <p className="text-slate-600 whitespace-pre-line leading-relaxed text-[11px]">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {sectionVisibility?.projects && projects && projects.length > 0 && (
          <section>
            <h2 className="font-bold uppercase tracking-widest text-xs border-b border-slate-200 pb-1 mb-3" style={{ color: accentColor }}>
              Highlighted Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-center font-bold text-slate-800">
                    <span className="text-xs flex items-center gap-1">
                      {proj.title}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </span>
                  </div>
                  {proj.technologies && (
                    <p className="text-slate-500 font-mono text-[10px]">
                      Stack: {proj.technologies}
                    </p>
                  )}
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {sectionVisibility?.certifications && certifications && certifications.length > 0 && (
          <section>
            <h2 className="font-bold uppercase tracking-widest text-xs border-b border-slate-200 pb-1 mb-2 flex items-center gap-1.5" style={{ color: accentColor }}>
              <Award className="w-3.5 h-3.5" /> Certifications
            </h2>
            <div className="space-y-1 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-800">{cert.name} — <span className="font-normal text-slate-600">{cert.issuer}</span></span>
                  {cert.date && <span className="text-slate-400 text-[10px]">{cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
