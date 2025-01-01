import { createContext, useContext, useState, useRef } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [volume, setVolume] = useState(100);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      // Toggle play/pause if same song
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      return;
    }

    // Play new song
    audioRef.current.src = `/uploads/songs/${song.file_path}`;
    audioRef.current.play();
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  return (
    <PlayerContext.Provider value={{
      currentSong,
      isPlaying,
      playSong,
      pauseSong,
      audioRef,
      volume,
      handleVolumeChange
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
