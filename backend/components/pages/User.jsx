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
  const [userUpdated, setUserUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState({
    status: '',
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    if (user) {
      const hasAnyChanges = Object.keys(formData).some(key =>
        user[key] !== formData[key]
      );
      setHasChanges(hasAnyChanges);
    }
  }, [formData, user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/admin/users/${id}`);
        setUser(response.data.user);
        if (userUpdated) setUserUpdated(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, userUpdated]);

  // Set Form Data when user loads
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        status: user.status,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        sex: user.sex,
        date_birth: user.date_birth,
        user_type: user.user_type,
        marketing_consent: user.marketing_consent,
        data_sharing_consent: user.data_sharing_consent,
      }));
    }
  }, [user]);

  // Dodajemo funkciju za ažuriranje korisnika u User.jsx komponenti
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const changedData = {};

      // Prolazimo kroz sva polja i dodajemo samo ona koja su promijenjena
      for (const key in formData) {
        if (user[key] !== formData[key]) {
          changedData[key] = formData[key];
        }
      }

      // Šaljemo samo promijenjene podatke
      const response = await api.put(`/api/admin/users/${id}`, changedData);

      if (response.status === 200) {
        setUserUpdated(true);
        // alert('Korisnik uspješno ažuriran');
      }
    } catch (err) {
      setError(err.message || 'Došlo je do greške prilikom ažuriranja korisnika');
    } finally {
      setLoading(false);
    }
  };

  // Dodaj funkciju za resetiranje forme na originalne vrijednosti
  const handleCancel = () => {
    if (user) {
      setFormData({
        status: user.status,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        sex: user.sex,
        date_birth: user.date_birth,
        user_type: user.user_type,
        marketing_consent: user.marketing_consent,
        data_sharing_consent: user.data_sharing_consent,
      });
      // Resetiraj hasChanges ako ga koristiš za praćenje promjena
      setHasChanges(false);
    }
  };

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
                <h3 className="mb-0">Joined on: {Helper.formatCreatedOn(user.created_on)}</h3>
              </div>
              <div className="header-single__stats | text-italic ">
                <p className="fw-500">Last login 27, March 2025</p>
                <p className="text-250">Total plays: <span className="clr-primary-500">170 023 times</span></p>
                <button className="header-single__close icon-arrow-left" type="button" onClick={() => navigate(-1)}></button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <fieldset className="form__group">
                <legend>User information</legend>
                <div className="form__row">
                  <FormInput
                    name="firstname"
                    label="First name"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                  />

                  <FormInput
                    name="lastname"
                    label="Last name"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>

                <div className="form__row">
                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <FormInput
                    name="username"
                    label="Username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="form__row">
                  <FormInput
                    name="date_birth"
                    label="Date of birth"
                    type="text"
                    value={formData.date_birth ? Helper.formatReleaseDate(user.date_birth) : 'Nije postavljeno'}
                    onChange={handleChange}
                  />

                  <FormInput
                    name="sex"
                    label="Gender"
                    type="radio"
                    value={formData.sex}
                    onChange={handleChange}
                    options={[
                      { value: 'M', label: 'Male' },
                      { value: 'F', label: 'Female' }
                    ]}
                  />

                  <FormInput
                    name="user_type"
                    label="User type"
                    type="text"
                    value={formData.user_type}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>
              <fieldset className="form__group">
                <legend>Other</legend>
                <div className="form__row">
                  <FormInput
                    name="marketing_consent"
                    label="Marketing consent"
                    type="checkbox"
                    checked={formData.marketing_consent}
                    onChange={handleChange}
                  />

                  <FormInput
                    name="data_sharing_consent"
                    label="Data sharing consent"
                    type="checkbox"
                    checked={formData.data_sharing_consent}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>
              <div className="form__actions">
                <button
                  className="btn btn--neutral"
                  type="button"
                  onClick={handleCancel}
                  disabled={!hasChanges || loading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn--primary"
                  type="submit"
                  disabled={!hasChanges || loading}
                >
                  {loading ? 'Spremanje...' : 'Save changes'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}