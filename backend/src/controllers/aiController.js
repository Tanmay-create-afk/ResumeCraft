import {
  callGeminiIfAvailable,
  enhanceBulletRuleBased,
  generateSummaryRuleBased,
  analyzeATSJobMatch,
} from '../services/aiService.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

// @desc    Enhance a single experience bullet point with AI
// @route   POST /api/ai/enhance-bullet
// @access  Public / Protected
export const enhanceBullet = async (req, res) => {
  try {
    const { bulletText, jobTitle } = req.body;

    if (!bulletText || !bulletText.trim()) {
      return res.status(400).json({ message: 'Bullet text is required.' });
    }

    // Attempt Gemini call first
    const prompt = `You are a top executive tech recruiter and resume optimization expert. Transform this resume bullet point into a single high-impact, quantified, ATS-compliant bullet point using an active verb. Do not add conversational fluff or multiple bullets. Output only the improved bullet starting with "• ".
Role context: ${jobTitle || 'Professional'}
Original text: "${bulletText}"`;

    const aiResult = await callGeminiIfAvailable(prompt);

    if (aiResult) {
      return res.json({ enhancedText: aiResult.trim(), source: 'gemini' });
    }

    // Seamless fallback to intelligent algorithmic polisher
    const algorithmicResult = enhanceBulletRuleBased(bulletText, jobTitle);
    res.json({ enhancedText: algorithmicResult, source: 'algorithm' });
  } catch (error) {
    console.error('Error enhancing bullet:', error.message);
    res.status(500).json({ message: 'Error enhancing bullet point' });
  }
};

// @desc    Generate a tailored professional bio summary
// @route   POST /api/ai/generate-summary
// @access  Public / Protected
export const generateSummary = async (req, res) => {
  try {
    const { jobTitle, skills, experienceYears } = req.body;

    const prompt = `Write a compelling 3-4 sentence professional resume summary for a ${jobTitle || 'Professional'} specializing in ${(skills || []).join(', ')}. Highlight key strengths, system design/impact, and leadership. Output only the summary text without quotes or preamble.`;

    const aiResult = await callGeminiIfAvailable(prompt);

    if (aiResult) {
      return res.json({ summary: aiResult.trim(), source: 'gemini' });
    }

    const fallbackSummary = generateSummaryRuleBased({ jobTitle, skills, experienceYears });
    res.json({ summary: fallbackSummary, source: 'algorithm' });
  } catch (error) {
    console.error('Error generating summary:', error.message);
    res.status(500).json({ message: 'Error generating summary' });
  }
};

// @desc    Scan and match resume against a Job Description
// @route   POST /api/ai/ats-scan
// @access  Public / Protected
export const scanJobMatch = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ message: 'Job description is required.' });
    }

    const analysis = analyzeATSJobMatch(resumeData || {}, jobDescription);
    res.json(analysis);
  } catch (error) {
    console.error('Error running ATS scan:', error.message);
    res.status(500).json({ message: 'Error analyzing job description match' });
  }
};

// @desc    Parse an uploaded PDF resume and extract structured fields
// @route   POST /api/ai/parse-resume-pdf
// @access  Public / Protected
export const parseResumePdf = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    const dataBuffer = req.file.buffer;
    const parsed = await pdfParse(dataBuffer);
    const rawText = parsed.text || '';

    // Smart regex heuristic text extraction
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

    // Heuristic 1: Extract candidate name (usually top non-empty line)
    const fullName = lines[0] && lines[0].length < 40 ? lines[0] : '';

    // Heuristic 2: Extract email
    const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0] : '';

    // Heuristic 3: Extract phone number
    const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const phone = phoneMatch ? phoneMatch[0] : '';

    // Heuristic 4: Extract skills
    const knownSkills = [
      'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
      'Java', 'C++', 'Go', 'HTML', 'CSS', 'Tailwind', 'Tailwind CSS',
      'PostgreSQL', 'MongoDB', 'SQL', 'Redis', 'Docker', 'Kubernetes',
      'AWS', 'Git', 'GraphQL', 'REST', 'Linux', 'CI/CD', 'Figma'
    ];

    const extractedSkills = [];
    knownSkills.forEach(s => {
      const reg = new RegExp(`\\b${s.replace('.', '\\.')}\\b`, 'i');
      if (reg.test(rawText) && !extractedSkills.includes(s)) {
        extractedSkills.push(s);
      }
    });

    res.json({
      success: true,
      extractedData: {
        personalInfo: {
          fullName,
          email,
          phone,
          summary: lines.slice(1, 4).join(' ').substring(0, 300),
        },
        skills: extractedSkills,
        rawTextPreview: rawText.substring(0, 1000),
      },
    });
  } catch (error) {
    console.error('Error parsing PDF resume:', error.message);
    res.status(500).json({ message: 'Failed to extract text from PDF file.' });
  }
};
