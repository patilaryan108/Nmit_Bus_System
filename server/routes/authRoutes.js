import express from 'express';
import { register, login, logout, getProfile, verifyToken } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.get('/verify', authenticate, verifyToken);

export default router;
