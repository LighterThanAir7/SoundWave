import pool from "../db/db.js";
import NodeID3 from 'node-id3';

const extractSongMetadata = (file, tags) => {
  if (!tags) {
    throw new Error('No metadata found in file');
  }

  // Process artists and genres
  const artists = tags.artist ?
    tags.artist
      .replace(/([a-z])([A-Z])/g, '$1;$2')
      .split(';')
      .map(artist => artist.trim())
      .filter(Boolean)
    : [];

  const genres = tags.genre ?
    tags.genre
      .replace(/([a-z])([A-Z])/g, '$1;$2')
      .split(';')
      .map(genre => genre.trim())
      .filter(Boolean)
    : [];

  // Format release date
  const formatReleaseDate = () => {
    if (!tags.year) return null;

    if (tags.date) {
      const day = tags.date.substring(0, 2);
      const month = tags.date.substring(2, 4);
      return `${tags.year}-${month}-${day}`;
    }

    return `${tags.year}-01-01`;
  };

  // Get relative path
  const getRelativePath = (fullPath) => {
    if (!fullPath) {
      throw new Error('File path is required');
    }

    const parts = fullPath.split('songs');
    if (parts.length < 2) {
      throw new Error('Invalid file path structure');
    }

    return parts[1].replace(/\\/g, '/').replace(/^\/+/, '');
  };

  return {
    title: tags.title || null,
    primary_artist: artists[0] || null,
    featuring_artists: artists.slice(1),
    album: tags.album || null,
    duration: tags.length ? Math.round(parseInt(tags.length) / 1000) : null,
    track_number: tags.trackNumber ?
      parseInt(tags.trackNumber.split('/')[0]) : null,
    released_on: formatReleaseDate(),
    has_artwork: tags.image ? true : false,
    file_path: getRelativePath(file.path),
    file_format: 'mp3',
    file_size: file.size,
    genres
  };
};

const insertSongMetadata = async (pool, metadata) => {
  try {
    // 1. Insert or get primary artist
    let artistId = null;
    if (metadata.primary_artist) {
      const [artistResult] = await pool.query(
        'INSERT IGNORE INTO artists (name) VALUES (?)',
        [metadata.primary_artist]
      );

      const [artistIdResult] = await pool.query(
        'SELECT id FROM artists WHERE name = ?',
        [metadata.primary_artist]
      );

      if (artistIdResult.length > 0) {
        artistId = artistIdResult[0].id;
      } else {
        throw new Error(`Could not create or find artist: ${metadata.primary_artist}`);
      }
    } else {
      throw new Error('Primary artist is required');
    }

    // 2. Insert or get album if exists
    let albumId = null;
    if (metadata.album) {
      const [albumResult] = await pool.query(
        'INSERT IGNORE INTO albums (title, release_date) VALUES (?, ?)',
        [metadata.album, metadata.released_on]
      );

      const [albumIdResult] = await pool.query(
        'SELECT id FROM albums WHERE title = ?',
        [metadata.album]
      );

      if (albumIdResult.length > 0) {
        albumId = albumIdResult[0].id;
      }
    }

    // 3. Insert song
    const [songResult] = await pool.query(
      `INSERT INTO songs (
                title, primary_artist_id, album_id, duration, 
                track_number, released_on, file_path, 
                file_format, file_size
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        metadata.title,
        artistId,
        albumId,
        metadata.duration,
        metadata.track_number,
        metadata.released_on,
        metadata.file_path,
        metadata.file_format,
        metadata.file_size
      ]
    );

    // 4. Insert genres
    if (metadata.genres.length > 0) {
      for (const genreName of metadata.genres) {
        const [genreResult] = await pool.query(
          'INSERT IGNORE INTO genres (name) VALUES (?)',
          [genreName]
        );

        const [genreIdResult] = await pool.query(
          'SELECT id FROM genres WHERE name = ?',
          [genreName]
        );

        if (genreIdResult.length > 0) {
          const genreId = genreIdResult[0].id;
          await pool.query(
            'INSERT INTO song_genre (song_id, genre_id) VALUES (?, ?)',
            [songResult.insertId, genreId]
          );
        }
      }
    }

    // 5. Insert featuring artists
    if (metadata.featuring_artists.length > 0) {
      for (const artistName of metadata.featuring_artists) {
        const [featArtistResult] = await pool.query(
          'INSERT IGNORE INTO artists (name) VALUES (?)',
          [artistName]
        );

        const [artistIdResult] = await pool.query(
          'SELECT id FROM artists WHERE name = ?',
          [artistName]
        );

        if (artistIdResult.length > 0) {
          const featArtistId = artistIdResult[0].id;
          await pool.query(
            'INSERT INTO collaborating_artists (song_id, artist_id, artist_role) VALUES (?, ?, ?)',
            [songResult.insertId, featArtistId, 'featuring']
          );
        }
      }
    }

    return songResult.insertId;
  } catch (error) {
    console.error('Error inserting song metadata:', error);
    throw error;
  }
};

export const handleSingleSongUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was uploaded.' });
    }

    const tags = NodeID3.read(req.file.path);
    const metadata = extractSongMetadata(req.file, tags);
    const songId = await insertSongMetadata(pool, metadata);

    res.json({
      message: 'Song uploaded and processed successfully',
      songId,
      metadata
    });

  } catch (error) {
    console.error('Single upload error:', error);
    res.status(500).json({
      message: 'Error processing file upload',
      error: error.message
    });
  }
};

export const handleBatchSongUpload = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    if (req.files.length > 5000) {
      return res.status(400).json({
        message: 'Too many files. Maximum 5000 files per upload.'
      });
    }

    const processedFiles = [];
    const errors = [];

    for (const file of req.files) {
      try {
        const tags = NodeID3.read(file.path);
        const metadata = extractSongMetadata(file, tags);
        const songId = await insertSongMetadata(pool, metadata);
        processedFiles.push({
          filename: file.filename,
          songId,
          metadata
        });
      } catch (error) {
        errors.push({
          filename: file.originalname,
          error: error.message
        });
      }
    }

    res.json({
      message: 'Batch upload processed',
      totalFiles: req.files.length,
      successfulUploads: processedFiles.length,
      failedUploads: errors.length,
      processedFiles,
      errors
    });

  } catch (error) {
    console.error('Batch upload error:', error);
    res.status(500).json({
      message: 'Error processing batch upload',
      error: error.message
    });
  }
};