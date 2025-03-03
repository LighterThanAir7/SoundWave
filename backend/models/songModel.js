import pool from "../db/db.js";

export const getAllSongs = async () => {
  const [songs] = await pool.query(`
      SELECT s.id,
             s.title,
             s.duration,
             s.file_size,
             s.file_path,
             s.artwork_path,
             a.name as artist,
             GROUP_CONCAT(DISTINCT g.name) as genres,
             GROUP_CONCAT(DISTINCT
                          CONCAT(collab_artist.name,
                                 IF(ca.artist_role IS NOT NULL, CONCAT(' (', ca.artist_role, ')'), '')
                          )
             ) as collaborating_artists
      FROM songs s
               LEFT JOIN artists a ON s.primary_artist_id = a.id
               LEFT JOIN song_genre sg ON s.id = sg.song_id
               LEFT JOIN genres g ON sg.genre_id = g.id
               LEFT JOIN collaborating_artists ca ON s.id = ca.song_id
               LEFT JOIN artists collab_artist ON ca.artist_id = collab_artist.id
      GROUP BY s.id, s.title, s.duration, s.file_size, s.file_path, s.artwork_path, s.created_on, a.name
      ORDER BY s.created_on DESC
  `);
  return songs;
};

export const getSongByIdModel = async (id) => {
  const [song] = await pool.query(`
      SELECT s.id,
             s.title,
             s.primary_artist_id,
             s.album_id,
             s.duration,
             s.track_number,
             s.released_on,
             s.artwork_path,
             s.file_path,
             s.file_format,
             s.file_size,
             s.created_on,
             s.updated_on,
             a.name as artist,
             al.title as album_title,
             GROUP_CONCAT(DISTINCT g.name) as genres,
             GROUP_CONCAT(DISTINCT
                          CONCAT(collab_artist.name,
                                 IF(ca.artist_role IS NOT NULL, CONCAT(' (', ca.artist_role, ')'), '')
                          )
             ) as collaborating_artists
      FROM songs s
               LEFT JOIN artists a ON s.primary_artist_id = a.id
               LEFT JOIN albums al ON s.album_id = al.id
               LEFT JOIN song_genre sg ON s.id = sg.song_id
               LEFT JOIN genres g ON sg.genre_id = g.id
               LEFT JOIN collaborating_artists ca ON s.id = ca.song_id
               LEFT JOIN artists collab_artist ON ca.artist_id = collab_artist.id
      WHERE s.id = ?
      GROUP BY s.id, s.title, s.primary_artist_id, s.album_id, s.duration,
               s.track_number, s.released_on, s.artwork_path, s.file_path,
               s.file_format, s.file_size, s.created_on, s.updated_on,
               a.name, al.title
  `, [id]);

  return song[0];
};
