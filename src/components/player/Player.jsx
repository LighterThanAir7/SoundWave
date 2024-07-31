import PlayerHeading from "./PlayerHeading.jsx";
import PlayerControls from "./PlayerControls.jsx";
import PlayerProgress from "./PlayerProgress.jsx";
import PlayerTrack from "./PlayerTrack.jsx";
import PlayerArtwork from "./PlayerArtwork.jsx";

export default function Player () {
  return (
    <div className="player">
      <PlayerHeading />
      <PlayerArtwork />
      <PlayerTrack />
      <PlayerProgress />
      <PlayerControls />
    </div>
  )
}