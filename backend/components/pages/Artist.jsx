import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";
import FormInput from "../../../src/components/common/FormInput.jsx";

export default function Artist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    created_on: '',
  });

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

  useEffect(() => {
    if (artist) {
      setFormData(prevData => ({
        ...prevData,
        name: artist.name,
        bio: artist.bio,
        created_on: artist.created_on,
      }));
    }
  }, [artist]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper admin-wrapper--single">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !artist && (
          <div className="no-data">Izvođač nije pronađen</div>
        )}

        {!loading && !error && artist && (
          <>
            <div className="header-single">
              <div className="header-single__avatar">
                {artist.img ? (
                  <img src={`/uploads/artists/${artist.img_path}`} alt={artist.name} />
                ) : (
                  <i className="icon-users"></i>
                )}
              </div>
              <div className="header-single__info">
                <h1 className="mb-8">{artist.name}</h1>
              </div>
              <div className="header-single__stats | text-italic ">
                <p className="fw-500">Added on: {Helper.formatCreatedOn(artist.created_on)}</p>
                <p className="text-250">Total plays: <span className="clr-primary-500">170 023 times</span></p>
                <button className="header-single__close icon-arrow-left" type="button" onClick={() => navigate(-1)}></button>
              </div>
            </div>

            <form>
              <fieldset className="form__group">
                <legend>Basic information</legend>
                <div className="form__row">
                  <FormInput
                    name="name"
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <FormInput
                    name="bio"
                    label="Biography"
                    type="text"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>

                <div className="form__row">
                  <FormInput
                    id="created_on"
                    name="created_on"
                    label="Date added"
                    type="text"
                    value={Helper.formatCreatedOn(artist.created_on)}
                    onChange={handleChange}
                  />

                  <FormInput
                    id="updated_on"
                    name="updated_on"
                    label="Last updated"
                    type="text"
                    value={Helper.formatCreatedOn(artist.updated_on)}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>
              <fieldset className="form__group">
                <div className="form__row"></div>
              </fieldset>
              <div className="form__actions">
                <button
                  className="btn btn--neutral"
                  type="button"
                  /*onClick={handleCancel}*/
                  /*disabled={!hasChanges || loading}*/
                >
                  Cancel
                </button>
                <button
                  className="btn btn--primary"
                  type="submit"
                  /*disabled={!hasChanges || loading}*/
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