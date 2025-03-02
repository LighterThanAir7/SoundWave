import { useState, useEffect } from 'react';
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import TableCheckbox from "../common/TableCheckbox.jsx";
import Helper from "../../helpers/Helper.js";
import ContextMenu from "../common/ContextMenu.jsx";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";
import Pagination from "../common/Pagination.jsx";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlbums, setSelectedAlbums] = useState([]);

  const getContextMenuOptions = (albumId) => [
    { label: 'Edit', link: `/admin/albums/${albumId}` },
    { label: 'Delete', link: `/admin/albums/${albumId}` },
    { label: 'View Details', link: `/admin/albums/${albumId}` }
  ];

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get('/api/admin/albums');
        setAlbums(response.data.albums);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAlbums(albums.map((album) => album.id));
    } else {
      setSelectedAlbums([]);
    }
  }

  const handleSelectRow = (albumId) => {
    setSelectedAlbums(prev =>
      prev.includes(albumId)
        ? prev.filter(id => id !== albumId)
        : [...prev, albumId]
    );
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />
        <h1 className="admin-title">Albums Management</h1>
        {!loading && !error && (
          <>
            {albums.length > 0 ? (
              <>
                <div id="table-albums" className="table" role="table">
                  <div className="table__header" role="rowgroup">
                    <div className="table__row" role="row">
                      <div className="table__data">
                        <TableCheckbox
                          value={albums.length > 0 && selectedAlbums.length === albums.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </div>
                      <div className="table__data" role="columnheader">ID</div>
                      <div className="table__data" role="columnheader">Title</div>
                      <div className="table__data" role="columnheader">Release Date</div>
                      <div className="table__data" role="columnheader">Total Tracks</div>
                      <div className="table__data" role="columnheader">Artwork</div>
                      <div className="table__data" role="columnheader">Created on</div>
                      <div className="table__data"><i className="icon-dots"></i></div>
                    </div>
                  </div>
                  <div className="table__body" role="rowgroup">
                    {albums.map(album => (
                      <div key={album.id} className="table__row" role="row">
                        <div className="table__data">
                          <TableCheckbox
                            id={album.id}
                            value={selectedAlbums.includes(album.id)}
                            onChange={() => handleSelectRow(album.id)}
                          />
                        </div>
                        <div className="table__data" role="cell">{album.id}</div>
                        <div className="table__data" role="cell">{album.title}</div>
                        <div className="table__data" role="cell">
                          {album.release_date ? Helper.formatReleaseDate(album.release_date) : 'Unknown'}
                        </div>
                        <div className="table__data" role="cell">{album.total_tracks || 0}</div>
                        <div className="table__data" role="cell">
                          {album.artwork_path ? (
                            <img
                              src={`/uploads/albums/${album.artwork_path}`}
                              alt={album.title}
                              className="album-thumbnail"
                              width="40"
                              height="40"
                            />
                          ) : (
                            <div className="no-image">No artwork</div>
                          )}
                        </div>
                        <div className="table__data" role="cell">{Helper.formatAdminTableDate(album.created_on)}</div>
                        <div className="table__data">
                          <ContextMenu options={getContextMenuOptions(album.id)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Pagination itemCount={albums.length} loading={loading} />
              </>
            ) : (
              <div className="no-data">No albums found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}