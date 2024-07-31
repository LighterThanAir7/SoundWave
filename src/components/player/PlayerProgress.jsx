export default function PlayerProgress () {
  return (
    <>
      <div className="player__progress">
        <div className="player__progress-bar"></div>
      </div>

      <div className="player__time">
        <span className="player__time-current">0:00</span>
        <span className="player__time-duration">0:00</span>
      </div>
    </>
  )
}