import pool from "../db/db.js";
import NodeID3 from 'node-id3';

import fs from 'fs/promises';
import path from "path";


const extractSongMetadata = async (file, tags) => {
  if (!tags) {
    throw new Error('No metadata found in file');
  }

  // Add debug logging
  console.log('Raw tags:', {
    artist: tags.artist,
    title: tags.title,
    album: tags.album
  });

  // Process artists and genres
  const artists = tags.artist ?
    tags.artist
      .replace(/([a-z])([A-Z])/g, '$1;$2')
      .split(';')
      .map(artist => artist.trim())
      .filter(Boolean)
    : [];

  // Add debug logging
  console.log('Processed artists:', artists);

  // Final check for primary artist
  const primary_artist = artists[0] || null;
  if (!primary_artist) {
    throw new Error('Could not extract primary artist from metadata');
  }

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

  // Save artwork if present
  const artwork_path = tags.image ?
    await saveArtwork(tags.image.imageBuffer, file.path) : null;

  return {
    title: tags.title || null,
    primary_artist: artists[0] || null,
    featuring_artists: artists.slice(1),
    album: tags.album || null,
    duration: tags.length ? Math.round(parseInt(tags.length) / 1000) : null,
    track_number: tags.trackNumber ?
      parseInt(tags.trackNumber.split('/')[0]) : null,
    released_on: formatReleaseDate(),
    artwork_path,
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
          track_number, released_on, artwork_path, file_path,
          file_format, file_size
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        metadata.title,
        artistId,
        albumId,
        metadata.duration,
        metadata.track_number,
        metadata.released_on,
        metadata.artwork_path,
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

const saveArtwork = async (imageBuffer, songPath) => {
  if (!imageBuffer) return null;

  try {
    // Create artwork path based on song path
    const artworkPath = songPath.replace('.mp3', '-artwork.jpg');

    // Write the buffer to file
    await fs.writeFile(artworkPath, imageBuffer);

    // Return relative path (same format as song path)
    const parts = artworkPath.split('songs');
    return parts[1].replace(/\\/g, '/').replace(/^\/+/, '');
  } catch (error) {
    console.error('Error saving artwork:', error);
    return null;
  }
};

export const handleSingleSongUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was uploaded.' });
    }

    const tags = NodeID3.read(req.file.path);
    const metadata = await extractSongMetadata(req.file, tags);

    console.log('Metadata before validation:', metadata); // Add this log

    // Validate required fields before proceeding
    if (!metadata.primary_artist) {
      // Clean up the uploaded file since we can't process it
      await fs.unlink(req.file.path);
      // If artwork was saved, clean that up too
      if (metadata.artwork_path) {
        const fullArtworkPath = path.join(process.cwd(), 'uploads/songs', metadata.artwork_path);
        await fs.unlink(fullArtworkPath);
      }
      return res.status(400).json({
        message: 'Song metadata is incomplete: Primary artist is required'
      });
    }

    const songId = await insertSongMetadata(pool, metadata);

    res.json({
      message: 'Song uploaded and processed successfully',
      songId,
      metadata
    });

  } catch (error) {
    // Clean up files if insertion fails
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
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
        const metadata = await extractSongMetadata(file, tags);

        if (!metadata.primary_artist) {
          throw new Error(`Primary artist is required for file: ${file.originalname}`);
        }

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