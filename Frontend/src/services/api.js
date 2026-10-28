/**
 * ResumeCraft API Service
 * Supports MongoDB Atlas backend with seamless local-first offline fallback.
 */

// In production, always use same-domain relative paths '' so requests go directly to the unified Vercel serverless backend with zero CORS issues
const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || 'http://localhost:5000')
  : '';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Authentication
  auth: {
    async login(email, password) {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      return data;
    },

    async register(name, email, password) {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      return data;
    },

    async getMe() {
      const token = localStorage.getItem('token');
      if (!token) return null;
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    },
  },

  // Resumes
  resumes: {
    async getAll() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/resumes`, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) {
          throw new Error('Failed to fetch resumes from backend');
        }
        return await res.json();
      } catch (err) {
        console.warn('Backend fetch failed, falling back to local cache:', err.message);
        const raw = localStorage.getItem('resumecraft_resumes_list_v1');
        return raw ? JSON.parse(raw) : [];
      }
    },

    async save(resume) {
      try {
        const id = resume._id || (resume.id && !resume.id.startsWith('res_') ? resume.id : null);
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_BASE_URL}/api/resumes/${id}` : `${API_BASE_URL}/api/resumes`;

        const res = await fetch(url, {
          method,
          headers: getAuthHeaders(),
          body: JSON.stringify({
            title: resume.title,
            data: resume.data,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to save resume');
        }
        return await res.json();
      } catch (err) {
        console.warn('Backend save failed:', err.message);
        return { ...resume, updatedAt: new Date().toISOString() };
      }
    },

    async delete(id) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/resumes/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error('Failed to delete resume');
        return await res.json();
      } catch (err) {
        console.warn('Backend delete failed:', err.message);
        return { success: false, error: err.message };
      }
    },

    async duplicate(id) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/resumes/${id}/duplicate`, {
          method: 'POST',
          headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error('Failed to duplicate resume');
        return await res.json();
      } catch (err) {
        console.warn('Backend duplicate failed:', err.message);
        return null;
      }
    },

    async toggleShare(id, isPublic) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/resumes/${id}/share`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ isPublic }),
        });
        if (!res.ok) throw new Error('Failed to update share status');
        return await res.json();
      } catch (err) {
        console.warn('Backend share toggle failed:', err.message);
        return { isPublic: false, shareSlug: null };
      }
    },

    async getPublic(shareSlug) {
      const res = await fetch(`${API_BASE_URL}/api/resumes/public/${shareSlug}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Public resume not found');
      }
      return await res.json();
    },
  },

  // AI & ATS Services
  ai: {
    async enhanceBullet(bulletText, jobTitle = '') {
      try {
        const res = await fetch(`${API_BASE_URL}/api/ai/enhance-bullet`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ bulletText, jobTitle }),
        });
        if (!res.ok) throw new Error('Failed to enhance bullet point');
        return await res.json();
      } catch (err) {
        console.warn('API enhance bullet failed, using client fallback:', err.message);
        // Clean fallback
        return {
          enhancedText: `• Spearheaded ${bulletText.replace(/^[•\-\*]\s*/, '')}, resulting in 30% improved efficiency and workflow performance.`,
          source: 'local-fallback',
        };
      }
    },

    async generateSummary(jobTitle, skills = [], experienceYears = '4+') {
      try {
        const res = await fetch(`${API_BASE_URL}/api/ai/generate-summary`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ jobTitle, skills, experienceYears }),
        });
        if (!res.ok) throw new Error('Failed to generate summary');
        return await res.json();
      } catch (err) {
        console.warn('API generate summary failed, using fallback:', err.message);
        return {
          summary: `Results-oriented ${jobTitle || 'Professional'} with proven success delivering high-impact initiatives in ${skills.slice(0, 4).join(', ') || 'modern scalable systems'}. Experienced in architecting robust solutions, collaborating across cross-functional teams, and achieving operational excellence.`,
          source: 'local-fallback',
        };
      }
    },

    async scanATSJobMatch(resumeData, jobDescription) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/ai/ats-scan`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ resumeData, jobDescription }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || 'Failed to scan job description');
        }
        return await res.json();
      } catch (err) {
        console.warn('API ATS scan failed, using client fallback:', err.message);
        const jdLower = (jobDescription || '').toLowerCase();
        const techPool = [
          'react', 'typescript', 'javascript', 'node.js', 'python', 'java', 'c++', 'aws', 'docker',
          'kubernetes', 'graphql', 'sql', 'nosql', 'mongodb', 'postgresql', 'ci/cd', 'git', 'rest api',
          'agile', 'microservices', 'html', 'css', 'tailwind', 'next.js', 'vue', 'angular', 'redux',
          'redis', 'gcp', 'azure', 'linux', 'testing', 'jest', 'cypress'
        ];
        const jdKeywords = techPool.filter(kw => jdLower.includes(kw));
        const resumeText = JSON.stringify(resumeData || {}).toLowerCase();
        const matchedKeywords = jdKeywords.filter(kw => resumeText.includes(kw));
        const missingKeywords = jdKeywords.filter(kw => !resumeText.includes(kw));
        const matchScore = jdKeywords.length > 0 ? Math.round((matchedKeywords.length / jdKeywords.length) * 100) : 85;

        return {
          matchScore,
          matchedKeywords,
          missingKeywords,
          recommendations: [
            missingKeywords.length > 0
              ? `Consider integrating these target keywords into your skills or experience: ${missingKeywords.slice(0, 5).join(', ')}`
              : 'Strong keyword alignment detected for this position.',
            'Ensure your work experience bullet points emphasize quantified business metrics (e.g. %, $, time saved).',
            'Tailor your professional summary to mirror the employer’s technical priorities.'
          ],
          source: 'local-fallback',
        };
      }
    },

    async parseResumePdf(file) {
      const formData = new FormData();
      formData.append('resumePdf', file);

      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/ai/parse-resume-pdf`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to parse resume PDF');
      }
      return await res.json();
    },
  },
};

export default api;
