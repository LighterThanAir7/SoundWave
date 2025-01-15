import {
  createPlaylist,
  getPlaylistsByUser,
  addSongToPlaylist,
  getSongInPlaylistsQuerry,
  removeSongFromPlaylistQuery
} from '../models/playlistModel.js';

export const createNewPlaylist = async (req, res) => {
  try {
    const { name, description, type } = req.body;
    const created_by_id = req.user.id;

    // Handle image upload if present
    const image_url = req.file ? `/uploads/playlists/${req.file.filename}` : null;

    const playlistData = {
      name,
      created_by_id,
      description,
      type,
      image_url
    };

    const playlistId = await createPlaylist(playlistData);
    res.status(201).json({
      message: "Playlist created successfully",
      playlistId
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating playlist",
      error: error.message
    });
  }
};

export const getUserPlaylists = async (req, res) => {
  try {
    const userId = req.user.id;
    const playlists = await getPlaylistsByUser(userId);
    res.json({
      message: "Playlists retrieved successfully",
      playlists
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching playlists",
      error: error.message
    });
  }
};

export const addSongToUserPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const userId = req.user.id;

    await addSongToPlaylist(playlistId, songId, userId);
    res.json({ message: "Song added to playlist successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error adding song to playlist",
      error: error.message
    });
  }
};

export const getSongInPlaylists = async (req, res) => {
  try {
    const songId = req.params.songId;
    const userId = req.user.id;

    if (!songId || !userId) {
      return res.status(400).json({
        message: "Missing required parameters"
      });
    }

    const playlistIds = await getSongInPlaylistsQuerry(songId, userId);
    res.json({ playlistIds });
  } catch (error) {
    console.error('Error fetching song playlists:', error);
    res.status(500).json({
      message: "Error fetching song playlists",
      error: error.message
    });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const userId = req.user.id;
    await removeSongFromPlaylistQuery(playlistId, songId, userId);
    res.json({ message: "Song removed from playlist successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error removing song from playlist",
      error: error.message
    });
  }
};