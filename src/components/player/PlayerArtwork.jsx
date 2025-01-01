import { usePlayer } from '../../context/PlayerContext';
import TestArtwork from "../../assets/Test.png";

export default function PlayerArtwork () {
  const { currentSong } = usePlayer();

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
        src={currentSong ? getImagePath(currentSong.artwork_path) : TestArtwork}
        alt={currentSong?.title || 'Default artwork'}
      />
    </div>
  )
}