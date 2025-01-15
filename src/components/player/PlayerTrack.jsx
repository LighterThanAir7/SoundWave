import { usePlayer } from '../../context/PlayerContext';
import { useState, useEffect } from 'react';
import api from '../../backend/config/axiosConfig.js';

export default function PlayerTrack() {
  const { currentSong } = usePlayer();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!currentSong) return;

      try {
        // Updated endpoint to match server routes
        const response = await api.get('/api/favorites');
        const favorites = response.data.favorites;
        setIsFavorite(favorites.some(fav => fav.id === currentSong.id));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [currentSong]);

  const handleFavoriteClick = async () => {
    if (!currentSong) return;

    try {
      if (isFavorite) {
        // Updated endpoint to match server routes
        await api.delete(`/api/favorites/${currentSong.id}`);
      } else {
        // Updated endpoint to match server routes
        await api.post('/api/favorites', { songId: currentSong.id });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="player__track">
      <div className="overflow-hidden">
        <p className="player__song-title">{currentSong?.title || 'No song playing'}</p>
        <p className="player__artist">{currentSong?.artist || 'Unknown artist'}</p>
      </div>
      <i
        className={isFavorite ? "icon-heart-fill" : "icon-heart_outline"}
        onClick={handleFavoriteClick}
      ></i>
    </div>
  );
}