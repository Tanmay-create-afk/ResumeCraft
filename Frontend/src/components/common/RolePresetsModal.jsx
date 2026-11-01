import React, { useState } from 'react';
import { 
  X, Briefcase, Check, Sparkles, Code2, LineChart, Palette, Rocket, 
  Search, ArrowRight, CheckCircle2, ShieldCheck 
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const ROLE_PRESETS = [
  {
    id: 'fullstack-swe',
    title: 'Senior Full Stack Engineer',
    category: 'Engineering',
    icon: Code2,
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    tagline: 'React 19, TypeScript, Node.js, Cloud & Distributed Systems',
    atsScore: 98,
    data: {
      personalInfo: {
        fullName: 'Alex Morgan',
        jobTitle: 'Senior Full Stack Engineer & Cloud Architect',
        email: 'alex.morgan.dev@gmail.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA (Open to Remote)',
        website: 'https://alexmorgan.dev',
        linkedin: 'linkedin.com/in/alexmorgan-swe',
        github: 'github.com/alexmorgan',
        avatar: '',
        showAvatar: false,
        summary: 'High-velocity Senior Full Stack Engineer with 7+ years of experience architecting resilient cloud services and reactive frontend platforms. Led engineering squads scaling distributed systems to 3M+ monthly active users with 99.99% service availability.',
      },
      skills: [
        'React 19 & Next.js',
        'TypeScript & ESNext',
        'Node.js & Express',
        'Go (Golang)',
        'PostgreSQL & Redis',
        'Docker & Kubernetes',
        'AWS (ECS, Lambda, S3)',
        'GraphQL & REST APIs',
        'CI/CD Pipelines (GitHub Actions)',
        'System Architecture & Microservices',
        'Tailwind CSS & Design Systems',
        'Automated Testing (Jest, Playwright)'
      ],
      experiences: [
        {
          id: 'swe-exp-1',
          jobTitle: 'Senior Staff Software Engineer',
          company: 'Vercel Inc.',
          location: 'San Francisco, CA',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          description: '• Spearheaded core platform dashboard redesign, reducing bundle size by 42% and cutting First Contentful Paint by 650ms for 3M+ active sessions.\n• Architected asynchronous edge computing pipeline utilizing Go and Redis, handling 45,000 requests/sec during peak traffic events.\n• Mentored 8 mid-level and senior engineers on performance optimization, automated test suites, and strict TypeScript types.'
        },
        {
          id: 'swe-exp-2',
          jobTitle: 'Senior Full Stack Engineer',
          company: 'Stripe',
          location: 'Seattle, WA',
          startDate: '2019',
          endDate: '2022',
          current: false,
          description: '• Engineered merchant billing reconciliation services processing $1.8B+ in quarterly transaction volumes with zero data loss.\n• Integrated WebGL-powered data visualization tools providing sub-second analytical reporting to enterprise CFO accounts.\n• Automated regression test suites across 20+ microservices, slashing production deployment rollback incidents by 68%.'
        },
        {
          id: 'swe-exp-3',
          jobTitle: 'Software Engineer',
          company: 'Cloudflare',
          location: 'Austin, TX',
          startDate: '2017',
          endDate: '2019',
          current: false,
          description: '• Developed high-throughput edge routing logic in TypeScript, reducing DNS lookup latency by 24% globally.\n• Built developer documentation portal adopted by 120k+ external cloud developers.'
        }
      ],
      education: [
        {
          id: 'swe-edu-1',
          degree: 'B.S. in Computer Science & Engineering',
          institution: 'University of California, Berkeley',
          location: 'Berkeley, CA',
          startDate: '2013',
          endDate: '2017',
          score: 'GPA: 3.9 / 4.0 (Magna Cum Laude)'
        }
      ],
      projects: [
        {
          id: 'swe-proj-1',
          title: 'DevPulse - Open Source Microservices Orchestrator',
          technologies: 'TypeScript, Go, Docker, React, Tailwind CSS',
          link: 'https://github.com/alexmorgan/devpulse',
          description: 'Popular developer CLI tool with over 5,200 GitHub stars and 120,000+ container pulls worldwide.'
        },
        {
          id: 'swe-proj-2',
          title: 'HyperCache - In-Memory KV Store with Raft Consensus',
          technologies: 'Go, gRPC, Distributed Systems',
          link: 'https://github.com/alexmorgan/hypercache',
          description: 'Low-latency distributed key-value store achieving 90k ops/sec with deterministic failover.'
        }
      ],
      certifications: [
        {
          id: 'swe-cert-1',
          name: 'AWS Certified Solutions Architect – Professional',
          issuer: 'Amazon Web Services',
          date: '2023',
          link: 'https://aws.amazon.com'
        }
      ],
      languages: [
        { id: 'lang-1', name: 'English', proficiency: 'Native / Bilingual', level: 100 },
        { id: 'lang-2', name: 'Spanish', proficiency: 'Professional Working', level: 75 }
      ]
    }
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist & AI Engineer',
    category: 'AI & Data',
    icon: LineChart,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tagline: 'Python, PyTorch, LLMs, Predictive Modeling & Big Data',
    atsScore: 99,
    data: {
      personalInfo: {
        fullName: 'Dr. Elena Rostova',
        jobTitle: 'Senior Machine Learning & Data Scientist',
        email: 'elena.rostova.ai@gmail.com',
        phone: '+1 (555) 456-7890',
        location: 'New York, NY',
        website: 'https://elenarostova.ai',
        linkedin: 'linkedin.com/in/elena-rostova-ml',
        github: 'github.com/elena-rostova',
        avatar: '',
        showAvatar: false,
        summary: 'Quantitative Data Scientist with 6+ years specializing in deep learning, natural language processing, and predictive revenue models. Designed end-to-end MLOps architectures that generated $14M in incremental revenue and reduced user churn by 28%.',
      },
      skills: [
        'Python & R',
        'PyTorch & TensorFlow',
        'LLM Fine-Tuning & RAG',
        'SQL & BigQuery',
        'Pandas, NumPy & Scikit-Learn',
        'MLOps & MLflow',
        'Apache Spark & Kafka',
        'Docker & Kubernetes',
        'A/B Testing & Statistical Modeling',
        'Data Visualization (Tableau, Plotly)',
        'Predictive Churn & LTV Modeling',
        'Snowflake & Databricks'
      ],
      experiences: [
        {
          id: 'ds-exp-1',
          jobTitle: 'Lead Machine Learning Scientist',
          company: 'Databricks Inc.',
          location: 'New York, NY',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: '• Architected automated feature store and distributed training pipeline reducing model retraining cycle times from 14 days to 4 hours.\n• Fine-tuned specialized domain LLMs using LoRA and Vector RAG search, boosting query accuracy by 34% across 800k monthly support tickets.\n• Partnered with VP of Product to roll out dynamic pricing algorithms that unlocked $12.4M in annualized recurring revenue.'
        },
        {
          id: 'ds-exp-2',
          jobTitle: 'Senior Data Scientist',
          company: 'Spotify',
          location: 'Boston, MA',
          startDate: '2018',
          endDate: '2021',
          current: false,
          description: '• Developed collaborative filtering and deep learning recommendation systems powering personalized playlists for 18M subscribers.\n• Conducted 140+ rigorous multivariate statistical experiments, optimizing user onboarding completion rates by 19.5%.\n• Built automated anomaly detection pipelines in Python and Apache Spark detecting payment anomalies within 30 seconds.'
        }
      ],
      education: [
        {
          id: 'ds-edu-1',
          degree: 'M.S. in Data Science & Machine Learning',
          institution: 'Columbia University',
          location: 'New York, NY',
          startDate: '2016',
          endDate: '2018',
          score: 'GPA: 3.95 / 4.0'
        }
      ],
      projects: [
        {
          id: 'ds-proj-1',
          title: 'OmniEmbed - High-Dimensional Vector Semantic Search',
          technologies: 'Python, PyTorch, FAISS, FastAPI, Docker',
          link: 'https://github.com/elena-rostova/omni-embed',
          description: 'Open source embedding library delivering sub-5ms cosine similarity lookups across 10M embeddings.'
        }
      ],
      certifications: [
        {
          id: 'ds-cert-1',
          name: 'TensorFlow Developer Certified',
          issuer: 'Google',
          date: '2022',
          link: 'https://google.com'
        }
      ],
      languages: [
        { id: 'lang-1', name: 'English', proficiency: 'Native / Bilingual', level: 100 },
        { id: 'lang-2', name: 'French', proficiency: 'Professional Working', level: 80 }
      ]
    }
  },
  {
    id: 'product-designer',
    title: 'Lead Product & UI/UX Designer',
    category: 'Design & UX',
    icon: Palette,
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    tagline: 'Design Systems, User Research, Prototyping & Mobile Apps',
    atsScore: 97,
    data: {
      personalInfo: {
        fullName: 'Marcus Vance',
        jobTitle: 'Lead Product & UI/UX Designer',
        email: 'marcus.vance.ux@gmail.com',
        phone: '+1 (555) 789-0123',
        location: 'Los Angeles, CA',
        website: 'https://marcusvance.design',
        linkedin: 'linkedin.com/in/marcus-vance-design',
        github: '',
        avatar: '',
        showAvatar: false,
        summary: 'Award-winning Product Designer with 8+ years leading design systems and user-centric interfaces for Fortune 500 tech companies. Expert at transforming complex SaaS workflows into intuitive, conversion-optimized interfaces that increase user engagement.',
      },
      skills: [
        'Figma & FigJam Master',
        'Comprehensive Design Systems',
        'Interactive Prototyping (Framer, ProtoPie)',
        'User Research & Usability Testing',
        'Wireframing & Information Architecture',
        'Mobile App Design (iOS Human Interface & Android Material 3)',
        'Web Accessibility (WCAG 2.1 AA)',
        'Design-to-Engineering Handoff',
        'Conversion Rate Optimization (CRO)',
        'Customer Journey Mapping',
        'HTML5 & Modern Tailwind CSS',
        'Design Sprints & Workshops'
      ],
      experiences: [
        {
          id: 'des-exp-1',
          jobTitle: 'Lead Product Designer',
          company: 'Airbnb',
          location: 'San Francisco, CA',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: '• Spearheaded end-to-end design for host onboarding experience, lifting successful first-listing completions by 31% worldwide.\n• Maintained global design system library in Figma used daily by 140+ designers and 600+ engineers.\n• Facilitated 50+ recorded user research interviews, translating qualitative insights into high-impact roadmap initiatives.'
        },
        {
          id: 'des-exp-2',
          jobTitle: 'Senior UI/UX Designer',
          company: 'Robinhood',
          location: 'Menlo Park, CA',
          startDate: '2018',
          endDate: '2021',
          current: false,
          description: '• Redesigned stock research & options analytics UI, resulting in a 44% increase in daily active trader interaction.\n• Built zero-dependency micro-interaction prototypes that reduced engineering implementation discrepancies by 50%.\n• Earned Apple Design Award nomination for exceptional mobile accessibility and micro-animations.'
        }
      ],
      education: [
        {
          id: 'des-edu-1',
          degree: 'B.F.A. in Graphic Design & Digital Interaction',
          institution: 'Rhode Island School of Design (RISD)',
          location: 'Providence, RI',
          startDate: '2014',
          endDate: '2018',
          score: 'Honors Graduate'
        }
      ],
      projects: [
        {
          id: 'des-proj-1',
          title: 'Prism UI - Open Source Accessible Figma Kit',
          technologies: 'Figma Community, AutoLayout 5.0, Design Tokens',
          link: 'https://figma.com/@marcusvance',
          description: 'Downloaded by over 45,000 UI/UX designers globally with 4.9/5 star ratings.'
        }
      ],
      certifications: [
        {
          id: 'des-cert-1',
          name: 'Nielsen Norman Group UX Master Certified',
          issuer: 'NN/g',
          date: '2022',
          link: 'https://nngroup.com'
        }
      ],
      languages: [
        { id: 'lang-1', name: 'English', proficiency: 'Native / Bilingual', level: 100 },
        { id: 'lang-2', name: 'German', proficiency: 'Conversational', level: 60 }
      ]
    }
  },
  {
    id: 'product-manager',
    title: 'Senior Product Manager',
    category: 'Product & Strategy',
    icon: Rocket,
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    tagline: 'Product Roadmaps, OKRs, Agile Scrum, Growth Funnels & ARR',
    atsScore: 98,
    data: {
      personalInfo: {
        fullName: 'Sarah Jenkins',
        jobTitle: 'Principal Product Manager — Core Growth',
        email: 'sarah.jenkins.pm@gmail.com',
        phone: '+1 (555) 321-7654',
        location: 'Austin, TX',
        website: 'https://sarahjenkins.io',
        linkedin: 'linkedin.com/in/sarah-jenkins-pm',
        github: '',
        avatar: '',
        showAvatar: false,
        summary: 'Strategic Senior Product Manager with 8+ years steering cross-functional engineering, design, and GTM teams. Scaled annual recurring revenue from $4M to $22M while decreasing customer acquisition cost by 32% across enterprise B2B SaaS verticals.',
      },
      skills: [
        'Product Strategy & Vision',
        'Roadmap Planning & Prioritization',
        'Go-To-Market (GTM) Strategy',
        'Agile, Scrum & Kanban Leadership',
        'Customer Discovery & User Interviews',
        'Data-Driven Decision Making (SQL, Mixpanel, Amplitude)',
        'SaaS Monetization & Packaging',
        'Churn Reduction & Retention Loops',
        'Cross-Functional Stakeholder Alignment',
        'Jira, Linear & Notion Master',
        'A/B Testing & Conversion Funnels',
        'Executive C-Suite Presentations'
      ],
      experiences: [
        {
          id: 'pm-exp-1',
          jobTitle: 'Principal Product Manager',
          company: 'Shopify',
          location: 'Austin, TX (Remote)',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: '• Directed product development for merchant checkout experiences, expanding processing volume by $650M annually.\n• Championed 1-click checkout initiative that elevated mobile purchase conversion by 26.4% across 80,000+ storefronts.\n• Managed quarterly OKR roadmaps for 4 cross-functional engineering squads totaling 32 engineers and designers.'
        },
        {
          id: 'pm-exp-2',
          jobTitle: 'Senior Product Manager',
          company: 'HubSpot',
          location: 'Cambridge, MA',
          startDate: '2017',
          endDate: '2021',
          current: false,
          description: '• Launched CRM analytics add-on reaching $8M in ARR within the first 12 months post-launch.\n• Instituted automated customer telemetry pipelines that reduced trial-to-paid drop-off from 45% to 22%.\n• Collaborated directly with sales and engineering leadership to close 18 enterprise deals valued over $150k ACV.'
        }
      ],
      education: [
        {
          id: 'pm-edu-1',
          degree: 'B.A. in Economics & Technology Management',
          institution: 'Northwestern University',
          location: 'Evanston, IL',
          startDate: '2013',
          endDate: '2017',
          score: 'Dean\'s List All Semesters'
        }
      ],
      projects: [
        {
          id: 'pm-proj-1',
          title: 'SaaS Metrics Cheat Sheet & Framework',
          technologies: 'Notion, Product Management, Financial Modeling',
          link: 'https://sarahjenkins.io/framework',
          description: 'Widely shared product framework utilized by 15,000+ early-stage founders and product leads.'
        }
      ],
      certifications: [
        {
          id: 'pm-cert-1',
          name: 'Certified Scrum Product Owner (CSPO)',
          issuer: 'Scrum Alliance',
          date: '2020',
          link: 'https://scrumalliance.org'
        }
      ],
      languages: [
        { id: 'lang-1', name: 'English', proficiency: 'Native / Bilingual', level: 100 },
        { id: 'lang-2', name: 'Mandarin Chinese', proficiency: 'Working Proficiency', level: 70 }
      ]
    }
  }
];

export default function RolePresetsModal({ isOpen, onClose }) {
  const { importData } = useResume();
  const [selectedRole, setSelectedRole] = useState(ROLE_PRESETS[0]);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplyRole = () => {
    if (window.confirm(`Load the "${selectedRole.title}" preset? This will populate the editor with proven, high-scoring ATS content.`)) {
      importData(selectedRole.data);
      setAppliedSuccess(true);
      setTimeout(() => {
        setAppliedSuccess(false);
        onClose();
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-indigo-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span>1-Click Role Presets</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
                  99 ATS Verified
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Populate your resume instantly with recruiter-tested bullets and industry keywords
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

        {/* Modal Body: Split view of roles and details */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Left Column: Role Selector Cards */}
          <div className="md:col-span-5 space-y-2.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Select Your Target Role
            </label>
            {ROLE_PRESETS.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole.id === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                      : 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {role.title}
                      </h4>
                      <span className="text-[10.5px] font-mono font-bold text-emerald-600 shrink-0">
                        {role.atsScore}% ATS
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {role.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Role Preview */}
          <div className="md:col-span-7 bg-slate-50/70 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4 overflow-y-auto max-h-[420px] pr-1">
              
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100/70 text-indigo-800 mb-1">
                    {selectedRole.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {selectedRole.data.personalInfo.fullName}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600">
                    {selectedRole.data.personalInfo.jobTitle}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{selectedRole.atsScore} / 100 Match</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Executive Summary
                </label>
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                  {selectedRole.data.personalInfo.summary}
                </p>
              </div>

              {/* Skills Tags */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Top Skills Included ({selectedRole.data.skills.length})
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRole.data.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white border border-slate-200 text-slate-700 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Highlights */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Positions Included
                </label>
                <div className="space-y-2">
                  {selectedRole.data.experiences.map((exp) => (
                    <div key={exp.id} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{exp.jobTitle}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <p className="text-slate-500 font-medium text-[11px]">{exp.company} • {exp.location}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Bottom Bar */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 hidden sm:inline">
                You can easily customize all fields after loading.
              </span>
              <button
                type="button"
                onClick={handleApplyRole}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer ml-auto"
              >
                {appliedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Loaded Successfully!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Load {selectedRole.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
