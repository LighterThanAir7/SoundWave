import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.jsx";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";

export default function Artist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await api.get(`/api/admin/artists/${id}`);
        setArtist(response.data.artist);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !artist && (
          <div className="no-data">Izvođač nije pronađen</div>
        )}

        {!loading && !error && artist && (
          <>
            <div className="admin-header">
              <button onClick={() => navigate(-1)} className="btn-back">
                <i className="icon-arrow-left"></i> Natrag
              </button>
              <h1>{artist.name}</h1>
            </div>

            <div className="artist-details">
              <div className="artist-image">
                {artist.img_path ? (
                  <img src={`/uploads/artists/${artist.img_path}`} alt={artist.name} />
                ) : (
                  <div className="no-image">
                    <i className="icon-artist"></i>
                    <span>Nema slike</span>
                  </div>
                )}
              </div>

              <div className="artist-info">
                <div className="info-group">
                  <h3>Osnovne informacije</h3>
                  <div className="info-row">
                    <span className="label">ID:</span>
                    <span className="value">{artist.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Ime:</span>
                    <span className="value">{artist.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Biografija:</span>
                    <span className="value">{artist.bio || 'Nema biografije'}</span>
                  </div>
                </div>

                <div className="info-group">
                  <h3>Sistemske informacije</h3>
                  <div className="info-row">
                    <span className="label">Dodano:</span>
                    <span className="value">{Helper.formatCreatedOn(artist.created_on)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Zadnje ažurirano:</span>
                    <span className="value">
                      {artist.updated_on ? Helper.formatCreatedOn(artist.updated_on) : 'Nije ažurirano'}
                    </span>
                  </div>
                </div>

                <div className="artist-actions">
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