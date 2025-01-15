import { Router } from 'express';
import {
  createNewPlaylist,
  getUserPlaylists,
  addSongToUserPlaylist,
  getSongInPlaylists,
  removeSongFromPlaylist
} from '../controllers/playlistController.js';
import { verifyToken } from '../middleware/auth.js';
import { uploadPlaylistImage } from '../config/multerConfig.js';

const router = Router();

router.post('/', verifyToken, uploadPlaylistImage.single('playlist_image'), createNewPlaylist);
router.post('/add-song', verifyToken, addSongToUserPlaylist);

router.get('/song/:songId', verifyToken, getSongInPlaylists);
router.get('/', verifyToken, getUserPlaylists);

router.delete('/remove-song', verifyToken, removeSongFromPlaylist);

export default router;
