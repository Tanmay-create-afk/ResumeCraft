import express from 'express';
import {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  toggleShareResume,
  getPublicResume,
} from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to view a shared resume portfolio
router.get('/public/:shareSlug', getPublicResume);

// All other resume routes require JWT authentication
router.use(protect);

router.route('/')
  .get(getResumes)
  .post(createResume);

router.route('/:id')
  .get(getResumeById)
  .put(updateResume)
  .delete(deleteResume);

router.post('/:id/duplicate', duplicateResume);
router.post('/:id/share', toggleShareResume);

export default router;
