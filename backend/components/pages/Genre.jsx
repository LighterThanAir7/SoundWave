import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";
import FormInput from "../../../src/components/common/FormInput.jsx";

export default function Genre() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    created_on: '',
    updated_on: '',
    song_count: '',
  });

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

  useEffect(() => {
    if (genre) {
      setFormData(prevData => ({
        ...prevData,
        name: genre.name,
        created_on: genre.created_on,
        updated_on: genre.updated_on,
        song_count: genre.song_count,
      }));
    }
  }, [genre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/api/admin/genres/${id}`, formData);
      // Handle success (e.g., show notification, refresh data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: genre.name,
      created_on: genre.created_on,
      updated_on: genre.updated_on,
      song_count: genre.song_count,
    });
    setHasChanges(false);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper admin-wrapper--single">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !genre && (
          <div className="no-data">Žanr nije pronađen</div>
        )}

        {!loading && !error && genre && (
          <>
            <div className="header-single">
              <div className="header-single__avatar">
                {genre.image_path ? (
                  <img
                    src={genre.image_path}
                    alt={genre.name}
                    className="header-single__img"
                  />
                ) : (
                  <div className="header-single__img">
                    <i className="icon-music-note"></i>
                  </div>
                )}
              </div>
              <div className="header-single__info">
                <h1 className="mb-8">{genre.name}</h1>
              </div>
              <div className="header-single__stats | text-italic ">
                <p className="fw-500">Added on: {Helper.formatCreatedOn(genre.created_on)}</p>
                <button
                  className="header-single__close icon-arrow-left"
                  type="button"
                  onClick={() => navigate(-1)}
                ></button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <fieldset className="form__group">
                <legend>Basic information</legend>
                <div className="form__row">
                  <FormInput
                    name="name"
                    label="Naziv"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <FormInput
                    name="song_count"
                    label="Number of songs"
                    type="number"
                    value={formData.song_count}
                    onChange={handleChange}
                  />
                </div>

                <div className="form__row">
                  <FormInput
                    name="created_on"
                    label="Created on"
                    type="text"
                    value={Helper.formatCreatedOn(genre.created_on)}
                    readOnly
                  />

                  <FormInput
                    name="updated_on"
                    label="Last updated"
                    type="text"
                    value={genre.updated_on ? Helper.formatCreatedOn(genre.updated_on) : 'Never'}
                    readOnly
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
