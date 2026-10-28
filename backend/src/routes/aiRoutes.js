import express from 'express';
import multer from 'multer';
import {
  enhanceBullet,
  generateSummary,
  scanJobMatch,
  parseResumePdf,
} from '../controllers/aiController.js';

const router = express.Router();

// Configure memory storage for in-memory PDF parsing (no leftover temp files on disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files (.pdf) are allowed'));
    }
  },
});

router.post('/enhance-bullet', enhanceBullet);
router.post('/generate-summary', generateSummary);
router.post('/ats-scan', scanJobMatch);
router.post('/parse-resume-pdf', upload.single('resumePdf'), parseResumePdf);

export default router;
