import { usePlayer } from '../../context/PlayerContext';

export default function PlayerTrack() {
  const { currentSong } = usePlayer();

  return (
    <div className="flex align-items-center justify-space-between mb-16 g-8">
      <div className="overflow-hidden">
        <p className="player__song-title">{currentSong?.title || 'No song playing'}</p>
        <p className="player__artist">{currentSong?.artist || 'Unknown artist'}</p>
      </div>
      <i className="icon-heart_outline"></i>
    </div>
  );
}