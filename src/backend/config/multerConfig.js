// src/backend/config/multerConfig.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Get absolute path to project root (ES6 version)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '../../../');

const getUploadDir = (filename) => {
  // Get first letter of filename and create path
  const firstLetter = filename.charAt(0).toLowerCase();
  const baseDir = path.join(projectRoot, 'uploads/songs', firstLetter);

  // Create letter directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // Count files to determine subdirectory (0 for first 1000, 1 for next 1000, etc.)
  const files = fs.readdirSync(baseDir);
  const subDirIndex = Math.floor(files.length / 1000);
  const subDir = path.join(baseDir, subDirIndex.toString());

  // Create numbered subdirectory if it doesn't exist
  if (!fs.existsSync(subDir)) {
    fs.mkdirSync(subDir, { recursive: true });
  }

  return subDir;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name;
    const sanitizedName = originalName
      .toLowerCase()
      .replace(/\s+/g, '-')        // spaces to hyphens
      .replace(/[^a-z0-9-]/g, '')  // remove special chars
      .replace(/-+/g, '-')         // multiple hyphens to single
      .replace(/^-+|-+$/g, '');    // trim hyphens from ends

    const uploadDir = getUploadDir(sanitizedName);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name;
    const sanitizedName = originalName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    const uuid = uuidv4();
    const extension = path.extname(file.originalname);

    const finalName = `${sanitizedName}-${uuid}${extension}`;
    cb(null, finalName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'audio/mpeg') {
    cb(null, true);
  } else {
    cb(new Error('Only MP3 files are allowed!'), false);
  }
};

export const uploadSong = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB per file
    files: 5000 // per batch
  }
});




// Add playlist image storage configuration
const playlistStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(projectRoot, 'uploads/playlists');

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uuid = uuidv4();
    const extension = path.extname(file.originalname);
    const finalName = `playlist-${uuid}${extension}`;
    cb(null, finalName);
  }
});

// Add playlist image filter
const playlistImageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Export playlist upload configuration
export const uploadPlaylistImage = multer({
  storage: playlistStorage,
  fileFilter: playlistImageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for images
  }
});