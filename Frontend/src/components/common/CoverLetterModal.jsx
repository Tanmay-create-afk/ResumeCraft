import React, { useState, useEffect } from 'react';
import { 
  X, Mail, Copy, Check, Download, Sparkles, Building, Briefcase, 
  User, RefreshCw, Send, CheckCircle2 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export default function CoverLetterModal({ isOpen, onClose }) {
  const { resumeData } = useResume();
  const [targetCompany, setTargetCompany] = useState('Acme Corporation');
  const [targetRole, setTargetRole] = useState(resumeData.personalInfo?.jobTitle || 'Senior Software Engineer');
  const [hiringManager, setHiringManager] = useState('Hiring Team');
  const [tone, setTone] = useState('professional'); // 'professional' | 'confident' | 'innovative'
  const [letterContent, setLetterContent] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate cover letter based on user's resume data
  const generateCoverLetter = () => {
    const name = resumeData.personalInfo?.fullName || 'Candidate';
    const email = resumeData.personalInfo?.email || 'email@example.com';
    const phone = resumeData.personalInfo?.phone || '+1 (555) 000-0000';
    const location = resumeData.personalInfo?.location || 'San Francisco, CA';
    const topSkills = (resumeData.skills || []).slice(0, 5).join(', ') || 'modern engineering and strategic problem-solving';
    
    // Pick first experience for specific achievement highlight
    const primaryExp = resumeData.experiences?.[0];
    const pastCompany = primaryExp?.company || 'leading technology teams';
    const pastRole = primaryExp?.jobTitle || 'software engineering';
    
    let opening = '';
    let body = '';
    let closing = '';

    if (tone === 'confident') {
      opening = `I am writing to express my enthusiastic interest in the ${targetRole} position at ${targetCompany}. With a proven track record of architecting scalable solutions, leading high-performance engineering initiatives, and driving tangible business outcomes, I am eager to bring immediate value to your team.`;
      
      body = `Throughout my career—most notably as ${pastRole} at ${pastCompany}—I have specialized in bridging technical innovation with measurable results. My core expertise spans ${topSkills}. I thrive in high-ownership environments where engineering excellence directly impacts product growth and customer satisfaction. The mission and engineering momentum at ${targetCompany} deeply resonate with my approach to building robust, user-centric software.`;

      closing = `I welcome the opportunity to discuss how my technical leadership and background can accelerate ${targetCompany}'s upcoming strategic milestones. Thank you for your time and consideration.`;
    } else if (tone === 'innovative') {
      opening = `Technology products succeed when bold engineering meets rigorous execution. As an experienced practitioner in ${topSkills}, I was thrilled to discover the ${targetRole} opportunity at ${targetCompany}.`;

      body = `Having driven core platform capabilities as ${pastRole} at ${pastCompany}, I understand what it takes to iterate rapidly without sacrificing system stability or code quality. I pride myself on solving complex problems, mentoring teammates, and shipping features that scale seamlessly. Joining ${targetCompany} presents an exciting opportunity to apply this mindset to your ambitious product roadmap.`;

      closing = `I look forward to discussing how my experience and forward-thinking perspective can contribute to ${targetCompany}'s continued innovation.`;
    } else {
      // Professional / Executive
      opening = `Dear ${hiringManager} at ${targetCompany},\n\nPlease accept this letter and accompanying resume as my application for the ${targetRole} role. With extensive hands-on experience in ${topSkills}, I am confident in my ability to make an immediate, positive impact on your organization.`;

      body = `In my recent position as ${pastRole} at ${pastCompany}, I led critical initiatives centered on performance, stability, and product delivery. My background in orchestrating cross-functional workflows, combined with a strong technical foundation, enables me to deliver high-quality results in fast-paced environments. I am particularly impressed by ${targetCompany}'s market reputation and would value the chance to contribute to your ongoing achievements.`;

      closing = `Thank you for reviewing my qualifications. I look forward to the possibility of discussing this role with you in greater detail.`;
    }

    const todayDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const fullLetter = `${name}
${location} • ${phone} • ${email}

${todayDate}

${hiringManager}
${targetCompany}

RE: Application for ${targetRole}

${opening}

${body}

${closing}

Sincerely,

${name}`;

    setLetterContent(fullLetter);
  };

  useEffect(() => {
    if (isOpen) {
      generateCoverLetter();
    }
  }, [isOpen, targetCompany, targetRole, hiringManager, tone]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([letterContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${(resumeData.personalInfo?.fullName || 'Candidate').replace(/\s+/g, '_')}_${targetCompany.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-purple-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>AI Cover Letter Studio</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700">
                  Customized to Resume
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Instantly generates a tailored, high-conversion cover letter matching your experience
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Target Parameters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Building className="w-3 h-3 text-indigo-600" /> Target Company
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Google, Stripe"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-indigo-600" /> Position Title
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Lead"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-600" /> Tone of Voice
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-indigo-600 cursor-pointer"
              >
                <option value="professional">Executive &amp; Professional</option>
                <option value="confident">High-Confidence &amp; Metrics</option>
                <option value="innovative">Innovative &amp; Forward-Thinking</option>
              </select>
            </div>
          </div>

          {/* Letter Editor Canvas */}
          <div>
            <div className="flex items-center justify-between mb-1.5 px-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Generated Cover Letter (Editable)
              </label>
              <button
                type="button"
                onClick={generateCoverLetter}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate</span>
              </button>
            </div>
            
            <textarea
              rows={14}
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              className="w-full p-4 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 shadow-inner transition-all resize-y"
            />
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Tip: Tailor the first sentence to mention a recent company achievement.
          </span>
          
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download (.txt)</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Letter</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
