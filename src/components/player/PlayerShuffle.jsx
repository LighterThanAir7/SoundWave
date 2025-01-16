import {usePlayer} from "../../context/PlayerContext.jsx";

export default function PlayerShuffle() {
  const { isShuffleOn, toggleShuffle, showControlMessage } = usePlayer();

  const handleShuffleClick = () => {
    toggleShuffle();
    showControlMessage(isShuffleOn ? 'Shuffle off' : 'Shuffle on');
  };

  return (
    <i
      className={`icon-shuffle ${isShuffleOn ? 'icon-shuffle--on' : ''}`}
      onClick={handleShuffleClick}
    ></i>
  );
}