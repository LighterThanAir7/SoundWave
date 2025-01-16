import {createContext, useContext, useState, useRef, useEffect} from 'react';
import api from '../backend/config/axiosConfig.js';

export const REPEAT_MODES = {
  OFF: 'off',
  ALL: 'all',
  SINGLE: 'single'
};

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [volume, setVolume] = useState(100);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [showQueue, setShowQueue] = useState(false);
  const [repeatMode, setRepeatMode] = useState(REPEAT_MODES.OFF);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [shuffledQueue, setShuffledQueue] = useState([]);
  const [playHistory, setPlayHistory] = useState([]);
  const [controlMessage, setControlMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleSongEnd = () => {
      if (!currentSong) return;

      if (repeatMode === REPEAT_MODES.SINGLE) {
        audioRef.current.play();
        return;
      }

      if (isShuffleOn) {
        // Remove the played song from shuffled queue
        const [nextSong, ...remainingShuffled] = shuffledQueue;
        setShuffledQueue(remainingShuffled);

        // Add current song to play history
        setPlayHistory(prev => [...prev, currentSong]);

        // If shuffled queue is empty, reshuffle remaining songs
        if (remainingShuffled.length === 0 && repeatMode === REPEAT_MODES.ALL) {
          const newShuffledQueue = shuffleArray([...queue]);
          setShuffledQueue(newShuffledQueue);
          playSong(newShuffledQueue[0]);
          return;
        }

        if (nextSong) {
          playSong(nextSong);
        }
      } else {
        const nextSong = getNextSong();
        if (nextSong) {
          playSong(nextSong);
        }
      }
    };

    audioRef.current.addEventListener('ended', handleSongEnd);
    return () => audioRef.current.removeEventListener('ended', handleSongEnd);
  }, [currentSong, repeatMode, queue, isShuffleOn, shuffledQueue]);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const toggleVolumeBar = () => {
    setShowVolumeBar(!showVolumeBar);
  };

  const toggleShuffle = () => {
    if (!isShuffleOn) {
      // Get remaining songs from current position
      const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
      const remainingSongs = queue.slice(currentIndex + 1);

      // Create shuffled version of remaining songs
      const shuffled = shuffleArray(remainingSongs);
      setShuffledQueue(shuffled);

      // Reset play history with current song
      setPlayHistory([currentSong]);
    } else {
      // Clear shuffle-related states
      setShuffledQueue([]);
      setPlayHistory([]);
    }
    setIsShuffleOn(!isShuffleOn);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const playSong = (song) => {
    if (!song || !song.id || !song.file_path) {
      console.error('Invalid song data provided:', song);
      return;
    }

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

  const playQueueItem = (song) => {
    playSong(song);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const getNextSong = () => {
    if (!isShuffleOn) {
      // Original sequential logic
      const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
      if (currentIndex === -1) return queue[0];

      const isLastSong = currentIndex === queue.length - 1;
      if (isLastSong && repeatMode === REPEAT_MODES.ALL) {
        return queue[0];
      }
      if (isLastSong && repeatMode !== REPEAT_MODES.ALL) return null;
      return queue[currentIndex + 1];
    }

    // Shuffle mode logic
    if (shuffledQueue.length === 0) {
      // If all songs have been played, reshuffle remaining queue
      const newShuffledQueue = shuffleArray([...queue]);
      setShuffledQueue(newShuffledQueue);
      return newShuffledQueue[0];
    }

    return shuffledQueue[0];
  };

  const getPreviousSong = () => {
    if (!isShuffleOn) {
      // Original sequential logic
      const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
      if (currentIndex === -1) return queue[queue.length - 1];
      const isFirstSong = currentIndex === 0;
      return queue[isFirstSong ? queue.length - 1 : currentIndex - 1];
    }

    // Shuffle mode - get previous from history
    if (playHistory.length > 1) {
      const previousSong = playHistory[playHistory.length - 2];
      setPlayHistory(prev => prev.slice(0, -1));
      return previousSong;
    }
    return null;
  };

  const playNextSong = () => {
    const nextSong = getNextSong();
    if (nextSong) playSong(nextSong);
  };

  const playPreviousSong = () => {
    const previousSong = getPreviousSong();
    if (previousSong) playSong(previousSong);
  };

  const toggleRepeatMode = () => {
    setRepeatMode(current => {
      switch(current) {
        case REPEAT_MODES.OFF: return REPEAT_MODES.ALL;
        case REPEAT_MODES.ALL: return REPEAT_MODES.SINGLE;
        default: return REPEAT_MODES.OFF;
      }
    });
  };

  const addToQueue = (songs) => {
    setQueue(songs);
  };

  const reorderQueue = (startIndex, endIndex) => {
    setQueue(prevQueue => {
      const items = Array.from(prevQueue);
      const [reorderedItem] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, reorderedItem);
      return items;
    });
  };

  const handleDownload = async (song) => {
    if (!song) return;
    const filename = `${song.artist} - ${song.title}.${song.file_format}`;

    try {
      const response = await api.get(`/api/songs/download/${song.id}`, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: `audio/${song.file_format}` });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading:', error);
    }
  };

  const showControlMessage = (message) => {
    setControlMessage(message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  // ------------------------------ Queue Methods ------------------------------

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderQueue(result.source.index, result.destination.index);
  };

  const handleQueueItemClick = (song) => {
    playSong(song);
  };

  const toggleQueue = () => {
    setShowQueue(!showQueue);
  };

  const formatTime = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const value = {
    currentSong,
    isPlaying,
    playSong,
    playQueueItem,
    playNextSong,
    playPreviousSong,
    pauseSong,
    audioRef,
    volume,
    handleVolumeChange,
    toggleVolumeBar,
    showVolumeBar,
    queue,
    setQueue,
    formatTime,
    showQueue,
    setShowQueue,
    handleDragEnd,
    handleQueueItemClick,
    toggleQueue,
    reorderQueue,
    addToQueue,
    repeatMode,
    toggleRepeatMode,
    isShuffleOn,
    toggleShuffle,
    handleDownload,
    controlMessage,
    showMessage,
    showControlMessage
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);