export default function TopbarSearchHistory() {
  const searchHistoryItems = [
    "Best of Vocal Trance",
    "Above and Beyond",
    "Armin van Buuren",
    "Gaia - Tuvan",
    "Stargazers",
    "Darude Sandstorm",
    "Aurosonic Best of",
  ];

  return (
    <div className="topbar__search-menu">
      <div className="topbar__search-h">
        <p className="topbar__search-h-title">Search History</p>
        <p className="topbar__search-h-clear">Clear</p>
      </div>

      {searchHistoryItems.map((item, index) => (
        <div key={index} className="topbar__search-h-item">
          <p>{item}</p>
          <i className="icon-timer"></i>
        </div>
      ))}
    </div>
  );
}