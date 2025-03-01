import { Router } from 'express';
import {
  createNewPlaylist,
  getUserPlaylists,
  addSongToUserPlaylist,
  getSongInPlaylists,
  removeSongFromPlaylist, getAllPlaylists, getPlaylistById
} from '../controllers/playlistController.js';
import { verifyToken } from '../middleware/auth.js';
import { uploadPlaylistImage } from '../config/multerConfig.js';
import { jwtAuthMiddleware } from "../middleware/jwtAuth.js";

const router = Router();

// Public routes
router.post('/playlists', verifyToken, uploadPlaylistImage.single('playlist_image'), createNewPlaylist);
router.post('/playlists/add-song', verifyToken, addSongToUserPlaylist);
router.get('/playlists/song/:songId', verifyToken, getSongInPlaylists);
router.get('/playlists', verifyToken, getUserPlaylists);
router.delete('/playlists/remove-song', verifyToken, removeSongFromPlaylist);

// Admin routes
const adminRouter = Router();
adminRouter.use(jwtAuthMiddleware);

adminRouter.get('/playlists', getAllPlaylists);
adminRouter.get('/playlists/:id', getPlaylistById);

router.use('/admin', adminRouter);


export default router;
