import pool from '../db/db.js';

export const addFavorite = async (userId, songId) => {
  const [result] = await pool.query(
    'INSERT INTO user_favorites (user_id, song_id) VALUES (?, ?)',
    [userId, songId]
  );
  return result;
};

export const removeFavorite = async (userId, songId) => {
  const [result] = await pool.query(
    'DELETE FROM user_favorites WHERE user_id = ? AND song_id = ?',
    [userId, songId]
  );
  return result;
};

export const getFavorites = async (userId) => {
  const [rows] = await pool.query(
    `SELECT s.* FROM songs s 
         INNER JOIN user_favorites uf ON s.id = uf.song_id 
         WHERE uf.user_id = ?`,
    [userId]
  );
  return rows;
};