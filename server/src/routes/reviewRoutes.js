import express from 'express';
import { createReview, getProviderReviews } from '../controllers/reviewController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('CUSTOMER'), createReview);
router.get('/provider/:id', getProviderReviews);

export default router;
