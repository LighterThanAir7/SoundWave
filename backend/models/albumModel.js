import pool from "../db/db.js";

export const getAlbumsModel = async () => {
  const [rows] = await pool.query(`
      SELECT
          a.id,
          a.title,
          a.release_date,
          a.total_tracks,
          a.artwork_path,
          a.created_on,
          a.updated_on
      FROM albums a
      ORDER BY a.release_date DESC
  `);
  return rows;
};

export const getAlbumByIdModel = async (id) => {
  // Dohvaćanje podataka o albumu
  const [albumRows] = await pool.query(`
      SELECT
          a.id,
          a.title,
          a.release_date,
          a.total_tracks,
          a.artwork_path,
          a.created_on,
          a.updated_on
      FROM albums a
      WHERE a.id = ?
  `, [id]);

  if (albumRows.length === 0) {
    return null;
  }

  const album = albumRows[0];

  // Dohvaćanje pjesama albuma s izvođačima i suradnicima
  const [songsRows] = await pool.query(`
    SELECT 
      s.id,
      s.title,
      s.duration,
      s.track_number,
      s.artwork_path,
      a.name as artist,
      GROUP_CONCAT(DISTINCT
        CONCAT(collab_artist.name,
               IF(ca.artist_role IS NOT NULL, CONCAT(' (', ca.artist_role, ')'), '')
        )
      ) as collaborating_artists
    FROM songs s
    LEFT JOIN artists a ON s.primary_artist_id = a.id
    LEFT JOIN collaborating_artists ca ON s.id = ca.song_id
    LEFT JOIN artists collab_artist ON ca.artist_id = collab_artist.id
    WHERE s.album_id = ?
    GROUP BY s.id, s.title, s.duration, s.track_number, s.artwork_path, a.name
    ORDER BY s.track_number, s.title
  `, [id]);

  // Dodavanje pjesama u objekt albuma
  album.songs = songsRows;

  return album;
};