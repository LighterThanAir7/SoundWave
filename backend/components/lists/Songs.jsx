import {useEffect, useState} from "react";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import TableCheckbox from "../common/TableCheckbox.jsx";
import Helper from "../../helpers/Helper.js";
import ContextMenu from "../common/ContextMenu.jsx";
import Pagination from "../common/Pagination.jsx";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";

export default function Songs () {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getContextMenuOptions = (songId) => [
    { label: 'Edit', link: `/admin/songs/${songId}` },
    { label: 'Delete', link: `/admin/songs/${songId}` },
  ];

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await api.get('/api/admin/songs');
        setSongs(response.data.songs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) {
      // Ako je označen, dodaj sve user ID-eve u selectedUsers
      setSelectedSongs(songs.map((user) => user.id));
    } else {
      setSelectedSongs([]);
    }
  }

  const handleSelectRow = (userId) => {
    setSelectedSongs(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />
        <h1>Songs management</h1>

        {!loading && !error && (
          <>
            {songs.length > 0 ? (
              <>
                <div id="table-songs" className="table" role="table">
                  <div className="table__header" role="rowgroup">
                    <div className="table__row" role="row">
                      <div className="table__data">
                        <TableCheckbox
                          value={selectedSongs.length === songs.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </div>
                      <div className="table__data" role="columnheader">Title</div>
                      <div className="table__data" role="columnheader">Artist</div>
                      <div className="table__data" role="columnheader">Collab. artists</div>
                      <div className="table__data" role="columnheader">Duration</div>
                      <div className="table__data" role="columnheader">Size</div>
                      <div className="table__data" role="columnheader">Genre</div>
                      <div className="table__data"><i className="icon-dots"></i></div>
                    </div>
                  </div>
                  <div className="table__body" role="rowgroup">
                    {songs.map(song => (
                      <div key={song.id} className="table__row" role="row">
                        <div className="table__data">
                          <TableCheckbox
                            id={song.id}
                            value={selectedSongs.includes(song.id)}
                            onChange={() => handleSelectRow(song.id)}
                          />
                        </div>
                        <div className="table__data" role="cell">{song.title}</div>
                        <div className="table__data" role="cell">{song.artist}</div>
                        <div className="table__data" role="cell">{song.collaborating_artists}</div>
                        <div className="table__data" role="cell">{Helper.formatSongDuration(song.duration)}</div>
                        <div className="table__data" role="cell">{Helper.formatFileSize(song.file_size)}</div>
                        <div className="table__data" role="cell">{song.genres}</div>
                        <div className="table__data">
                          <ContextMenu options={getContextMenuOptions(song.id)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Pagination itemCount={songs.length} loading={loading} />
              </>
            ) : (
              <div className="no-data">No songs found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}