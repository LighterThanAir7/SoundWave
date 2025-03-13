import PlayerHeading from "./PlayerHeading.jsx";
import PlayerProgress from "./PlayerProgress.jsx";
import PlayerTrack from "./PlayerTrack.jsx";
import PlayerArtwork from "./PlayerArtwork.jsx";
import PlayerSecondaryControls from "./PlayerSecondaryControls.jsx";

export default function Player () {
  return (
    <div className="player">
      <PlayerHeading />
      <div className="player__bottom-half">
        <div className="player__artwork-track">
          <PlayerArtwork />
          <PlayerTrack />
        </div>
        <PlayerProgress />
        <PlayerSecondaryControls />
      </div>
    </div>
  )
}