import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  acceptBooking,
  rejectBooking,
  updateBookingStatus,
  cancelBooking
} from '../controllers/bookingController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('CUSTOMER'), createBooking);
router.get('/', authenticate, getBookings);
router.get('/:id', authenticate, getBookingById);
router.patch('/:id/accept', authenticate, authorize('PROVIDER'), acceptBooking);
router.patch('/:id/reject', authenticate, authorize('PROVIDER'), rejectBooking);
router.patch('/:id/status', authenticate, authorize('PROVIDER'), updateBookingStatus);
router.delete('/:id', authenticate, authorize('CUSTOMER'), cancelBooking);

export default router;
