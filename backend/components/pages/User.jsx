import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";
import FormInput from "../../../src/components/common/FormInput.jsx";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    sex: '',
    date_birth: '',
    user_type: '',
    marketing_consent: false,
    data_sharing_consent: false,
  });

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

  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        sex: user.sex === 'M' ? 'Muški' : user.sex === 'F' ? 'Ženski' : 'Nije postavljeno',
        date_birth: '',
        user_type: '',
        marketing_consent: false,
        data_sharing_consent: false,
      }));
    }
  }, [user]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper admin-wrapper--single">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !user && (
          <div className="no-data">User not found</div>
        )}

        {!loading && !error && user && (
          <>
            <div className="header-single">
              <div className="header-single__avatar">
                {user.img ? (
                  <img className="header-single__img" src={`/uploads/avatars/${user.img}`} alt={user.username} />
                ) : (
                    <i className="icon-users"></i>
                )}
              </div>
              <div className="header-single__info">
                <h1 className="mb-8">{user.username}</h1>
                <h3 className="mb-0">{Helper.formatCreatedOn(user.created_on)}</h3>
              </div>
              <div className="header-single__stats | text-italic ">
                <p className="fw-500">Last login 27, March 2025</p>
                <p className="text-250">Total plays: <span className="clr-primary-500">170 023 times</span></p>
                <button className="header-single__close icon-arrow-left" type="button" onClick={() => navigate(-1)}></button>
              </div>
            </div>

            <div className="p-48">
              <form className="content-wrapper-single z-2 relative">
                <div className="">
                  <fieldset className="form__group">
                    <h3>User information</h3>

                    <div className="form__row">
                      <FormInput
                        id="firstname"
                        name="firstname"
                        label="First name"
                        type="text"
                        /*value={formData.email}*/
                        /*onChange={handleChange}*/
                      />

                      <FormInput
                        id="lastname"
                        name="lastname"
                        label="Last name"
                        type="text"
                        /*value={formData.email}*/
                        /*onChange={handleChange}*/
                      />
                    </div>

                    <div className="form__row">
                      <FormInput
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        /*value={formData.email}*/
                        /*onChange={handleChange}*/
                      />

                      <FormInput
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        /*value={formData.email}*/
                        /*onChange={handleChange}*/
                      />
                    </div>

                    <div className="form__row">
                      <FormInput
                        id="date_birth"
                        name="date_birth"
                        label="Date of birth"
                        type="email"
                        /*value={formData.email}*/
                        /*onChange={handleChange}*/
                      />

                      <FormInput
                        id="sex"
                        name="sex"
                        label="Gender"
                        type="text"
                        /*value={formData.email}*/
                        /*onChange={handleChange}*/
                      />

                      <FormInput
                        id="user_type"
                        name="user_type"
                        label="User type"
                        type="text"
                        /*value={formData.email}*/
                        /*onChange={handleChange}*/
                      />
                    </div>
                  </fieldset>
                </div>
                <div>
                  <h2>Content</h2>
                  <div className="user-details">
                    <div className="user-info">

                        <div className="info-row">
                          <span className="label">Status:</span>
                          <span className="value">{user.status ? 'Aktivan' : 'Neaktivan'}</span>
                        </div>

                      <div className="info-group">
                        <h3>Osobni podaci</h3>
                        <div className="info-row">
                          <span className="label">Datum rođenja:</span>
                          <span className="value">
                            {user.date_birth ? Helper.formatReleaseDate(user.date_birth) : 'Nije postavljeno'}
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
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}