import NodeID3 from 'node-id3';
import * as mm from 'music-metadata';
import fs from 'fs/promises';
import path from "path";
import {insertSongMetadata} from "../models/uploadSongsModel.js";
import Helper from "../helpers/Helper.js";

const extractSongMetadata = async (file, tags) => {
  if (!tags) {
    throw new Error('No metadata found in file');
  }

  const getUserDefinedValue = (description) => {
    if (!tags.userDefinedText || !Array.isArray(tags.userDefinedText)) {
      return null;
    }

    const field = tags.userDefinedText.find(item =>
      item.description === description
    );

    return field ? field.value : null;
  };

  const formatReleaseDate = () => {
    if (!tags.year) return null;

    if (tags.date) {
      const day = tags.date.substring(0, 2);
      const month = tags.date.substring(2, 4);
      return `${tags.year}-${month}-${day}`;
    }

    return `${tags.year}-01-01`;
  };

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

  const title = tags.title || null
  const artists = tags.artist ?
    tags.artist
      .replace(/([a-z])([A-Z])/g, '$1;$2')
      .split(';')
      .map(artist => artist.trim())
      .filter(Boolean)
    : [];

  const primary_artist = artists[0] || null;
  if (!primary_artist) {
    throw new Error('Could not extract primary artist from metadata');
  }

  const featuring_artists = artists.slice(1);

  const genres = tags.genre ?
    tags.genre
      .replace(/([a-z])([A-Z])/g, '$1;$2')
      .split(';')
      .map(genre => genre.trim())
      .filter(Boolean)
    : [];

  const album = tags.album || null;
  const released_on = formatReleaseDate();

  const artwork = tags.image ? {
    mime: tags.image.mime,
    artwork_type_id: tags.image.type?.id || null,
    description: tags.image.description || null,
    imageBuffer: tags.image.imageBuffer
  } : null;

  const disc_number = tags.partOfSet ? parseInt(tags.partOfSet.split('/')[0]) : null;
  const duration = tags.length ? Math.round(parseInt(tags.length) / 1000) : null;
  const track_number = tags.trackNumber ? parseInt(tags.trackNumber.split('/')[0]) : null;

  const file_path = getRelativePath(file.path);
  const file_format = path.extname(file.path).substring(1).toLowerCase();
  const file_size = file.size;

  const barcode = getUserDefinedValue('BARCODE');
  const itunes_advisory_str = getUserDefinedValue('ITUNESADVISORY');
  const itunes_advisory = itunes_advisory_str ? parseInt(itunes_advisory_str) : null;
  const bpm = tags.bpm ? parseInt(tags.bpm) : null;
  const performer_info = tags.performerInfo || null;
  const publisher = tags.publisher || null;
  const isrc = tags.ISRC || null;
  const composer = tags.composer || null;
  const conductor = tags.conductor || null;
  const textWriter = tags.textWriter || null;
  const originalArtist = tags.originalArtist || null;
  const originalTitle = tags.originalTitle || null;
  const originalTextwriter = tags.originalTextwriter || null;
  const encoder = tags.encoder || null;
  const copyright = tags.copyright || null;
  const involvedPeopleList = tags.involvedPeopleList || null;
  const contentGroup = tags.contentGroup || null;
  const lyrics = tags.unsynchronisedLyrics?.text || null;
  const lyricsLanguage = tags.unsynchronisedLyrics?.language || null;
  const synchronisedLyrics = tags.synchronisedLyrics || null;

  const mmData = await mm.parseFile(file.path);

  const codec_id = Helper.mapCodec(mmData.format.container, mmData.format.codec, mmData.format.lossless);

  const technicalData = {
    bitrate: mmData.format.bitrate ? Math.round(mmData.format.bitrate / 1000) : null,
    sample_rate: mmData.format.sampleRate || null,
    channels: mmData.format.numberOfChannels || null,
    vbr: mmData.format.codecProfile === 'VBR',
    codec: codec_id,
    lossless: mmData.format.lossless || false
  };

  return {
    title,
    primary_artist,
    featuring_artists,
    album,
    duration,
    track_number,
    released_on,
    artwork,
    file_path,
    file_format,
    file_size,
    genres,
    disc_number,
    bpm,
    performer_info,
    publisher,
    isrc,
    barcode,
    itunes_advisory,
    composer,
    conductor,
    textWriter,
    originalArtist,
    originalTitle,
    originalTextwriter,
    encoder,
    copyright,
    involvedPeopleList,
    contentGroup,
    lyrics,
    lyricsLanguage,
    synchronisedLyrics,
    technicalData
  }
};

export const handleSingleSongUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was uploaded.' });
    }

    // Čitanje ID3 tagova
    const tags = NodeID3.read(req.file.path);

    // Priprema metapodataka
    const metadata = await extractSongMetadata(req.file, tags);

    // Validacija obaveznih polja
    if (!metadata.primary_artist) {
      await fs.unlink(req.file.path);
      return res.status(400).json({
        message: 'Song metadata is incomplete: Primary artist is required'
      });
    }

    // Unos pjesme u bazu i spremanje artworka
    try {
      const songId = await insertSongMetadata(metadata);

      // Vraćanje uspješnog odgovora
      res.json({
        message: 'Song uploaded and processed successfully',
        songId
      });
    } catch (dbError) {
      // Čišćenje datoteke ako unos u bazu ne uspije
      await fs.unlink(req.file.path).catch(console.error);

      return res.status(500).json({
        message: 'Error saving song to database',
        error: dbError.message
      });
    }

  } catch (error) {
    // Čišćenje datoteke ako obrada ne uspije
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }

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

        // Koristi insertSongMetadata bez pool parametra jer funkcija sama dohvaća konekciju
        const songId = await insertSongMetadata(metadata);

        processedFiles.push({
          filename: file.originalname,
          songId
          // Ne vraćamo cijeli metadata objekt jer može biti velik zbog imageBuffer-a
        });
      } catch (error) {
        // Čišćenje datoteke ako obrada ne uspije
        await fs.unlink(file.path).catch(console.error);

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

    if (req.files) {
      for (const file of req.files) {
        await fs.unlink(file.path).catch(console.error);
      }
    }

    res.status(500).json({
      message: 'Error processing batch upload',
      error: error.message
    });
  }
};