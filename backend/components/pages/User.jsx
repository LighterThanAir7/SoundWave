import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/admin/users/${id}`);
        setUser(response.data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !user && (
          <div className="no-data">Korisnik nije pronađen</div>
        )}

        {!loading && !error && user && (
          <>
            <div className="admin-header">
              <button onClick={() => navigate(-1)} className="btn-back">
                <i className="icon-arrow-left"></i> Natrag
              </button>
              <h1>{user.username}</h1>
            </div>

            <div className="user-details">
              <div className="user-avatar">
                {user.img ? (
                  <img src={`/uploads/avatars/${user.img}`} alt={user.username} />
                ) : (
                  <div className="no-avatar">
                    <i className="icon-user"></i>
                  </div>
                )}
              </div>

              <div className="user-info">
                <div className="info-group">
                  <h3>Osnovne informacije</h3>
                  <div className="info-row">
                    <span className="label">Korisničko ime:</span>
                    <span className="value">{user.username}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{user.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Ime:</span>
                    <span className="value">{user.firstname}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Prezime:</span>
                    <span className="value">{user.lastname || 'Nije postavljeno'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Tip korisnika:</span>
                    <span className="value">{user.user_type}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Status:</span>
                    <span className="value">{user.status ? 'Aktivan' : 'Neaktivan'}</span>
                  </div>
                </div>

                <div className="info-group">
                  <h3>Osobni podaci</h3>
                  <div className="info-row">
                    <span className="label">Datum rođenja:</span>
                    <span className="value">
                      {user.date_birth ? Helper.formatReleaseDate(user.date_birth) : 'Nije postavljeno'}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Spol:</span>
                    <span className="value">
                      {user.sex === 'M' ? 'Muški' : user.sex === 'F' ? 'Ženski' : 'Nije postavljeno'}
                    </span>
                  </div>
                </div>

                <div className="info-group">
                  <h3>Postavke privatnosti</h3>
                  <div className="info-row">
                    <span className="label">Marketing pristanak:</span>
                    <span className="value">{user.marketing_consent ? 'Da' : 'Ne'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Pristanak za dijeljenje podataka:</span>
                    <span className="value">{user.data_sharing_consent ? 'Da' : 'Ne'}</span>
                  </div>
                </div>

                <div className="info-group">
                  <h3>Sistemske informacije</h3>
                  <div className="info-row">
                    <span className="label">Zadnja prijava:</span>
                    <span className="value">
                      {user.last_login ? Helper.formatCreatedOn(user.last_login) : 'Nikad'}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Kreiran:</span>
                    <span className="value">{Helper.formatCreatedOn(user.created_on)}</span>
                  </div>
                </div>

                <div className="user-actions">
                  <button className="btn btn-primary">Uredi</button>
                  <button className="btn btn-danger">Izbriši</button>
                  <button className="btn btn-secondary">Resetiraj lozinku</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}