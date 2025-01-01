import { usePlayer } from '../../context/PlayerContext';
import { useEffect, useState } from 'react';

export default function PlayerProgress() {
  const { currentSong, audioRef, isPlaying } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioRef]);

  const formatTime = (time) => {
    if (!time) return '-:--';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <>
      <div className="player__progress" onClick={handleProgressClick}>
        <div
          className="player__progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="player__time">
                <span className="player__time-current">
                    {formatTime(currentTime)}
                </span>
        <span className="player__time-duration">
                    {formatTime(duration)}
                </span>
      </div>
    </>
  );
}