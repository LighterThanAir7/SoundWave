export default function PlayerControls () {
  return (
    <>
      <div className="player__primary-controls">
        <i className="icon-shuffle"></i>
        <div className="player__primary-controls-mid">
          <i className="icon-previous"></i>
          <i className="icon-pause"></i>
          <i className="icon-next"></i>
        </div>
        <i className="icon-repeat"></i>
      </div>

      <div className="player__secondary-controls">
        <i className="icon-queue_music"></i>
        <i className="icon-lyrics"></i>
        <i className="icon-download"></i>
        <i className="icon-volume-medium"></i>
      </div>
    </>
  )
}