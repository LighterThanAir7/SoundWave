import { usePlayer } from '../../context/PlayerContext';
import { useState, useEffect, useRef } from 'react';
import api from '../../../backend/config/axiosConfig.js';

export default function PlayerTrack() {
  const { currentSong } = usePlayer();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const songTitleRef = useRef(null);
  const containerRef = useRef(null);

  // Provjera omiljenih pjesama
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!currentSong) return;

      try {
        const response = await api.get('/api/favorites');
        const favorites = response.data.favorites;
        setIsFavorite(favorites.some(fav => fav.id === currentSong.id));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [currentSong]);

  // Provjera prelijevanja teksta
  useEffect(() => {
    if (!songTitleRef.current || !containerRef.current) return;

    const isTextOverflowing =
      songTitleRef.current.scrollWidth > containerRef.current.offsetWidth;
    setIsOverflowing(isTextOverflowing);
  }, [currentSong]);

  // Rukovanje klikom na omiljene pjesme
  const handleFavoriteClick = async () => {
    if (!currentSong) return;

    try {
      if (isFavorite) {
        await api.delete(`/api/favorites/${currentSong.id}`);
      } else {
        await api.post('/api/favorites', { songId: currentSong.id });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="player__track">
      <div className="player__song-title-container" ref={containerRef}>
        <p
          className={`player__song-title ${isOverflowing ? 'scrolling' : ''}`}
          ref={songTitleRef}
        >
          {currentSong?.title || 'No song playing'}
        </p>
        <p className="player__artist">{currentSong?.artist || 'Unknown artist'}</p>
      </div>
      <i
        className={isFavorite ? "icon-heart-fill" : "icon-heart_outline"}
        onClick={handleFavoriteClick}
      ></i>
    </div>
  );
}
