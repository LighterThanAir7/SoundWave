import { usePlayer } from "../../context/PlayerContext";

export default function PlayerPlayPause() {
  const { isPlaying, playSong, pauseSong, currentSong } = usePlayer();

  const handlePlayPause = () => {
    if (currentSong) {
      if (isPlaying) {
        pauseSong();
      } else {
        playSong(currentSong);
      }
    }
  };

  return (
    <i
      className={isPlaying ? "icon-pause" : "icon-play"}
      onClick={handlePlayPause}
    ></i>
  );
}