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
  origin: "http://localhost:8084",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200 // Neki preglednici (poput Firefoxa) traže 200 umjesto 204 za preflight zahtjeve
}));

// Routes
app.use("/api/auth", authRoutes);
// Privremena ruta za test mrežne veze
app.get('/api/ping', (req, res) => {
  res.json({ message: "Mreža i CORS rade savršeno!" });
});
app.use('/api/upload', uploadRoutes);
app.use('/api', songRoutes);
app.use('/api', artistRoutes);
app.use('/api', albumRoutes);
app.use('/api/favorites', favouritesRoutes);
app.use('/api', userRoutes);
app.use('/api', playlistRoutes);
app.use('/api', genreRoutes)

// Expressu prosljeđujemo i port i mrežnu adresu 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});