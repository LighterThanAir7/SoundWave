import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";

export default function Album() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await api.get(`/api/admin/albums/${id}`);
        setAlbum(response.data.album);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !album && (
          <div className="no-data">Album nije pronađen</div>
        )}

        {!loading && !error && album && (
          <>
            <div className="admin-header">
              <button onClick={() => navigate(-1)} className="btn-back">
                <i className="icon-arrow-left"></i> Natrag
              </button>
              <h1>{album.title}</h1>
            </div>

            <div className="album-details">
              <div className="album-artwork">
                {album.artwork_path ? (
                  <img src={`/uploads/albums/${album.artwork_path}`} alt={album.title} />
                ) : (
                  <div className="no-artwork">
                    <i className="icon-album"></i>
                    <span>Nema naslovnice</span>
                  </div>
                )}
              </div>

              <div className="album-info">
                <div className="info-group">
                  <h3>Osnovne informacije</h3>
                  <div className="info-row">
                    <span className="label">ID:</span>
                    <span className="value">{album.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Naslov:</span>
                    <span className="value">{album.title}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Datum izdavanja:</span>
                    <span className="value">
                      {album.release_date ? Helper.formatReleaseDate(album.release_date) : 'Nije definirano'}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Broj pjesama:</span>
                    <span className="value">{album.total_tracks || 0}</span>
                  </div>
                </div>

                <div className="info-group">
                  <h3>Pjesme na albumu ({album.songs.length})</h3>
                  {album.songs.length > 0 ? (
                    <div className="album-songs">
                      {album.songs.map((song, index) => (
                        <div key={song.id} className="album-song-item">
                          <span className="song-number">{index + 1}.</span>
                          <span className="song-title">{song.title}</span>
                          <span className="song-artist">{song.artist}</span>
                          <span className="song-artist">Track number{song.track_number}</span>
                          <img src={`/uploads/songs/${song.artwork_path}`} alt={song.title} />
                          {song.collaborating_artists && (
                            <span className="song-collaborators">feat. {song.collaborating_artists}</span>
                          )}
                          <span className="song-duration">{Helper.formatSongDuration(song.duration)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-songs">Nema pjesama na ovom albumu</div>
                  )}
                </div>

                <div className="info-group">
                  <h3>Sistemske informacije</h3>
                  <div className="info-row">
                    <span className="label">Dodano:</span>
                    <span className="value">{Helper.formatCreatedOn(album.created_on)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Zadnje ažurirano:</span>
                    <span className="value">
                      {album.updated_on ? Helper.formatCreatedOn(album.updated_on) : 'Nije ažurirano'}
                    </span>
                  </div>
                </div>

                <div className="album-actions">
                  <button className="btn btn-primary">Uredi</button>
                  <button className="btn btn-danger">Izbriši</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}