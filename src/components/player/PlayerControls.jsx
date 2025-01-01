import { usePlayer } from '../../context/PlayerContext';
import {useEffect, useRef, useState} from 'react';

export default function PlayerControls() {
  const { isPlaying, playSong, pauseSong, currentSong, volume, handleVolumeChange } = usePlayer();
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const volumeBarRef = useRef(null);
  const volumeIconRef = useRef(null);

  const handlePlayPause = () => {
    if (currentSong) {
      if (isPlaying) {
        pauseSong();
      } else {
        playSong(currentSong);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (volumeBarRef.current &&
        !volumeBarRef.current.contains(event.target) &&
        !volumeIconRef.current.contains(event.target)) {
        setShowVolumeBar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleVolumeBar = () => {
    setShowVolumeBar(!showVolumeBar);
  };

  return (
    <>
      <div className="player__primary-controls">
        <i className="icon-shuffle"></i>
        <div className="player__primary-controls-mid">
          <i className="icon-previous"></i>
          <i
            className={isPlaying ? "icon-pause" : "icon-play"}
            onClick={handlePlayPause}
          ></i>
          <i className="icon-next"></i>
        </div>
        <i className="icon-repeat"></i>
      </div>

      <div className="player__secondary-controls">
        <i className="icon-queue_music"></i>
        <div className="player-queue">
          <div className="player-queue__header">
            <span className="player-queue__title">Queue</span>
            <i className="icon-x"></i>
          </div>
          <ul className="player-queue__list">
            {/* Javascript List Generated */}
            <li data-index="${i + 1}" className="player-queue__item">
              <img className="player-queue__artwork-img"
                   src="" alt=""/>
              <div className="player-queue__song-info">
                <h5 className="player-queue__song-name">{/*${playerItemsList[i].name}*/}</h5>
                <p className="player-queue__artist">{/*${playerItemsList[i].artist}*/}<span>&nbsp•&nbsp</span><span
                  className="player-queue__time">{/*${playerItemsList[i].duration}*/}</span></p>
              </div>
              <i className="icon-grip-lines"></i>
            </li>
          </ul>
        </div>

        <i className="icon-lyrics"></i>
        <i className="icon-download"></i>

        <div className="relative">
          <i className="icon-volume-medium" ref={volumeIconRef} onClick={toggleVolumeBar}></i>
          <div className={`player__volume-bar ${showVolumeBar ? 'show' : ''}`} ref={volumeBarRef}>
            <input
              type="range"
              id="volume-slider"
              className="player__volume-bar-slider"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              min="0"
              max="100"
              style={{
                backgroundImage: `linear-gradient(90deg, var(--clr-primary-400) ${volume}%, #222 ${volume}%)`
              }}
            />
          </div>
        </div>

      </div>
    </>
  );
}