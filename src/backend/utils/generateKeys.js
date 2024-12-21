import { generateApiKeyPair, generateJwtSecrets } from './apiKeyManager.js';
import { storeSecrets } from '../models/apiKeyModel.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../../.env') }); // Going up 3 levels to reach root

const keyPair = generateApiKeyPair();
const jwtSecrets = generateJwtSecrets();

await storeSecrets(
  'initial_super_admin',
  keyPair.apiKey,
  keyPair.secretKey,
  jwtSecrets.jwtSecret,
  jwtSecrets.jwtRefreshSecret
);

console.log('Generated Admin Keys:');
console.log('SUPER_ADMIN_API_KEY:', keyPair.apiKey);
console.log('SUPER_ADMIN_SECRET_KEY:', keyPair.secretKey);
console.log('JWT_SECRET:', jwtSecrets.jwtSecret);
console.log('JWT_REFRESH_SECRET:', jwtSecrets.jwtRefreshSecret);