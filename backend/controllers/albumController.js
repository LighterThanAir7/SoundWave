import {
  getAlbumsModel,
  getAlbumByIdModel
} from "../models/albumModel.js";

export const getAlbums = async (req, res) => {
  try {
    const albums = await getAlbumsModel();
    res.json({
      message: "Albums retrieved successfully",
      albums
    });
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({
      message: "Error fetching albums",
      error: error.message
    });
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await getAlbumByIdModel(albumId);

    if (!album) {
      return res.status(404).json({
        message: "Album not found"
      });
    }

    res.json({
      message: "Album retrieved successfully",
      album
    });
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({
      message: "Error fetching album",
      error: error.message
    });
  }
};