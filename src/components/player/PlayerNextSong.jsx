import { usePlayer } from '../../context/PlayerContext';

export default function PlayerNextSong() {
  const { playNextSong } = usePlayer();

  return (
    <>
      <i className="icon-next" onClick={playNextSong}></i>
      <div>
      </div>
    </>
  );
}