import { useRef, useEffect } from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";

export default function PlayerVolumeBar() {
  const {
    toggleVolumeBar,
    showVolumeBar,
    volume,
    handleVolumeChange,
  } = usePlayer();

  const volumeBarRef = useRef(null);
  const volumeIconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showVolumeBar &&
        volumeBarRef.current &&
        !volumeBarRef.current.contains(event.target) &&
        volumeIconRef.current &&
        !volumeIconRef.current.contains(event.target)
      ) {
        toggleVolumeBar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVolumeBar, toggleVolumeBar]);

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