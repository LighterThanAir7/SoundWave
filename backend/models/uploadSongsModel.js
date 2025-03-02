import pool from "../db/db.js";
import path from "path";
import fs from 'fs';
import fsPromises from "fs/promises";

export const insertSongMetadata = async (metadata) => {
  const connection = await pool.getConnection();

  try {
    // Započni transakciju za atomičnost operacija
    await connection.beginTransaction();

    // 1. Dohvati ili kreiraj primarnog izvođača
    const artistId = await getOrCreateArtist(connection, metadata.primary_artist);

    // 2. Dohvati ili kreiraj album ako postoji
    const albumId = metadata.album ?
      await getOrCreateAlbum(connection, metadata.album, metadata.released_on) : null;

    // 3. Unesi osnovne podatke o pjesmi
    const songId = await insertSong(connection, metadata, artistId, albumId);

    // 4. Unesi tehničke metapodatke
    if (metadata.technicalData) {
      await insertTechnicalMetadata(connection, songId, metadata.technicalData);
    }

    // 5. Unesi dodatne metapodatke
    await insertSongMetadataDetails(connection, songId, metadata);

    // 6. Unesi žanrove
    if (metadata.genres && metadata.genres.length > 0) {
      await addGenresToSong(connection, songId, metadata.genres);
    }

    // 7. Unesi suradnike (featuring artists)
    if (metadata.featuring_artists && metadata.featuring_artists.length > 0) {
      await addCollaboratingArtistsToSong(connection, songId, metadata.featuring_artists);
    }

    // 8. Unesi tekstove pjesama ako postoje
    if (metadata.lyrics) {
      await insertLyrics(connection, songId, metadata.lyrics, metadata.lyricsLanguage);
    }

    // 9. Unesi sinkronizirane tekstove ako postoje
    if (metadata.synchronisedLyrics) {
      await insertSynchronisedLyrics(connection, songId, metadata.synchronisedLyrics);
    }

    // 10. Spremi artwork ako postoji
    if (metadata.artwork && metadata.artwork.imageBuffer) {
      const imageBuffer = metadata.artwork.imageBuffer;
      const imageData = {
        mime: metadata.artwork.mime,
        type: { id: metadata.artwork.artwork_type_id },
        description: metadata.artwork.description,
        imageBuffer: imageBuffer
      };

      const savedArtworkPath = await saveArtwork(metadata.file_path, songId, imageData);

      if (savedArtworkPath) {
        await connection.query(
          'UPDATE songs SET artwork_path = ? WHERE id = ?',
          [savedArtworkPath.path, songId]
        );
      }
    }

    // Potvrdi transakciju
    await connection.commit();

    return songId;
  } catch (error) {
    // Poništi transakciju u slučaju greške
    await connection.rollback();
    console.error('Error inserting song metadata:', error);
    throw error;
  } finally {
    // Oslobodi konekciju
    connection.release();
  }
};

// Pomoćne funkcije

const getOrCreateArtist = async (connection, artistName) => {
  if (!artistName) throw new Error('Artist name is required');

  await connection.query('INSERT IGNORE INTO artists (name) VALUES (?)', [artistName]);
  const [result] = await connection.query('SELECT id FROM artists WHERE name = ?', [artistName]);

  if (result.length === 0) throw new Error(`Could not create or find artist: ${artistName}`);
  return result[0].id;
};

const getOrCreateAlbum = async (connection, albumTitle, releaseDate) => {
  await connection.query(
    'INSERT IGNORE INTO albums (title, release_date) VALUES (?, ?)',
    [albumTitle, releaseDate]
  );
  const [result] = await connection.query('SELECT id FROM albums WHERE title = ?', [albumTitle]);

  if (result.length === 0) return null;
  return result[0].id;
};

const insertSong = async (connection, metadata, artistId, albumId) => {
  const [result] = await connection.query(
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

  return result.insertId;
};

const insertTechnicalMetadata = async (connection, songId, technicalData) => {
  await connection.query(
    `INSERT INTO song_technical_metadata (
      song_id, bitrate, sample_rate, channels, vbr, codec_id, lossless
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      songId,
      technicalData.bitrate,
      technicalData.sample_rate,
      technicalData.channels,
      technicalData.vbr ? 1 : 0,
      technicalData.codec,
      technicalData.lossless ? 1 : 0
    ]
  );
};

const insertSongMetadataDetails = async (connection, songId, metadata) => {
  await connection.query(
    `INSERT INTO song_metadata (
      song_id, disc_number, bpm, performer_info, publisher,
      isrc, barcode, itunes_advisory, composer, conductor,
      text_writer, original_artist, original_title, original_textwriter,
      encoder, copyright, content_group, artwork_type_id, artwork_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      songId,
      metadata.disc_number,
      metadata.bpm,
      metadata.performer_info,
      metadata.publisher,
      metadata.isrc,
      metadata.barcode,
      metadata.itunes_advisory,
      metadata.composer,
      metadata.conductor,
      metadata.textWriter,
      metadata.originalArtist,
      metadata.originalTitle,
      metadata.originalTextwriter,
      metadata.encoder,
      metadata.copyright,
      metadata.contentGroup,
      metadata.artwork?.artwork_type_id,
      metadata.artwork?.description
    ]
  );
};

const addGenresToSong = async (connection, songId, genres) => {
  for (const genreName of genres) {
    await connection.query('INSERT IGNORE INTO genres (name) VALUES (?)', [genreName]);
    const [genreResult] = await connection.query('SELECT id FROM genres WHERE name = ?', [genreName]);

    if (genreResult.length > 0) {
      const genreId = genreResult[0].id;
      await connection.query(
        'INSERT INTO song_genre (song_id, genre_id) VALUES (?, ?)',
        [songId, genreId]
      );
    }
  }
};

const addCollaboratingArtistsToSong = async (connection, songId, artists) => {
  for (const artistName of artists) {
    const artistId = await getOrCreateArtist(connection, artistName);
    await connection.query(
      'INSERT INTO collaborating_artists (song_id, artist_id) VALUES (?, ?)',
      [songId, artistId]
    );
  }
};

const insertLyrics = async (connection, songId, lyrics, language) => {
  let languageId = null;

  if (language) {
    const [langResult] = await connection.query(
      'SELECT id FROM spt_languages WHERE code = ?',
      [language]
    );

    if (langResult.length > 0) {
      languageId = langResult[0].id;
    }
  }

  await connection.query(
    'INSERT INTO song_lyrics (song_id, lyrics, language_id) VALUES (?, ?, ?)',
    [songId, lyrics, languageId]
  );
};

const insertSynchronisedLyrics = async (connection, songId, syncLyrics) => {
  if (!Array.isArray(syncLyrics)) return;

  for (const lyric of syncLyrics) {
    let languageId = null;

    if (lyric.language) {
      const [langResult] = await connection.query(
        'SELECT id FROM spt_languages WHERE code = ?',
        [lyric.language]
      );

      if (langResult.length > 0) {
        languageId = langResult[0].id;
      }
    }

    await connection.query(
      'INSERT INTO song_synchronised_lyrics (song_id, time_stamp, text, language_id) VALUES (?, ?, ?, ?)',
      [songId, lyric.timeStamp, lyric.text, languageId]
    );
  }
};

const saveArtwork = async (songPath, songId, imageData) => {
  if (!imageData || !imageData.imageBuffer) return null;

  const mimeToExt = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp'
  };

  try {
    const extension = mimeToExt[imageData.mime] || '.jpg';

    // Dobivanje apsolutne putanje do uploads/songs direktorija
    const projectRoot = path.join(process.cwd(), '../');

    // Koristimo isti princip kao u multerConfig za određivanje putanje
    const firstLetter = path.basename(songPath).charAt(0).toLowerCase();
    const baseDir = path.join(projectRoot, 'uploads/songs', firstLetter);

    // Osiguraj da direktorij postoji
    if (!fs.existsSync(baseDir)) {
      await fsPromises.mkdir(baseDir, { recursive: true });
    }

    // Određivanje subdirektorija (isto kao u multerConfig)
    const files = fs.readdirSync(baseDir);
    const subDirIndex = Math.floor(files.length / 1000);
    const subDir = path.join(baseDir, subDirIndex.toString());

    // Osiguraj da subdirektorij postoji
    if (!fs.existsSync(subDir)) {
      await fsPromises.mkdir(subDir, { recursive: true });
    }

    // Kreiraj punu putanju za artwork
    const artworkFileName = `${path.basename(songPath, path.extname(songPath))}-${songId}${extension}`;
    const artworkPath = path.join(subDir, artworkFileName);

    // Zapiši buffer u datoteku
    await fsPromises.writeFile(artworkPath, imageData.imageBuffer);

    // Vrati relativnu putanju za spremanje u bazu
    const relativePath = path.join(firstLetter, subDirIndex.toString(), artworkFileName)
      .replace(/\\/g, '/');

    return {
      path: relativePath,
      mime: imageData.mime,
      artwork_type_id: imageData.type?.id || null,
      description: imageData.description || null
    };
  } catch (error) {
    console.error('Error saving artwork:', error);
    return null;
  }
};