import { useState, useRef, useEffect } from 'react';
import api from "../../backend/config/axiosConfig.js";
import { usePlayer } from '../../context/PlayerContext';

export default function PlayerHeading() {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const playlistRef = useRef(null);
  const newPlaylistRef = useRef(null);

  const { currentSong } = usePlayer();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await api.get('/api/playlists');
        setUserPlaylists(response.data.playlists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const fetchExistingSongInPlaylists = async () => {
    if (!currentSong) return;

    try {
      const response = await api.get(`/api/playlists/song/${currentSong.id}`, {
        withCredentials: true
      });

      if (response.data && response.data.playlistIds) {
        setSelectedPlaylists(response.data.playlistIds);
      }
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        console.error('Network error:', error.message);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    if (showPlaylist && currentSong) {
      fetchExistingSongInPlaylists();
    }
  }, [showPlaylist, currentSong]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 1: return 'icon-material-symbols_public';    // public
      case 2: return 'icon-bx_lock-alt';                // private
      case 3: return 'icon-ion_people-sharp';           // collaborate
      default: return 'icon-language';
    }
  };

  const [formData, setFormData] = useState({
    playlist_title: '',
    playlist_type: 'public',
    playlist_image: null,
    playlist_description: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));

      // Create preview URL for image
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleCheckboxChange = (playlistId) => {
    setSelectedPlaylists(prev => {
      if (prev.includes(playlistId)) {
        return prev.filter(id => id !== playlistId);
      }
      return [...prev, playlistId];
    });
  };

  const handleAddToPlaylists = async () => {
    try {
      // Get the initial playlists that had the song
      const response = await api.get(`/api/playlists/song/${currentSong.id}`);
      const initialPlaylists = response.data.playlistIds;

      // Determine which playlists to add to and remove from
      const playlistsToAdd = selectedPlaylists.filter(id => !initialPlaylists.includes(id));
      const playlistsToRemove = initialPlaylists.filter(id => !selectedPlaylists.includes(id));

      // Add song to new selections
      await Promise.all(playlistsToAdd.map(playlistId =>
        api.post('/api/playlists/add-song', { playlistId, songId: currentSong.id })
      ));

      // Remove song from unselected playlists
      await Promise.all(playlistsToRemove.map(playlistId =>
        api.delete('/api/playlists/remove-song', {
          data: { playlistId, songId: currentSong.id }
        })
      ));

      setShowPlaylist(false);
    } catch (error) {
      console.error('Error updating playlists:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const typeMapping = {
      'public': 1,
      'private': 2,
      'collaborate': 3
    };

    const submitData = new FormData();
    // Map the form field names to match server expectations
    submitData.append('name', formData.playlist_title);
    submitData.append('type', typeMapping[formData.playlist_type]);
    submitData.append('description', formData.playlist_description);
    if (formData.playlist_image) {
      submitData.append('playlist_image', formData.playlist_image);
    }


    try {
      const response = await api.post('/api/playlists', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        // Reset form and close modal on success
        setFormData({
          playlist_title: '',
          playlist_type: 'public',
          playlist_image: null,
          playlist_description: ''
        });
        setShowNewPlaylist(false);
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (playlistRef.current && !playlistRef.current.contains(event.target)) {
        setShowPlaylist(false);
      }
      if (newPlaylistRef.current && !newPlaylistRef.current.contains(event.target)) {
        setShowNewPlaylist(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      playlist_image: null
    }));
  };

  const handlePlusClick = () => {
    setShowPlaylist(true);
    setShowNewPlaylist(false);
  };

  const handleNewPlaylistClick = () => {
    setShowPlaylist(false);
    setShowNewPlaylist(true);
  };

  const closeNewPlaylist = () => {
    setShowNewPlaylist(false);
  };

  return (
    <div className="player__heading">
      <span className="player__now-playing">Now Playing</span>
      <div className="player__heading-icons">
        <i className="icon-share"></i>
        <i className="icon-plus" onClick={handlePlusClick}></i>
        <div
          ref={playlistRef}
          className={`add-to-playlist ${showPlaylist ? 'show' : ''}`}
        >
          <div className="add-to-playlist__header">
            <span className="add-to-playlist__title">Save to</span>
            <button className="add-to-playlist__btn" onClick={handleNewPlaylistClick}>
              New playlist
              <i className="icon-plus"></i>
            </button>
          </div>
          <ul className="add-to-playlist__list">
            {userPlaylists.length > 0 ? (
              userPlaylists.map((playlist) => (
                <li key={playlist.id} className="add-to-playlist__item">
                  <div className="w-full">
                    <input
                      type="checkbox"
                      id={`playlist${playlist.id}`}
                      className="custom-checkbox-field__input"
                      checked={selectedPlaylists.includes(playlist.id)}
                      onChange={() => handleCheckboxChange(playlist.id)}
                    />
                    <label
                      htmlFor={`playlist${playlist.id}`}
                      className="custom-checkbox-field__label"
                    >
                      <span className="custom-checkbox-field__indicator"></span>
                      <span className="custom-checkbox-field__text">{playlist.name}</span>
                    </label>
                  </div>
                  <i className={getTypeIcon(playlist.type)}></i>
                </li>
              ))
            ) : (
              <li className="add-to-playlist__item">
                <span className="custom-checkbox-field__text">You don&apos;t have playlists created</span>
              </li>
            )}
          </ul>
          <button
            className="btn btn--primary-outline btn--full"
            type="button"
            onClick={handleAddToPlaylists}
          >
            Done
          </button>
        </div>
        <div
          ref={newPlaylistRef}
          className={`new-playlist ${showNewPlaylist ? 'show' : ''}`}
        >
          <div className="new-playlist__header">
            <span className="new-playlist__title">New playlist</span>
            <i className="icon-x" onClick={closeNewPlaylist}></i>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="new-playlist__info">
              <input
                type="text"
                className="form__input | mb-16"
                id="playlist_title"
                name="playlist_title"
                placeholder="Title"
                value={formData.playlist_title}
                onChange={handleInputChange}
              />
              <div className="flex g-20">
                <ul className="new-playlist__type">
                  <li className="new-playlist__type-item">
                    <input
                      className="form__input"
                      type="radio"
                      id="type_public"
                      name="playlist_type"
                      value="public"
                      checked={formData.playlist_type === 'public'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="type_public">
                      <i className="icon-material-symbols_public"></i>
                      <span>Public</span>
                    </label>
                  </li>
                  <li className="new-playlist__type-item">
                    <input
                      className="form__input"
                      type="radio"
                      id="type_private"
                      name="playlist_type"
                      value="private"
                      checked={formData.playlist_type === 'private'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="type_private">
                      <i className="icon-bx_lock-alt"></i>
                      <span>Private</span>
                    </label>
                  </li>
                  <li className="new-playlist__type-item">
                    <input
                      className="form__input"
                      type="radio"
                      id="type_collaborate"
                      name="playlist_type"
                      value="collaborate"
                      checked={formData.playlist_type === 'collaborate'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="type_collaborate">
                      <i className="icon-ion_people-sharp"></i>
                      <span>Collaborate</span>
                    </label>
                  </li>
                </ul>
                <div className="new-playlist__image" style={{
                  backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  {imagePreview && (
                    <i
                      className="icon-x remove-image"
                      onClick={handleRemoveImage}
                    ></i>
                  )}
                  {!imagePreview && <i className="icon-ri_image-add-line"></i>}
                  <input
                    type="file"
                    id="playlist_image"
                    name="playlist_image"
                    onChange={handleInputChange}
                    accept="image/*"
                  />
                </div>

              </div>
              <h6 className="text-300 mb-8">Description</h6>
              <textarea
                className="form__textarea"
                name="playlist_description"
                id="playlist_description"
                value={formData.playlist_description}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn--primary-outline btn--full">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}