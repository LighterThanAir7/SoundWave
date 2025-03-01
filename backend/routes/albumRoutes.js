import { Router } from 'express';
import { getAlbums, getAlbumById } from '../controllers/albumController.js';
import { jwtAuthMiddleware } from "../middleware/jwtAuth.js";

const router = Router();

// Javne rute
router.get('/albums', getAlbums);
router.get('/albums/:id', getAlbumById);

// Admin rute
const adminRouter = Router();
adminRouter.use(jwtAuthMiddleware);

adminRouter.get('/albums', getAlbums);
adminRouter.get('/albums/:id', getAlbumById);
// adminRouter.post('/albums', createAlbum);
// adminRouter.put('/albums/:id', updateAlbum);
// adminRouter.delete('/albums/:id', deleteAlbum);

router.use('/admin', adminRouter);

export default router;
