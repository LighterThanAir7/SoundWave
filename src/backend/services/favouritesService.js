import api from './api';

export const favouritesService = {
  async addToFavorites(songId) {
    try {
      const response = await api.post(`/api/favorites/songs/${songId}`);
      return response.data;
    } catch (error) {
      throw new Error('Greška pri dodavanju u favorite');
    }
  },

  async removeFromFavorites(songId) {
    try {
      const response = await api.delete(`/api/favorites/songs/${songId}`);
      return response.data;
    } catch (error) {
      throw new Error('Greška pri uklanjanju iz favorita');
    }
  },

  async getFavorites() {
    try {
      const response = await api.get('/api/favorites/songs');
      return response.data;
    } catch (error) {
      throw new Error('Greška pri dohvaćanju favorita');
    }
  }
};
