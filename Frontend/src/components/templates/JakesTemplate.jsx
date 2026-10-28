import React from 'react';

/**
 * Jake's Resume Template (Overleaf / LaTeX standard)
 * The #1 most starred and utilized software engineering resume on Overleaf and r/EngineeringResumes.
 * Authentic LaTeX typography, 2-tier subheadings, and dense high-impact bullet points.
 */
export default function JakesTemplate({ resumeData }) {
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

  // Group raw skills into standard Jake's Resume categories if possible
  const categorizeSkills = (skillList) => {
    if (!skillList || skillList.length === 0) return null;
    
    // Check if skills already contain category separators like "Languages: Python, Go"
    const hasCategorized = skillList.some(s => s.includes(':'));
    if (hasCategorized) {
      return skillList.map(s => {
        const [cat, items] = s.split(':');
        return { category: cat.trim(), items: items ? items.trim() : '' };
      });
    }

    // Default clean categorization heuristic
    return [
      { category: 'Technical Skills', items: skillList.join(', ') }
    ];
  };

  const skillCategories = categorizeSkills(skills);

  return (
    <div className="bg-transparent text-black p-8 sm:p-9 min-h-[1123px] w-[794px] font-sans text-[11.5px] leading-snug selection:bg-slate-200">
      
      {/* Jake's LaTeX Centered Header */}
      {sectionVisibility?.personalInfo !== false && (
        <header className="text-center pb-2 mb-2.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
            {personalInfo.fullName || 'First Last'}
          </h1>

          <div className="flex justify-center flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-[11px] text-neutral-800">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span>|</span>}
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="text-black underline underline-offset-2">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.linkedin && <span>|</span>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-black underline underline-offset-2">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
            {personalInfo.github && <span>|</span>}
            {personalInfo.github && (
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="text-black underline underline-offset-2">
                {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
            {personalInfo.website && <span>|</span>}
            {personalInfo.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="text-black underline underline-offset-2">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
          </div>
        </header>
      )}

      {/* Summary (if present) */}
      {sectionVisibility?.summary !== false && personalInfo.summary && (
        <section className="mb-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
            Summary
          </h2>
          <p className="text-[11px] text-neutral-900 leading-normal text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {sectionVisibility?.education !== false && education && education.length > 0 && (
        <section className="mb-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                {/* Row 1: Institution (bold left) - Location (right) */}
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[11.5px] text-black">
                    {edu.institution}
                  </span>
                  <span className="text-[11px] text-neutral-800">
                    {edu.location || (edu.endDate ? `${edu.startDate || ''} – ${edu.endDate}` : '')}
                  </span>
                </div>

                {/* Row 2: Degree (italic left) - Dates (right) */}
                <div className="flex justify-between items-baseline text-[11px] text-neutral-800 italic">
                  <span>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    {edu.gpa ? `, GPA: ${edu.gpa}` : ''}
                  </span>
                  {edu.location && edu.endDate && (
                    <span className="not-italic text-[10.5px]">
                      {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {sectionVisibility?.experiences !== false && experiences && experiences.length > 0 && (
        <section className="mb-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Experience
          </h2>
          <div className="space-y-2.5">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-0.5">
                {/* Jake's Tier 1: Role (bold) & Dates (right) */}
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[11.5px] text-black">
                    {exp.position}
                  </span>
                  <span className="text-[11px] text-neutral-800">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                {/* Jake's Tier 2: Company (italic) & Location (italic right) */}
                <div className="flex justify-between items-baseline text-[11px] text-neutral-800 italic">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>

                {/* Bullets with concise action-verb focus */}
                {exp.highlights && exp.highlights.length > 0 ? (
                  <ul className="list-disc list-outside ml-4 text-[11px] text-neutral-900 space-y-0.5 leading-snug">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx} className="pl-0.5">{bullet}</li>
                    ))}
                  </ul>
                ) : exp.description ? (
                  <p className="text-[11px] text-neutral-900 leading-snug pl-0.5">
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
        <section className="mb-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Projects
          </h2>
          <div className="space-y-1.5">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-[11.5px] text-black">{proj.name}</span>
                    {proj.technologies && (
                      <span className="text-[11px] text-neutral-800 italic ml-1.5">
                        | {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[10.5px] text-black underline">
                      {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  )}
                </div>
                {proj.description && (
                  <ul className="list-disc list-outside ml-4 text-[11px] text-neutral-900 space-y-0.5 leading-snug">
                    <li className="pl-0.5">{proj.description}</li>
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {sectionVisibility?.skills !== false && skills && skills.length > 0 && (
        <section className="mb-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
            Technical Skills
          </h2>
          <div className="space-y-0.5 text-[11px] text-neutral-900">
            {skillCategories && skillCategories.map((sc, idx) => (
              <div key={idx} className="flex items-baseline">
                <span className="font-bold text-black min-w-[120px]">{sc.category}:</span>
                <span className="ml-1 text-neutral-800">{sc.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications (if present) */}
      {sectionVisibility?.certifications !== false && certifications && certifications.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
            Certifications
          </h2>
          <div className="space-y-0.5 text-[11px]">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between">
                <span><strong className="text-black">{c.name}</strong> {c.issuer ? `— ${c.issuer}` : ''}</span>
                {c.date && <span className="text-neutral-700">{c.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
