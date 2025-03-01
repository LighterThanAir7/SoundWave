import { useState, useEffect } from 'react';
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import TableCheckbox from "../common/TableCheckbox.jsx";
import Helper from "../../helpers/Helper.jsx";
import ContextMenu from "../common/ContextMenu.jsx";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";
import Pagination from "../common/Pagination.jsx";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const getContextMenuOptions = (genreId) => [
    { label: 'Edit', link: `/admin/genres/${genreId}` },
    { label: 'Delete', link: `/admin/genres/${genreId}` },
    { label: 'View Details', link: `/admin/genres/${genreId}` }
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/api/admin/genres');
        setGenres(response.data.genres);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedGenres(genres.map((genre) => genre.id));
    } else {
      setSelectedGenres([]);
    }
  }

  const handleSelectRow = (genreId) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />
        <h1 className="admin-title">Genres Management</h1>
        {!loading && !error && (
          <>
            {genres.length > 0 ? (
              <>
                <div id="table-genres" className="table" role="table">
                  <div className="table__header" role="rowgroup">
                    <div className="table__row" role="row">
                      <div className="table__data">
                        <TableCheckbox
                          value={selectedGenres.length === genres.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </div>
                      <div className="table__data" role="columnheader">ID</div>
                      <div className="table__data" role="columnheader">Name</div>
                      <div className="table__data" role="columnheader">Image</div>
                      <div className="table__data" role="columnheader">Songs</div>
                      <div className="table__data" role="columnheader">Created on</div>
                      <div className="table__data"><i className="icon-dots"></i></div>
                    </div>
                  </div>
                  <div className="table__body" role="rowgroup">
                    {genres.map(genre => (
                      <div key={genre.id} className="table__row" role="row">
                        <div className="table__data">
                          <TableCheckbox
                            id={genre.id}
                            value={selectedGenres.includes(genre.id)}
                            onChange={() => handleSelectRow(genre.id)}
                          />
                        </div>
                        <div className="table__data" role="cell">{genre.id}</div>
                        <div className="table__data" role="cell">{genre.name}</div>
                        <div className="table__data" role="cell">
                          {genre.image_path ? (
                            <img
                              src={`${genre.image_path}`}
                              alt={genre.name}
                              className="genre-thumbnail"
                              width="40"
                              height="40"
                            />
                          ) : (
                            <div className="no-image">No image</div>
                          )}
                        </div>
                        <div className="table__data" role="cell">{genre.song_count}</div>
                        <div className="table__data" role="cell">{Helper.formatAdminTableDate(genre.created_on)}</div>
                        <div className="table__data">
                          <ContextMenu options={getContextMenuOptions(genre.id)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Pagination itemCount={genres.length} loading={loading} />
              </>
            ) : (
              <div className="no-data">No genres found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}