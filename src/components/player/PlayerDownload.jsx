import { usePlayer } from "../../context/PlayerContext";

export default function PlayerDownload() {
  const { currentSong, handleDownload } = usePlayer();

  return (
    <i
      className="icon-download"
      onClick={() => currentSong && handleDownload(currentSong)}
    ></i>
  );
}