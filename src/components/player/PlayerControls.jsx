import { usePlayer, REPEAT_MODES } from '../../context/PlayerContext';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const StrictModeDroppable = ({
     children = null,
     isDropDisabled = false,
     isCombineEnabled = false,
     ...props
   }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;

  return (
    <Droppable
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      {...props}
    >
      {children}
    </Droppable>
  );
};


export default function PlayerControls() {
  const {
    isPlaying,
    playSong,
    pauseSong,
    currentSong,
    volume,
    handleVolumeChange,
    queue,
    reorderQueue,
    playQueueItem,
    playNextSong,
    playPreviousSong,
    repeatMode,
    toggleRepeatMode,
    isShuffleOn,
    toggleShuffle,
    handleDownload
  } = usePlayer();

  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [controlMessage, setControlMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const volumeBarRef = useRef(null);
  const volumeIconRef = useRef(null);
  const queueRef = useRef(null);
  const queueIconRef = useRef(null);

  const handleShuffleClick = () => {
    toggleShuffle();
    showControlMessage(isShuffleOn ? 'Shuffle off' : 'Shuffle on');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest('.carousel__card') ||
        event.target.closest('.player__primary-controls') ||
        event.target.closest('.icon-heart_outline')
      ) {
        return;
      }

      // Handle existing volume bar clicks
      if (volumeBarRef.current &&
        !volumeBarRef.current.contains(event.target) &&
        !volumeIconRef.current.contains(event.target)) {
        setShowVolumeBar(false);
      }

      // Handle queue clicks
      if (queueRef.current &&
        !queueRef.current.contains(event.target) &&
        !queueIconRef.current.contains(event.target)) {
        setShowQueue(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRepeatClick = () => {
    toggleRepeatMode();

    // Show message based on next mode
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

  const showControlMessage = (message) => {
    setControlMessage(message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handlePlayPause = () => {
    if (currentSong) {
      if (isPlaying) {
        pauseSong();
      } else {
        playSong(currentSong);
      }
    }
  };

  const getRepeatClass = () => {
    switch(repeatMode) {
      case 'all': return 'icon-repeat icon-repeat--on';
      case 'single': return 'icon-repeat icon-repeat--on-single';
      default: return 'icon-repeat';
    }
  };

  const toggleQueue = () => {
    setShowQueue(!showQueue);
  };

  const handleCloseQueue = () => {
    setShowQueue(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    reorderQueue(result.source.index, result.destination.index);
  };

  const handleQueueItemClick = (song) => {
    playQueueItem(song);
  };

  const toggleVolumeBar = () => {
    setShowVolumeBar(!showVolumeBar);
  };

  const formatTime = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div className="player__primary-controls">
        {showMessage && (
          <p className="player__primary-controls-message">
            {controlMessage}
          </p>
        )}
        <i
          className={`icon-shuffle ${isShuffleOn ? 'icon-shuffle--on' : ''}`}
          onClick={handleShuffleClick}
        ></i>
        <div className="player__primary-controls-mid">
          <i className="icon-previous" onClick={playPreviousSong}></i>
          <i
            className={isPlaying ? "icon-pause" : "icon-play"}
            onClick={handlePlayPause}
          ></i>
          <i className="icon-next" onClick={playNextSong}></i>
        </div>
        <i
          className={getRepeatClass()}
          onClick={handleRepeatClick}
        ></i>
      </div>

      <div className="player__secondary-controls">
        <i className="icon-queue_music" onClick={toggleQueue} ref={queueIconRef}></i>
        <div className={`player-queue ${showQueue ? 'show' : ''}`} ref={queueRef}>
          <div className="player-queue__header">
            <span className="player-queue__title">Queue</span>
            <i className="icon-x" onClick={handleCloseQueue}></i>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <StrictModeDroppable droppableId="queue">
              {(provided) => (
                <ul
                  className="player-queue__list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {queue.map((song, index) => (
                    <Draggable
                      key={song.id || index}
                      draggableId={song.id?.toString() || index.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`player-queue__item ${snapshot.isDragging ? 'dragging' : ''} ${
                            currentSong?.id === song.id ? 'player-queue__item--active' : ''
                          }`}
                          onClick={() => handleQueueItemClick(song)}
                        >
                          <img
                            className="player-queue__artwork-img"
                            src={song.artwork_path ? `/uploads/songs/${song.artwork_path}` : ''}
                            alt={song.title}
                          />
                          <div className="player-queue__song-info">
                            <h5 className="player-queue__song-name">{song.title}</h5>
                            <p className="player-queue__artist">
                              {song.artist}
                              <span>&nbsp;•&nbsp;</span>
                              <span className="player-queue__time">
                                {formatTime(song.duration)}
                              </span>
                            </p>
                          </div>
                          <div {...provided.dragHandleProps}>
                            <i className="icon-grip-lines"></i>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>

        <i className="icon-lyrics"></i>
        <i
          className="icon-download"
          onClick={() => currentSong && handleDownload(currentSong)}
        ></i>

        <div className="relative">
          <i className="icon-volume-medium" ref={volumeIconRef} onClick={toggleVolumeBar}></i>
          <div className={`player__volume-bar ${showVolumeBar ? 'show' : ''}`} ref={volumeBarRef}>
            <input
              type="range"
              id="volume-slider"
              className="player__volume-bar-slider"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              min="0"
              max="100"
              style={{
                backgroundImage: `linear-gradient(90deg, var(--clr-primary-400) ${volume}%, #222 ${volume}%)`
              }}
            />
          </div>
        </div>

      </div>
    </>
  );
}