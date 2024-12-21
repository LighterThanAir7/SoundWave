import NodeID3 from 'node-id3';

const processMetadata = (metadata) => {
  // Split artists and genres
  const artists = metadata.artist
    .replace(/([a-z])([A-Z])/g, '$1;$2')
    .split(';')
    .map(artist => artist.trim());

  const genres = metadata.genre
    .replace(/([a-z])([A-Z])/g, '$1;$2')
    .split(';')
    .map(genre => genre.trim());

  return {
    ...metadata,
    artists,
    genres
  };
};

const options = {
  onlyRaw: true // This will give us only the raw ID3v2 frames
};

export const handleSingleSongUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was uploaded.' });
    }

    const tags = NodeID3.read(req.file.path);
    const tagsWithoutImage = { ...tags };
    delete tagsWithoutImage.image;
// or if you want to just know if image exists
    tagsWithoutImage.image = tags.image ? 'Image data present' : null;

    console.log('Raw ID3 tags:', JSON.stringify(tagsWithoutImage, null, 2));
    const processedMetadata = processMetadata(tags);

    res.json({
      message: 'Song uploaded successfully',
      file: req.file,
      metadata: processedMetadata
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
    if (!req.files || req.files.length === 0) {
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
        const processedMetadata = processMetadata(tags);
        processedFiles.push({
          filename: file.filename,
          path: file.path,
          metadata: processedMetadata
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