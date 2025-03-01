import pool from "../db/db.js";

export const createPlaylist = async (playlistData) => {
  const { name, created_by_id, description, type, image_url } = playlistData;
  const [result] = await pool.query(`
      INSERT INTO playlists (name, created_by_id, description, type, image_url)
      VALUES (?, ?, ?, ?, ?)
  `, [name, created_by_id, description, type, image_url]);
  return result.insertId;
};

export const getPlaylistsByUser = async (userId) => {
  const [playlists] = await pool.query(`
      SELECT p.*, pt.name as type_name
      FROM playlists p
               JOIN spt_playlist_type pt ON p.type = pt.id
      WHERE p.created_by_id = ?
      ORDER BY p.created_on DESC
  `, [userId]);
  return playlists;
};

export const addSongToPlaylist = async (playlistId, songId, userId) => {
  // Validate inputs
  if (!playlistId || !songId || !userId) {
    throw new Error('Required parameters cannot be null or undefined');
  }

  // Get the current highest order_number for this playlist
  const [maxOrder] = await pool.query(
    'SELECT MAX(order_number) as maxOrder FROM playlist_songs WHERE playlist_id = ?',
    [playlistId]
  );
  const nextOrder = (maxOrder[0].maxOrder || 0) + 1;

  const [result] = await pool.query(`
      INSERT INTO playlist_songs (playlist_id, song_id, added_by_user_id, order_number)
      VALUES (?, ?, ?, ?)
  `, [playlistId, songId, userId, nextOrder]);
  return result.insertId;
};

export const getSongInPlaylistsQuerry = async (songId, userId) => {
  const [playlists] = await pool.query(`
      SELECT DISTINCT p.id
      FROM playlists p
               JOIN playlist_songs ps ON p.id = ps.playlist_id
      WHERE ps.song_id = ? AND p.created_by_id = ?
  `, [songId, userId]);
  return playlists.map(p => p.id);
};

export const removeSongFromPlaylistQuery = async (playlistId, songId, userId) => {
  const [result] = await pool.query(`
      DELETE FROM playlist_songs
      WHERE playlist_id = ? AND song_id = ? AND added_by_user_id = ?
  `, [playlistId, songId, userId]);
  return result.affectedRows > 0;
};