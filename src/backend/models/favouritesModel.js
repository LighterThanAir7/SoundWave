import pool from "../db/db.js";

export const getFavorites = async (userId) => {
  const [favorites] = await pool.query(`
    SELECT s.*, a.name as artist 
    FROM user_favorites uf
    JOIN songs s ON uf.song_id = s.id
    LEFT JOIN artists a ON s.primary_artist_id = a.id
    WHERE uf.user_id = ?
    ORDER BY uf.created_on DESC
  `, [userId]);
  return favorites;
};

export const addFavorite = async (userId, songId) => {
  const [result] = await pool.query(
    'INSERT INTO user_favorites (user_id, song_id) VALUES (?, ?)',
    [userId, songId]
  );
  return result.insertId;
};

export const removeFavorite = async (userId, songId) => {
  const [result] = await pool.query(
    'DELETE FROM user_favorites WHERE user_id = ? AND song_id = ?',
    [userId, songId]
  );
  return result.affectedRows > 0;
};