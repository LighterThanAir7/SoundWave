import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useColorManagement } from "../../../src/hooks/useColorManagement";
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import Helper from "../../helpers/Helper.js";
import {UPLOADS_URL} from "../../config/constants.js";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";
import FormInput from "../../../src/components/common/FormInput.jsx";

export default function Song() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [colorsApplied, setColorsApplied] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    artist: '',
    album: '',
    track_number: '',
    release_date: '',
    duration: '',
    file_format: '',
    file_size: '',
    bitrate: '',
    artwork_path: '',
    genres: [],
    collaborating_artists: [],
    date_added: '',
    date_updated: '',
  });

  const imageRef = useRef(null);
  useColorManagement(imageRef, !!song?.artwork_path, () => {
    setColorsApplied(true);
  });

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

  useEffect(() => {
    if (song) {
      setFormData(prevData => ({
        ...prevData,
        id: song.id,
        title: song.title,
        artist: song.artist,
        album: song.album_title,
        track_number: song.track_number,
        released_on: song.released_on,
        duration: song.duration,
        file_format: song.file_format,
        file_size: song.file_size,
        bitrate: song.bitrate,
        artwork_path: song.artwork_path,
        genres: song.genres,
        collaborating_artists: song.collaborating_artists,
        date_added: song.date_added,
        date_updated: song.date_updated,
      }));
    }
  }, [song]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const isLoading = loading || (song && (!imageLoaded || !colorsApplied));

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper admin-wrapper--single">
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />

        {!loading && !error && !song && (
          <div className="no-data">Pjesma nije pronađena</div>
        )}

        {!loading && !error && song && (
          <>
            <div className="admin-song-header">
              <img className="admin-song-header__img" ref={imageRef} src={`${UPLOADS_URL}/songs/${song.artwork_path}`} alt={song.title} crossOrigin="anonymous" onLoad={handleImageLoad}/>
              <h1 className="mb-0">{song.title}</h1>
              <button onClick={() => navigate(-1)} className="btn-back">
                <i className="icon-arrow-left"></i> Natrag
              </button>
            </div>
            <div className="px-48 z-2 relative">
              <FormInput
                id="song_id"
                name="song_id"
                label="ID"
                type="text"
                value={formData.id}
                onChange={handleChange}
              />

              <FormInput
                id="title"
                name="title"
                label="Title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />

              <FormInput
                id="artist"
                name="artist"
                label="Artist"
                type="text"
                value={formData.artist}
                onChange={handleChange}
              />

              <FormInput
                id="collaborating_artists"
                name="collaborating_artists"
                label="Collaborating artists"
                type="text"
                value={formData.collaborating_artists}
                onChange={handleChange}
              />

              <FormInput
                id="album"
                name="album"
                label="Album"
                type="text"
                value={formData.album}
                onChange={handleChange}
              />

              <FormInput
                id="track_number"
                name="track_number"
                label="Track number"
                type="text"
                value={formData.track_number}
                onChange={handleChange}
              />

              <FormInput
                id="duration"
                name="duration"
                label="Duration"
                type="text"
                value={Helper.formatReleaseDate(song.released_on)}
                onChange={handleChange}
              />

              <FormInput
                id="released_on"
                name="released_on"
                label="Release Date"
                type="text"
                value={Helper.formatSongDuration(song.duration)}
                onChange={handleChange}
              />

              <FormInput
                id="file_format"
                name="file_format"
                label="File format"
                type="text"
                value={song.file_format}
                onChange={handleChange}
              />

              <FormInput
                id="file_size"
                name="file_size"
                label="File size"
                type="text"
                value={Helper.formatFileSize(song.file_size)}
                onChange={handleChange}
              />

              <FormInput
                id="file_size"
                name="file_size"
                label="File size"
                type="text"
                value={song.bitrate ? `${song.bitrate} kbps` : 'Nije dostupno'}
                onChange={handleChange}
              />

              <FormInput
                id="file_path"
                name="file_path"
                label="File path"
                type="text"
                value={`${UPLOADS_URL}/songs/${song.file_path}`}
                onChange={handleChange}
              />

              <FormInput
                id="artwork_path"
                name="artwork_path"
                label="Artwork path"
                type="text"
                value={`${UPLOADS_URL}/songs/${song.artwork_path}`}
                onChange={handleChange}
              />

              <FormInput
                id="genres"
                name="genres"
                label="Genre"
                type="text"
                value={song.genres}
                onChange={handleChange}
              />

              <FormInput
                id="created_on"
                name="created_on"
                label="Date added"
                type="text"
                value={Helper.formatCreatedOn(song.created_on)}
                onChange={handleChange}
              />

              <FormInput
                id="created_on"
                name="created_on"
                label="Last updated"
                type="text"
                value={Helper.formatCreatedOn(song.updated_on)}
                onChange={handleChange}
              />

              <div className="song-info">
                <h3>Osnovne informacije</h3>
                <h3>Tehnički podaci</h3>
                <h3>Dodatne informacije</h3>

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