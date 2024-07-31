export default function VibeItems() {
  const icons = ['heartline', 'trending-up', 'coffee-cup', 'heart_outline', 'confetti', 'workout', 'focus', 'book'];
  const names = ['Vibe', 'Trending', 'Chill', 'Love', 'Dance', 'Workout', 'Focus', 'Study'];

  return (
    <ul className="vibe__list">
      {icons.map((icon, index) => (
        <li key={index} className="vibe__item">
          <i className={`vibe__icon icon-${icon}`}></i>
          <span className="vibe__name">{names[index]}</span>
        </li>
      ))}
    </ul>
  );
}
