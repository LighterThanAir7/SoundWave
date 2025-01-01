import { getAllSongs } from '../models/songModel.js';

export const getSongs = async (req, res) => {
  try {
    const songs = await getAllSongs();
    res.json({
      message: "Songs retrieved successfully",
      songs: songs.map(song => ({
        id: song.id,
        title: song.title,
        duration: song.duration,
        file_size: song.file_size,
        file_path: song.file_path,
        artwork_path: song.artwork_path,
        created_on: new Date(song.created_on).toISOString().slice(0, 19).replace('T', ' '),
        artist: song.artist,
        genres: song.genres,
        collaborating_artists: song.collaborating_artists
      }))
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({
      message: "Error fetching songs",
      error: error.message
    });
  }
};
