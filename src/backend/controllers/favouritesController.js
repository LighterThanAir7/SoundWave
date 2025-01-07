import FavouritesModel from '../models/favouritesModel.js';

class FavouritesController {
  async addToFavorites(req, res) {
    try {
      const userId = req.user.id; // Pretpostavljamo da imamo middleware za auth
      const { songId } = req.params;

      const result = await FavouritesModel.addToFavorites(userId, songId);

      if (result) {
        res.status(200).json({ message: 'Pjesma dodana u favorite' });
      } else {
        res.status(400).json({ message: 'Greška pri dodavanju u favorite' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Serverska greška' });
    }
  }

  async removeFromFavorites(req, res) {
    try {
      const userId = req.user.id;
      const { songId } = req.params;

      const result = await FavouritesModel.removeFromFavorites(userId, songId);

      if (result) {
        res.status(200).json({ message: 'Pjesma uklonjena iz favorita' });
      } else {
        res.status(400).json({ message: 'Greška pri uklanjanju iz favorita' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Serverska greška' });
    }
  }

  async getUserFavorites(req, res) {
    try {
      const userId = req.user.id;
      const favorites = await FavouritesModel.getUserFavorites(userId);
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ message: 'Serverska greška' });
    }
  }
}

export default new FavouritesController();
