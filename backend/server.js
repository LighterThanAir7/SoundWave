import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import favouritesRoutes from './routes/favouritesRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import playlistRoutes from './routes/playlistRoutes.js';
import artistRoutes from "./routes/artistRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', songRoutes);
app.use('/api', artistRoutes);
app.use('/api', albumRoutes);
app.use('/api/favorites', favouritesRoutes);
app.use('/api', userRoutes);
app.use('/api', playlistRoutes);
app.use('/api', genreRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});