import { Router } from "express";
import { uploadSong } from '../config/multerConfig.js';
import { handleSingleSongUpload, handleBatchSongUpload } from '../controllers/uploadController.js';

const router = Router();

// Single song upload
router.post('/songs/single', uploadSong.single('file'), handleSingleSongUpload);

// Batch upload (folder)
router.post('/songs/batch', uploadSong.array('files', 5000), handleBatchSongUpload);

export default router;