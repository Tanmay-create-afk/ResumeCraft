import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'My Professional Resume',
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    shareSlug: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    // The complete resume payload matching the frontend schema
    data: {
      personalInfo: {
        fullName: { type: String, default: '' },
        jobTitle: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        website: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        avatar: { type: String, default: '' },
        showAvatar: { type: Boolean, default: false },
        summary: { type: String, default: '' },
      },
      skills: [{ type: String }],
      experiences: [
        {
          id: { type: String },
          jobTitle: { type: String, default: '' },
          company: { type: String, default: '' },
          location: { type: String, default: '' },
          startDate: { type: String, default: '' },
          endDate: { type: String, default: '' },
          current: { type: Boolean, default: false },
          description: { type: String, default: '' },
        },
      ],
      education: [
        {
          id: { type: String },
          degree: { type: String, default: '' },
          institution: { type: String, default: '' },
          location: { type: String, default: '' },
          startDate: { type: String, default: '' },
          endDate: { type: String, default: '' },
          score: { type: String, default: '' },
        },
      ],
      projects: [
        {
          id: { type: String },
          name: { type: String, default: '' },
          technologies: { type: String, default: '' },
          link: { type: String, default: '' },
          description: { type: String, default: '' },
        },
      ],
      certifications: [
        {
          id: { type: String },
          name: { type: String, default: '' },
          issuer: { type: String, default: '' },
          date: { type: String, default: '' },
        },
      ],
      languages: [
        {
          id: { type: String },
          language: { type: String, default: '' },
          proficiency: { type: String, default: 'Proficient' },
        },
      ],
      sectionVisibility: {
        personalInfo: { type: Boolean, default: true },
        summary: { type: Boolean, default: true },
        experiences: { type: Boolean, default: true },
        education: { type: Boolean, default: true },
        skills: { type: Boolean, default: true },
        projects: { type: Boolean, default: true },
        certifications: { type: Boolean, default: true },
        languages: { type: Boolean, default: true },
      },
      theme: {
        template: { type: String, default: 'modern' },
        accentColor: { type: String, default: '#2563eb' },
        fontFamily: { type: String, default: 'sans' },
        paperBg: { type: String, default: 'white' },
        zoom: { type: Number, default: 100 },
        fontSize: { type: String, default: 'normal' },
        margins: { type: String, default: 'normal' },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
