import { Router } from 'express';
import { downloadSong, getSongs, getSongById } from '../controllers/songController.js';
import { jwtAuthMiddleware } from "../middleware/jwtAuth.js";

const router = Router();

// Public Routes
router.get('/songs', getSongs);
router.get('/songs/download/:id', downloadSong);


// Admin Routes
const adminRouter = Router();
adminRouter.use(jwtAuthMiddleware);

adminRouter.get('/songs', getSongs);
adminRouter.get('/songs/:id', getSongById);
// adminRouter.post('/songs', createSong);
// adminRouter.put('/songs/:id', updateSong);
// adminRouter.delete('/songs/:id', deleteSong);

router.use('/admin', adminRouter);

export default router;