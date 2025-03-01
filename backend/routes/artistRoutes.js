import { Router } from 'express';
import { getArtistById, getArtists } from '../controllers/artistController.js';
import { jwtAuthMiddleware } from "../middleware/jwtAuth.js";

const router = Router();

// Javne rute

// Admin rute
const adminRouter = Router();
adminRouter.use(jwtAuthMiddleware);

adminRouter.get('/artists', getArtists);
adminRouter.get('/artists/:id', getArtistById);
// adminRouter.post('/artists', createArtist);
// adminRouter.put('/artists/:id', updateArtist);
// adminRouter.delete('/artists/:id', deleteArtist);

router.use('/admin', adminRouter);

export default router;
