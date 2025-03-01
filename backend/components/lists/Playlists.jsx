import { useState, useEffect } from 'react';
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import TableCheckbox from "../common/TableCheckbox.jsx";
import Helper from "../../helpers/Helper.jsx";
import ContextMenu from "../common/ContextMenu.jsx";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";
import Pagination from "../common/Pagination.jsx";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const getContextMenuOptions = (playlistId) => [
    { label: 'View Details', link: `/admin/playlists/${playlistId}` },
    { label: 'Delete', link: `/admin/playlists/${playlistId}` },
  ];

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await api.get('/api/admin/playlists');
        setPlaylists(response.data.playlists);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPlaylists(playlists.map((playlist) => playlist.id));
    } else {
      setSelectedPlaylists([]);
    }
  }

  const handleSelectRow = (playlistId) => {
    setSelectedPlaylists(prev =>
      prev.includes(playlistId)
        ? prev.filter(id => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />
        <h1 className="admin-title">Playlists Management</h1>
        {!loading && !error && (
          <>
          {playlists.length > 0 ? (
            <>
              <div id="table-playlists" className="table" role="table">
                <div className="table__header" role="rowgroup">
                  <div className="table__row" role="row">
                    <div className="table__data">
                      <TableCheckbox
                        value={selectedPlaylists.length === playlists.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </div>
                    <div className="table__data" role="columnheader">ID</div>
                    <div className="table__data" role="columnheader">Name</div>
                    <div className="table__data" role="columnheader">User ID</div>
                    <div className="table__data" role="columnheader">Type</div>
                    <div className="table__data" role="columnheader">Songs</div>
                    <div className="table__data" role="columnheader">Created on</div>
                    <div className="table__data" role="columnheader">Updated on</div>
                    <div className="table__data"><i className="icon-dots"></i></div>
                  </div>
                </div>
                <div className="table__body" role="rowgroup">
                  {playlists.map(playlist => (
                    <div key={playlist.id} className="table__row" role="row">
                      <div className="table__data">
                        <TableCheckbox
                          id={playlist.id}
                          value={selectedPlaylists.includes(playlist.id)}
                          onChange={() => handleSelectRow(playlist.id)}
                        />
                      </div>
                      <div className="table__data" role="cell">{playlist.id}</div>
                      <div className="table__data" role="cell">{playlist.name}</div>
                      <div className="table__data" role="cell">
                        <a href={`/admin/users/${playlist.created_by_id}`}>
                          {playlist.created_by_id}
                        </a>
                      </div>
                      <div className="table__data" role="cell">{playlist.type_name}</div>
                      <div className="table__data" role="cell">{playlist.song_count}</div>
                      <div className="table__data" role="cell">{Helper.formatAdminTableDate(playlist.created_on)}</div>
                      <div className="table__data" role="cell">{Helper.formatAdminTableDate(playlist.updated_on)}</div>
                      <div className="table__data">
                        <ContextMenu options={getContextMenuOptions(playlist.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Pagination itemCount={playlists.length} loading={loading} />
            </>
          ) : (
            <div className="no-data">No playlists found</div>
          )}
          </>
        )}
      </div>
    </div>
  );
}