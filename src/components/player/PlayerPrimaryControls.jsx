import { usePlayer } from '../../context/PlayerContext';
import PlayerPlayPause from "./PlayerPlayPause.jsx";
import PlayerShuffle from "./PlayerShuffle.jsx";
import PlayerRepeat from "./PlayerRepeat.jsx";
import PlayerPreviousSong from "./PlayerPreviousSong.jsx";
import PlayerNextSong from "./PlayerNextSong.jsx";

export default function PlayerPrimaryControls() {
  const { showMessage, controlMessage } = usePlayer();

  return (
    <div className="player__primary-controls">
      {showMessage && (
        <p className="player__primary-controls-message">
          {controlMessage}
        </p>
      )}

      <PlayerShuffle />

      <div className="player__primary-controls-mid">
        <PlayerPreviousSong />
        <PlayerPlayPause />
        <PlayerNextSong />
      </div>

      <PlayerRepeat />
    </div>
  );
}