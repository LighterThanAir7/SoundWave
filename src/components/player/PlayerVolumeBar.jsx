import { useRef } from "react";
import {usePlayer} from "../../context/PlayerContext.jsx";
export default function PlayerVolumeBar() {
  const {
    toggleVolumeBar,
    showVolumeBar,
    volume,
    handleVolumeChange,
  } = usePlayer();

  const volumeBarRef = useRef(null);
  const volumeIconRef = useRef(null);

  return (
    <div className="relative">
      <i
        className="icon-volume-medium"
        ref={volumeIconRef}
        onClick={toggleVolumeBar}
      ></i>
      <div
        className={`player__volume-bar ${showVolumeBar ? "show" : ""}`}
        ref={volumeBarRef}
      >
        <input
          type="range"
          id="volume-slider"
          className="player__volume-bar-slider"
          value={volume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          min="0"
          max="100"
          style={{
            backgroundImage: `linear-gradient(90deg, var(--clr-primary-400) ${volume}%, #222 ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
}