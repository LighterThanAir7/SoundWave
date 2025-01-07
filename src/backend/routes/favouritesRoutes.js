import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import FavouritesController from '../controllers/favouritesController.js';

const router = Router();

router.use(verifyToken);

router.post('/songs/:songId', FavouritesController.addToFavorites);
router.delete('/songs/:songId', FavouritesController.removeFromFavorites);
router.get('/songs', FavouritesController.getUserFavorites);

export default router;