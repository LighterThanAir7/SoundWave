import pool from "../db/db.js";

export const getArtistsModel = async () => {
  const [rows] = await pool.query(`
      SELECT a.id,
             a.name,
             a.bio,
             a.image_url,
             a.created_on,
             COUNT(DISTINCT s.id) as song_count
      FROM artists a
               LEFT JOIN songs s ON a.id = s.primary_artist_id
      GROUP BY a.id, a.name, a.bio, a.image_url, a.created_on
      ORDER BY a.name
  `);
  return rows;
};

export const getArtistByIdModel = async (id) => {
  const [rows] = await pool.query(`
    SELECT 
      a.id,
      a.name,
      a.bio,
      a.image_url,
      a.created_on,
      a.updated_on
    FROM artists a
    WHERE a.id = ?
  `, [id]);

  return rows.length > 0 ? rows[0] : null;
};