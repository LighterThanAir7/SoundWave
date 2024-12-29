import {useEffect, useState} from "react";

export default function SongsManagement () {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/songs');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const data = await response.json();
        setSongs(data.songs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <div>Loading songs...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(songs);

  return (
    <div className="admin-wrapper">
      <h1>Songs management</h1>

      <div id="songs-table" className="table" role="table">
        <div className="table__header" role="rowgroup">
          <div className="table__row" role="row">
            <div className="table__data" role="columnheader">ID</div>
            <div className="table__data" role="columnheader">Title</div>
            <div className="table__data" role="columnheader">Artist</div>
            <div className="table__data" role="columnheader">Collab. artists</div>
            <div className="table__data" role="columnheader">Duration</div>
            <div className="table__data" role="columnheader">Size</div>
            <div className="table__data" role="columnheader">Genre</div>
{/*            <div className="table__data" role="columnheader">Path</div>*/}
            <div className="table__data" role="columnheader">Created on</div>
            <div className="table__data" role="columnheader">Edit</div>
            <div className="table__data" role="columnheader">Delete</div>
          </div>
        </div>
        <div className="table__body" role="rowgroup">
          {songs.map(song => (
            <div key={song.id} className="table__row" role="row">
              <div className="table__data" role="cell">{song.id}</div>
              <div className="table__data" role="cell">{song.title}</div>
              <div className="table__data" role="cell">{song.artist_name}</div>
              <div className="table__data" role="cell">{song.collaborating_artists}</div>
              <div className="table__data" role="cell">{song.duration}</div>
              <div className="table__data" role="cell">{song.file_size}</div>
              <div className="table__data" role="cell">{song.genres}</div>
              {/*<div className="table__data" role="cell">{song.file_path}</div>*/}
              <div className="table__data" role="cell">{song.created_on}</div>
              <div className="table__data" role="cell">
                <button>Edit</button>
              </div>
              <div className="table__data" role="cell">
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}