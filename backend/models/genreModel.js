import pool from "../db/db.js";

export const getGenresModel = async () => {
  const [rows] = await pool.query(`
      SELECT g.id,
             g.name,
             g.image_path,
             g.created_on,
             g.updated_on,
             COUNT(sg.song_id) as song_count
      FROM genres g
               LEFT JOIN song_genre sg ON g.id = sg.genre_id
      GROUP BY g.id, g.name, g.image_path, g.created_on, g.updated_on
      ORDER BY g.name
  `);
  return rows;
};

export const getGenreByIdModel = async (id) => {
  const [rows] = await pool.query(`
    SELECT 
      g.id,
      g.name,
      g.image_path,
      g.created_on,
      g.updated_on,
      COUNT(sg.song_id) as song_count
    FROM genres g
    LEFT JOIN song_genre sg ON g.id = sg.genre_id
    WHERE g.id = ?
    GROUP BY g.id, g.name, g.image_path, g.created_on, g.updated_on
  `, [id]);

  return rows.length > 0 ? rows[0] : null;
};

/*
export const createGenreModel = async (genreData) => {
  const { name, image_path } = genreData;

  const [result] = await pool.query(`
    INSERT INTO genres (name, image_path)
    VALUES (?, ?)
  `, [name, image_path]);

  return result.insertId;
};

export const updateGenreModel = async (id, genreData) => {
  const { name, image_path } = genreData;

  const [result] = await pool.query(`
    UPDATE genres
    SET name = ?,
        image_path = ?,
        updated_on = NOW()
    WHERE id = ?
  `, [name, image_path, id]);

  return result.affectedRows > 0;
};

export const deleteGenreModel = async (id) => {
  const [result] = await pool.query(`
    DELETE FROM genres
    WHERE id = ?
  `, [id]);

  return result.affectedRows > 0;
};*/
