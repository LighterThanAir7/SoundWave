import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import {useEffect, useRef, useState} from "react";
import { usePlayer } from "../../context/PlayerContext";

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

export default function PlayerQueue() {
  const {
    queue,
    currentSong,
    showQueue,
    setShowQueue,
    handleDragEnd,
    handleQueueItemClick,
    formatTime,
    queueIconRef
  } = usePlayer();

  const queueRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only run if queue is shown and click is outside
      if (showQueue && queueRef.current && !queueRef.current.contains(event.target)) {
        setShowQueue(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showQueue, setShowQueue]);

  return (
    <>
      <i className="icon-queue_music" onClick={() => setShowQueue(!showQueue)} ref={queueIconRef}></i>
      <div className={`player-queue ${showQueue ? "show" : ""}`} ref={queueRef}>
        <div className="player-queue__header">
          <span className="player-queue__title">Queue</span>
          <i className="icon-x" onClick={() => setShowQueue(false)}></i>
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
                        className={`player-queue__item ${
                          snapshot.isDragging ? "dragging" : ""
                        } ${
                          currentSong?.id === song.id
                            ? "player-queue__item--active"
                            : ""
                        }`}
                        onClick={() => handleQueueItemClick(song)}
                      >
                        <img
                          className="player-queue__artwork-img"
                          src={
                            song.artwork_path
                              ? `/uploads/songs/${song.artwork_path}`
                              : ""
                          }
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
    </>
  );
}