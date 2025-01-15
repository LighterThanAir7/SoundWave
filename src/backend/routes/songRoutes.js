import { Router } from 'express';
import {downloadSong, getSongs} from '../controllers/songController.js';

const router = Router();

router.get('/songs', getSongs);
router.get('/songs/download/:id', downloadSong);

export default router;