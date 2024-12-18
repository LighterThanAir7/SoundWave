import pool from '../db/db.js';
import { encrypt, decrypt } from '../utils/apiKeyManager.js';

export const storeApiKeys = async (keyName, apiKey, secretKey) => {
  const encryptedApiKey = encrypt(apiKey);
  const encryptedSecretKey = encrypt(secretKey);

  await pool.query(
    'INSERT INTO api_keys (key_name, encrypted_key) VALUES (?, ?), (?, ?)',
    [keyName + '_api', encryptedApiKey, keyName + '_secret', encryptedSecretKey]
  );
};

export const validateApiKeys = async (apiKey, secretKey) => {
  const [rows] = await pool.query('SELECT * FROM api_keys WHERE is_active = TRUE');

  let foundApiKey = false;
  let foundSecretKey = false;

  for (const row of rows) {
    const decryptedKey = decrypt(row.encrypted_key);
    if (row.key_name.endsWith('_api') && decryptedKey === apiKey) foundApiKey = true;
    if (row.key_name.endsWith('_secret') && decryptedKey === secretKey) foundSecretKey = true;
  }

  return foundApiKey && foundSecretKey;
};
