import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.jsx";
import {UPLOADS_URL} from "../../config/constants.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";

export default function Song() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await api.get(`/api/admin/songs/${id}`);
        setSong(response.data.song);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !song && (
          <div className="no-data">Pjesma nije pronađena</div>
        )}

        {!loading && !error && song && (
          <>
            <div className="admin-header">
              <button onClick={() => navigate(-1)} className="btn-back">
                <i className="icon-arrow-left"></i> Natrag
              </button>
              <h1>{song.title}</h1>
            </div>

            <div className="song-details">
              <div className="song-artwork">
                {song.artwork_path ? (
                  <img src={`/uploads/artwork/${song.artwork_path}`} alt={song.title} />
                ) : (
                  <div className="no-artwork">Nema naslovnice</div>
                )}
              </div>

              <div className="song-info">
                <div className="info-group">
                  <h3>Osnovne informacije</h3>
                  <div className="info-row">
                    <span className="label">ID:</span>
                    <span className="value">{song.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Izvođač:</span>
                    <span className="value">{song.artist}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Album:</span>
                    <span className="value">{song.album_title || 'Nema albuma'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Broj pjesme:</span>
                    <span className="value">{song.track_number || 'Nije definirano'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Datum izdavanja:</span>
                    <span className="value">
                    {song.released_on ? Helper.formatReleaseDate(song.released_on) : 'Nije definirano'}
                  </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Trajanje:</span>
                    <span className="value">{Helper.formatSongDuration(song.duration)}</span>
                  </div>
                </div>

                <div className="info-group">
                  <h3>Tehnički podaci</h3>
                  <div className="info-row">
                    <span className="label">Format:</span>
                    <span className="value">{song.file_format}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Veličina datoteke:</span>
                    <span className="value">{Helper.formatFileSize(song.file_size)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Bitrate:</span>
                    <span className="value">{song.bitrate ? `${song.bitrate} kbps` : 'Nije dostupno'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Putanja datoteke:</span>
                    <span className="value">{song.file_path}</span>
                  </div>
                  <div className="info-row">
                    <img src={`${UPLOADS_URL}/songs/${song.artwork_path}`} alt={song.title}/>
                  </div>
                </div>

                <div className="info-group">
                  <h3>Dodatne informacije</h3>
                  <div className="info-row">
                    <span className="label">Žanrovi:</span>
                    <span className="value">{song.genres || 'Nema žanrova'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Suradnici:</span>
                    <span className="value">{song.collaborating_artists || 'Nema suradnika'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Dodano:</span>
                    <span className="value">{Helper.formatCreatedOn(song.created_on)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Zadnje ažurirano:</span>
                    <span className="value">
                    {song.updated_on ? Helper.formatCreatedOn(song.updated_on) : 'Nije ažurirano'}
                  </span>
                  </div>
                </div>

                <div className="song-actions">
                  <button className="btn btn-primary">Uredi</button>
                  <button className="btn btn-danger">Izbriši</button>
                  <button className="btn btn-secondary">Preuzmi</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}