import Resume from '../models/Resume.js';
import crypto from 'crypto';

// @desc    Get all resumes for the authenticated user
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error.message);
    res.status(500).json({ message: 'Server error fetching resumes' });
  }
};

// @desc    Get a single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume by ID:', error.message);
    res.status(500).json({ message: 'Server error fetching resume' });
  }
};

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req, res) => {
  try {
    const { title, data } = req.body;

    const resume = await Resume.create({
      userId: req.user._id,
      title: title || 'Untitled Resume',
      data: data || {},
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error('Error creating resume:', error.message);
    res.status(500).json({ message: 'Server error creating resume' });
  }
};

// @desc    Update an existing resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req, res) => {
  try {
    const { title, data } = req.body;

    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (title) resume.title = title;
    if (data) resume.data = data;

    const updated = await resume.save();
    res.json(updated);
  } catch (error) {
    console.error('Error updating resume:', error.message);
    res.status(500).json({ message: 'Server error updating resume' });
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume removed successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error.message);
    res.status(500).json({ message: 'Server error deleting resume' });
  }
};

// @desc    Duplicate a resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
export const duplicateResume = async (req, res) => {
  try {
    const original = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!original) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const copyTitle = `${original.title} (Copy)`;
    const duplicated = await Resume.create({
      userId: req.user._id,
      title: copyTitle,
      data: original.data,
      isPublic: false,
    });

    res.status(201).json(duplicated);
  } catch (error) {
    console.error('Error duplicating resume:', error.message);
    res.status(500).json({ message: 'Server error duplicating resume' });
  }
};

// @desc    Toggle or create a public share link
// @route   POST /api/resumes/:id/share
// @access  Private
export const toggleShareResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const { isPublic } = req.body;
    resume.isPublic = typeof isPublic === 'boolean' ? isPublic : !resume.isPublic;

    if (resume.isPublic && !resume.shareSlug) {
      const cleanName = (resume.data?.personalInfo?.fullName || 'resume')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const randomId = crypto.randomBytes(3).toString('hex');
      resume.shareSlug = `${cleanName}-${randomId}`;
    }

    await resume.save();
    res.json({
      isPublic: resume.isPublic,
      shareSlug: resume.shareSlug,
      shareUrl: resume.isPublic ? `/u/${resume.shareSlug}` : null,
    });
  } catch (error) {
    console.error('Error sharing resume:', error.message);
    res.status(500).json({ message: 'Server error updating share status' });
  }
};

// @desc    Get public resume by shareSlug
// @route   GET /api/resumes/public/:shareSlug
// @access  Public
export const getPublicResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      shareSlug: req.params.shareSlug,
      isPublic: true,
    }).select('-userId');

    if (!resume) {
      return res.status(404).json({ message: 'Public resume not found or link has been disabled' });
    }

    res.json({
      title: resume.title,
      data: resume.data,
      updatedAt: resume.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching public resume:', error.message);
    res.status(500).json({ message: 'Server error fetching public resume' });
  }
};
