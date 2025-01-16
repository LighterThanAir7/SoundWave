import { usePlayer } from "../../context/PlayerContext";
import {useColorManagement} from "../../hooks/useColorManagement.js";
import {useRef} from "react";

export default function PlayerPreviousSong() {
  const { playPreviousSong, previousSong } = usePlayer();
  const previousSongImageRef = useRef(null);

  useColorManagement(previousSongImageRef, true, {
    colorVariables: {
      border: '--previous-song-border',
      bgStart: '--previous-song-bg-start',
      bgEnd: '--previous-song-bg-end',
      header: '--previous-song-header'
    }
  });

  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('/src/assets')) {
      return imagePath;
    }
    return `/uploads/songs/${imagePath}`;
  };

  return (
    <>
      <i className="icon-previous" onClick={playPreviousSong}></i>
      {previousSong && (
        <div className="previous-song">
          <div className="previous-song__info">
            <span className="previous-song__header">Previous</span>
            <span className="previous-song__title">{previousSong.title}</span>
            {previousSong.artist && (
              <span className="previous-song__artist">{previousSong.artist}</span>
            )}
          </div>
          <div className="previous-song__img-container">
            <img
              ref={previousSongImageRef}
              className="previous-song__img"
              src={getImagePath(previousSong.artwork_path)}
              alt={previousSong.title || 'Previous song'}
              crossOrigin="anonymous"
            />
          </div>
        </div>
      )}
    </>
  );
}