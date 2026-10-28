import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

const ResumeContext = createContext(null);


export const initialResumeData = {
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full Stack & Design Technologist',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    avatar: '',
    showAvatar: false,
    summary: 'Results-driven Full Stack Engineer with 7+ years of experience architecting resilient cloud infrastructure, modern React/TypeScript design systems, and developer-first APIs. Led cross-functional squads to build applications scaled to 2M+ active users with 99.99% uptime.',
  },
  skills: [
    'React 19',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'PostgreSQL',
    'GraphQL',
    'Docker & Kubernetes',
    'AWS Cloud Architecture',
    'Micro-frontends',
    'CI/CD Pipelines',
    'UI/UX Prototyping',
  ],
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Staff Design Technologist',
      company: 'Vercel Inc.',
      location: 'San Francisco, CA (Remote)',
      startDate: '2022',
      endDate: '',
      current: true,
      description: '• Spearheaded frontend architecture for core platform dashboards, reducing bundle load times by 42% across 3M daily active sessions.\n• Authored company-wide accessible component primitives with 100% WCAG 2.1 AA automated compliance.\n• Mentored 12 mid-level and senior engineers on state management paradigms and reactive performance patterns.',
    },
    {
      id: 'exp-2',
      jobTitle: 'Senior Frontend Engineer',
      company: 'Stripe',
      location: 'Seattle, WA',
      startDate: '2019',
      endDate: '2022',
      current: false,
      description: '• Engineered high-throughput merchant billing telemetry interfaces processing $1.8B+ monthly transaction volume.\n• Designed interactive visualization graphs with zero frame drops using Canvas2D and WebGL.\n• Pioneered automated end-to-end testing pipeline that slashed production regression incidents by 68%.',
    },
    {
      id: 'exp-3',
      jobTitle: 'Full Stack Software Engineer',
      company: 'Cloudflare',
      location: 'Austin, TX',
      startDate: '2017',
      endDate: '2019',
      current: false,
      description: '• Developed high-speed edge API gateways in TypeScript and Go handling 50k+ requests per second.\n• Integrated global analytics telemetry dash with sub-100ms query latency over distributed databases.',
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science & Human-Computer Interaction',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2013',
      endDate: '2017',
      score: 'GPA: 3.9 / 4.0 (Dean\'s Honors)',
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse - Open Source Dev Container Orchestrator',
      technologies: 'TypeScript, Go, React, Tailwind, Docker',
      link: 'https://github.com/alexmorgan/devpulse',
      description: 'Lightweight local container toolchain with over 4,500 GitHub stars and 80k+ docker pulls.',
    },
    {
      id: 'proj-2',
      title: 'TaskPulse - Agile Sprint Tracker',
      technologies: 'React, Tailwind CSS, Express, MongoDB',
      link: 'https://taskpulse.io',
      description: 'Kanban board application with task prioritization, automated analytics, and exportable reports.',
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: 'https://aws.amazon.com',
    },
    {
      id: 'cert-2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      date: '2022',
      link: '',
    }
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native / Bilingual', level: 100 },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Professional Working', level: 75 },
    { id: 'lang-3', name: 'French', proficiency: 'Elementary / Basic', level: 25 },
  ],
  sectionVisibility: {
    personalInfo: true,
    summary: true,
    experiences: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
  },
  theme: {
    template: 'modern',
    accentColor: '#2563eb',
    fontFamily: 'sans',
    paperBg: 'white',
    zoom: 'auto', // Auto-fits to available screen width (or manual percentage)
    fontSize: 'normal', // 'compact' | 'normal' | 'relaxed'
    margins: 'normal', // 'compact' | 'normal' | 'spacious'
  }
};

/**
 * Ensures loaded data is completely safe and backwards-compatible with new schema fields.
 */
export function sanitizeResumeData(data) {
  if (!data || typeof data !== 'object') return { ...initialResumeData };
  return {
    ...initialResumeData,
    ...data,
    personalInfo: {
      ...initialResumeData.personalInfo,
      ...(data.personalInfo || {}),
    },
    theme: {
      ...initialResumeData.theme,
      ...(data.theme || {}),
    },
    sectionVisibility: {
      ...initialResumeData.sectionVisibility,
      ...(data.sectionVisibility || {}),
    },
    experiences: Array.isArray(data.experiences) ? data.experiences : initialResumeData.experiences,
    education: Array.isArray(data.education) ? data.education : initialResumeData.education,
    skills: Array.isArray(data.skills) ? data.skills : initialResumeData.skills,
    projects: Array.isArray(data.projects) ? data.projects : initialResumeData.projects,
    certifications: Array.isArray(data.certifications) ? data.certifications : initialResumeData.certifications,
    languages: Array.isArray(data.languages) ? data.languages : initialResumeData.languages,
  };
}

export const ResumeProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [syncStatus, setSyncStatus] = useState('saved'); // 'saved' | 'saving' | 'offline'

  // Multiple Resumes Store (local-first)
  const [resumes, setResumes] = useState(() => {
    try {
      const savedList = localStorage.getItem('resumecraft_resumes_list_v1');
      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(r => ({
            ...r,
            data: sanitizeResumeData(r.data),
          }));
        }
      }
      // Migrate legacy single resume if present
      const legacy = localStorage.getItem('resume_builder_data_v3');
      const baseData = legacy ? sanitizeResumeData(JSON.parse(legacy)) : initialResumeData;
      return [
        {
          id: 'res_default',
          title: 'Primary Professional Resume',
          updatedAt: new Date().toISOString(),
          data: baseData,
        }
      ];
    } catch (e) {
      console.warn('Failed to load initial resumes:', e);
      return [
        {
          id: 'res_default',
          title: 'Primary Professional Resume',
          updatedAt: new Date().toISOString(),
          data: initialResumeData,
        }
      ];
    }
  });

  const [activeResumeId, setActiveResumeId] = useState(() => {
    try {
      const active = localStorage.getItem('resumecraft_active_id');
      return active || 'res_default';
    } catch (e) {
      return 'res_default';
    }
  });

  // Active resume data reference
  const activeResume = resumes.find(r => r.id === activeResumeId) || resumes[0] || {
    id: 'res_default',
    title: 'Primary Professional Resume',
    data: initialResumeData,
  };
  const resumeData = activeResume ? activeResume.data : initialResumeData;

  // Sync from backend when user logs in
  useEffect(() => {
    let isMounted = true;

    const loadCloudResumes = async () => {
      if (!isAuthenticated) return;
      try {
        setSyncStatus('saving');
        const cloudData = await api.resumes.getAll();
        if (!isMounted) return;

        if (Array.isArray(cloudData) && cloudData.length > 0) {
          const formatted = cloudData.map(r => ({
            id: r._id,
            _id: r._id,
            title: r.title,
            updatedAt: r.updatedAt,
            data: sanitizeResumeData(r.data),
          }));
          setResumes(formatted);
          if (!formatted.some(r => r.id === activeResumeId)) {
            setActiveResumeId(formatted[0].id);
          }
        } else {
          // Fresh account: sync the current local resume to user's MongoDB
          const current = resumes.find(r => r.id === activeResumeId) || resumes[0];
          const saved = await api.resumes.save({
            title: current?.title || 'Primary Professional Resume',
            data: current?.data || initialResumeData,
          });
          if (saved && saved._id && isMounted) {
            const formatted = [{
              id: saved._id,
              _id: saved._id,
              title: saved.title,
              updatedAt: saved.updatedAt,
              data: sanitizeResumeData(saved.data),
            }];
            setResumes(formatted);
            setActiveResumeId(saved._id);
          }
        }
        setSyncStatus('saved');
      } catch (err) {
        console.warn('Could not load resumes from MongoDB Atlas:', err);
        setSyncStatus('offline');
      }
    };

    loadCloudResumes();
    return () => { isMounted = false; };
  }, [isAuthenticated]);

  // Persist resumes list and legacy sync safely to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resumecraft_resumes_list_v1', JSON.stringify(resumes));
      localStorage.setItem('resumecraft_active_id', activeResumeId);
      // Keep legacy key synced for compatibility
      if (resumeData) {
        localStorage.setItem('resume_builder_data_v3', JSON.stringify(resumeData));
      }
    } catch (e) {
      console.warn('Failed to save resumes to localStorage (quota or disabled):', e);
    }
  }, [resumes, activeResumeId, resumeData]);

  // Auto-save debounced cloud synchronization to MongoDB Atlas
  useEffect(() => {
    if (!isAuthenticated || !activeResume) return;

    setSyncStatus('saving');
    const timer = setTimeout(async () => {
      try {
        const payload = {
          _id: activeResume._id,
          title: activeResume.title,
          data: activeResume.data,
        };
        const res = await api.resumes.save(payload);
        if (res && res._id && !activeResume._id) {
          setResumes(prev =>
            prev.map(r => (r.id === activeResume.id ? { ...r, id: res._id, _id: res._id } : r))
          );
        }
        setSyncStatus('saved');
      } catch (e) {
        console.warn('Auto-save sync to cloud failed:', e);
        setSyncStatus('offline');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [resumeData, activeResume?.title, isAuthenticated]);

  // Low-level updater for active resume data
  const setResumeData = (updater) => {
    setResumes((prevResumes) => {
      const currentActive = prevResumes.find(r => r.id === activeResumeId) || prevResumes[0];
      const nextData = typeof updater === 'function' ? updater(currentActive.data) : updater;
      const sanitized = sanitizeResumeData(nextData);

      return prevResumes.map(r => {
        if (r.id === currentActive.id) {
          return {
            ...r,
            updatedAt: new Date().toISOString(),
            data: sanitized,
          };
        }
        return r;
      });
    });
  };

  // Multi-Resume Management
  const createResume = async (title = 'Untitled Resume', template = 'modern') => {
    const tempId = 'res_' + Date.now();
    const newDoc = {
      id: tempId,
      title,
      updatedAt: new Date().toISOString(),
      data: sanitizeResumeData({
        ...initialResumeData,
        personalInfo: {
          ...initialResumeData.personalInfo,
          fullName: 'Your Name',
          jobTitle: 'Professional Title',
        },
        theme: {
          ...initialResumeData.theme,
          template,
        }
      }),
    };

    if (isAuthenticated) {
      try {
        const saved = await api.resumes.save({ title: newDoc.title, data: newDoc.data });
        if (saved && saved._id) {
          newDoc.id = saved._id;
          newDoc._id = saved._id;
        }
      } catch (e) {
        console.warn('Cloud create failed, storing locally:', e);
      }
    }

    setResumes(prev => [newDoc, ...prev]);
    setActiveResumeId(newDoc.id);
    return newDoc.id;
  };

  const duplicateResume = async (id) => {
    const target = resumes.find(r => r.id === id);
    if (!target) return null;

    let cloned = {
      id: 'res_' + Date.now(),
      title: `${target.title} (Copy)`,
      updatedAt: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(target.data)),
    };

    if (isAuthenticated && (target._id || !target.id.startsWith('res_'))) {
      try {
        const saved = await api.resumes.duplicate(target._id || target.id);
        if (saved && saved._id) {
          cloned = {
            id: saved._id,
            _id: saved._id,
            title: saved.title,
            updatedAt: saved.updatedAt,
            data: sanitizeResumeData(saved.data),
          };
        }
      } catch (e) {
        console.warn('Cloud duplicate failed, cloning locally:', e);
      }
    }

    setResumes(prev => [cloned, ...prev]);
    return cloned.id;
  };

  const deleteResume = async (id) => {
    if (resumes.length <= 1) {
      alert('You must keep at least one resume.');
      return;
    }

    const target = resumes.find(r => r.id === id);
    if (isAuthenticated && target && (target._id || !target.id.startsWith('res_'))) {
      try {
        await api.resumes.delete(target._id || target.id);
      } catch (e) {
        console.warn('Cloud delete failed:', e);
      }
    }

    setResumes(prev => {
      const filtered = prev.filter(r => r.id !== id);
      if (activeResumeId === id) {
        setActiveResumeId(filtered[0]?.id || 'res_default');
      }
      return filtered;
    });
  };

  const switchResume = (id) => {
    const exists = resumes.find(r => r.id === id);
    if (exists) {
      setActiveResumeId(id);
    }
  };

  const renameResume = (id, newTitle) => {
    if (!newTitle.trim()) return;
    setResumes(prev =>
      prev.map(r => (r.id === id ? { ...r, title: newTitle.trim(), updatedAt: new Date().toISOString() } : r))
    );
  };


  // Field updaters
  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...(prev.personalInfo || {}),
        [field]: value,
      },
    }));
  };

  const updateTheme = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      theme: {
        ...(prev.theme || {}),
        [field]: value,
      },
    }));
  };

  const toggleSectionVisibility = (section) => {
    setResumeData((prev) => ({
      ...prev,
      sectionVisibility: {
        ...(prev.sectionVisibility || {}),
        [section]: !prev.sectionVisibility?.[section],
      },
    }));
  };

  // Experience Handlers
  const addExperience = () => {
    const newExp = {
      id: 'exp-' + Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setResumeData((prev) => ({
      ...prev,
      experiences: [...(prev.experiences || []), newExp],
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: (prev.experiences || []).map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const deleteExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: (prev.experiences || []).filter((exp) => exp.id !== id),
    }));
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu = {
      id: 'edu-' + Date.now(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      score: '',
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...(prev.education || []), newEdu],
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: (prev.education || []).map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const deleteEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      education: (prev.education || []).filter((edu) => edu.id !== id),
    }));
  };

  // Projects Handlers
  const addProject = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: '',
      technologies: '',
      link: '',
      description: '',
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProj],
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      projects: (prev.projects || []).map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const deleteProject = (id) => {
    setResumeData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((proj) => proj.id !== id),
    }));
  };

  // Certifications Handlers
  const addCertification = () => {
    const newCert = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    setResumeData((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert],
    }));
  };

  const updateCertification = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const deleteCertification = (id) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((cert) => cert.id !== id),
    }));
  };

  // Languages Handlers - Synchronized with LanguageForm options
  const addLanguage = () => {
    const newLang = {
      id: 'lang-' + Date.now(),
      name: '',
      proficiency: 'Intermediate / Conversational',
      level: 50,
    };
    setResumeData((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), newLang],
    }));
  };

  const updateLanguage = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      languages: (prev.languages || []).map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const deleteLanguage = (id) => {
    setResumeData((prev) => ({
      ...prev,
      languages: (prev.languages || []).filter((lang) => lang.id !== id),
    }));
  };

  const setSkills = (skillsList) => {
    setResumeData((prev) => ({
      ...prev,
      skills: Array.isArray(skillsList) ? skillsList : [],
    }));
  };

  const resetToSample = () => {
    // Deep clone initialResumeData to guarantee a fresh copy that can never be mutated
    const freshSample = JSON.parse(JSON.stringify(initialResumeData));
    setResumeData(freshSample);
  };

  const importData = (newData) => {
    try {
      const sanitized = sanitizeResumeData(newData);
      setResumeData(sanitized);
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  };

  const clearAllData = () => {
    setResumeData({
      personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
        avatar: '',
        showAvatar: false,
        summary: '',
      },
      skills: [],
      experiences: [],
      education: [],
      projects: [],
      certifications: [],
      languages: [],
      sectionVisibility: {
        personalInfo: true,
        summary: true,
        experiences: true,
        education: true,
        skills: true,
        projects: true,
        certifications: true,
        languages: true,
      },
      theme: {
        template: 'modern',
        accentColor: '#2563eb',
        fontFamily: 'sans',
        paperBg: 'white',
        zoom: 'auto',
        fontSize: 'normal',
        margins: 'normal',
      }
    });
  };

  return (
    <ResumeContext.Provider
      value={{
        syncStatus,
        resumes,
        activeResumeId,
        activeResume,
        createResume,
        duplicateResume,
        deleteResume,
        switchResume,
        renameResume,
        resumeData,
        updatePersonalInfo,
        updateTheme,
        toggleSectionVisibility,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addProject,
        updateProject,
        deleteProject,
        addCertification,
        updateCertification,
        deleteCertification,
        addLanguage,
        updateLanguage,
        deleteLanguage,
        setSkills,
        resetToSample,
        clearAllData,
        importData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
