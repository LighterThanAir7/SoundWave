import { usePlayer } from '../../context/PlayerContext';
import { useRef } from 'react';
import { useColorManagement } from '../../hooks/useColorManagement';

export default function PlayerNextSong() {
  const { playNextSong, nextSong } = usePlayer();
  const nextSongImageRef = useRef(null);

  useColorManagement(nextSongImageRef, true, {
    colorVariables: {
      border: '--next-song-border',
      bgStart: '--next-song-bg-start',
      bgEnd: '--next-song-bg-end',
      header: '--next-song-header'
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
      <i className="icon-next" onClick={playNextSong}></i>
      {nextSong && (
        <div className="next-song">
          <div className="next-song__info">
            <span className="next-song__header">Next</span>
            <span className="next-song__title">{nextSong.title}</span>
            {nextSong.artist && (
              <span className="next-song__artist">{nextSong.artist}</span>
            )}
          </div>
          <div className="next-song__img-container">
            <img
              ref={nextSongImageRef}
              className="next-song__img"
              src={getImagePath(nextSong.artwork_path)}
              alt={nextSong.title || 'Next song'}
              crossOrigin="anonymous"
            />
          </div>
        </div>
      )}
    </>
  );
}