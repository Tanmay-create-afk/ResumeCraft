import { GoogleGenAI } from '@google/genai';

/**
 * Helper to call Google Gemini API if GEMINI_API_KEY is configured in .env.
 * If no key is set, returns null so smart fallback rules take over seamlessly.
 */
export const callGeminiIfAvailable = async (prompt, systemInstruction = '') => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: systemInstruction ? { systemInstruction } : undefined,
    });
    return response.text?.trim() || null;
  } catch (error) {
    console.warn('Gemini API call warning (falling back to smart algorithms):', error.message);
    return null;
  }
};

/**
 * Powerful rule-based bullet point polisher.
 * Converts weak verbs and passive descriptions into high-impact, ATS-optimized action bullets.
 */
export const enhanceBulletRuleBased = (text, role = '') => {
  if (!text || !text.trim()) return text;

  let clean = text.trim();
  // Strip existing bullet symbols if any
  clean = clean.replace(/^[•\-\*]\s*/, '');

  const strongVerbs = [
    'Spearheaded', 'Architected', 'Engineered', 'Optimized',
    'Streamlined', 'Pioneered', 'Orchestrated', 'Accelerated',
    'Formulated', 'Delivered', 'Automated'
  ];

  // Common weak phrases and their powerful replacements
  const replacements = [
    { regex: /^(i\s+)?(worked\s+on|was\s+responsible\s+for|helped\s+with|handled)\s+/i, replace: 'Engineered ' },
    { regex: /^(i\s+)?(made|created|built)\s+/i, replace: 'Architected ' },
    { regex: /^(i\s+)?(fixed\s+bugs|resolved\s+issues)\s+/i, replace: 'Resolved critical production anomalies and optimized system stability for ' },
    { regex: /^(i\s+)?(managed|led)\s+/i, replace: 'Spearheaded cross-functional delivery of ' },
    { regex: /^(i\s+)?(tested|checked)\s+/i, replace: 'Authored comprehensive automated test suites and validation pipelines for ' },
    { regex: /^(i\s+)?(updated|changed)\s+/i, replace: 'Modernized core architecture and modernized workflows for ' },
  ];

  let enhanced = clean;
  let matched = false;

  for (const item of replacements) {
    if (item.regex.test(enhanced)) {
      enhanced = enhanced.replace(item.regex, item.replace);
      matched = true;
      break;
    }
  }

  if (!matched) {
    // If it starts with a lowercase word or non-verb, prepend an active verb
    const firstWord = enhanced.split(' ')[0];
    if (firstWord && firstWord.toLowerCase() === firstWord && !firstWord.endsWith('ed')) {
      const randomVerb = strongVerbs[Math.floor(Math.random() * strongVerbs.length)];
      enhanced = `${randomVerb} ${enhanced.charAt(0).toLowerCase() + enhanced.slice(1)}`;
    }
  }

  // Ensure quantified impact phrasing if completely missing metrics
  if (!/\d+%|\$\d+|\d+\+|\d+x/i.test(enhanced)) {
    const metrics = [
      'resulting in 35% improved turnaround time',
      'reducing latency and overhead by 28%',
      'accelerating release velocity across key milestones',
      'achieving 99.9% uptime across production environments'
    ];
    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    if (!enhanced.endsWith('.')) enhanced += ', ';
    else enhanced = enhanced.slice(0, -1) + ', ';
    enhanced += metric + '.';
  } else if (!enhanced.endsWith('.')) {
    enhanced += '.';
  }

  return `• ${enhanced}`;
};

/**
 * Intelligent Rule-based Professional Bio Summary Generator
 */
export const generateSummaryRuleBased = ({ jobTitle, skills = [], experienceYears = '4+' }) => {
  const role = jobTitle || 'Software Engineer';
  const topSkills = Array.isArray(skills) && skills.length > 0
    ? skills.slice(0, 5).join(', ')
    : 'modern scalable frameworks, system design, and API architectures';

  return `Results-driven and performance-focused ${role} with ${experienceYears} years of proven expertise delivering high-impact solutions in ${topSkills}. Track record of architecting resilient platforms, optimizing developer workflows, and aligning technical execution with strategic product goals. Passionate about engineering clean, maintainable systems that scale to millions of users while maintaining 99.9% reliability.`;
};

/**
 * Advanced Job Description ATS Keyword Scanner & Match Analyzer
 */
export const analyzeATSJobMatch = (resumeData, jobDescription) => {
  if (!jobDescription || !jobDescription.trim()) {
    return {
      matchScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
      recommendations: ['Please paste a job description to run the ATS scanner.'],
    };
  }

  // Common tech & professional keywords taxonomy
  const commonKeywords = [
    'react', 'react.js', 'react 19', 'next.js', 'typescript', 'javascript', 'node.js', 'nodejs',
    'python', 'java', 'golang', 'go', 'c++', 'rust', 'c#', '.net', 'sql', 'postgresql', 'postgres',
    'mongodb', 'redis', 'graphql', 'rest api', 'restful', 'docker', 'kubernetes', 'k8s', 'aws',
    'amazon web services', 'azure', 'gcp', 'google cloud', 'ci/cd', 'git', 'github', 'agile',
    'scrum', 'jira', 'microservices', 'system design', 'distributed systems', 'unit testing',
    'jest', 'cypress', 'playwright', 'tailwind', 'tailwind css', 'css3', 'html5', 'redux',
    'leadership', 'mentorship', 'communication', 'cross-functional', 'problem solving',
    'optimization', 'performance', 'security', 'scalability', 'data structures', 'algorithms'
  ];

  const jdText = jobDescription.toLowerCase();
  
  // Extract all resume text into a single lowercase corpus
  const resumeCorpus = [
    resumeData.personalInfo?.fullName || '',
    resumeData.personalInfo?.jobTitle || '',
    resumeData.personalInfo?.summary || '',
    ...(resumeData.skills || []),
    ...(resumeData.experiences || []).map(e => `${e.jobTitle} ${e.company} ${e.description}`),
    ...(resumeData.education || []).map(ed => `${ed.degree} ${ed.institution}`),
    ...(resumeData.projects || []).map(p => `${p.name} ${p.technologies} ${p.description}`),
    ...(resumeData.certifications || []).map(c => `${c.name} ${c.issuer}`),
  ].join(' ').toLowerCase();

  const escapeRegex = (s) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

  // Find keywords present in the JD
  const jdKeywords = new Set();

  commonKeywords.forEach(kw => {
    // Word boundary match safely escaped
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escapeRegex(kw)}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (regex.test(jdText)) {
      jdKeywords.add(kw);
    }
  });

  // Also extract capitalized acronyms / technical phrases from JD (e.g. CI/CD, AWS, S3, API)
  const technicalRegex = /\b[A-Z]{2,6}\b/g;
  const rawAcronyms = jobDescription.match(technicalRegex) || [];
  rawAcronyms.forEach(acronym => {
    if (!['THE', 'AND', 'FOR', 'WITH', 'YOU', 'OUR', 'NOT', 'ARE'].includes(acronym)) {
      jdKeywords.add(acronym.toLowerCase());
    }
  });

  const matchedKeywords = [];
  const missingKeywords = [];

  jdKeywords.forEach(kw => {
    const kwRegex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escapeRegex(kw)}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (kwRegex.test(resumeCorpus)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const total = jdKeywords.size || 1;
  const matchScore = Math.min(100, Math.round((matchedKeywords.length / total) * 100));

  const recommendations = [];
  if (missingKeywords.length > 0) {
    recommendations.push(
      `Add these high-priority keywords from the job posting into your Skills or Experience bullets: ${missingKeywords.slice(0, 6).join(', ')}`
    );
  }
  if (!resumeData.personalInfo?.summary || resumeData.personalInfo.summary.length < 50) {
    recommendations.push('Strengthen your Professional Summary with 2-3 target keywords from the job description.');
  }
  if ((resumeData.experiences || []).length < 2) {
    recommendations.push('ATS parsers favor resumes with at least 2 detailed experience entries with quantified metrics.');
  }
  if (matchScore >= 80) {
    recommendations.push('Outstanding job match! Your resume contains over 80% of required keywords and is primed for automated recruiter screeners.');
  } else if (matchScore >= 55) {
    recommendations.push('Good foundational match. Integrating the missing keywords above will significantly boost ATS screening ranking.');
  } else {
    recommendations.push('Low keyword density for this specific role. Tailor your skills section to better mirror the employer vocabulary.');
  }

  return {
    matchScore,
    matchedKeywords,
    missingKeywords,
    recommendations,
  };
};
