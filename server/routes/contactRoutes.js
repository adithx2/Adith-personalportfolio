import express from 'express';
import {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
  getEnquiryStats,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Submit enquiry
router.post('/', createMessage);

// Protected (Admin): Get enquiry counts & statistics
router.get('/stats', protect, getEnquiryStats);

// Protected (Admin): List and filter enquiries
router.get('/', protect, getMessages);

// Protected (Admin): Update enquiry status (read, unread, archived)
router.patch('/:id', protect, updateMessageStatus);

// Protected (Admin): Delete enquiry
router.delete('/:id', protect, deleteMessage);

export default router;
