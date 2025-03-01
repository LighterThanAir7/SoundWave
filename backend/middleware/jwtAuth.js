import jwt from 'jsonwebtoken';
import { validateApiKeys } from '../models/apiKeyModel.js';

export const jwtAuthMiddleware = async (req, res, next) => {
  try {
    // Dohvati token iz Authorization headera
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Nije pronađen token za autentikaciju' });
    }

    const token = authHeader.split(' ')[1];

    // Dohvati JWT secret
    const { jwtSecret } = await validateApiKeys();
    if (!jwtSecret) {
      return res.status(500).json({ error: 'JWT secret nije pronađen' });
    }

    // Verificiraj token
    const decoded = jwt.verify(token, jwtSecret);

    // Provjeri je li korisnik admin (id_type 1 ili 2)
    if (decoded.role !== 1 && decoded.role !== 2) {
      return res.status(403).json({ error: 'Pristup nije dozvoljen - potrebna su administratorska prava' });
    }

    // Spremi podatke o korisniku u request objekt
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Nevažeći token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token je istekao' });
    }

    console.error('Greška u JWT autentikaciji:', error);
    res.status(500).json({ error: 'Interna greška servera' });
  }
};
