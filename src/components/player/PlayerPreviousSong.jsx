import { usePlayer } from "../../context/PlayerContext";

export default function PlayerPreviousSong() {
  const { playPreviousSong, previousSong } = usePlayer();

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
              className="previous-song__img"
              src={getImagePath(previousSong.artwork_path)}
              alt={previousSong.title || 'Previous song'}
            />
          </div>
        </div>
      )}
    </>
  );
}