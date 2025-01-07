export default function Logo({ className = '' }) {
  return (
    <a href="/" className={`logo ${className}`}>
      <i className="icon-logo"></i>
      SoundWave
    </a>
  );
}