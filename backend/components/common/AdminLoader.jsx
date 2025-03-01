export default function AdminLoader({ loading }) {
  return (
    <div className={`admin-wrapper__loader-container${loading ? ' admin-wrapper__loader-container--visible' : ''}`}>
      <div className="admin-wrapper__loader"></div>
    </div>
  );
}