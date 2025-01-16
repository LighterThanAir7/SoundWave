import {REPEAT_MODES, usePlayer} from "../../context/PlayerContext.jsx";

export default function PlayerRepeat() {
  const { repeatMode, toggleRepeatMode, showControlMessage } = usePlayer();

  const handleRepeatClick = () => {
    toggleRepeatMode();
    switch(repeatMode) {
      case REPEAT_MODES.OFF:
        showControlMessage('Repeat on');
        break;
      case REPEAT_MODES.ALL:
        showControlMessage('Repeat this song');
        break;
      case REPEAT_MODES.SINGLE:
        showControlMessage('Repeat off');
        break;
    }
  };

  const getRepeatClass = () => {
    switch(repeatMode) {
      case 'all': return 'icon-repeat icon-repeat--on';
      case 'single': return 'icon-repeat icon-repeat--on-single';
      default: return 'icon-repeat';
    }
  };

  return (
    <i
      className={getRepeatClass()}
      onClick={handleRepeatClick}
    ></i>
  );
}
