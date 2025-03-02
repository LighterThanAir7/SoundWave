import { useState, useEffect } from 'react';
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import TableCheckbox from "../common/TableCheckbox.jsx";
import Helper from "../../helpers/Helper.js";
import ContextMenu from "../common/ContextMenu.jsx";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";
import Pagination from "../common/Pagination.jsx";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArtists, setSelectedArtists] = useState([]);

  const getContextMenuOptions = (artistId) => [
    { label: 'Edit', link: `/admin/artists/${artistId}` },
    { label: 'Delete', link: `/admin/artists/${artistId}` },
    { label: 'View Details', link: `/admin/artists/${artistId}` }
  ];

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get('/api/admin/artists');
        setArtists(response.data.artists);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedArtists(artists.map((artist) => artist.id));
    } else {
      setSelectedArtists([]);
    }
  }

  const handleSelectRow = (artistId) => {
    setSelectedArtists(prev =>
      prev.includes(artistId)
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId]
    );
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />
        <h1 className="admin-title">Artists Management</h1>
        {!loading && !error && (
          <>
            {artists.length > 0 ? (
              <>
                <div id="table-artists" className="table" role="table">
                  <div className="table__header" role="rowgroup">
                    <div className="table__row" role="row">
                      <div className="table__data">
                        <TableCheckbox
                          value={artists.length > 0 && selectedArtists.length === artists.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </div>
                      <div className="table__data" role="columnheader">ID</div>
                      <div className="table__data" role="columnheader">Name</div>
                      <div className="table__data" role="columnheader">Bio</div>
                      <div className="table__data" role="columnheader">Image</div>
                      <div className="table__data" role="columnheader">Created on</div>
                      <div className="table__data" role="columnheader">Updated on</div>
                      <div className="table__data"><i className="icon-dots"></i></div>
                    </div>
                  </div>
                  <div className="table__body" role="rowgroup">
                    {artists.map(artist => (
                      <div key={artist.id} className="table__row" role="row">
                        <div className="table__data">
                          <TableCheckbox
                            id={artist.id}
                            value={selectedArtists.includes(artist.id)}
                            onChange={() => handleSelectRow(artist.id)}
                          />
                        </div>
                        <div className="table__data" role="cell">{artist.id}</div>
                        <div className="table__data" role="cell">{artist.name}</div>
                        <div className="table__data" role="cell">
                          {artist.bio ? artist.bio.substring(0, 50) + (artist.bio.length > 50 ? '...' : '') : 'No bio'}
                        </div>
                        <div className="table__data" role="cell">
                          {artist.img_path ? (
                            <img
                              src={`/uploads/artists/${artist.img_path}`}
                              alt={artist.name}
                              className="artist-thumbnail"
                              width="40"
                              height="40"
                            />
                          ) : (
                            <div className="no-image">No image</div>
                          )}
                        </div>
                        <div className="table__data" role="cell">{Helper.formatAdminTableDate(artist.created_on)}</div>
                        <div className="table__data" role="cell">
                          {artist.updated_on ? Helper.formatAdminTableDate(artist.updated_on) : 'Never'}
                        </div>
                        <div className="table__data">
                          <ContextMenu options={getContextMenuOptions(artist.id)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Pagination itemCount={artists.length} loading={loading} />
              </>
            ) : (
              <div className="no-data">No artists found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}