import { getAllSongs, getSongByIdModel } from '../models/songModel.js';
import path from "path";

export const getSongs = async (req, res) => {
  try {
    const songs = await getAllSongs();
    res.json({
      message: "Songs retrieved successfully",
      songs
    });
    console.log(songs);

  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({
      message: "Error fetching songs",
      error: error.message
    });
  }
};

export const getSongById = async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await getSongByIdModel(songId);

    if (!song) {
      return res.status(404).json({message: "Song not found"});
    }

    res.json({
      message: `Song retrieved successfully`,
      song
    });

    console.log(song);
  } catch (error) {
    console.log('Error fetching song:', error);
    res.status(500).json({
      message: "Error fetching songs",
      error: error.message
    });
  }
};

export const downloadSong = async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await getSongById(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    const filePath = path.join(process.cwd(), '..', '..', 'uploads', 'songs', song.file_path);

    console.log(filePath);

    res.sendFile(filePath, {
      headers: {
        'Content-Type': `audio/${song.file_format}`,
        'Content-Disposition': `attachment; filename="${song.artist} - ${song.title}.${song.file_format}"`
      }
    });

  } catch (error) {
    console.error('Error downloading song:', error);
    res.status(500).json({
      message: "Error downloading song",
      error: error.message
    });
  }
};