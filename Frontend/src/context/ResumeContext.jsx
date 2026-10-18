import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

const initialResumeData = {
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full Stack Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    showAvatar: true,
    summary: 'Passionate Full Stack Software Engineer with 5+ years of experience building scalable web applications, responsive user interfaces, and microservices architecture. Strong background in React, Node.js, and Cloud Infrastructure.',
  },
  skills: [
    'JavaScript (ES6+)',
    'TypeScript',
    'React.js',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Tailwind CSS',
    'REST APIs',
    'Git & GitHub',
    'Docker',
    'AWS'
  ],
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Senior Frontend Engineer',
      company: 'TechFlow Solutions',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      current: true,
      description: '• Architected and led the development of a real-time analytics dashboard used by 120,000+ daily active users.\n• Reduced page load times by 42% through code-splitting and asset optimization.\n• Mentored junior developers and instituted code review standards.',
    },
    {
      id: 'exp-2',
      jobTitle: 'Software Engineer',
      company: 'Apex Digital Labs',
      location: 'Austin, TX',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      current: false,
      description: '• Built full-stack internal tooling utilizing React, Node.js, and MongoDB.\n• Integrated Stripe payment gateways and third-party webhook notification pipelines.\n• Collaborated closely with UX designers to deliver responsive, accessible user interfaces.',
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2015',
      endDate: '2019',
      score: 'GPA: 3.8 / 4.0',
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevCollab - Realtime Code Workspace',
      technologies: 'React, WebSockets, Node.js, Redis',
      link: 'https://github.com/alexmorgan/devcollab',
      description: 'A collaborative real-time code editor with live syntax highlighting and instant peer communication.',
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
    { id: 'lang-3', name: 'French', proficiency: 'Elementary', level: 40 },
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
    zoom: 100, // Zoom percentage (75, 90, 100, 110, 125)
    fontSize: 'normal', // 'compact' | 'normal' | 'relaxed'
    margins: 'normal', // 'compact' | 'normal' | 'spacious'
  }
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resume_builder_data_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved resume data', e);
      }
    }
    return initialResumeData;
  });

  useEffect(() => {
    localStorage.setItem('resume_builder_data_v3', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateTheme = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [field]: value,
      },
    }));
  };

  const toggleSectionVisibility = (section) => {
    setResumeData((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [section]: !prev.sectionVisibility[section],
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
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const deleteExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
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
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const deleteEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Project Handlers
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
      projects: [...prev.projects, newProj],
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const deleteProject = (id) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
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
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const deleteCertification = (id) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  // Languages Handlers
  const addLanguage = () => {
    const newLang = {
      id: 'lang-' + Date.now(),
      name: '',
      proficiency: 'Conversational',
      level: 60,
    };
    setResumeData((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), newLang],
    }));
  };

  const updateLanguage = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const deleteLanguage = (id) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  const setSkills = (skillsList) => {
    setResumeData((prev) => ({
      ...prev,
      skills: skillsList,
    }));
  };

  const resetToSample = () => {
    setResumeData(initialResumeData);
  };

  const importData = (newData) => {
    try {
      setResumeData({
        ...initialResumeData,
        ...newData,
        personalInfo: { ...initialResumeData.personalInfo, ...(newData.personalInfo || {}) },
        theme: { ...initialResumeData.theme, ...(newData.theme || {}) },
        sectionVisibility: { ...initialResumeData.sectionVisibility, ...(newData.sectionVisibility || {}) },
        certifications: newData.certifications || initialResumeData.certifications,
        languages: newData.languages || initialResumeData.languages,
      });
      return true;
    } catch (e) {
      console.error(e);
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
        zoom: 100,
        fontSize: 'normal',
        margins: 'normal',
      }
    });
  };

  return (
    <ResumeContext.Provider
      value={{
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
