import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";
import FormInput from "../../../src/components/common/FormInput.jsx";

export default function Album() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    release_date: '',
    total_tracks: '',
    created_on: '',
    updated_on: ''
  });

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

  useEffect(() => {
    if (album) {
      setFormData(prevData => ({
        ...prevData,
        title: album.title,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        created_on: album.created_on,
        updated_on: album.updated_on
      }));
    }
  }, [album]);

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
      await api.put(`/api/admin/albums/${id}`, formData);
      // Handle success (e.g., show notification, refresh data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: album.title,
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      created_on: album.created_on,
      updated_on: album.updated_on
    });
    setHasChanges(false);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper admin-wrapper--single">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !album && (
          <div className="no-data">Album nije pronađen</div>
        )}

        {!loading && !error && album && (
          <>
            <div className="header-single">
              <div className="header-single__avatar">
                {album.artwork_path ? (
                  <img
                    src={`/uploads/albums/${album.artwork_path}`}
                    alt={album.title}
                    className="header-single__img"
                  />
                ) : (
                  <div className="header-single__img">
                    <i className="icon-album"></i>
                  </div>
                )}
              </div>
              <div className="header-single__info">
                <h1 className="mb-8">{album.title}</h1>
                {album.release_date && (
                  <h3 className="mb-0">
                    Released: {Helper.formatReleaseDate(album.release_date)}
                  </h3>
                )}
              </div>
              <div className="header-single__stats | text-italic ">
                <p className="fw-500">Added on: {Helper.formatCreatedOn(album.created_on)}</p>
                <button
                  className="header-single__close icon-arrow-left"
                  type="button"
                  onClick={() => navigate(-1)}
                ></button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <fieldset className="form__group">
                <legend>Osnovne informacije</legend>
                <div className="form__row">
                  <FormInput
                    name="title"
                    label="Naslov"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                  />

                  <FormInput
                    name="release_date"
                    label="Datum izdavanja"
                    type="date"
                    value={formData.release_date}
                    onChange={handleChange}
                    formatValue={Helper.formatReleaseDate}
                  />
                </div>

                <div className="form__row">
                  <FormInput
                    name="total_tracks"
                    label="Broj pjesama"
                    type="number"
                    value={formData.total_tracks}
                    onChange={handleChange}
                  />
                </div>
                <div className="album-songs mt-40">
                  <h3>Pjesme na albumu ({album.songs.length})</h3>
                  {album.songs.length > 0 ? (
                    <div className="song-list">
                      {album.songs.map((song) => (
                        <div key={song.id} className="song-item">
                          <span className="song-track">[{song.track_number}] - </span>
                          <span className="song-title">{song.title} | </span>
                          <span className="song-duration">
                        {Helper.formatSongDuration(song.duration)}
                      </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-songs">Nema pjesama na ovom albumu</div>
                  )}
                </div>
              </fieldset>

              <fieldset className="form__group">
                <legend>Sistemske informacije</legend>
                <div className="form__row">
                  <FormInput
                    name="created_on"
                    label="Dodano"
                    type="text"
                    value={Helper.formatCreatedOn(album.created_on)}
                    readOnly
                  />

                  <FormInput
                    name="updated_on"
                    label="Zadnje ažurirano"
                    type="text"
                    value={album.updated_on ? Helper.formatCreatedOn(album.updated_on) : 'Nije ažurirano'}
                    readOnly
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
