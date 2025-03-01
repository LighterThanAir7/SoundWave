import pool from "../db/db.js";

export const createPlaylist = async (playlistData) => {
  const { name, created_by_id, description, type, image_path } = playlistData;
  const [result] = await pool.query(`
      INSERT INTO playlists (name, created_by_id, description, type, image_path)
      VALUES (?, ?, ?, ?, ?)
  `, [name, created_by_id, description, type, image_path]);
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

export const getAllPlaylistsModel = async () => {
  const [rows] = await pool.query(`
      SELECT
          p.id,
          p.name,
          p.created_by_id,
          p.description,
          pt.name as type_name,
          p.image_path,
          p.created_on,
          p.updated_on,
          COUNT(ps.song_id) as song_count
      FROM playlists p
               LEFT JOIN spt_playlist_type pt ON p.type = pt.id
               LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
      GROUP BY p.id, p.name, p.created_by_id, p.description, pt.name, p.image_path, p.created_on, p.updated_on
      ORDER BY p.created_on DESC
  `);

  return rows;
};

export const getPlaylistByIdModel = async (id) => {
  // Dohvaćanje podataka o playlisti
  const [playlistRows] = await pool.query(`
    SELECT 
      p.id,
      p.name,
      p.created_by_id,
      p.description,
      p.type,
      pt.name as type_name,
      p.image_path,
      p.created_on,
      p.updated_on
    FROM playlists p
    LEFT JOIN spt_playlist_type pt ON p.type = pt.id
    WHERE p.id = ?
  `, [id]);

  if (playlistRows.length === 0) {
    return null;
  }

  const playlist = playlistRows[0];

  // Dohvaćanje pjesama playliste
  const [songsRows] = await pool.query(`
    SELECT 
      s.id,
      s.title,
      s.duration,
      a.name as artist,
      GROUP_CONCAT(DISTINCT
        CONCAT(collab_artist.name,
               IF(ca.artist_role IS NOT NULL, CONCAT(' (', ca.artist_role, ')'), '')
        )
      ) as collaborating_artists,
      ps.order_number
    FROM playlist_songs ps
    JOIN songs s ON ps.song_id = s.id
    LEFT JOIN artists a ON s.primary_artist_id = a.id
    LEFT JOIN collaborating_artists ca ON s.id = ca.song_id
    LEFT JOIN artists collab_artist ON ca.artist_id = collab_artist.id
    WHERE ps.playlist_id = ?
    GROUP BY s.id, s.title, s.duration, a.name, ps.order_number
    ORDER BY ps.order_number
  `, [id]);

  // Dodavanje pjesama u objekt playliste
  playlist.songs = songsRows;

  return playlist;
};