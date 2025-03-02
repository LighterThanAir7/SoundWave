import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";

export default function Genre() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const response = await api.get(`/api/admin/genres/${id}`);
        setGenre(response.data.genre);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreData();
  }, [id]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !genre && (
          <div className="no-data">Žanr nije pronađen</div>
        )}

        {!loading && !error && genre && (
          <>
            <div className="admin-header">
              <button onClick={() => navigate(-1)} className="btn-back">
                <i className="icon-arrow-left"></i> Natrag
              </button>
              <h1>{genre.name}</h1>
            </div>

            <div className="genre-details">
              <div className="genre-image">
                {genre.image_path ? (
                  <img src={`${genre.image_path}`} alt={genre.name} />
                ) : (
                  <div className="no-image">
                    <i className="icon-music-note"></i>
                    <span>Nema slike</span>
                  </div>
                )}
              </div>

              <div className="genre-info">
                <div className="info-group">
                  <h3>Osnovne informacije</h3>
                  <div className="info-row">
                    <span className="label">ID:</span>
                    <span className="value">{genre.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Naziv:</span>
                    <span className="value">{genre.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Broj pjesama:</span>
                    <span className="value">{genre.song_count}</span>
                  </div>
                </div>

                <div className="info-group">
                  <h3>Sistemske informacije</h3>
                  <div className="info-row">
                    <span className="label">Dodano:</span>
                    <span className="value">{Helper.formatCreatedOn(genre.created_on)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Zadnje ažurirano:</span>
                    <span className="value">
                      {genre.updated_on ? Helper.formatCreatedOn(genre.updated_on) : 'Nije ažurirano'}
                    </span>
                  </div>
                </div>

                <div className="genre-actions">
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