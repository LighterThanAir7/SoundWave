import { validateApiKeys } from '../models/apiKeyModel.js';

export const apiKeyAuthMiddleware = async (req, res, next) => {
  const apiKey = req.headers['x-super-admin-api-key'];
  const secretKey = req.headers['x-super-admin-secret-key'];

  if (!apiKey || !secretKey) {
    return res.status(401).json({ error: 'API keys are required' });
  }

  try {
    const validation = await validateApiKeys(apiKey, secretKey);
    if (validation.isValid) {
      next();
    } else {
      res.status(401).json({ error: 'Invalid API keys' });
    }
  } catch (error) {
    console.error('API key validation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};