import {
  getArtistsModel,
  getArtistByIdModel,
} from "../models/artistModel.js";

export const getArtists = async (req, res) => {
  try {
    const artists = await getArtistsModel();
    res.json({
      message: "Artists retrieved successfully",
      artists
    });
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({
      message: "Error fetching artists",
      error: error.message
    });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const artistId = req.params.id;
    const artist = await getArtistByIdModel(artistId);

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found"
      });
    }

    res.json({
      message: "Artist retrieved successfully",
      artist
    });
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({
      message: "Error fetching artist",
      error: error.message
    });
  }
};