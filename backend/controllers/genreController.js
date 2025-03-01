import {
  getGenresModel,
  getGenreByIdModel,
/*  createGenreModel,
  updateGenreModel,
  deleteGenreModel*/
} from '../models/genreModel.js';

export const getGenres = async (req, res) => {
  try {
    const genres = await getGenresModel();
    res.json({
      message: "Genres retrieved successfully",
      genres
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({
      message: "Error fetching genres",
      error: error.message
    });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const genreId = req.params.id;
    const genre = await getGenreByIdModel(genreId);

    if (!genre) {
      return res.status(404).json({
        message: "Genre not found"
      });
    }

    res.json({
      message: "Genre retrieved successfully",
      genre
    });
  } catch (error) {
    console.error('Error fetching genre:', error);
    res.status(500).json({
      message: "Error fetching genre",
      error: error.message
    });
  }
};

/*
export const createGenre = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Genre name is required"
      });
    }

    // Handle image upload if present
    const image_path = req.file ? `/uploads/genres/${req.file.filename}` : null;

    const genreData = {
      name,
      image_path
    };

    const genreId = await createGenreModel(genreData);

    res.status(201).json({
      message: "Genre created successfully",
      genreId
    });
  } catch (error) {
    console.error('Error creating genre:', error);
    res.status(500).json({
      message: "Error creating genre",
      error: error.message
    });
  }
};

export const updateGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Genre name is required"
      });
    }

    // Handle image upload if present
    const image_path = req.file ? `/uploads/genres/${req.file.filename}` : req.body.image_path;

    const genreData = {
      name,
      image_path
    };

    const success = await updateGenreModel(genreId, genreData);

    if (!success) {
      return res.status(404).json({
        message: "Genre not found or no changes made"
      });
    }

    res.json({
      message: "Genre updated successfully"
    });
  } catch (error) {
    console.error('Error updating genre:', error);
    res.status(500).json({
      message: "Error updating genre",
      error: error.message
    });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const success = await deleteGenreModel(genreId);

    if (!success) {
      return res.status(404).json({
        message: "Genre not found"
      });
    }

    res.json({
      message: "Genre deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting genre:', error);
    res.status(500).json({
      message: "Error deleting genre",
      error: error.message
    });
  }
};*/
