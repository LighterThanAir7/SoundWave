import { Router } from 'express';
import { getUserFavorites, addToFavorites, removeFromFavorites } from '../controllers/favouritesController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// Apply verifyToken middleware to all favorites routes
router.get('/', verifyToken, getUserFavorites);
router.post('/', verifyToken, addToFavorites);
router.delete('/:songId', verifyToken, removeFromFavorites);

export default router;