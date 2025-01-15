import { useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { useColorManagement } from '../../hooks/useColorManagement';
import TestArtwork from "../../assets/Test.png";

export default function PlayerArtwork() {
  const { currentSong } = usePlayer();
  const imageRef = useRef(null);

  useColorManagement(imageRef);

  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('/src/assets')) {
      return imagePath;
    }
    return `/uploads/songs/${imagePath}`;
  };

  return (
    <div className="player__artwork">
      <img
        ref={imageRef}
        crossOrigin="anonymous"
        src={currentSong ? getImagePath(currentSong.artwork_path) : TestArtwork}
        alt={currentSong?.title || 'Default artwork'}
      />
    </div>
  );
}