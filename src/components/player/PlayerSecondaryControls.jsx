import PlayerQueue from "./PlayerQueue.jsx";
import PlayerLyrics from "./PlayerLyrics.jsx";
import PlayerDownload from "./PlayerDownload.jsx";
import PlayerVolumeBar from "./PlayerVolumeBar.jsx";

export default function PlayerSecondaryControls () {
  return (
    <div className="player__secondary-controls">
      <PlayerQueue/>
      <PlayerLyrics/>
      <PlayerDownload/>
      <PlayerVolumeBar/>
    </div>
  )
}