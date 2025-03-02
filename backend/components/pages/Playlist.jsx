import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";

export default function Playlist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await api.get(`/api/admin/playlists/${id}`);
        setPlaylist(response.data.playlist);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistData();
  }, [id]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !playlist && (
          <div className="no-data">Playlist nije pronađen</div>
        )}

        {!loading && !error && playlist && (
          <>
            <div className="admin-header">
              <button onClick={() => navigate(-1)} className="btn-back">
                <i className="icon-arrow-left"></i> Natrag
              </button>
              <h1>{playlist.name}</h1>
            </div>

            <div className="playlist-details">
              <div className="playlist-image">
                {playlist.image_path ? (
                  <img src={`${playlist.image_path}`} alt={playlist.name} />
                ) : (
                  <div className="no-image">
                    <i className="icon-playlist"></i>
                    <span>Nema slike</span>
                  </div>
                )}
              </div>

              <div className="playlist-info">
                <div className="info-group">
                  <h3>Osnovne informacije</h3>
                  <div className="info-row">
                    <span className="label">ID:</span>
                    <span className="value">{playlist.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Naziv:</span>
                    <span className="value">{playlist.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Korisnik ID:</span>
                    <span className="value">
                      <a href={`/admin/users/${playlist.created_by_id}`}>
                        {playlist.created_by_id}
                      </a>
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Tip:</span>
                    <span className="value">{playlist.type_name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Opis:</span>
                    <span className="value">{playlist.description || 'Nema opisa'}</span>
                  </div>
                </div>

                <div className="info-group">
                  <h3>Pjesme na playlisti ({playlist.songs?.length || 0})</h3>
                  {playlist.songs && playlist.songs.length > 0 ? (
                    <div className="playlist-songs">
                      {playlist.songs.map((song, index) => (
                        <div key={song.id} className="playlist-song-item">
                          <span className="song-number">{song.order_number || index + 1}.</span>
                          <span className="song-title">{song.title}</span>
                          <span className="song-artist">{song.artist}</span>
                          {song.collaborating_artists && (
                            <span className="song-collaborators">feat. {song.collaborating_artists}</span>
                          )}
                          <span className="song-duration">{Helper.formatSongDuration(song.duration)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-songs">Nema pjesama na ovoj playlisti</div>
                  )}
                </div>

                <div className="info-group">
                  <h3>Sistemske informacije</h3>
                  <div className="info-row">
                    <span className="label">Dodano:</span>
                    <span className="value">{Helper.formatCreatedOn(playlist.created_on)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Zadnje ažurirano:</span>
                    <span className="value">
                      {playlist.updated_on ? Helper.formatCreatedOn(playlist.updated_on) : 'Nije ažurirano'}
                    </span>
                  </div>
                </div>

                <div className="playlist-actions">
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