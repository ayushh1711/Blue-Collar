import express from 'express';
import {
  getAllProviders,
  getProviderById,
  updateProviderProfile,
  toggleAvailability,
  updateLocation
} from '../controllers/providerController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProviders);
router.get('/:id', getProviderById);
router.patch('/profile', authenticate, authorize('PROVIDER'), updateProviderProfile);
router.patch('/availability', authenticate, authorize('PROVIDER'), toggleAvailability);
router.patch('/location', authenticate, authorize('PROVIDER'), updateLocation);

export default router;
