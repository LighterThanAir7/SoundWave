import { Router } from 'express';
import { getGenres, getGenreById } from '../controllers/genreController.js';
import { jwtAuthMiddleware } from "../middleware/jwtAuth.js";
// import { uploadGenreImage } from '../config/multerConfig.js';

const router = Router();

// Javne rute
// router.get('/genres', getGenres);
// router.get('/genres/:id', getGenreById);

// Admin rute
const adminRouter = Router();
adminRouter.use(jwtAuthMiddleware);

adminRouter.get('/genres', getGenres);
adminRouter.get('/genres/:id', getGenreById);
// adminRouter.post('/genres', uploadGenreImage.single('image'), createGenre);
// adminRouter.put('/genres/:id', uploadGenreImage.single('image'), updateGenre);
// adminRouter.delete('/genres/:id', deleteGenre);

router.use('/admin', adminRouter);

export default router;