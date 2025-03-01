import { getFavorites, addFavorite, removeFavorite } from '../models/favouritesModel.js';

export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await getFavorites(userId);
    res.json({
      message: "Favorites retrieved successfully",
      favorites
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching favorites",
      error: error.message
    });
  }
};

export const addToFavorites = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    await addFavorite(userId, songId);
    res.json({ message: "Song added to favorites" });
  } catch (error) {
    res.status(500).json({
      message: "Error adding to favorites",
      error: error.message
    });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const { songId } = req.params;
    const userId = req.user.id;
    const removed = await removeFavorite(userId, songId);
    if (removed) {
      res.json({ message: "Song removed from favorites" });
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error removing from favorites",
      error: error.message
    });
  }
};