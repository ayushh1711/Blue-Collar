import express from 'express';
import { getAllServices, getServiceById, createService } from '../controllers/serviceController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', authenticate, authorize('ADMIN'), createService);

export default router;
